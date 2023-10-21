// 导入状态管理库的 defineStore 函数
import { defineStore } from 'pinia'

// 定义名为 'app' 的状态管理模块

export const useAppStore = defineStore('app', {
  // 初始状态
  state: {
    collapsed: false, // 直接定义初始值
  },
  // 定义操作

  actions: {
    // 切换 'collapsed' 状态

    switchCollapsed() {
      this.collapsed = !this.collapsed
    },
    // 设置 'collapsed' 状态

    setCollapsed(b) {
      this.collapsed = b
    },
  },
  // 持久化
  persist: true,
})
