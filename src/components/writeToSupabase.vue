<script setup lang="ts">
import type { QueueItem } from "@/types";

const { t } = useI18n();
const title = ref("");
const body = ref("");
const saveMessage = ref<string | null>(null);
const TABLE_NAME = "records";
const online = useOnline();
const isLoading = ref(false);

const writeToSupabase = async () => {
  if (!title.value.trim()) {
    saveMessage.value = t("form.validation.titleRequired");
    await delay(2000);
    saveMessage.value = null;
    return;
  }

  isLoading.value = true;
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
      saveMessage.value = t("api.writeLocallySuccess");
      title.value = "";
      body.value = "";
      return;
    }
    const supabase = useSupabaseClient();
    const { error } = await supabase.from(TABLE_NAME).insert(record);
    if (error) throw error;
    saveMessage.value = t("api.writeToSBSuccess");
    title.value = "";
    body.value = "";
  } catch (err) {
    saveMessage.value = t("api.writeToDBFailed");
    console.error(err);
  } finally {
    isLoading.value = false;
    await delay(2000);
    saveMessage.value = null;
  }
};
</script>

<template>
  <div class="flex flex-col gap-2 max-w-lg mb-3">
    <InputText
      v-model="title"
      name="title"
      type="text"
      :placeholder="t('form.test.fields.title')"
      fluid
    />
    <InputText
      v-model="body"
      name="body"
      type="text"
      :placeholder="t('form.test.fields.body')"
      fluid
    />
  </div>

  <Button
    :icon="isLoading ? 'pi pi-sync pi-spin' : 'pi pi-sync'"
    :label="t('api.writeToSB')"
    size="small"
    @click="writeToSupabase"
  />
  <div v-if="saveMessage" class="mt-2 text-sm opacity-80">
    {{ saveMessage }}
  </div>
</template>
