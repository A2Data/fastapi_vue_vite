<template>
  <n-config-provider
    class="wh-full"
    :locale="zhCN"
    :date-locale="dateZhCN"
    :theme-overrides="naiveThemeOverrides"
  >
    <router-view v-slot="{ Component }">
      <component :is="Component" />
    </router-view>
  </n-config-provider>
</template>

<script setup>
import * as NaiveUI from 'naive-ui'
import { useCssVar } from '@vueuse/core'
import { kebabCase } from 'lodash-es'
const { zhCN, dateZhCN } = NaiveUI

// 设置主题色
const naiveThemeOverrides = {
  common: {
    primaryColor: '#316C72FF',
    primaryColorHover: '#316C72E3',
    primaryColorPressed: '#2B4C59FF',
    primaryColorSuppl: '#316C72E3',

    infoColor: '#2080F0FF',
    infoColorHover: '#4098FCFF',
    infoColorPressed: '#1060C9FF',
    infoColorSuppl: '#4098FCFF',

    successColor: '#18A058FF',
    successColorHover: '#36AD6AFF',
    successColorPressed: '#0C7A43FF',
    successColorSuppl: '#36AD6AFF',

    warningColor: '#F0A020FF',
    warningColorHover: '#FCB040FF',
    warningColorPressed: '#C97C10FF',
    warningColorSuppl: '#FCB040FF',

    errorColor: '#D03050FF',
    errorColorHover: '#DE576DFF',
    errorColorPressed: '#AB1F3FFF',
    errorColorSuppl: '#DE576DFF',
  },
}

/** 将 Naive UI 的 消息提醒、弹窗等添加到window以供程序内到处可用 */
function setupNaiveDiscreteApi() {
  const configProviderProps = computed(() => ({
    themeOverrides: naiveThemeOverrides,
  }))
  const { message, dialog, notification, loadingBar } = NaiveUI.createDiscreteApi(
    ['message', 'dialog', 'notification', 'loadingBar'],
    { configProviderProps }
  )

  window.$loadingBar = loadingBar
  window.$notification = notification
  window.$message = message
  window.$dialog = dialog
}

/** 将 Naive UI 的主题色添加到全局css变量中 */
function setupCssVar() {
  const common = naiveThemeOverrides.common
  for (const key in common) {
    useCssVar(`--${kebabCase(key)}`, document.documentElement).value = common[key] || ''
    if (key === 'primaryColor') window.localStorage.setItem('__THEME_COLOR__', common[key] || '')
  }
}

setupNaiveDiscreteApi()
setupCssVar()
</script>
