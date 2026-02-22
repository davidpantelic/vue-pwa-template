import type { userLoginCredentials } from "@/types";

export const useUserSession = defineStore("userSession", () => {
  const isLoading = ref(false);
  const isResetPasswordRequestLoading = ref(false);
  const isLoggingOut = ref(false);
  const supabase = useSupabaseClient();
  const session = ref<any | null>(null);
  const sessionError = ref<any | null>(null);
  const { t, locale } = useI18n();
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

  const signUpNewUser = async (
    credentials: userLoginCredentials,
  ): Promise<boolean> => {
    isLoading.value = true;
    try {
      const { data, error } = await supabase.auth.signUp({
        email: credentials.email,
        password: credentials.password,
        options: {
          data: { lang: locale.value }, // "en" / "sr"
          emailRedirectTo: `${window.location.origin}/auth-confirmation`,
        },
      });

      console.log(data);

      if (error) {
        const errorTranslated = computed(() => {
          if (error.code === "over_email_send_rate_limit")
            return t("form.message.registerFailedEmailRateLimit");
        });

        toast.add({
          group: "userSignToastGroup",
          severity: "warn",
          summary: t("form.message.registerFailed"),
          detail: errorTranslated,
          life: 3000,
        });
        return false;
      }

      toast.add({
        group: "userSignToastGroup",
        severity: "success",
        summary: t("form.message.registerSuccess"),
        detail: t("form.message.registerSuccessMessage"),
        life: 8000,
      });
      return true;
    } catch (err) {
      toast.add({
        group: "userSignToastGroup",
        severity: "error",
        summary: t("form.message.registerFailed"),
        detail: String(err),
        life: 3000,
      });
      return false;
    } finally {
      isLoading.value = false;
    }
  };

  const updateUserLang = async (): Promise<boolean> => {
    if (!session.value?.user) return false;
    try {
      const { error } = await supabase.auth.updateUser({
        data: {
          lang: locale.value,
        },
      });
      if (error) {
        console.warn("Failed to update user language metadata", error);
        return false;
      }
      return true;
    } catch (error) {
      console.warn("Failed to update user language metadata", error);
      return false;
    }
  };

  const logWithPass = async (
    credentials: userLoginCredentials,
  ): Promise<boolean> => {
    isLoading.value = true;
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: credentials.email,
        password: credentials.password,
      });

      if (error) {
        const errorTranslated = computed(() => {
          if (error.code === "invalid_credentials")
            return t("form.message.loginFailedWrongCredentials");

          if (error.code === "email_not_confirmed")
            return t("form.message.loginFailedUnverifiedEmail");
        });

        toast.add({
          group: "userSignToastGroup",
          severity: "warn",
          summary: t("form.message.loginFailed"),
          detail: errorTranslated,
          life: 5000,
        });
        return false;
      }

      toast.add({
        group: "userSignToastGroup",
        severity: "success",
        summary: t("form.message.loginSuccess"),
        life: 3000,
      });
      return true;

      await checkSession();
    } catch (err) {
      toast.add({
        group: "userSignToastGroup",
        severity: "error",
        summary: t("form.message.loginFailed"),
        detail: String(err),
        life: 3000,
      });
      return false;
    } finally {
      isLoading.value = false;
    }
  };

  const logOut = async (
    logOutScope: "local" | "global" | "others" | undefined = "local",
    options?: { silent?: boolean },
  ) => {
    isLoggingOut.value = true;
    const silent = options?.silent === true;
    try {
      // If you DON'T need "logout all devices", keep local scope:
      const { error } = await supabase.auth.signOut({ scope: logOutScope }); // local

      if (error) {
        // If session is already gone server-side, still treat as success
        if (isSessionAlreadyGone(error)) {
          session.value = null;
          sessionError.value = null;

          if (!silent) {
            toast.add({
              group: "userSignToastGroup",
              severity: "success",
              summary: t("form.message.logoutSuccess"),
              life: 3000,
            });
          }
          return;
        }

        if (!silent) {
          toast.add({
            group: "userSignToastGroup",
            severity: "error",
            summary: t("form.message.logoutFailed"),
            detail: error.message,
            life: 3000,
          });
        }
        return;
      }

      // Normal success
      session.value = null;
      sessionError.value = null;

      if (!silent) {
        toast.add({
          group: "userSignToastGroup",
          severity: "success",
          summary: t("form.message.logoutSuccess"),
          life: 3000,
        });
      }
    } catch (err: any) {
      // Same: treat missing session as success
      if (isSessionAlreadyGone(err)) {
        session.value = null;
        sessionError.value = null;

        if (!silent) {
          toast.add({
            group: "userSignToastGroup",
            severity: "success",
            summary: t("form.message.logoutSuccess"),
            life: 3000,
          });
        }
        return;
      }

      if (!silent) {
        toast.add({
          group: "userSignToastGroup",
          severity: "error",
          summary: t("form.message.logoutFailed"),
          detail: String(err),
          life: 3000,
        });
      }
    } finally {
      isLoggingOut.value = false;
    }
  };

  const initAuthListener = () => {
    if (unsub) return;

    const { data } = supabase.auth.onAuthStateChange((_event, newSession) => {
      if (!newSession) {
        session.value = null;
        sessionError.value = null;
        return;
      }

      // Do not await inside auth callback
      setTimeout(() => {
        void checkSession();
      }, 0);
    });

    unsub = () => data.subscription.unsubscribe();
  };

  const resetPasswordRequest = async () => {
    isResetPasswordRequestLoading.value = true;

    // Non-blocking best effort: keep email language metadata updated for templates.
    void updateUserLang();

    try {
      const email = session.value?.user?.email;
      if (!email) {
        toast.add({
          group: "resetPasswordRequestToastGroup",
          severity: "warn",
          summary: t("resetPasswordRequest.requestFailTitle"),
          detail: t("resetPasswordRequest.requestFailMessage"),
          life: 5000,
        });
        return;
      }

      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/password-reset`,
      });

      if (error) {
        console.error(error);

        toast.add({
          group: "resetPasswordRequestToastGroup",
          severity: "warn",
          summary: t("resetPasswordRequest.requestFailTitle"),
          detail: t("resetPasswordRequest.requestFailMessage"),
          life: 5000,
        });

        return;
      }

      toast.add({
        group: "resetPasswordRequestToastGroup",
        severity: "success",
        summary: t("resetPasswordRequest.requestTitle"),
        detail: t("resetPasswordRequest.requestMessage"),
        life: 10000,
      });
    } catch (err) {
      console.error(err);
    } finally {
      isResetPasswordRequestLoading.value = false;
    }
  };

  const updateUserPassword = async (new_password: string): Promise<boolean> => {
    isLoading.value = true;

    try {
      const { error } = await supabase.auth.updateUser({
        password: new_password,
        data: {
          lang: locale.value,
        },
      });

      if (error) {
        console.error(error);

        if (error.code == "same_password") {
          toast.add({
            group: "resetPasswordRequestToastGroup",
            severity: "warn",
            summary: t("resetPasswordRequest.failedChangeTitle"),
            detail: t("resetPasswordRequest.failedChangeText"),
            life: 6000,
          });
        }

        return false;
      }

      toast.add({
        group: "resetPasswordRequestToastGroup",
        severity: "success",
        summary: t("resetPasswordRequest.successfulChange"),
        detail: t("resetPasswordRequest.successfulChangeText"),
        life: 6000,
      });
      return true;
    } catch (err) {
      console.error(err);
      return false;
    } finally {
      isLoading.value = false;
    }
  };

  return {
    isLoading,
    isResetPasswordRequestLoading,
    isLoggingOut,
    supabase,
    checkSession,
    session,
    sessionError,
    signUpNewUser,
    logWithPass,
    logOut,
    initAuthListener,
    resetPasswordRequest,
    updateUserPassword,
  };
});
