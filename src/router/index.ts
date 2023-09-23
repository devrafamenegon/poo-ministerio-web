import { createRouter, createWebHistory } from 'vue-router'
import MinisteriosView from '../views/MinisteriosView.vue'
import SecretariasView from '../views/SecretariasView.vue'
import MinistrosView from '../views/MinistrosView.vue'
import PresidentesView from '../views/PresidentesView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/ministerios',
      name: 'MinisteriosView',
      component: MinisteriosView
    },
    {
      path: '/secretarias',
      name: 'SecretariasView',
      component: SecretariasView
    },
    {
      path: '/ministros',
      name: 'MinistrosView',
      component: MinistrosView
    },
    {
      path: '/presidentes',
      name: 'PresidentesView',
      component: PresidentesView
    },
  ]
})

export default router
