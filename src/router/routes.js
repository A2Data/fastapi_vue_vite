// @unocss-include （不能删，否则本文件下的所有图标无法动态渲染）
import Layout from '@/layout/index.vue'

/**
 * 路由属性解释：
 *  name: 必须要有，否则不展示在菜单上
 *  isHidden: 可选，为true时不会展示在菜单上，但如果有权限的话还是会添加到路由表中
 *  title: 可选，展示在菜单的名称，如果没有则取name展示
 *  icon: 可选，菜单图标，以 i- 开头，图标库: https://icones.js.org/collection/all
 *  role: 可选，表示当前菜单可访问的角色列表，如果没有则默认不设权限控制
 *
 * 注: 只有 asyncRoutes 受权限控制，basicRoutes 默认所有角色都可访问
 */

export const basicRoutes = [
  {
    name: 'Workbench',
    path: '/',
    component: Layout,
    redirect: '/home',
    meta: {
      title: '工作台',
      icon: 'i-mdi:home',
    },
    children: [
      {
        name: 'Home',
        path: 'home',
        component: () => import('@/views/home/index.vue'),
        meta: {
          title: '首页',
          icon: 'i-me:home?mask',
        },
      },
    ],
  },

  {
    name: 'Login',
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    isHidden: true,
  },
  {
    name: '404',
    path: '/404',
    component: () => import('@/views/error-page/404.vue'),
    isHidden: true,
  },
]

export const asyncRoutes = [
  {
    name: 'Test',
    path: '/test',
    component: Layout,
    redirect: '/test/page1',
    meta: {
      title: '测试菜单',
      icon: 'i-uil:pagelines',
      role: ['admin', 'test'],
    },
    children: [
      {
        name: 'Page1',
        path: 'page1',
        component: () => import('@/views/test-page/page1.vue'),
        meta: {
          title: '测试页1',
          icon: 'i-isme:check-circle',
          role: ['admin'],
        },
      },
      {
        name: 'Page2',
        path: 'page2',
        component: () => import('@/views/test-page/page2.vue'),
        meta: {
          title: '测试页2',
          icon: 'i-material-symbols:auto-awesome-outline-rounded',
          role: ['admin'],
        },
      },
      {
        name: 'Page3',
        path: 'page3',
        component: () => import('@/views/test-page/page3.vue'),
        meta: {
          title: '测试按钮权限',
          icon: 'i-material-symbols:auto-awesome-outline-rounded',
          role: ['admin', 'test'],
        },
      },
    ],
  },
]

export const NOT_FOUND_ROUTE = {
  name: 'NotFound',
  path: '/:pathMatch(.*)*',
  redirect: '/404',
}
