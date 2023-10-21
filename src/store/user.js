import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    userInfo: {},
  }),
  getters: {
    username() {
      return this.userInfo?.username
    },
  },
  actions: {
    setUserInfo(userInfo) {
      this.userInfo = userInfo
    },
    resetUserInfo() {
      this.$reset()
    },
  },
  // 持久化
  persist: true,
})
