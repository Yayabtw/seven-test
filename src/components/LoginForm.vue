<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-select
          clearable
          v-model="selectedUser"
          :items="users"
          item-title="nickname"
          item-value="id"
          label="Select user"
          variant="outlined"
          return-object
        ></v-select>
        <v-btn :disabled="!selectedUser" @click="login">Login</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useConversationsStore } from '@/stores/conversations'

const conversationsStore = useConversationsStore()
const router = useRouter()
const selectedUser = ref(null)

const login = () => {
  if (selectedUser.value) {
    router.push(`/conversations/${selectedUser.value.id}`)
  }
}

onMounted(() => {
  conversationsStore.fetchUsers()
})

const users = computed(() => conversationsStore.users)

</script>

<style scoped>
</style>
