<script setup lang="ts">
const { t } = useI18n();
const sendMessage = ref<string | null>(null);
const pushTitle = ref("Test");
const pushBody = ref("Test");
const pushUrl = ref("/");
const isLoading = ref(false);

const sendTestPush = async () => {
  sendMessage.value = null;
  isLoading.value = true;
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
    sendMessage.value = t("form.message.success");
  } catch (err) {
    sendMessage.value = t("form.message.error");
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div>
    <div class="flex flex-col gap-2 max-w-lg">
      <InputText
        v-model="pushTitle"
        :placeholder="t('form.fields.title')"
        fluid
      />
      <InputText
        v-model="pushBody"
        :placeholder="t('form.fields.body')"
        fluid
      />
      <InputText v-model="pushUrl" :placeholder="t('form.fields.url')" fluid />
    </div>
    <Button
      class="mt-2"
      :icon="isLoading ? 'pi pi-spinner pi-spin' : 'pi pi-send'"
      :label="t('form.fields.button')"
      @click="sendTestPush"
    />
    <div v-if="sendMessage" class="mt-2 text-sm opacity-80">
      {{ sendMessage }}
    </div>
  </div>
</template>
