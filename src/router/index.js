import { createRouter, createWebHistory } from 'vue-router'
import ConversationsList from '@/components/ConversationsList.vue'
import ConversationMessages from '@/components/ConversationMessages.vue'
import Login from '@/components/LoginForm.vue'
import ConversationForm from '@/components/ConversationForm.vue'

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
  },
  {
    path: '/conversation/new/:userId',
    name: 'ConversationForm',
    component: ConversationForm
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
