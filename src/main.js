import { createApp } from 'vue'
import App from './App.vue'
import '@/styles/reset.css'
import 'uno.css'
import '@/styles/global.scss'
import { router } from './router'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const app = createApp(App)
app.use(router)

const pinia = createPinia()
/**
 * 持久化
 * 文档: https://prazdevs.github.io/pinia-plugin-persistedstate/zh/guide/
 */
pinia.use(piniaPluginPersistedstate)
app.use(pinia)

app.mount('#app')
