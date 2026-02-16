<script setup lang="ts">
import { useMainStore } from "@/stores/mainStore";

const store = useMainStore();

const title = ref("");
const body = ref("");
const saveMessage = ref<string | null>(null);

const writeToIndexedDB = async () => {
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
    await saveRecordToIndexedDb(record);
    saveMessage.value = "Sačuvano u IndexedDB.";
    title.value = "";
    body.value = "";
  } catch (err) {
    saveMessage.value = "Čuvanje nije uspelo.";
  } finally {
    store.isLoading = false;
  }
};
</script>

<template>
  <div class="flex flex-col gap-2 max-w-lg mb-3">
    <InputText
      v-model="title"
      name="username"
      type="text"
      placeholder="Title"
      fluid
    />
    <InputText
      v-model="body"
      name="username"
      type="text"
      placeholder="Body"
      fluid
    />
  </div>

  <Button
    :icon="store.isLoading ? 'pi pi-sync pi-spin' : 'pi pi-sync'"
    label="Write to IndexedDB"
    size="small"
    @click="writeToIndexedDB"
  />
  <div v-if="saveMessage" class="mt-2 text-sm opacity-80">
    {{ saveMessage }}
  </div>
</template>
