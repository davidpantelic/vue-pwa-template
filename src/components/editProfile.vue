<script setup lang="ts">
import type { userCredentials } from "@/types";
import { zodResolver } from "@primevue/forms/resolvers/zod";
import { z } from "zod";
import { useUserSession } from "../stores/userSession";

const userSessionStore = useUserSession();
const { t, locale } = useI18n();
const toast = useToast();
const emit = defineEmits(["editCanceled"]);

const initialValues = ref<userCredentials["edit"]>({
  username: userSessionStore.session.user.user_metadata.display_name,
  email: userSessionStore.session.user.email,
});

const buildSchema = () =>
  z.object({
    username: z
      .string()
      .min(1, { message: t("form.validation.usernameRequired") })
      .max(10, { message: t("form.validation.usernameMaxLength") }),
    email: z.string().email({ message: t("form.validation.emailRequired") }),
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

    const success = await userSessionStore.updateUserData(e.values);
    if (!success && userSessionStore.clickCounter > 5) {
      toast.add({
        group: "resetPasswordRequestToastGroup",
        severity: "warn",
        summary: t("userEdit.editFailedSameData"),
        life: 6000,
      });
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

const onFormReset = () => {
  emit("editCanceled");
};
</script>

<template>
  <Form
    v-slot="$form"
    :initialValues
    :resolver="resolverRef"
    class="flex flex-col gap-4 w-full"
    @submit="onFormSubmit"
    @reset="onFormReset"
  >
    <InputGroup class="flex-wrap gap-y-1">
      <InputGroupAddon>
        <i class="pi pi-user"></i>
      </InputGroupAddon>

      <InputText
        name="username"
        id="username"
        type="text"
        :placeholder="t('form.fields.username')"
        fluid
      />
      <Message
        v-if="$form.username?.invalid"
        class="w-full"
        severity="error"
        size="small"
        variant="simple"
        >{{ $form.username.error.message }}</Message
      >
    </InputGroup>

    <InputGroup class="flex-wrap gap-y-1">
      <InputGroupAddon>
        <i class="pi pi-at"></i>
      </InputGroupAddon>

      <InputText
        name="email"
        id="email"
        type="email"
        placeholder="Email"
        fluid
      />
      <Message
        v-if="$form.email?.invalid"
        class="w-full"
        severity="error"
        size="small"
        variant="simple"
        >{{ $form.email.error.message }}</Message
      >
    </InputGroup>
    <div class="flex gap-2 flex-wrap [&>button]:grow">
      <Button
        type="reset"
        severity="danger"
        :label="t('words.cancel')"
        icon="pi pi-times"
        iconPos="right"
      />
      <Button
        type="submit"
        severity="primary"
        :label="t('words.save')"
        :icon="
          userSessionStore.isEditing ? 'pi pi-spinner pi-spin' : 'pi pi-save'
        "
        iconPos="right"
      />
    </div>
  </Form>
</template>
