import "./assets/base.css";
import "./assets/style.scss";
import "primeicons/primeicons.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import { createHead } from "@unhead/vue/client";
import PrimeVue from "primevue/config";
import { PrimeVueCustomPreset } from "../vite/prime-vue-custom-preset.ts";
import ToastService from "primevue/toastservice";
import ConfirmationService from "primevue/confirmationservice";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);
const head = createHead();

app.use(createPinia());
app.use(router);
app.use(head);

app.use(PrimeVue, {
  theme: {
    preset: PrimeVueCustomPreset,
    options: {
      darkModeSelector: ".dark-mode",
    },
  },
});
app.use(ToastService);
app.use(ConfirmationService);

app.mount("#app");
