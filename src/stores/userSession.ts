import type { userLoginCredentials } from "@/types";

export const useUserSession = defineStore("userSession", () => {
  const isLoading = ref(false);
  const supabase = useSupabaseClient();
  const session = ref<any | null>(null);
  const sessionError = ref<any | null>(null);
  const { t } = useI18n();
  const toast = useToast();

  const checkSession = async () => {
    try {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.error(error);
        session.value = null;
        sessionError.value = error;
        return;
      }
      session.value = data.session ?? null;
    } catch (err) {
      console.error(err);
      session.value = null;
    }
  };

  const logWithPass = async (credentials: userLoginCredentials) => {
    isLoading.value = true;
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: credentials.email,
        password: credentials.password,
      });

      if (error) {
        toast.add({
          group: "userSignToastGroup",
          severity: "error",
          summary: t("form.message.loginFailed"),
          detail: error.message,
          life: 3000,
        });
        return;
      }

      toast.add({
        group: "userSignToastGroup",
        severity: "success",
        summary: t("form.message.loginSuccess"),
        life: 3000,
      });

      await checkSession();
    } catch (err) {
      toast.add({
        group: "userSignToastGroup",
        severity: "error",
        summary: t("form.message.loginFailed"),
        detail: String(err),
        life: 3000,
      });
    } finally {
      isLoading.value = false;
    }
  };

  const logOut = async () => {
    isLoading.value = true;
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        toast.add({
          group: "userSignToastGroup",
          severity: "error",
          summary: t("form.message.logoutFailed"),
          detail: error.message,
          life: 3000,
        });
        return;
      }
      await checkSession();
      toast.add({
        group: "userSignToastGroup",
        severity: "success",
        summary: t("form.message.logoutSuccess"),
        life: 3000,
      });
    } catch (err) {
      toast.add({
        group: "userSignToastGroup",
        severity: "error",
        summary: t("form.message.logoutFailed"),
        detail: String(err),
        life: 3000,
      });
    } finally {
      isLoading.value = false;
    }
  };

  return {
    isLoading,
    supabase,
    checkSession,
    session,
    sessionError,
    logWithPass,
    logOut,
  };
});
