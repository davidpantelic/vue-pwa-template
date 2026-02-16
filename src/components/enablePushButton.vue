<script setup lang="ts">
import { useMainStore } from "@/stores/mainStore";

const toast = useToast();
const store = useMainStore();
const notificationsEnabled = ref(false);
const TABLE_NAME = "push_subscriptions";

const urlBase64ToUint8Array = (base64String: string) => {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = atob(base64);
  return Uint8Array.from(rawData, (char) => char.charCodeAt(0));
};

const saveSubscription = async (subscription: PushSubscription) => {
  const supabase = useSupabaseClient();
  const json = subscription.toJSON();
  const { endpoint, keys } = json;
  const { error } = await supabase.from(TABLE_NAME).upsert(
    {
      endpoint,
      p256dh: keys?.p256dh ?? null,
      auth: keys?.auth ?? null,
      subscription: json,
      createdAt: new Date().toISOString(),
    },
    { onConflict: "endpoint" },
  );
  if (error) throw error;
};

const enablePush = async () => {
  if (!("serviceWorker" in navigator)) {
    console.error("Service Worker nije podržan.");
    toast.add({
      group: "notificationsToastGroup",
      severity: "danger",
      summary: "Nije moguće omogućiti obaveštenja.",
      detail: "Service Worker nije podržan.",
      life: 3000,
    });
    return;
  }
  if (!("PushManager" in window)) {
    console.error("Push nije podržan.");
    toast.add({
      group: "notificationsToastGroup",
      severity: "danger",
      summary: "Nije moguće omogućiti obaveštenja.",
      detail: "Push Manager nije podržan.",
      life: 3000,
    });
    return;
  }

  store.isLoading = true;
  try {
    if (Notification.permission === "denied") {
      toast.add({
        group: "notificationsToastGroup",
        severity: "warn",
        summary: "Obaveštenja su blokirana.",
        detail:
          "Obaveštenja su blokirana u pretraživaču. Otvorite podešavanja sajta i ponovo ih omogućite. Ili ih resetujte pa opet kliknite na ovo isto dugme u aplikaciji.",
        life: 8000,
      });
      notificationsEnabled.value = false;
      return;
    }

    const permission = await Notification.requestPermission();
    if (permission === "default") {
      toast.add({
        group: "notificationsToastGroup",
        severity: "warn",
        summary: "Pokušajte ponovo.",
        detail:
          "Dozvola nije izabrana. Kliknite ponovo i odaberite 'Dozvoli' ili 'Allow'.",
        life: 5000,
      });
      notificationsEnabled.value = false;
      return;
    }
    if (permission !== "granted") {
      toast.add({
        group: "notificationsToastGroup",
        severity: "warn",
        summary: "Obaveštenja blokirana.",
        detail: "Dozvola za obaveštenja nije odobrena.",
        life: 3000,
      });
      notificationsEnabled.value = false;
      return;
    }

    const registration = await navigator.serviceWorker.ready;
    let subscription = await registration.pushManager.getSubscription();
    if (!subscription) {
      const publicKey = import.meta.env.VITE_VAPID_PUBLIC_KEY;
      if (!publicKey) {
        console.error("VAPID public key nije postavljen.");
        toast.add({
          group: "notificationsToastGroup",
          severity: "danger",
          summary: "VAPID public key nije postavljen.",
          life: 3000,
        });
        return;
      }
      subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicKey),
      });
    }

    await saveSubscription(subscription);
    toast.add({
      group: "notificationsToastGroup",
      severity: "success",
      summary: "Obaveštenja su omogućena.",
      life: 3000,
    });
    notificationsEnabled.value = true;
  } catch (err) {
    toast.add({
      group: "notificationsToastGroup",
      severity: "danger",
      summary: "Neuspešno omogućavanje obaveštenja.",
      life: 3000,
    });
    notificationsEnabled.value = false;
  } finally {
    store.isLoading = false;
  }
};

onMounted(async () => {
  if (!("serviceWorker" in navigator) || !("PushManager" in window)) {
    notificationsEnabled.value = false;
    return;
  }
  if (Notification.permission !== "granted") {
    notificationsEnabled.value = false;
    return;
  }
  const registration = await navigator.serviceWorker.ready;
  const subscription = await registration.pushManager.getSubscription();
  notificationsEnabled.value = Boolean(subscription);
});
</script>

<template>
  <Button
    :icon="
      notificationsEnabled
        ? 'pi pi-bell'
        : store.isLoading
          ? 'pi pi-sync pi-spin'
          : 'pi pi-bell-slash'
    "
    size="large"
    severity="secondary"
    @click="enablePush"
  />
</template>
