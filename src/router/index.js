import { createWebHistory, createRouter } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
const routes = [
  { path: '/', component: HomeView },
  { path: '/home', component: HomeView },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router