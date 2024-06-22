import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import { createVuetify } from 'vuetify'
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader

const pinia = createPinia()
const vuetify = createVuetify()

createApp(App).use(router).use(pinia).use(vuetify).mount('#app')
