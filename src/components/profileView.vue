<script setup lang="ts">
import { useUserSession } from "../stores/userSession";

const userSessionStore = useUserSession();

const { t } = useI18n();
const editProfileForm = ref(false);
</script>

<template>
  <div class="flex flex-col gap-3">
    <div class="font-medium text-center">
      <h3>
        {{ userSessionStore.session.user.user_metadata.display_name }}
      </h3>
      <h3>
        {{ userSessionStore.session.user.email }}
      </h3>
    </div>
    <div class="flex flex-col gap-4">
      <!-- <Button
          type="button"
          severity="secondary"
          :label="t('words.refresh')"
          @click="checkSession"
        /> -->

      <EditProfile
        v-if="editProfileForm"
        @close-edit="editProfileForm = false"
      />

      <Button
        v-if="!editProfileForm"
        type="button"
        severity="secondary"
        :label="t('userEdit.editButton')"
        icon="pi pi-user-edit"
        icon-pos="right"
        @click="editProfileForm = true"
      />

      <Button
        v-if="!editProfileForm"
        type="button"
        severity="secondary"
        :label="t('words.resetPassword')"
        :icon="
          userSessionStore.isResetPasswordRequestLoading
            ? 'pi pi-spin pi-spinner'
            : 'pi pi-key'
        "
        icon-pos="right"
        @click="userSessionStore.resetPasswordRequest"
      />

      <Button
        v-if="!editProfileForm"
        type="button"
        severity="danger"
        :label="t('words.logout')"
        :icon="
          userSessionStore.isLoggingOut
            ? 'pi pi-spin pi-spinner'
            : 'pi pi-sign-out'
        "
        icon-pos="right"
        @click="userSessionStore.logOut('local')"
      />
    </div>
  </div>
</template>
