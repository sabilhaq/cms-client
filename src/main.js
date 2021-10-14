import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import api from '../services/api'

createApp(App).use(router, api).mount('#app')
