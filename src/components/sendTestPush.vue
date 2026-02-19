<script setup lang="ts">
import { useMainStore } from "@/stores/mainStore";

const { t } = useI18n();
const store = useMainStore();
const sendMessage = ref<string | null>(null);
const pushTitle = ref("Test");
const pushBody = ref("Test");
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
    sendMessage.value = t("form.test.message.success");
  } catch (err) {
    sendMessage.value = t("form.test.message.error");
  } finally {
    store.isLoading = false;
  }
};
</script>

<template>
  <div>
    <div class="flex flex-col gap-2 max-w-lg">
      <InputText
        v-model="pushTitle"
        :placeholder="t('form.test.fields.title')"
        fluid
      />
      <InputText
        v-model="pushBody"
        :placeholder="t('form.test.fields.body')"
        fluid
      />
      <InputText
        v-model="pushUrl"
        :placeholder="t('form.test.fields.url')"
        fluid
      />
    </div>
    <Button
      class="mt-2"
      :icon="store.isLoading ? 'pi pi-sync pi-spin' : 'pi pi-send'"
      :label="t('form.test.fields.button')"
      @click="sendTestPush"
    />
    <div v-if="sendMessage" class="mt-2 text-sm opacity-80">
      {{ sendMessage }}
    </div>
  </div>
</template>
