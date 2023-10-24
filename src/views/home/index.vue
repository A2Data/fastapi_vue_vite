<template>
  <p>欢迎您， {{ userStore.username }}</p>
</template>

<script setup>
import { useUserStore } from '@/store/user'
const userStore = useUserStore()
</script>
