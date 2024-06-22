import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import { createVuetify } from 'vuetify'
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader

const pinia = createPinia()
const vuetify = createVuetify()

const app = createApp(App)
app.use(pinia)
app.use(vuetify)
app.mount('#app')
