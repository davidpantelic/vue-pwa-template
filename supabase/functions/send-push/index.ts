import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import {
  ApplicationServer,
  PushMessageError,
  type PushSubscription,
  importVapidKeys,
} from "jsr:@negrel/webpush@0.5.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
const vapidKeysJson =
  Deno.env.get("vapid_keys_json") ??
  Deno.env.get("VAPID_KEYS_JSON") ??
  "";

if (!supabaseUrl || !serviceRoleKey) {
  throw new Error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
}
if (!vapidKeysJson) {
  throw new Error("Missing VAPID keys JSON");
}

const supabase = createClient(supabaseUrl, serviceRoleKey);
const exportedKeys = JSON.parse(vapidKeysJson);
const vapidKeys = await importVapidKeys(exportedKeys);
const appServer = await ApplicationServer.new({
  contactInformation: "mailto:admin@example.com",
  vapidKeys,
});

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  try {
    const { title, body, url } = await req.json();
    const payload = JSON.stringify({
      title: title ?? "Notification",
      body: body ?? "",
      url: url ?? "/",
    });

    const { data: rows, error } = await supabase
      .from("push_subscriptions")
      .select("*");
    if (error) throw error;

    const results = await Promise.allSettled(
      (rows ?? []).map(async (row: any) => {
        const subscription: PushSubscription =
          row.subscription ?? {
            endpoint: row.endpoint,
            keys: {
              p256dh: row.p256dh,
              auth: row.auth,
            },
          };
        try {
          const subscriber = appServer.subscribe(subscription);
          await subscriber.pushTextMessage(payload, {});
          return { ok: true };
        } catch (err: any) {
          if (err instanceof PushMessageError && err.isGone()) {
            await supabase.from("push_subscriptions").delete().eq(
              "endpoint",
              row.endpoint,
            );
          }
          throw err;
        }
      }),
    );

    const sent = results.filter((r) => r.status === "fulfilled").length;
    const failed = results.length - sent;

    return new Response(JSON.stringify({ sent, failed }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: "Push send failed." }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
