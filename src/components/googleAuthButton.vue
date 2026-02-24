<script setup lang="ts">
const supabase = useSupabaseClient();
const googleSigning = ref(false);
const toast = useToast();
const { t } = useI18n();

const signWithGoogle = async () => {
  googleSigning.value = true;

  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/google-auth-confirmation`,
      },
    });

    if (error) {
      console.log(error);

      toast.removeGroup("userSignToastGroup");
      toast.add({
        group: "userSignToastGroup",
        severity: "warn",
        summary: t("googleAuth.failedSigning"),
        life: 4000,
      });
      return;
    }
  } catch (err) {
    console.log(err);
  } finally {
    googleSigning.value = false;
  }
};
</script>

<template>
  <Button
    label="Google"
    variant="outlined"
    :icon="googleSigning ? 'pi pi-spinner pi-spin' : 'pi pi-google'"
    icon-pos="right"
    fluid
    @click="() => void signWithGoogle()"
  />
</template>
