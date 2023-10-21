import { defineStore } from 'pinia'
import api from '@/api'

export const useUserStore = defineStore('user', {
  state: () => ({
    userInfo: {},
    token: undefined,
  }),
  getters: {
    username() {
      return this.userInfo?.username
    },
    role() {
      return this.userInfo?.role
    },
  },
  actions: {
    async getUserInfo() {
      const { data } = await api.getUserInfo(this.token)
      this.setUserInfo(data)
    },
    setUserInfo(userInfo) {
      this.userInfo = userInfo
    },
    setToken(token) {
      this.token = token
    },
    resetUserInfo() {
      this.$reset()
    },
  },
  // 持久化
  persist: {
    paths: ['token'],
  },
})
