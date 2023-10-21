export const basicRoutes = [
  {
    name: 'Home',
    path: '/',
    component: () => import('@/views/home/index.vue'),
  },
  {
    name: 'Login',
    path: '/login',
    component: () => import('@/views/login/index.vue'),
  },
]
