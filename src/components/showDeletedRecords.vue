<script setup lang="ts">
import type { AppRecord, QueueItem } from "@/types";
import { useMainStore } from "@/stores/mainStore";

const store = useMainStore();
const online = useOnline();
const TABLE_NAME = "records";

const showDeleted = ref(true);
const records = ref<AppRecord[]>([]);
const message = ref<string | null>(null);

const loadRecords = async () => {
  store.isLoading = true;
  message.value = null;
  try {
    const result = await listRecordsFromIndexedDb();
    records.value = showDeleted.value
      ? result.filter((r) => r.deletedAt)
      : result.filter((r) => !r.deletedAt);
    if (!records.value.length) {
      message.value = showDeleted.value
        ? "Nema obrisanih zapisa."
        : "Nema zapisa.";
    }
  } catch (err) {
    message.value = "Učitavanje nije uspelo.";
  } finally {
    store.isLoading = false;
  }
};

watch(showDeleted, loadRecords, { immediate: true });

const enqueueUpsert = async (record: AppRecord) => {
  const queued: QueueItem = {
    id: crypto.randomUUID(),
    type: "upsert",
    record,
    createdAt: new Date().toISOString(),
    retries: 0,
  };
  await addQueueItem(queued);
};

const restoreRecord = async (record: AppRecord) => {
  store.isLoading = true;
  message.value = null;
  const nowIso = new Date().toISOString();
  const updated: AppRecord = {
    ...record,
    deletedAt: null,
    updatedAt: nowIso,
    syncedAt: online.value ? nowIso : null,
  };

  try {
    await saveRecordToIndexedDb(updated);
    if (online.value) {
      const supabase = useSupabaseClient();
      const { error } = await supabase
        .from(TABLE_NAME)
        .upsert(updated, { onConflict: "id" });
      if (error) throw error;
    } else {
      await enqueueUpsert(updated);
    }
    message.value = "Zapis je vraćen.";
    await loadRecords();
  } catch (err) {
    message.value = "Vraćanje nije uspelo.";
    if (online.value) {
      await enqueueUpsert({ ...updated, syncedAt: null });
    }
  } finally {
    store.isLoading = false;
  }
};
</script>

<template>
  <label class="flex items-center gap-2 text-sm mb-2">
    <input v-model="showDeleted" type="checkbox" />
    Prikaži obrisane
  </label>
  <Button
    :icon="store.isLoading ? 'pi pi-sync pi-spin' : 'pi pi-sync'"
    label="Refresh"
    size="small"
    @click="loadRecords"
  />
  <p v-if="message" class="text-sm opacity-80">{{ message }}</p>

  <div v-if="records.length" class="mt-3 flex flex-col gap-3 max-w-2xl">
    <div
      v-for="record in records"
      :key="record.id"
      class="p-3 border border-surface-200 rounded-md"
    >
      <div class="flex items-start justify-between gap-3">
        <div>
          <div class="font-semibold">{{ record.title }}</div>
          <div v-if="record.body" class="text-sm opacity-80">
            {{ record.body }}
          </div>
          <div class="text-xs opacity-60 mt-1">
            Deleted: {{ record.deletedAt }}
          </div>
        </div>
        <div class="flex gap-2">
          <Button
            v-if="record.deletedAt"
            icon="pi pi-undo"
            size="small"
            label="Restore"
            @click="restoreRecord(record)"
          />
        </div>
      </div>
    </div>
  </div>
</template>
