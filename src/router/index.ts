import { createRouter, createWebHistory } from 'vue-router'
import MinisteriosView from '../views/MinisteriosView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: MinisteriosView
    },
  ]
})

export default router
