import { defineStore } from 'pinia'
import axios from 'axios'

export const useConversationsStore = defineStore('conversations', {
  state: () => ({
    conversations: []
  }),
  actions: {
    async fetchConversations (id) {
      try {
        const response = await axios.get(`http://localhost:3005/conversations/${id}`)
        this.conversations = response.data
      } catch (error) {
        console.error('Error fetching conversations:', error)
      }
    }
  }
})
