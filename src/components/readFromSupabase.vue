<script setup lang="ts">
import { useMainStore } from "@/stores/mainStore";
import type { AppRecord } from "@/types";

const { t } = useI18n();
const store = useMainStore();
const TABLE_NAME = "records";
const records = ref<AppRecord[] | null>(null);
const readMessage = ref<string | null>(null);

const readFromSupabase = async () => {
  store.isLoading = true;
  readMessage.value = null;
  try {
    const supabase = useSupabaseClient();
    const { data, error } = await supabase
      .from(TABLE_NAME)
      .select("*")
      .order("createdAt", { ascending: false });
    if (error) throw error;
    records.value = (data as AppRecord[]) ?? [];
    if (!records.value.length) readMessage.value = t("api.noRecords");
  } catch (err) {
    readMessage.value = t("api.loadingFailed");
  } finally {
    store.isLoading = false;
  }
};
</script>

<template>
  <Button
    :icon="store.isLoading ? 'pi pi-sync pi-spin' : 'pi pi-sync'"
    :label="t('api.readFromSB')"
    size="small"
    @click="readFromSupabase"
  />
  <div v-if="readMessage" class="mt-2 text-sm opacity-80">
    {{ readMessage }}
  </div>
  <pre v-else-if="records" class="mt-2 text-sm whitespace-pre-wrap">
    {{ JSON.stringify(records, null, 2) }}
  </pre>
</template>
