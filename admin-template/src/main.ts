import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
// import tailwin
import './styles/tailwind.css'

import router from './router'
import { createPinia } from 'pinia'
import 'element-plus/dist/index.css'
import ElementPlus from 'element-plus'
// import 'virtual:uno.css'


const app = createApp(App)
app.use(createPinia())
app.use(ElementPlus)
app.use(router)
app.mount('#app')