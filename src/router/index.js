import { createRouter, createWebHistory } from 'vue-router'
import ConversationsList from '@/components/ConversationsList.vue'

const routes = [
  {
    path: '/conversations/:id',
    name: 'ConversationsList',
    component: ConversationsList
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
