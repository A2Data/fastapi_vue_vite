import { createWebHashHistory, createRouter } from 'vue-router'
import { basicRoutes } from './routes'

// 创建路由器实例
export const router = createRouter({
  // 使用 hash 模式的路由历史
  history: createWebHashHistory('/'),
  // 路由配置，这里使用了从 './routes' 导入的基本路由配置
  routes: basicRoutes,
  // 滚动行为配置，每次导航到新路由时将滚动位置重置为左上角

  scrollBehavior: () => ({ left: 0, top: 0 }),
})
