<script setup lang="ts">
const router = useRouter();

onMounted(() => {
  const hash = new URLSearchParams(window.location.hash.replace(/^#/, ""));

  if (!hash.has("redirect_to_home")) {
    router.push({ path: "/" });
  }

  const isStandalonePwa =
    window.matchMedia("(display-mode: standalone)").matches ||
    (window.navigator as Navigator & { standalone?: boolean }).standalone ===
      true;

  if (isStandalonePwa) {
    router.push({ path: "/" });
  } else {
    setTimeout(() => {
      router.push({ path: "/" });
    }, 6000);
  }
});
</script>

<template>
  <main class="text-center">
    <h1>{{ $t("authConfirmation.title") }}</h1>
    <br />
    <p>{{ $t("authConfirmation.text") }}</p>
  </main>
</template>
