<script setup lang="ts">
import type { AppRecord, QueueItem } from "@/types";
import { useMainStore } from "@/stores/mainStore";

const store = useMainStore();
const online = useOnline();
const TABLE_NAME = "records";

const records = ref<AppRecord[]>([]);
const message = ref<string | null>(null);
const editingId = ref<string | null>(null);
const editTitle = ref("");
const editBody = ref("");

const loadRecords = async () => {
  store.isLoading = true;
  message.value = null;
  try {
    const result = await listRecordsFromIndexedDb();
    records.value = result.filter((r) => !r.deletedAt);
    if (!records.value.length) message.value = "Nema zapisa.";
  } catch (err) {
    message.value = "Učitavanje nije uspelo.";
  } finally {
    store.isLoading = false;
  }
};

onMounted(loadRecords);

const startEdit = (record: AppRecord) => {
  editingId.value = record.id;
  editTitle.value = record.title;
  editBody.value = record.body ?? "";
};

const cancelEdit = () => {
  editingId.value = null;
  editTitle.value = "";
  editBody.value = "";
};

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

const saveEdit = async (record: AppRecord) => {
  if (!editTitle.value.trim()) {
    message.value = "Naslov je obavezan.";
    return;
  }

  store.isLoading = true;
  message.value = null;
  const nowIso = new Date().toISOString();
  const updated: AppRecord = {
    ...record,
    title: editTitle.value.trim(),
    body: editBody.value.trim() || undefined,
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

    message.value = "Izmena sačuvana.";
    cancelEdit();
    await loadRecords();
  } catch (err) {
    message.value = "Čuvanje izmene nije uspelo.";
    if (online.value) {
      await enqueueUpsert({ ...updated, syncedAt: null });
    }
  } finally {
    store.isLoading = false;
  }
};

const softDelete = async (record: AppRecord) => {
  store.isLoading = true;
  message.value = null;
  const nowIso = new Date().toISOString();
  const updated: AppRecord = {
    ...record,
    deletedAt: nowIso,
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

    message.value = "Obrisano (soft delete).";
    if (editingId.value === record.id) cancelEdit();
    await loadRecords();
  } catch (err) {
    message.value = "Brisanje nije uspelo.";
    if (online.value) {
      await enqueueUpsert({ ...updated, syncedAt: null });
    }
  } finally {
    store.isLoading = false;
  }
};
</script>

<template>
  <div class="flex items-center gap-2">
    <Button
      :icon="store.isLoading ? 'pi pi-sync pi-spin' : 'pi pi-sync'"
      label="Refresh"
      size="small"
      @click="loadRecords"
    />
    <span v-if="message" class="text-sm opacity-80">{{ message }}</span>
  </div>

  <div v-if="records.length" class="mt-3 flex flex-col gap-3 max-w-2xl">
    <div
      v-for="record in records"
      :key="record.id"
      class="p-3 border border-surface-200 rounded-md"
    >
      <div v-if="editingId === record.id" class="flex flex-col gap-2">
        <InputText v-model="editTitle" placeholder="Title" fluid />
        <InputText v-model="editBody" placeholder="Body" fluid />
        <div class="flex gap-2">
          <Button
            icon="pi pi-check"
            label="Save"
            size="small"
            @click="saveEdit(record)"
          />
          <Button
            icon="pi pi-times"
            label="Cancel"
            size="small"
            severity="secondary"
            @click="cancelEdit"
          />
        </div>
      </div>
      <div v-else class="flex items-start justify-between gap-3">
        <div>
          <div class="font-semibold">{{ record.title }}</div>
          <div v-if="record.body" class="text-sm opacity-80">
            {{ record.body }}
          </div>
          <div class="text-xs opacity-60 mt-1">
            Updated: {{ record.updatedAt }}
          </div>
        </div>
        <div class="flex gap-2">
          <Button
            icon="pi pi-pencil"
            size="small"
            label="Edit"
            @click="startEdit(record)"
          />
          <Button
            icon="pi pi-trash"
            size="small"
            severity="danger"
            label="Delete"
            @click="softDelete(record)"
          />
        </div>
      </div>
    </div>
  </div>
</template>
