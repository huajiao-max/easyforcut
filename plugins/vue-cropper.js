import { defineNuxtPlugin } from "#app";
import "vue-cropper/dist/index.css";
import VueCropper from "vue-cropper";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(VueCropper);
});
