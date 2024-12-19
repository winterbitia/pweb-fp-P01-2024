import { createRouter, createWebHistory } from 'vue-router'
import LandingView from '@/views/LandingView.vue'
import AdminItems from '@/views/AdminItems.vue'
import AdminView from '@/views/AdminView.vue'
import OperatorView from '@/views/OperatorView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Landing',
      component: LandingView,
    },
    {
      path: '/admin',
      name: 'Admin',
      component: AdminView,
      children: [
        {
          path: '',
          component: AdminItems
        },
        {
          path: 'all-operators',
          component: AdminItems
        }
      ]
    },
    {
      path: '/operator',
      name: 'Operator',
      component: OperatorView,
    },
  ],
})

export default router
