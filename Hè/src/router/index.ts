import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router';


import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

const requireAuth = (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
  const token = localStorage.getItem('token');
  
  if (token != null) {
    // User is authorized, proceed with navigation
    next();
  } else {
    // User is not authorized, redirect to login page or show an error message
    next('/login');
  }
};

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('../pages/HomePage.vue')
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../pages/AboutPage.vue')
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
      component: () => import ('../pages/PersonalPage.vue'),
      beforeEnter: requireAuth
    },
    {
      path: '/userGraph',
      name: 'userGraph',
      component: () => import ('../pages/UserGraphPage.vue'),
      beforeEnter: requireAuth
    },
    {
      path: '/report/:year/:month',
      name: 'report',
      component: () => import ('../pages/ReportPage.vue'),
      props: (route: RouteLocationNormalized) => ({
        year: Number(route.params.year),
        month: Number(route.params.month),
      }),
      beforeEnter: requireAuth
    }
  ]
})

export default router
