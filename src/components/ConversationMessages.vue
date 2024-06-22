<template>
  <v-container>
    <v-row class="d-flex justify-space-between align-center">
      <v-col cols="6">
        <div>{{ conversation.senderId === parseInt(userId) ? conversation.recipientNickname : conversation.senderNickname }}</div>
      </v-col>
      <v-col cols="6" class="text-right">
        <div>Last message {{ formatDate(conversation.lastMessageTimestamp) }}</div>
      </v-col>
    </v-row>
    <v-divider></v-divider>
    <v-row>
      <v-col cols="12">
        <v-list>
          <v-list-item
            v-for="message in messages"
            :key="message.id"
          >
            <v-list-item-content :class="message.authorId == userId ? 'sent' : 'received'">
              <v-list-item-title>{{ getAuthorName(message.authorId) }}</v-list-item-title>
              <v-list-item-subtitle>{{ message.body }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-text-field
          v-model="newMessage"
          label="Send message"
          @keyup.enter="sendMessage"
        ></v-text-field>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useConversationsStore } from '@/stores/conversations'

const conversationsStore = useConversationsStore()
const route = useRoute()

const conversationId = route.params.id

const userId = ref(parseInt(route.query.userId)).value
const newMessage = ref('')

const formatDate = (timestamp) => {
  const date = new Date(timestamp * 1000) // Convert from Unix timestamp (seconds) to milliseconds
  return date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const getAuthorName = (authorId) => {
  const user = users.value.find(user => user.id === authorId)
  return user ? user.nickname : 'Unknown'
}

const sendMessage = async () => {
  if (newMessage.value.trim() !== '') {
    await conversationsStore.sendMessage(conversationId, userId, newMessage.value)
    newMessage.value = ''
    await conversationsStore.fetchMessages(conversationId)
  }
}

onMounted(() => {
  conversationsStore.fetchMessages(conversationId)
  conversationsStore.fetchUsers()
})

const conversation = computed(() => conversationsStore.conversations.find(conv => conv.id === parseInt(conversationId)))
const messages = computed(() => conversationsStore.messages)
const users = computed(() => conversationsStore.users)
</script>

<style scoped>
.sent {
  background-color: #e0f7fa;
  text-align: right
}

.received {
  background-color: #f5f5f5;
  text-align: left
}
</style>
