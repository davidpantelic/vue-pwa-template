<script setup lang="ts">
import { useMainStore } from "@/stores/mainStore";

const { t } = useI18n();
const store = useMainStore();

const title = ref("");
const body = ref("");
const saveMessage = ref<string | null>(null);

const writeToIndexedDB = async () => {
  if (!title.value.trim()) {
    saveMessage.value = t("form.validation.titleRequired");
    await delay(2000);
    saveMessage.value = null;
    return;
  }

  store.isLoading = true;
  saveMessage.value = null;
  try {
    const record = createRecord({
      title: title.value.trim(),
      body: body.value.trim() || undefined,
    });
    await saveRecordToIndexedDb(record);
    saveMessage.value = t("api.writeToIDBSuccess");
    title.value = "";
    body.value = "";
  } catch (err) {
    saveMessage.value = t("api.writeToDBFailed");
  } finally {
    store.isLoading = false;
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
    :icon="store.isLoading ? 'pi pi-sync pi-spin' : 'pi pi-sync'"
    :label="t('api.writeToIDB')"
    size="small"
    @click="writeToIndexedDB"
  />
  <div v-if="saveMessage" class="mt-2 text-sm opacity-80">
    {{ saveMessage }}
  </div>
</template>
