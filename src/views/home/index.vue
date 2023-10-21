<template>
  <div v-if="userStore.userInfo?.id">
    <img :src="userStore.userInfo.avatar" alt="avatar" />
    <p class="mt-12">欢迎您， {{ userStore.username }}</p>
  </div>

  <RouterLink v-else to="/login">to login</RouterLink>
</template>

<script setup>
import { useUserStore } from '@/store/user'
const userStore = useUserStore()
</script>
