<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-list>
          <v-list-item
            v-for="conversation in conversations"
            :key="conversation.id"
            @click="openConversation(conversation.id)"
          >
            <v-list-item-avatar>
              <v-icon>mdi-account-circle</v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>{{ conversation.senderId === parseInt(userId) ? conversation.recipientNickname : conversation.senderNickname }}</v-list-item-title>
              <v-list-item-subtitle>{{ formatDate(conversation.lastMessageTimestamp) }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useConversationsStore } from '@/stores/conversations'

const conversationsStore = useConversationsStore()
const router = useRouter()
const route = router.currentRoute.value

const userId = route.params.id

const formatDate = (timestamp) => {
  const date = new Date(timestamp * 1000) // Convert from Unix timestamp (seconds) to milliseconds
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

const openConversation = (conversationId) => {
  router.push({ name: 'ConversationMessages', params: { id: conversationId }, query: { userId } })
}

onMounted(() => {
  conversationsStore.fetchConversations(userId)
})

const conversations = computed(() => conversationsStore.conversations)
</script>

<style scoped>
</style>
