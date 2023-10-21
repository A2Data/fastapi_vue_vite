// 导入状态管理库的 defineStore 函数
import { defineStore } from 'pinia'

// 定义名为 'user' 的用户状态管理模块
export const useUserStore = defineStore('user', {
  // 初始状态
  state: () => ({
    userInfo: {},
  }),

  // 定义 getter 来获取用户名
  getters: {
    username() {
      return this.userInfo?.username
    },
  },

  // 定义操作来设置和重置用户信息
  actions: {
    // 设置用户信息
    setUserInfo(userInfo) {
      this.userInfo = userInfo
    },
    // 重置用户信息
    resetUserInfo() {
      // 使用内置的 $reset 方法来重置模块的状态
      this.$reset()
    },
  },

  // 启用持久化
  persist: true,
})
