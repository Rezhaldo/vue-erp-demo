import { createApp } from 'vue';
import Vue3Toastify, { type ToastContainerOptions } from "vue3-toastify";
import App from './App.vue';
import router from './router';
import './style.css';

const app = createApp(App)

//Router
app.use(router)
//Snackbar
app.use(Vue3Toastify, {
  autoClose: 3000,
  position: "top-right",
} as ToastContainerOptions);

app.mount('#app')
