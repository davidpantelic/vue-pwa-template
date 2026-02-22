<script setup lang="ts">
import { useUserSession } from "../stores/userSession";

const userSessionStore = useUserSession();

const { t } = useI18n();
</script>

<template>
  <div class="flex flex-col gap-3">
    <div class="font-medium">
      {{
        userSessionStore.session.user?.email ||
        userSessionStore.session.user?.id
      }}
    </div>
    <div class="flex flex-wrap gap-2">
      <!-- <Button
          type="button"
          severity="secondary"
          :label="t('words.refresh')"
          @click="checkSession"
        /> -->

      <Button
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
