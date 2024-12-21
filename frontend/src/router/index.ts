import { createRouter, createWebHistory } from 'vue-router'
import { defineAsyncComponent } from 'vue'
import AdminOperators from '@/views/AdminOperators.vue'
import AdminBorrowSummary from '@/views/AdminBorrowSummary.vue'

const WelcomeView = defineAsyncComponent(() => import('../views/WelcomeView.vue'))
const LandingView = defineAsyncComponent(() => import('../views/LandingView.vue'))
const AdminItems = defineAsyncComponent(() => import('../views/AdminItems.vue'))
const AdminView = defineAsyncComponent(() => import('../views/AdminView.vue'))
const OperatorView = defineAsyncComponent(() => import('../views/OperatorView.vue'))
const RulesView = defineAsyncComponent(() => import('../views/RulesView.vue')) // Import RulesView

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Welcome',
      component: WelcomeView,
    },
    {
      path: '/login',
      name: 'Login',
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
          component: AdminOperators
        },
        {
          path: 'summary',
          component: AdminBorrowSummary
        }
      ]
    },
    {
      path: '/operator',
      name: 'Operator',
      component: OperatorView,
    },
    {
      path: '/rules', // Add new route for rules
      name: 'Rules',
      component: RulesView,
    },
  ],
})

export default router