<script setup lang="ts">
import { useMainStore } from "@/stores/mainStore";

const store = useMainStore();
const sendMessage = ref<string | null>(null);
const pushTitle = ref("Test notification");
const pushBody = ref("Hello from Webdak PWA");
const pushUrl = ref("/");

const sendTestPush = async () => {
  sendMessage.value = null;
  store.isLoading = true;
  try {
    const supabase = useSupabaseClient();
    const { error } = await supabase.functions.invoke("send-push", {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
      },
      body: {
        title: pushTitle.value,
        body: pushBody.value,
        url: pushUrl.value,
      },
    });
    if (error) throw error;
    sendMessage.value = "Test push poslat.";
  } catch (err) {
    sendMessage.value = "Slanje push notifikacije nije uspelo.";
  } finally {
    store.isLoading = false;
  }
};
</script>

<template>
  <div>
    <div class="flex flex-col gap-2 max-w-lg">
      <InputText v-model="pushTitle" placeholder="Title" fluid />
      <InputText v-model="pushBody" placeholder="Body" fluid />
      <InputText v-model="pushUrl" placeholder="Open URL" fluid />
    </div>
    <Button
      class="mt-2"
      :icon="store.isLoading ? 'pi pi-sync pi-spin' : 'pi pi-send'"
      label="Send Test Push"
      @click="sendTestPush"
    />
    <div v-if="sendMessage" class="mt-2 text-sm opacity-80">
      {{ sendMessage }}
    </div>
  </div>
</template>
