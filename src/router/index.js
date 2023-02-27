import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView/index.vue'
import CredentialsView from '../views/CredentialsView/index.vue'
import FeedbacksView from '../views/FeedbacksView/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },{
      path: '/credentials',
      name: 'credentials',
      component: CredentialsView,
      meta: {
        hasAuth: true
      }
    },{
      path: '/feedbacks',
      name: 'feedbacks',
      component: FeedbacksView,
      meta: {
        hasAuth: true
      }
    },{
      path: '/:pathMatch(.*)*',
      redirect: { name: 'home'}
    }
  ]
})

export default router
