<script setup lang="ts">
import { useMainStore } from "@/stores/mainStore";
import type { QueueItem } from "@/types";

const store = useMainStore();
const title = ref("");
const body = ref("");
const saveMessage = ref<string | null>(null);
const TABLE_NAME = "records";
const online = useOnline();

const writeToSupabase = async () => {
  if (!title.value.trim()) {
    saveMessage.value = "Naslov je obavezan.";
    return;
  }

  store.isLoading = true;
  saveMessage.value = null;
  try {
    const record = createRecord({
      title: title.value.trim(),
      body: body.value.trim() || undefined,
    });
    if (!online.value) {
      const queued: QueueItem = {
        id: crypto.randomUUID(),
        type: "upsert",
        record,
        createdAt: new Date().toISOString(),
        retries: 0,
      };
      await addQueueItem(queued);
      saveMessage.value = "Sačuvano lokalno. Čeka sinhronizaciju.";
      title.value = "";
      body.value = "";
      return;
    }
    const supabase = useSupabaseClient();
    const { error } = await supabase.from(TABLE_NAME).insert(record);
    if (error) throw error;
    saveMessage.value = "Sačuvano u Supabase.";
    title.value = "";
    body.value = "";
  } catch (err) {
    saveMessage.value = "Čuvanje nije uspelo.";
    console.error(err);
  } finally {
    store.isLoading = false;
  }
};
</script>

<template>
  <div class="flex flex-col gap-2 max-w-lg mb-3">
    <InputText
      v-model="title"
      name="title"
      type="text"
      placeholder="Title"
      fluid
    />
    <InputText
      v-model="body"
      name="body"
      type="text"
      placeholder="Body"
      fluid
    />
  </div>

  <Button
    :icon="store.isLoading ? 'pi pi-sync pi-spin' : 'pi pi-sync'"
    label="Write to Supabase"
    size="small"
    @click="writeToSupabase"
  />
  <div v-if="saveMessage" class="mt-2 text-sm opacity-80">
    {{ saveMessage }}
  </div>
</template>
