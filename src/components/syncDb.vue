<script setup lang="ts">
import { useMainStore } from "@/stores/mainStore";

const store = useMainStore();
const { syncDb, syncMessage } = useSyncDb();
</script>

<template>
  <label class="flex items-center gap-2 text-sm mb-2">
    <input v-model="store.autoSyncOnReconnect" type="checkbox" />
    Auto-sync on reconnect
  </label>
  <Button
    :icon="store.isLoading ? 'pi pi-sync pi-spin' : 'pi pi-sync'"
    label="Sync DB"
    size="small"
    @click="syncDb"
  />
  <div v-if="syncMessage" class="mt-2 text-sm opacity-80">
    {{ syncMessage }}
  </div>
</template>
