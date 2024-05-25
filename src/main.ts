import { createApp } from 'vue';
import App from './App.vue';
import ElementPlus from 'element-plus';
import router from "./router.ts";
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import { createPinia } from "pinia";

import 'element-plus/dist/index.css';
import 'vue3-toastify/dist/index.css';
import './style.scss';

const pinia = createPinia();
const app = createApp(App);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

app
    .use(pinia)
    .use(ElementPlus)
    .use(router)
    .mount('#app')
