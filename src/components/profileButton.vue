<script setup lang="ts">
import { useUserSession } from "../stores/userSession";

const { t, locale } = useI18n();
const profileDialogShow = ref<boolean>(false);
const userSessionStore = useUserSession();

const userForms = computed(() => {
  const loginWord = t("words.login");
  const registerWord = t("words.register");
  return [loginWord, registerWord];
});

const selectedUserForm = ref(userForms.value[0]);

watch(
  () => locale.value,
  () => {
    selectedUserForm.value = userForms.value[0];
  },
);
</script>

<template>
  <Button
    :icon="userSessionStore.session ? 'pi pi-user' : 'pi pi-sign-in'"
    severity="secondary"
    size="large"
    @click="profileDialogShow = true"
  />

  <Dialog
    v-model:visible="profileDialogShow"
    modal
    :header="$t('words.profile')"
  >
    <ProfileView v-if="userSessionStore.session" />

    <div v-if="!userSessionStore.session">
      <SelectButton
        v-model="selectedUserForm"
        :options="userForms"
        :allowEmpty="false"
        fluid
        class="mb-3"
      />

      <LoginForm v-if="selectedUserForm === userForms[0]" />
      <RegisterForm
        v-if="selectedUserForm === userForms[1]"
        @successful-registration="selectedUserForm = userForms[0]"
      />
    </div>
  </Dialog>

  <Toast group="userSignToastGroup" position="bottom-right" />
</template>
