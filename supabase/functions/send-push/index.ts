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

function json(status: number, body: unknown) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

async function getAppServer() {
  const vapidSubject =
    Deno.env.get("VAPID_SUBJECT") ??
    Deno.env.get("VAPID_URL") ?? // fallback if you used this name earlier
    "mailto:admin@example.com";

  const vapidKeysJson = Deno.env.get("VAPID_KEYS_JSON") ?? "";
  if (!vapidKeysJson) {
    throw new Error(
      "Missing VAPID_KEYS_JSON (expected exported JWK keys JSON)",
    );
  }

  let exportedKeys: any;
  try {
    exportedKeys = JSON.parse(vapidKeysJson);
  } catch {
    throw new Error("VAPID_KEYS_JSON is not valid JSON");
  }

  // exportedKeys must be in the shape expected by importVapidKeys()
  // (i.e. output of @negrel/webpush generate-vapid-keys script)
  const vapidKeys = await importVapidKeys(exportedKeys);

  return await ApplicationServer.new({
    contactInformation: vapidSubject,
    vapidKeys,
  });
}

serve(async (req) => {
  // ✅ Always answer preflight successfully, no matter what.
  if (req.method === "OPTIONS") {
    return new Response("ok", { status: 200, headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return json(405, { error: "Method not allowed" });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
    const anonKey = Deno.env.get("SUPABASE_ANON_KEY") ?? "";

    if (!supabaseUrl || !serviceRoleKey || !anonKey) {
      return json(500, {
        error:
          "Missing SUPABASE_URL / SUPABASE_ANON_KEY / SUPABASE_SERVICE_ROLE_KEY",
      });
    }

    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return json(401, { error: "Missing Authorization header" });
    }

    // Verify the caller (logged in user)
    const authed = createClient(supabaseUrl, anonKey, {
      global: { headers: { Authorization: authHeader } },
    });

    const { data: userRes, error: userErr } = await authed.auth.getUser();
    const user = userRes?.user;
    if (userErr || !user) {
      return json(401, { error: "Unauthorized" });
    }

    // Admin client for DB (bypass RLS) — safe server-side
    const admin = createClient(supabaseUrl, serviceRoleKey);

    const { title, body, url } = await req.json().catch(() => ({}));
    const payload = JSON.stringify({
      title: title ?? "Notification",
      body: body ?? "",
      url: url ?? "/",
    });

    // ✅ Only this user's subs
    const { data: rows, error } = await admin
      .from("push_subscriptions")
      .select("endpoint, p256dh, auth, subscription")
      .eq("user_id", user.id);

    if (error) throw error;

    if (!rows?.length) {
      return json(200, {
        sent: 0,
        failed: 0,
        message: "No subscriptions for user",
      });
    }

    const appServer = await getAppServer();

    const results = await Promise.allSettled(
      rows.map(async (row: any) => {
        const subscription: PushSubscription = row.subscription ?? {
          endpoint: row.endpoint,
          keys: { p256dh: row.p256dh, auth: row.auth },
        };

        try {
          const subscriber = appServer.subscribe(subscription);
          await subscriber.pushTextMessage(payload, {});
          return { ok: true };
        } catch (err: any) {
          if (err instanceof PushMessageError && err.isGone?.()) {
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

    return json(200, { sent, failed });
  } catch (err) {
    return json(500, { error: "Function error", details: String(err) });
  }
});
