import { createRouter, createWebHistory } from 'vue-router'
import LoginView from "../views/LoginView.vue"
import HomeView from "../views/HomeView.vue"
import DetailView from "../views/DetailView.vue"
import ProfileView from "../views/ProfileView.vue"
import HistoryView from "../views/HistoryView.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginView
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView
    },
    {
      path: '/detail/:id/category/:category',
      name: 'detail',
      component: DetailView,
    },
    {
      path:'/profile',
      name:'profile',
      component:ProfileView
    },
    {
      path:"/history",
      name:"history",
      component:HistoryView
    }
  ]
})
export default router
 