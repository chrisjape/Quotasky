import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import AuthView from '../views/AuthView.vue'
import DashboardView from '../views/DashboardView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'auth',
      component: AuthView
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView,
      meta: { requiresAuth: true }
    }
  ],
})

router.beforeEach(async (to) => {
  const authStore = useAuthStore()
  await authStore.fetchUser()

  if (to.meta.requiresAuth && !authStore.user) {
    return { name: 'auth' }
  }

  if (to.name === 'auth' && authStore.user) {
    return { name: 'dashboard' }
  }
})

export default router