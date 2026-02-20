import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import {
  ApplicationServer,
  PushMessageError,
  type PushSubscription,
  importVapidKeys,
} from "jsr:@negrel/webpush@0.5.0";

const corsHeaders: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
const anonKey = Deno.env.get("SUPABASE_ANON_KEY") ?? "";
const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";

const vapidPublicKey = Deno.env.get("VAPID_PUBLIC_KEY") ?? "";
const vapidPrivateKey = Deno.env.get("VAPID_PRIVATE_KEY") ?? "";
// Recommend: set VAPID_SUBJECT in secrets (mailto:... or https://...)
const vapidSubject =
  Deno.env.get("VAPID_SUBJECT") ??
  Deno.env.get("VAPID_URL") ?? // fallback to your current name
  "mailto:admin@example.com";

if (!supabaseUrl || !anonKey || !serviceRoleKey) {
  throw new Error(
    "Missing SUPABASE_URL / SUPABASE_ANON_KEY / SUPABASE_SERVICE_ROLE_KEY",
  );
}
if (!vapidPublicKey || !vapidPrivateKey) {
  throw new Error("Missing VAPID_PUBLIC_KEY or VAPID_PRIVATE_KEY");
}

// Service-role client: DB access (bypasses RLS) — OK inside Edge Function
const admin = createClient(supabaseUrl, serviceRoleKey);

// VAPID + push server init
const exportedKeys = {
  publicKey: vapidPublicKey,
  privateKey: vapidPrivateKey,
  subject: vapidSubject,
};
const vapidKeys = await importVapidKeys(exportedKeys);
const appServer = await ApplicationServer.new({
  contactInformation: vapidSubject,
  vapidKeys,
});

serve(async (req) => {
  // CORS preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", { status: 200, headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    // 1) Verify caller (logged-in user)
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return new Response(
        JSON.stringify({ error: "Missing Authorization header" }),
        {
          status: 401,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    // Create an anon client that uses the caller's JWT for auth.getUser()
    const authed = createClient(supabaseUrl, anonKey, {
      global: {
        headers: { Authorization: authHeader },
      },
    });

    const { data: userRes, error: userErr } = await authed.auth.getUser();
    const user = userRes?.user;

    if (userErr || !user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // 2) Parse payload
    const json = await req.json().catch(() => ({}));
    const title = json?.title ?? "Notification";
    const body = json?.body ?? "";
    const url = json?.url ?? "/";

    const payload = JSON.stringify({ title, body, url });

    // 3) Fetch ONLY this user's subscriptions
    const { data: rows, error } = await admin
      .from("push_subscriptions")
      .select("endpoint, p256dh, auth, subscription")
      .eq("user_id", user.id);

    if (error) throw error;

    const subs = rows ?? [];
    if (subs.length === 0) {
      return new Response(
        JSON.stringify({ sent: 0, failed: 0, message: "No subscriptions" }),
        {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    // 4) Send push to each subscription; cleanup expired ones
    const results = await Promise.allSettled(
      subs.map(async (row: any) => {
        const subscription: PushSubscription =
          row.subscription ??
          ({
            endpoint: row.endpoint,
            keys: { p256dh: row.p256dh, auth: row.auth },
          } as PushSubscription);

        try {
          const subscriber = appServer.subscribe(subscription);
          await subscriber.pushTextMessage(payload, {});
          return { ok: true };
        } catch (err: any) {
          if (err instanceof PushMessageError && err.isGone?.()) {
            // Remove dead subscription
            await admin
              .from("push_subscriptions")
              .delete()
              .eq("endpoint", row.endpoint)
              .eq("user_id", user.id);
          }
          throw err;
        }
      }),
    );

    const sent = results.filter((r) => r.status === "fulfilled").length;
    const failed = results.length - sent;

    return new Response(JSON.stringify({ sent, failed }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    // Optional: include err message for debugging
    return new Response(
      JSON.stringify({ error: "Push send failed.", details: String(err) }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  }
});
