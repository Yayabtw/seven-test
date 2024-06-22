<template>
  <v-container>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="6">
        <v-select
          v-model="selectedUser"
          :items="users"
          item-title="nickname"
          item-value="id"
          label="Select User to Start Conversation"
        ></v-select>
        <v-text-field
          v-model="initialMessage"
          label="Initial Message"
        ></v-text-field>
        <v-btn :disabled="!selectedUser || !initialMessage" color="primary" @click="createConversation">Create</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useConversationsStore } from '@/stores/conversations'

const conversationsStore = useConversationsStore()
const router = useRouter()
const route = useRoute()

const userId = parseInt(route.params.userId)
const selectedUser = ref(null)
const initialMessage = ref('')

const users = computed(() => conversationsStore.users.filter(user => user.id !== userId))

const createConversation = async () => {
  if (selectedUser.value && initialMessage.value) {
    const currentUser = conversationsStore.users.find(user => user.id === userId)
    const recipient = conversationsStore.users.find(user => user.id === selectedUser.value)

    // Debugging logs
    console.log('Current User:', currentUser)
    console.log('Selected User:', selectedUser.value)
    console.log('Recipient:', recipient)

    if (!currentUser) {
      console.error('Current user not found')
      return
    }

    if (!recipient) {
      console.error('Recipient user not found')
      return
    }

    try {
      await conversationsStore.addConversation(
        currentUser.id,
        recipient.id,
        recipient.nickname,
        currentUser.nickname,
        initialMessage.value
      )
      router.push({ name: 'ConversationsList', params: { id: userId } })
    } catch (error) {
      console.error('Error creating conversation:', error)
    }
  }
}

onMounted(() => {
  conversationsStore.fetchUsers()
})
</script>
