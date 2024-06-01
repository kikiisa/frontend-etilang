import { createApp } from 'vue'
import './style.css'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min.js"
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
createApp(App)

.use(router)
.use(createPinia())
.mount('#app')
