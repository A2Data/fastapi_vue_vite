<template>
  <div class="wh-full flex">
    <aside
      class="flex-col flex-shrink-0 transition-width-300"
      :class="appStore.collapsed ? 'w-64' : 'w-220'"
      border-r="1px solid #efeff5"
    >
      <header class="f-c-c h-60" border-b="1px solid #efeff5">
        <span class="font-bold text-18 text-primary">Logo</span>
      </header>
      <n-menu
        accordion
        :indent="18"
        :collapsed-icon-size="22"
        :collapsed-width="64"
        :collapsed="appStore.collapsed"
        :options="menuOptions"
        :value="route.name"
        @update:value="handleMenuSelect"
      />
    </aside>

    <article class="w-0 flex-col flex-1">
      <header class="h-60 flex-shrink-0 flex items-center px-24" border-b="1px solid #efeff5">
        <div class="f-c-c cursor-pointer text-20" @click="appStore.switchCollapsed">
          <i v-if="appStore.collapsed" i-line-md-menu-unfold-left />
          <i v-else i-line-md-menu-fold-left />
        </div>
        <n-breadcrumb class="ml-12">
          <n-breadcrumb-item
            v-for="item in route.matched.filter((item) => !!item.meta?.title)"
            :key="item.path"
            @click="handleBreadClick(item.path)"
          >
            {{ item.meta.title }}
          </n-breadcrumb-item>
        </n-breadcrumb>
        <div class="ml-auto flex items-center">
          <n-dropdown :options="dropdownOptions" @select="handleDropSelect">
            <div class="flex items-center cursor-pointer">
              <img :src="userStore.userInfo.avatar" class="h-36 w-36 rounded-full" />
              <span class="ml-12 opacity-80">
                {{ userStore.userInfo.username }}({{ userStore.userInfo.role?.name }})
              </span>
            </div>
          </n-dropdown>
        </div>
      </header>
      <router-view v-slot="{ Component, route }">
        <transition :key="route.name" name="fade-slide" mode="out-in" appear>
          <main class="flex-1 h-full bg-#f5f6fb p-24 cus-scroll">
            <component :is="Component" :key="route.fullPath" />
          </main>
        </transition>
      </router-view>
    </article>
  </div>
</template>

<script setup>
import { useAppStore } from '@/store/app'
import { useUserStore } from '@/store/user'
import { usePermissionStore } from '@/store/permission'
import { h } from 'vue'

const appStore = useAppStore()
const userStore = useUserStore()
const permissionStore = usePermissionStore()
const router = useRouter()
const route = useRoute()

/************************ 菜单相关的逻辑（建议单独封装抽离出去） ********************************/

const menuOptions = computed(() => {
  return permissionStore.menus.map((item) => getMenuItem(item))
})

// 当只有一个子路由时，只展示子路由，由于需要考虑子路由还有子路由的情况，所以此处写法比较复杂
// 如果实在不好理解，可以考虑另一种不考虑单个子路由情况的写法: getMenuItem2
function getMenuItem(route, basePath = '') {
  let menuItem = {
    label: (route.meta && route.meta.title) || route.name,
    key: route.name,
    path: resolvePath(basePath, route.path),
    icon: () => h('i', { class: `${route.meta?.icon} text-16` }),
  }

  // 获取显示的菜单
  const visibleChildren = route.children
    ? route.children.filter((item) => item.name && !item.isHidden)
    : []

  if (visibleChildren.length === 1) {
    // 当只有一个子路由时，只展示子路由，由于需要考虑子路由还有子路由的情况，所以此处写法比较复杂
    const singleRoute = visibleChildren[0]
    menuItem = {
      ...menuItem,
      label: singleRoute.meta?.title || singleRoute.name,
      key: singleRoute.name,
      path: resolvePath(menuItem.path, singleRoute.path),
      icon: () => h('i', { class: `${singleRoute.meta?.icon} text-16` }),
    }

    // 考虑孙路由的情况，由于是递归处理的，所以理论上可以展示的层级没有数量上的限制
    const visibleItems = singleRoute.children
      ? singleRoute.children.filter((item) => item.name && !item.isHidden)
      : []

    if (visibleItems.length === 1) {
      menuItem = getMenuItem(visibleItems[0], menuItem.path)
    } else if (visibleItems.length > 1) {
      menuItem.children = visibleItems.map((item) => getMenuItem(item, menuItem.path))
    }
  } else if (visibleChildren.length > 1) {
    menuItem.children = visibleChildren.map((item) => getMenuItem(item, menuItem.path))
  }
  return menuItem
}

// 不考虑单个子路由情况的写法
function getMenuItem2(route, basePath = '') {
  let menuItem = {
    label: (route.meta && route.meta.title) || route.name,
    key: route.name,
    path: resolvePath(basePath, route.path),
    icon: () => h('i', { class: 'i-mdi:home text-16' }),
  }

  if (route.children?.length > 0) {
    // 递归生成子菜单
    menuItem.children = route.children.map((item) => getMenuItem(item, menuItem.path))
  }
  return menuItem
}

function resolvePath(basePath, path) {
  if (isExternal(path)) return path
  return (
    '/' +
    [basePath, path]
      .filter((path) => !!path && path !== '/')
      .map((path) => path.replace(/(^\/)|(\/$)/g, ''))
      .join('/')
  )
}

/** 判断是否是外链 */
function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

function handleMenuSelect(key, item) {
  if (isExternal(item.path)) {
    window.open(item.path)
  } else {
    router.push(item.path)
  }
}

/******************** 头部相关的逻辑（建议单独封装抽离出去） ******************************/

function handleBreadClick(path) {
  if (path === route.path) return
  router.push(path)
}

const dropdownOptions = [
  {
    label: '退出登录',
    key: 'logout',
    icon: () => h('i', { class: 'i-mdi:exit-to-app text-14' }),
  },
]

function handleDropSelect(key) {
  if (key === 'logout') {
    $dialog.info({
      showIcon: false,
      title: '提示',
      type: 'info',
      content: '确认退出？',
      positiveText: '确定',
      negativeText: '取消',
      onPositiveClick() {
        userStore.logout()
        $message.success('已退出登录')
      },
    })
  }
}
</script>
