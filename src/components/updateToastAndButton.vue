<script setup lang="ts">
const { needRefresh, reloadToUpdate, dismissUpdate, showRefreshToast } =
  usePwaUpdate();

const toast = useToast();
const confirmDialog = useConfirm();

watch(showRefreshToast, (val) => {
  if (val) {
    toast.add({
      group: "updatePwaToastGroup",
      severity: "warn",
      summary: "Nova verzija aplikacije je dostupna",
      detail:
        "Ažurirajte odmah klikom na dugme ispod (završite trenutnu radnju jer će se aplikacija sama zatvoriti i ponovo pokrenuti) ili kasnije klikom na dugme na vrhu.",
    });
  } else {
    toast.removeGroup("updatePwaToastGroup");
  }
});

const askToReloadToUpdate = () => {
  confirmDialog.require({
    message:
      "Da li želite da ažurirate aplikaciju? Pre toga završite trenutnu radnju jer će se aplikacija sama zatvoriti i ponovo pokrenuti.",
    header: "Ažuriranje dostupno",

    rejectProps: {
      label: "Kasnije",
      severity: "secondary",
      outlined: true,
    },
    acceptProps: {
      label: "Ažuriraj",
    },
    accept: () => {
      reloadToUpdate();
    },
    reject: () => {},
  });
};

onMounted(() => {
  const justUpdated = sessionStorage.getItem("pwa_just_updated") === "1";
  if (justUpdated) {
    sessionStorage.removeItem("pwa_just_updated");

    toast.add({
      group: "successUpdateToastGroup",
      severity: "success",
      summary: "Aplikacija je ažurirana.",
      life: 3000,
    });
  }
});
</script>

<template>
  <Transition name="update-button" appear>
    <Button
      v-if="!showRefreshToast && needRefresh"
      severity="warn"
      size="large"
      @click="askToReloadToUpdate"
    >
      <IconMslInstallDesktopRounded class="text-xl" />
      <span class="hidden xxs:inline">Ažuriraj</span>
    </Button>
  </Transition>

  <Toast
    group="updatePwaToastGroup"
    position="bottom-right"
    @close="dismissUpdate"
  >
    <template #message="{ message }">
      <div class="flex items-start gap-3">
        <div class="flex-1">
          <div class="font-semibold mb-1">{{ message.summary }}</div>
          <div class="text-sm opacity-90">{{ message.detail }}</div>

          <div class="mt-3 flex gap-2">
            <Button
              size="small"
              severity="secondary"
              label="Kasnije"
              @click="
                () => {
                  dismissUpdate();
                }
              "
            />
            <Button size="small" label="Ažuriraj" @click="reloadToUpdate" />
          </div>
        </div>
      </div>
    </template>
  </Toast>

  <Toast group="successUpdateToastGroup" position="bottom-right" />

  <ConfirmDialog class="update-dialog"></ConfirmDialog>
</template>

<style scoped>
.update-button-enter-active,
.update-button-leave-active {
  transition:
    opacity 180ms ease,
    transform 220ms ease;
}

.update-button-enter-from,
.update-button-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
</style>
