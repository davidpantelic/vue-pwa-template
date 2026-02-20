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
    <div class="flex gap-2">
      <!-- <Button
          type="button"
          severity="secondary"
          :label="t('words.refresh')"
          @click="checkSession"
        /> -->
      <Button
        type="button"
        severity="danger"
        :label="t('words.logout')"
        :icon="
          userSessionStore.isLoading
            ? 'pi pi-spin pi-spinner'
            : 'pi pi-sign-out'
        "
        @click="userSessionStore.logOut"
      />
    </div>
  </div>
</template>
