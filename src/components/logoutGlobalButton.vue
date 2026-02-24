<script setup lang="ts">
import { useUserSession } from "../stores/userSession";

const userSessionStore = useUserSession();
</script>

<template>
  <Button
    type="button"
    severity="danger"
    :label="$t('words.logoutGlobal')"
    :icon="
      userSessionStore.isLoggingOut ? 'pi pi-spin pi-spinner' : 'pi pi-sign-out'
    "
    icon-pos="right"
    @click="userSessionStore.logOut('global', { silent: true })"
  />
</template>
