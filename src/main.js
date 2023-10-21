import { createApp } from 'vue'
import App from './App.vue'
import '@/styles/reset.css'
import 'uno.css'
import '@/styles/global.scss'
import { router } from './router'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { useUserStore } from './store/user'
import { usePermissionStore } from './store/permission'
import { NOT_FOUND_ROUTE } from '@/router/routes'

const app = createApp(App)
app.use(router)

const pinia = createPinia()
/**
 * 持久化
 * 文档: https://prazdevs.github.io/pinia-plugin-persistedstate/zh/guide/
 */
pinia.use(piniaPluginPersistedstate)
app.use(pinia)

app.mount('#app')

// 添加路由守卫
const WHITE_LIST = ['/login', '/404']
router.beforeEach(async (to) => {
  const userStore = useUserStore()
  const permissionStore = usePermissionStore()
  const token = userStore.token

  /**
   * 没有token的情况
   * 如果是白名单则通过，否则跳转登录页
   */
  if (!token) {
    if (WHITE_LIST.includes(to.path)) return true
    return { path: 'login' }
  }

  /**
   * 有token的情况
   * 判断有没有获取用户信息，有则通过，无则获取用户信息
   */
  if (!userStore.userInfo?.id) {
    // 获取用户信息
    await userStore.getUserInfo()
    // 创建权限路由列表
    const accessRoutes = permissionStore.generateRoutes(userStore.role)
    // 动态添加有权限的路由
    accessRoutes.forEach((route) => {
      !router.hasRoute(route.name) && router.addRoute(route)
    })
    // 将无法匹配的路由添加到路由列表的最后面
    router.addRoute(NOT_FOUND_ROUTE)
    // 添加完路由后重走路由守卫
    return { ...to, replace: true }
  }

  // 已登录的状态下进入登录页时强制跳回到首页
  if (to.path === '/login') return { path: '/' }

  return true
})
