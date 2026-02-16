<script setup lang="ts">
const toast = useToast();

const { offline } = useOffline();

watch(offline, (val) => {
  if (val) {
    showOfflineToast();
  } else {
    toast.removeGroup("offlineToastGroup");
    toast.add({
      group: "offlineToastGroup",
      severity: "success",
      summary: "Online",
      detail: "Ponovo ste povezani na mrežu.",
      life: 3000,
    });
  }
});

const showOfflineToast = () => {
  toast.add({
    group: "offlineToastGroup",
    severity: "warn",
    summary: "Offline",
    detail:
      "Trenutno niste na mreži, srećom aplikacija može da radi offline s tim što neke funkcionalnosti možda neće biti moguće dok se ponovo ne povežete na mrežu.",
  });
};
</script>

<template>
  <Transition name="offline-button" appear>
    <Button
      v-if="offline"
      class="offline-indicator"
      icon="pi pi-wifi"
      severity="warn"
      size="large"
      @click="showOfflineToast"
    />
  </Transition>

  <Toast group="offlineToastGroup" position="bottom-right" />
</template>

<style scoped>
.offline-button-enter-active,
.offline-button-leave-active {
  transition:
    opacity 180ms ease,
    transform 220ms ease;
}

.offline-button-enter-from,
.offline-button-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
</style>
