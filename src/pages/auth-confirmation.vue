<script setup lang="ts">
const router = useRouter();

onMounted(() => {
  const isStandalonePwa =
    window.matchMedia("(display-mode: standalone)").matches ||
    (window.navigator as Navigator & { standalone?: boolean }).standalone ===
      true;

  if (isStandalonePwa) {
    router.push({ path: "/" });
  }
});
</script>

<template>
  <main>
    <h1>{{ $t("authConfirmation.title") }}</h1>
    <p>{{ $t("authConfirmation.text") }}</p>
  </main>
</template>
