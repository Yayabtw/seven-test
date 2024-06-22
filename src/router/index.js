import { createRouter, createWebHistory } from 'vue-router'
import ConversationsList from '@/components/ConversationsList.vue'
import ConversationMessages from '@/components/ConversationMessages.vue'
import Login from '@/components/LoginForm.vue'

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/conversations/:id',
    name: 'ConversationsList',
    component: ConversationsList
  },
  {
    path: '/conversation/:id',
    name: 'ConversationMessages',
    component: ConversationMessages
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
