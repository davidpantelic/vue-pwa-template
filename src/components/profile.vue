<script setup lang="ts">
import { zodResolver } from "@primevue/forms/resolvers/zod";
import { z } from "zod";

interface ProfileFormData {
  email: string;
  password: string;
}

const { t, locale } = useI18n();
const toast = useToast();
const profileDialogShow = ref<boolean>(false);
const isLoading = ref(false);
const supabase = useSupabaseClient();

const session = ref<any | null>(null);

const checkSession = async () => {
  try {
    const { data, error } = await supabase.auth.getSession();
    if (error) {
      console.error(error);
      session.value = null;
      return;
    }
    session.value = data.session ?? null;
  } catch (err) {
    console.error(err);
    session.value = null;
  }
};

onMounted(() => {
  checkSession();
});

const initialValues = ref<ProfileFormData>({
  email: "",
  password: "",
});

const buildSchema = () =>
  z.object({
    email: z.string().email({ message: t("form.validation.emailRequired") }),
    password: z
      .string()
      .min(1, { message: t("form.validation.passwordRequired") }),
  });

const resolverRef = ref(zodResolver(buildSchema()));

watch(
  () => locale.value,
  () => {
    resolverRef.value = zodResolver(buildSchema());
  },
);

const onFormSubmit = async (e: any): Promise<void> => {
  // e.originalEvent: Represents the native form submit event.
  // e.valid: A boolean that indicates whether the form is valid or not.
  // e.states: Contains the current state of each form field, including validity status.
  // e.errors: An object that holds any validation errors for the invalid fields in the form.
  // e.values: An object containing the current values of all form fields.
  // e.reset: A function that resets the form to its initial state.

  if (e.valid) {
    isLoading.value = true;

    // console.log(e);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: e.values.email,
        password: e.values.password,
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
      // profileDialogShow.value = false;
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
    profileDialogShow.value = false;
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
</script>

<template>
  <Button
    icon="pi pi-user"
    :severity="session ? 'primary' : 'secondary'"
    size="large"
    @click="profileDialogShow = true"
  />

  <Dialog v-model:visible="profileDialogShow" modal :header="$t('words.login')">
    <div v-if="session" class="flex flex-col gap-3">
      <div class="font-medium">
        {{ session.user?.email || session.user?.id }}
      </div>
      <div class="flex gap-2">
        <!-- <Button
          type="button"
          severity="secondary"
          :label="t('words.refresh')"
          @click="checkSession"
        /> -->
        <Button
          type="button"
          severity="danger"
          :label="t('words.logout')"
          :icon="isLoading ? 'pi pi-spin pi-spinner' : 'pi pi-sign-out'"
          @click="logOut"
        />
      </div>
    </div>

    <Form
      v-if="!session"
      v-slot="$form"
      :initialValues
      :resolver="resolverRef"
      @submit="onFormSubmit"
      class="flex flex-col gap-4 w-full sm:w-60"
    >
      <div class="flex flex-col gap-1">
        <InputText
          name="email"
          id="email"
          type="email"
          placeholder="Email"
          fluid
        />
        <Message
          v-if="$form.email?.invalid"
          severity="error"
          size="small"
          variant="simple"
          >{{ $form.email.error.message }}</Message
        >
      </div>
      <div class="flex flex-col gap-1">
        <Password
          name="password"
          id="password"
          :placeholder="t('form.fields.password')"
          :feedback="false"
          toggleMask
          fluid
        />
        <Message
          v-if="$form.password?.invalid"
          severity="error"
          size="small"
          variant="simple"
        >
          <ul class="my-0 flex flex-col gap-1">
            <li v-for="(error, index) of $form.password.errors" :key="index">
              {{ error.message }}
            </li>
          </ul>
        </Message>
      </div>
      <Button
        type="submit"
        severity="secondary"
        :label="t('words.login')"
        :icon="isLoading ? 'pi pi-spinner pi-spin' : 'pi pi-sign-in'"
        iconPos="right"
      />
    </Form>
  </Dialog>

  <Toast group="userSignToastGroup" position="bottom-right" />
</template>
