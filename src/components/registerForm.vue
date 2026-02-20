<script setup lang="ts">
import type { userLoginCredentials } from "@/types";
import { zodResolver } from "@primevue/forms/resolvers/zod";
import { z } from "zod";
import { useUserSession } from "../stores/userSession";

const userSessionStore = useUserSession();
const { t, locale } = useI18n();
const emit = defineEmits(["successfulRegistration"]);

const initialValues = ref<userLoginCredentials>({
  email: "",
  password: "",
  passwordConfirm: "",
});

const buildSchema = () =>
  z
    .object({
      email: z.string().email({ message: t("form.validation.emailRequired") }),
      password: z
        .string()
        .min(1, { message: t("form.validation.passwordRequired") })
        .min(6, { message: t("form.validation.passwordMinLength") }),
      passwordConfirm: z
        .string()
        .min(1, { message: t("form.validation.passwordConfirmRequired") }),
    })
    .superRefine(({ password, passwordConfirm }, ctx) => {
      if (password !== passwordConfirm) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["passwordConfirm"],
          message: t("form.validation.passwordMismatch"),
        });
      }
    });

const onFormSubmit = async (e: any): Promise<void> => {
  // e.originalEvent: Represents the native form submit event.
  // e.valid: A boolean that indicates whether the form is valid or not.
  // e.states: Contains the current state of each form field, including validity status.
  // e.errors: An object that holds any validation errors for the invalid fields in the form.
  // e.values: An object containing the current values of all form fields.
  // e.reset: A function that resets the form to its initial state.

  if (e.valid) {
    // console.log(e);

    const isSuccess = await userSessionStore.signUpNewUser(e.values);
    if (isSuccess) {
      e.reset();
      emit("successfulRegistration");
    }
  }
};

const resolverRef = ref(zodResolver(buildSchema()));

watch(
  () => locale.value,
  () => {
    resolverRef.value = zodResolver(buildSchema());
  },
);
</script>

<template>
  <Form
    v-slot="$form"
    :initialValues
    :resolver="resolverRef"
    @submit="onFormSubmit"
    class="flex flex-col gap-4 w-full sm:w-72"
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
    <div class="flex flex-col gap-1">
      <Password
        name="passwordConfirm"
        id="passwordConfirm"
        :placeholder="t('form.fields.passwordConfirm')"
        :feedback="false"
        toggleMask
        fluid
      />
      <Message
        v-if="$form.passwordConfirm?.invalid"
        severity="error"
        size="small"
        variant="simple"
      >
        <ul class="my-0 flex flex-col gap-1">
          <li
            v-for="(error, index) of $form.passwordConfirm.errors"
            :key="index"
          >
            {{ error.message }}
          </li>
        </ul>
      </Message>
    </div>
    <Button
      type="submit"
      severity="secondary"
      :label="t('words.register')"
      :icon="
        userSessionStore.isLoading ? 'pi pi-spinner pi-spin' : 'pi pi-sign-in'
      "
      iconPos="right"
    />
  </Form>
</template>
