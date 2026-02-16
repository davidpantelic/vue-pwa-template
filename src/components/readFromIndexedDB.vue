<script setup lang="ts">
import type { AppRecord } from "@/types";
import { useMainStore } from "@/stores/mainStore";

const store = useMainStore();

const records = ref<AppRecord[] | null>(null);
const readMessage = ref<string | null>(null);

const readFromIndexedDB = async () => {
  store.isLoading = true;
  readMessage.value = null;
  try {
    const result = await listRecordsFromIndexedDb();
    records.value = result;
    if (!result.length) readMessage.value = "Nema zapisa u IndexedDB.";
  } catch (err) {
    readMessage.value = "Čitanje nije uspelo.";
  } finally {
    store.isLoading = false;
  }
};
</script>

<template>
  <Button
    :icon="store.isLoading ? 'pi pi-sync pi-spin' : 'pi pi-sync'"
    label="Read from IndexedDB"
    size="small"
    @click="readFromIndexedDB"
  />
  <div v-if="readMessage" class="mt-2 text-sm opacity-80">
    {{ readMessage }}
  </div>
  <pre v-else-if="records" class="mt-2 text-sm whitespace-pre-wrap">
      {{ JSON.stringify(records, null, 2) }}
    </pre
  >
</template>
