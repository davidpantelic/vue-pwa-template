<script setup lang="ts">
const { checkForUpdate } = usePwaUpdate();
const toast = useToast();
const checking = ref(false);

const onCheckForUpdate = async () => {
  if (checking.value) return;
  checking.value = true;

  const hasUpdate = await checkForUpdate();
  if (!hasUpdate) {
    toast.add({
      group: "upToDateToastGroup",
      severity: "success",
      summary: "Aplikacija je ažurirana",
      detail: "Već imate najnoviju verziju.",
      life: 3000,
    });
  }

  checking.value = false;
};
</script>

<template>
  <Transition name="update-check-button" appear>
    <Button
      :icon="checking ? 'pi pi-sync pi-spin' : ''"
      class="w-12 h-12.25 p-0!"
      severity="secondary"
      size="large"
      :disabled="checking"
      @click="onCheckForUpdate"
    >
      <IconMslInstallDesktopRounded v-if="!checking" />
    </Button>
  </Transition>
</template>

<style scoped>
.update-check-button-enter-active,
.update-check-button-leave-active {
  transition:
    opacity 180ms ease,
    transform 220ms ease;
}

.update-check-button-enter-from,
.update-check-button-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
</style>
