import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import VueDiff from 'vue-diff';
import 'vue-diff/dist/index.css';
import { VueSpinnersPlugin } from 'vue3-spinners';
import Toast, { POSITION } from "vue-toastification";
import "vue-toastification/dist/index.css";

const app = createApp(App)

const options = {
    position: POSITION.TOP_RIGHT
};

app.use(Toast, options);
app.use(VueSpinnersPlugin)
app.use(createPinia())
app.use(router)
app.use(VueDiff);

app.mount('#app')
