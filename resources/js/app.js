import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import vuetify from './vuetify';
import axios from 'axios';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';


const app = createApp(App);

const baseUrl = import.meta.env.APP_URL;
axios.defaults.baseURL = baseUrl;
app.config.globalProperties.$axios = axios;
app.config.globalProperties.$toast = toast;

app.use(router);
app.use(vuetify);

app.mount('#app');
