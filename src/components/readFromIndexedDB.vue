<script setup lang="ts">
import type { AppRecord } from "@/types";
import { useMainStore } from "@/stores/mainStore";

const { t } = useI18n();
const store = useMainStore();

const records = ref<AppRecord[] | null>(null);
const readMessage = ref<string | null>(null);

const readFromIndexedDB = async () => {
  store.isLoading = true;
  readMessage.value = null;
  try {
    const result = await listRecordsFromIndexedDb();
    records.value = result;
    if (!result.length) readMessage.value = t("api.noRecords");
  } catch (err) {
    readMessage.value = t("api.loadingFailed");
  } finally {
    store.isLoading = false;
    await delay(2000);
    readMessage.value = null;
  }
};
</script>

<template>
  <Button
    :icon="store.isLoading ? 'pi pi-sync pi-spin' : 'pi pi-sync'"
    :label="t('api.readFromIDB')"
    size="small"
    @click="readFromIndexedDB"
  />
  <div v-if="readMessage" class="mt-2 text-sm opacity-80">
    {{ readMessage }}
  </div>
  <pre v-else-if="records" class="mt-2 text-sm whitespace-pre-wrap">
    {{ JSON.stringify(records, null, 2) }}
  </pre>
</template>
