import { createWebHashHistory } from 'vue-router'
import { createRouter } from 'vue-router'
import { basicRoutes } from './routes'

export const router = createRouter({
  history: createWebHashHistory('/'),
  routes: basicRoutes,
  scrollBehavior: () => ({ left: 0, top: 0 }),
})
