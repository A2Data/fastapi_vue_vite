<template>
  <div class="wh-full flex">
    <aside
      class="flex-col flex-shrink-0 transition-width-300"
      :class="appStore.collapsed ? 'w-64' : 'w-220'"
      border-r="1px solid #efeff5"
    >
      <header class="f-c-c h-60" border-b="1px solid #efeff5">Vue Simple Admin</header>
    </aside>

    <article class="w-0 flex-col flex-1">
      <header class="h-60 flex-shrink-0 flex items-center" border-b="1px solid #efeff5">
        <div class="f-c-c cursor-pointer text-20 ml-12" @click="appStore.switchCollapsed">
          <i v-if="appStore.collapsed" i-line-md-menu-unfold-left />
          <i v-else i-line-md-menu-fold-left />
        </div>
        <div class="ml-auto flex items-center">
          <img :src="userStore.userInfo.avatar" class="h-36 w-36 rounded-full" />
          <n-button class="mx-12" type="primary" ghost @click="userStore.logout">退出登录</n-button>
        </div>
      </header>
      <main class="flex-1 h-full bg-#f5f6fb overscroll-auto p-24">
        <RouterView />
      </main>
    </article>
  </div>
</template>

<script setup>
import { useAppStore } from '@/store/app'
import { useUserStore } from '@/store/user'

const appStore = useAppStore()
const userStore = useUserStore()
</script>
