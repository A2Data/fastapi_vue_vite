export const basicRoutes = [
  {
    name: 'Index',
    path: '/',
    component: () => import('@/layout/index.vue'),
    redirect: '/home',
    children: [
      {
        name: 'Home',
        path: 'home',
        component: () => import('@/views/home/index.vue'),
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

export const asyncRoutes = []

export const NOT_FOUND_ROUTE = {
  name: 'NotFound',
  path: '/:pathMatch(.*)*',
  redirect: '/404',
}
