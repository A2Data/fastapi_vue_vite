<template>
  <div class="wh-full flex">
    <div class="m-auto w-420 card-shadow px-32 py-40">
      <h1 class="text-center">Vue Simple Admin</h1>
      <n-input
        v-model:value="loginInfo.username"
        autofocus
        class="mt-32 h-48 items-center pl-12 text-16"
        placeholder="admin"
        :maxlength="20"
      />

      <n-input
        v-model:value="loginInfo.password"
        class="mt-32 h-48 items-center pl-12 text-16"
        type="password"
        show-password-on="mousedown"
        placeholder="123456"
        :maxlength="20"
        @keypress.enter="handleLogin"
      />

      <n-button
        class="mt-32 h-48 w-full rounded-4 text-16"
        type="primary"
        :loading="loading"
        @click="handleLogin"
      >
        登录
      </n-button>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from '@/store/user'
import api from './api'

const router = useRouter()
const userStore = useUserStore()
const loginInfo = ref({})
const loading = ref(false)

async function handleLogin() {
  if (!loginInfo.value.username) return $message.error('请输入用户名')
  if (!loginInfo.value.password) return $message.error('请输入密码')

  loading.value = true
  const { token } = await api.login(loginInfo.value)
  if (token) {
    userStore.setToken(token)
    router.push('/')
  }
  loading.value = false
}
</script>
