import { registerSW } from "virtual:pwa-register";

export function usePwaUpdate() {
  const needRefresh = ref(false);
  // const offlineReady = ref(false);
  const showRefreshToast = ref(false);
  const online = useOnline();
  const swRegistration = ref<ServiceWorkerRegistration | null>(null);

  // function we will call when user clicks "Reload"
  let updateSW: ((reloadPage?: boolean) => Promise<void>) | null = null;

  onMounted(() => {
    // registerSW wires events and returns an update function
    updateSW = registerSW({
      immediate: true,
      onNeedRefresh() {
        needRefresh.value = true;
        showRefreshToast.value = true;
      },
      onRegisteredSW(_, registration) {
        swRegistration.value = registration ?? null;
        if (registration?.waiting) {
          needRefresh.value = true;
          showRefreshToast.value = true;
        }
      },
      // onOfflineReady() {
      //   offlineReady.value = true;
      // },
    });
  });

  // When connectivity is restored, re-check for updates.
  watch(
    online,
    async (isOnline, wasOnline) => {
      if (isOnline && wasOnline === false) {
        const registration = swRegistration.value;
        if (registration?.waiting) {
          needRefresh.value = true;
          showRefreshToast.value = true;
          return;
        }

        if (registration) {
          try {
            await registration.update();
          } catch (err) {
            console.warn("PWA update check failed", err);
          }

          if (registration.waiting) {
            needRefresh.value = true;
            showRefreshToast.value = true;
          }
          return;
        }

        if (updateSW) {
          // Trigger a check; do not reload here, let onNeedRefresh show the toast.
          await updateSW();
        }
      }
    },
    { flush: "post" },
  );

  async function reloadToUpdate() {
    sessionStorage.setItem("pwa_just_updated", "1");

    const registration = swRegistration.value;
    if (registration?.waiting) {
      let reloading = false;
      navigator.serviceWorker.addEventListener("controllerchange", () => {
        if (reloading) return;
        reloading = true;
        window.location.reload();
      });
      registration.waiting.postMessage({ type: "SKIP_WAITING" });
      return;
    }

    if (!updateSW) return;
    await updateSW(true);
  }

  function waitForNeedRefresh(timeoutMs = 3000): Promise<boolean> {
    if (needRefresh.value) return Promise.resolve(true);

    return new Promise((resolve) => {
      const stop = watch(needRefresh, (val) => {
        if (val) {
          stop();
          clearTimeout(timer);
          resolve(true);
        }
      });

      const timer = setTimeout(() => {
        stop();
        resolve(false);
      }, timeoutMs);
    });
  }

  async function checkForUpdate(): Promise<boolean> {
    if (needRefresh.value) {
      showRefreshToast.value = true;
      return true;
    }

    const registration = swRegistration.value;
    if (registration) {
      try {
        await registration.update();
      } catch (err) {
        console.warn("PWA manual update check failed", err);
      }

      if (registration.waiting) {
        needRefresh.value = true;
        showRefreshToast.value = true;
        return true;
      }
      if (await waitForNeedRefresh()) {
        showRefreshToast.value = true;
        return true;
      }
      return false;
    }

    if (updateSW) {
      await updateSW();
      if (needRefresh.value || (await waitForNeedRefresh())) {
        showRefreshToast.value = true;
        return true;
      }
    }

    return false;
  }

  function dismissUpdate() {
    // console.log("dismissUpdate");
    showRefreshToast.value = false;
  }

  return {
    needRefresh,
    // offlineReady,
    reloadToUpdate,
    checkForUpdate,
    dismissUpdate,
    showRefreshToast,
  };
}
