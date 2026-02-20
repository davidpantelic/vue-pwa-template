<script setup lang="ts">
import { zodResolver } from "@primevue/forms/resolvers/zod";
import { z } from "zod";
import { useUserSession } from "../stores/userSession";
import type { userLoginCredentials } from "@/types";

const { t, locale } = useI18n();
const profileDialogShow = ref<boolean>(false);
const userSessionStore = useUserSession();

const initialValues = ref<userLoginCredentials>({
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
    // console.log(e);

    await userSessionStore.logWithPass(e.values);
  }
};
</script>

<template>
  <Button
    icon="pi pi-user"
    :severity="userSessionStore.session ? 'primary' : 'secondary'"
    size="large"
    @click="profileDialogShow = true"
  />

  <Dialog v-model:visible="profileDialogShow" modal :header="$t('words.login')">
    <div v-if="userSessionStore.session" class="flex flex-col gap-3">
      <div class="font-medium">
        {{
          userSessionStore.session.user?.email ||
          userSessionStore.session.user?.id
        }}
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
          :icon="
            userSessionStore.isLoading
              ? 'pi pi-spin pi-spinner'
              : 'pi pi-sign-out'
          "
          @click="userSessionStore.logOut"
        />
      </div>
    </div>

    <Form
      v-if="!userSessionStore.session"
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
        :icon="
          userSessionStore.isLoading ? 'pi pi-spinner pi-spin' : 'pi pi-sign-in'
        "
        iconPos="right"
      />
    </Form>
  </Dialog>

  <Toast group="userSignToastGroup" position="bottom-right" />
</template>
