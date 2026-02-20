<script setup lang="ts">
const { t } = useI18n();
const toast = useToast();
const sendMessage = ref<string | null>(null);
const pushTitle = ref("Test");
const pushBody = ref("Test");
const pushUrl = ref("/");
const isLoading = ref(false);
const supabase = useSupabaseClient();

const sendTestPush = async () => {
  sendMessage.value = null;
  isLoading.value = true;

  try {
    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession();

    if (!session || sessionError) {
      toast.add({
        group: "userSignToastGroup",
        severity: "warn",
        summary: t("words.login"),
        detail: t("form.message.loggedRequired"),
        life: 3000,
      });
      isLoading.value = false;
      return;
    }

    // use access_token from session
    const { error } = await supabase.functions.invoke("send-push", {
      headers: {
        Authorization: `Bearer ${session.access_token}`,
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
    console.error(err);
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
