<script setup lang="ts">
import { useUserSession } from "@/stores/userSession";

const { t } = useI18n();
const userSession = useUserSession();

useAppTheme();
useAutoSync();

userSession.initAuthListener();
userSession.checkSession();

onMounted(async () => {
  if ("clearAppBadge" in navigator) {
    (navigator as Navigator & { clearAppBadge?: () => Promise<void> })
      .clearAppBadge?.()
      .catch(() => {});
  }
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.ready
      .then((registration) => {
        registration.active?.postMessage({ type: "CLEAR_BADGE" });
      })
      .catch(() => {});
  }
});

const metaDescription = computed(() => t("meta.description"));

useHead({
  title: "Webdak PWA",
  meta: [
    {
      name: "description",
      content: metaDescription,
    },
  ],
  link: [
    { rel: "icon", href: "/favicon.ico" },
    { rel: "mask-icon", href: "/webdak.svg", color: "#0f1c0d" },
    { rel: "apple-touch-icon", href: "/webdak_192.png", sizes: "192x192" },
    { rel: "canonical", href: "https://example.com/" },
  ],
});

useSeoMeta({
  ogTitle: "Webdak PWA",
  ogDescription: metaDescription,
  ogImage: "/social_share.jpg",
});
</script>

<template>
  <header class="flex mb-5 items-center gap-3 justify-start p-1">
    <img alt="Vue logo" class="logo size-20" src="@/assets/logo.svg" />

    <nav class="flex gap-3 items-center pt-16">
      <RouterLink to="/">{{ t("words.home") }}</RouterLink>
      <RouterLink to="/about">Test 1</RouterLink>
      <RouterLink to="/test">Test 2</RouterLink>
      <div
        class="absolute right-1 top-1 flex flex-wrap gap-1 xxs:gap-2 xs:gap-3 p-1 xs:p-2 max-w-full"
      >
        <OfflineIndicator />
        <UpdateToastAndButton />
        <InstallToastAndButton />
        <Suspense>
          <ProfileButton />
        </Suspense>
        <DrawerButton />
      </div>
    </nav>
  </header>

  <Suspense>
    <RouterView class="p-5" />
  </Suspense>

  <ToastsGroup />
</template>
