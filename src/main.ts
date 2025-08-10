import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import { createApp, onMounted } from "vue";

import Vue3Toastify, { type ToastContainerOptions } from "vue3-toastify";
import App from "./App.vue";
import router from "./router";
import { useAuthStore } from "./stores/user-store";
import "./style.css";

const app = createApp(App);
const pinia = createPinia();

//Store
app.use(pinia);
pinia.use(piniaPluginPersistedstate);

//Router
app.use(router);
//Snackbar
app.use(Vue3Toastify, {
  autoClose: 5000, // Customize auto-close duration
  position: "top-right", // Customize toast position
  hideProgressBar: false, // Optionally, show the progress bar
  closeOnClick: true, // Click to close toast
  pauseOnHover: true, // Pause on hover
  draggable: true, // Allow dragging the toast
  progress: undefined, // Control progress bar
} as ToastContainerOptions);

app.mount("#app");

onMounted(() => {
  const authStore = useAuthStore();

  const accessToken = localStorage.getItem("auth_token");
  if (accessToken) {
    // Parse user info from localStorage
    const userInfo = JSON.parse(localStorage.getItem("user_info") || "null");

    if (userInfo) {
      const refreshToken = localStorage.getItem("refresh_token") || "";

      // If we have all necessary data, log the user in
      authStore.login({
        accessToken,
        refreshToken,
        user: userInfo,
      });
    }
  }
});
