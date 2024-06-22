import { defineStore } from 'pinia'
import axios from 'axios'

export const useConversationsStore = defineStore('conversations', {
  state: () => ({
    conversations: [],
    messages: [],
    users: []
  }),
  actions: {
    async fetchConversations (userId) {
      try {
        const response = await axios.get(`http://localhost:3005/conversations/${userId}`)
        this.conversations = response.data
      } catch (error) {
        console.error('Error fetching conversations:', error)
      }
    },
    async fetchMessages (conversationId) {
      try {
        const response = await axios.get(`http://localhost:3005/messages/${conversationId}`)
        this.messages = response.data
      } catch (error) {
        console.error('Error fetching messages:', error)
      }
    },
    async fetchUsers () {
      try {
        const response = await axios.get('http://localhost:3005/users')
        this.users = response.data
      } catch (error) {
        console.error('Error fetching users:', error)
      }
    },
    async sendMessage (conversationId, authorId, body) {
      try {
        const timestamp = Math.floor(Date.now() / 1000)
        const message = {
          conversationId,
          authorId,
          body,
          timestamp
        }
        await axios.post('http://localhost:3005/messages/', message)
        await this.fetchMessages(conversationId)
      } catch (error) {
        console.error('Error sending message:', error)
      }
    },
    async getAuthorName (authorId) {
      try {
        const response = await axios.get(`http://localhost:3005/users/${authorId}`)
        return response.data.name
      } catch (error) {
        console.error('Error fetching author name:', error)
      }
    }
  }
})
