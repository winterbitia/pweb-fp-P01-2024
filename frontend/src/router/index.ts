import { createRouter, createWebHistory } from 'vue-router'
import Landing from '@/components/Landing.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Landing',
      component: Landing,
    },
  ],
})

export default router
