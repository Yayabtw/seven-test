<template>
  <v-container>
    <v-row class="d-flex justify-space-between align-center">
      <v-col cols="6">
        <div v-if="conversation">{{ conversation.senderId === userId ? conversation.recipientNickname : conversation.senderNickname }}</div>
      </v-col>
      <v-col cols="6" class="text-right">
        <div v-if="conversation">Last message {{ formatDate(conversation.lastMessageTimestamp) }}</div>
      </v-col>
    </v-row>
    <v-divider></v-divider>
    <v-row>
      <v-col cols="12">
        <div class="chat-container">
          <div
            v-for="message in messages"
            :key="message.id"
            :class="{'chat-bubble': true, 'sent': message.authorId == userId, 'received': message.authorId != userId}"
          >
            <div class="chat-bubble-content">
              <div class="chat-author">{{ getAuthorName(message.authorId) }}</div>
              <div class="chat-message">{{ message.body }}</div>
              <div class="chat-timestamp">{{ formatDate(message.timestamp) }}</div>
            </div>
          </div>
        </div>
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
const userId = ref(parseInt(route.query.userId))
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
  if (authorId === userId.value) {
    return '' // or use the current user's nickname
  }
  const user = users.value.find(user => user.id === authorId)
  return user ? user.nickname : 'Unknown'
}

const sendMessage = async () => {
  if (newMessage.value.trim() !== '') {
    await conversationsStore.postMessage(conversationId, userId.value, newMessage.value)
    newMessage.value = ''
    await conversationsStore.fetchMessages(conversationId) // Refresh messages after sending a new one
  }
}

onMounted(async () => {
  await conversationsStore.fetchConversations(userId.value) // Fetch conversations to get the latest data
  await conversationsStore.fetchMessages(conversationId)
  await conversationsStore.fetchUsers()
})

const conversation = computed(() => conversationsStore.conversations.find(conv => conv.id === parseInt(conversationId)))
const messages = computed(() => conversationsStore.messages)
const users = computed(() => conversationsStore.users)
</script>

<style scoped>
.chat-container {
  display: flex;
  flex-direction: column;
  padding: 10px;
}

.chat-bubble {
  max-width: 80%;
  padding: 10px;
  margin: 5px;
  border-radius: 10px;
  position: relative;
  display: inline-block;
  word-wrap: break-word;
  overflow-wrap: break-word;
}

.sent {
  background-color: #e0f7fa;
  align-self: flex-end;
  text-align: right;
}

.received {
  background-color: #f5f5f5;
  align-self: flex-start;
  text-align: left;
}

.chat-bubble:before {
  content: "";
  position: absolute;
  bottom: 0;
  width: 0;
  height: 0;
  border-style: solid;
}

.sent:before {
  right: -10px;
  border-width: 10px 0 10px 10px;
  border-color: transparent transparent transparent #e0f7fa;
}

.received:before {
  left: -10px;
  border-width: 10px 10px 10px 0;
  border-color: transparent #f5f5f5 transparent transparent;
}

.chat-bubble-content {
  word-wrap: break-word;
  overflow-wrap: break-word;
}

.chat-author {
  font-weight: bold;
}

.chat-message {
  margin-top: 5px;
}

.chat-timestamp {
  font-size: 0.8em;
  color: gray;
  margin-top: 5px;
}

@media (max-width: 600px) {
  .chat-bubble {
    max-width: 90%; /* Increase max-width for small screens */
    font-size: 0.9em; /* Adjust font size for readability */
  }
}
</style>
