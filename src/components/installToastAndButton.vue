<script setup lang="ts">
const toast = useToast();

const {
  canPromptInstall,
  shouldShowInstallUI,
  promptInstall,
  dismissForNow,
  isStandalone,
  isInstalled,
} = useInstallPrompt();
useInstallPrompt();

const cookies = useCookies(["webdak-pwa-cookie"]);

const isInstallToastVisible = ref(false);
const showInstallButton = ref(false);
const toastManuallyClosed = ref(false);
const installDialogVisible = ref(false);
const waitAfterMounted = ref(false);
const installButtonClicked = ref(false);
const hideInstallButton = ref(false);

const showInstallToast = () => {
  if (isInstallToastVisible.value) return;
  toast.add({
    group: "installToastGroup",
    severity: "secondary",
    summary: "Instalirajte aplikaciju",
    detail:
      "Možete instalirati aplikaciju na svoj uređaj kako biste imali brži pristup i više mogućnosti.",
  });
  isInstallToastVisible.value = true;
};

// show / hide toast
watchEffect(() => {
  if (shouldShowInstallUI.value) {
    if (!toastManuallyClosed.value) {
      showInstallToast();
      showInstallButton.value = false;
    } else {
      showInstallButton.value = !isStandalone.value && !isInstalled.value;
    }
  } else {
    toast.removeGroup("installToastGroup");
    isInstallToastVisible.value = false;
    showInstallButton.value = !isStandalone.value && !isInstalled.value;
    toastManuallyClosed.value = false;
  }
});

async function onInstallClick() {
  installButtonClicked.value = true;
  sessionStorage.setItem("install_button_clicked", "1");

  if (!canPromptInstall.value) {
    installDialogVisible.value = true;
    return;
  }
  const res = await promptInstall({ suppressDismiss: true });
  if (res.outcome === "accepted") {
    toast.add({
      group: "successInstallToastGroup",
      severity: "success",
      summary: "Instalacija u toku...",
      detail:
        "Aplikacija će biti instalirana za par trenutaka i nakon toga je možete otvoriti sa početnog ekrana.",
      life: 6000,
    });
  }
}

const onCancelClick = () => {
  toast.removeGroup("installToastGroup");
  dismissForNow();
};

onMounted(() => {
  installButtonClicked.value =
    sessionStorage.getItem("install_button_clicked") === "1";

  hideInstallButton.value =
    cookies.get("webdak-pwa-cookie") === "install-button-clicked";
  setTimeout(() => {
    waitAfterMounted.value = true;
  }, 500);
});

const copied = ref(false);
const copyAppLink = async () => {
  try {
    await navigator.clipboard.writeText(window.location.href);
    copied.value = true;

    setTimeout(() => {
      copied.value = false;
    }, 2000);
  } catch (e) {
    console.error("Copy failed", e);
  }
};

const hideInstallButtonManually = () => {
  hideInstallButton.value = true;
  cookies.set(
    "webdak-pwa-cookie",
    "install-button-clicked",
    { maxAge: 3600 }, // s
  );
};
</script>

<template>
  <Transition name="install-button" appear>
    <Button
      v-if="waitAfterMounted && showInstallButton && !hideInstallButton"
      severity="primary"
      size="large"
      @click="onInstallClick"
    >
      <IconMslInstallDesktopRounded class="text-xl" />
      <span v-if="!installButtonClicked" class="hidden xxs:inline"
        >Instaliraj</span
      >
    </Button>
  </Transition>

  <Toast
    group="installToastGroup"
    position="bottom-right"
    @close="
      showInstallButton = true;
      isInstallToastVisible = false;
      toastManuallyClosed = true;
    "
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
              label="Ne sad"
              outlined
              @click="onCancelClick"
            />
            <Button size="small" label="Instaliraj" @click="onInstallClick" />
          </div>
        </div>
      </div>
    </template>
  </Toast>

  <Toast group="successInstallToastGroup" position="bottom-right" />

  <Dialog
    class="install-instructions-dialog"
    v-model:visible="installDialogVisible"
    modal
    header="Instalacija nije moguća u trenutnom pretraživaču."
  >
    <div class="flex flex-col gap-3 [&>p]:text-justify">
      <p>
        Da biste instalirali aplikaciju na svoj uređaj, otvorite link u Google
        Chrome pretraživaču a zatim kliknite na <b>Instaliraj</b> dugme.
      </p>
      <p>
        Klikom na dugme ispod možete kopirate link aplikacije a zatim ga
        zalepiti u Google Chrome pretraživač.
      </p>
      <Button
        size="small"
        :label="!copied ? 'Kopiraj link' : 'Link kopiran'"
        :icon="!copied ? 'pi pi-copy' : 'pi pi-check'"
        :disabled="copied"
        icon-pos="right"
        @click="copyAppLink"
      />
      <p>
        Svakako možete nastaviti da koristite aplikaciju i bez instaliranja. Ako
        želite, klikom na dugme ispod, možete skloniti "Instaliraj" dugme.
      </p>
      <Button
        size="small"
        label="Skloni dugme"
        @click="hideInstallButtonManually"
      />
    </div>
  </Dialog>
</template>

<style scoped>
.install-button-enter-active,
.install-button-leave-active {
  transition:
    opacity 180ms ease,
    transform 220ms ease;
}

.install-button-enter-from,
.install-button-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
</style>
