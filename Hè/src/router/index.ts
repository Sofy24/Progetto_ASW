import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../pages/HomePage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {

      path: '/graph',
      name: 'graph',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../pages/GraphPage.vue')
    },
    {
      path: '/classifica',
      name: 'leaderboard',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/LeaderboardView.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import ('../pages/RegisterPage.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import ('../pages/LoginPage.vue')
    },
    {
      path: '/notification',
      name: 'notification',
      component: () => import ('../pages/NotificationPage.vue')
    },
    {
      path: '/personal',
      name: 'personal',
      component: () => import ('../pages/PersonalPage.vue')
    }
  ]
})

export default router
