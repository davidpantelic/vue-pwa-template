import type { userLoginCredentials } from "@/types";

export const useUserSession = defineStore("userSession", () => {
  const isLoading = ref(false);
  const supabase = useSupabaseClient();
  const session = ref<any | null>(null);
  const sessionError = ref<any | null>(null);
  const { t } = useI18n();
  const toast = useToast();
  let unsub: (() => void) | null = null;

  function isSessionAlreadyGone(err: any) {
    const code = err?.code ?? err?.error?.code;
    const msg = String(err?.message ?? err);
    return (
      code === "session_not_found" ||
      msg.includes("session_not_found") ||
      msg.includes("Auth session missing")
    );
  }

  const checkSession = async () => {
    try {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.error(error);
        session.value = null;
        sessionError.value = error;
        return;
      }

      // If there's a session locally, confirm it's valid on server
      if (data.session) {
        const { data: userRes, error: userErr } = await supabase.auth.getUser();
        if (userErr || !userRes?.user) {
          session.value = null;
          sessionError.value = userErr ?? null;
          return;
        }
      }

      session.value = data.session ?? null;
      sessionError.value = null;
    } catch (err) {
      console.error(err);
      session.value = null;
      sessionError.value = err;
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
      // If you DON'T need "logout all devices", keep local scope:
      const { error } = await supabase.auth.signOut({ scope: "local" }); // local

      if (error) {
        // If session is already gone server-side, still treat as success
        if (isSessionAlreadyGone(error)) {
          session.value = null;
          sessionError.value = null;

          toast.add({
            group: "userSignToastGroup",
            severity: "success",
            summary: t("form.message.logoutSuccess"),
            life: 3000,
          });
          return;
        }

        toast.add({
          group: "userSignToastGroup",
          severity: "error",
          summary: t("form.message.logoutFailed"),
          detail: error.message,
          life: 3000,
        });
        return;
      }

      // Normal success
      session.value = null;
      sessionError.value = null;

      toast.add({
        group: "userSignToastGroup",
        severity: "success",
        summary: t("form.message.logoutSuccess"),
        life: 3000,
      });
    } catch (err: any) {
      // Same: treat missing session as success
      if (isSessionAlreadyGone(err)) {
        session.value = null;
        sessionError.value = null;

        toast.add({
          group: "userSignToastGroup",
          severity: "success",
          summary: t("form.message.logoutSuccess"),
          life: 3000,
        });
        return;
      }

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

  const initAuthListener = () => {
    if (unsub) return;
    const { data } = supabase.auth.onAuthStateChange((_event, newSession) => {
      session.value = newSession;
      sessionError.value = null;
    });
    unsub = () => data.subscription.unsubscribe();
  };

  return {
    isLoading,
    supabase,
    checkSession,
    session,
    sessionError,
    logWithPass,
    logOut,
    initAuthListener,
  };
});
