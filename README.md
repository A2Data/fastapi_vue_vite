# Vue 3 + Vite

This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).


## 按照 Vite 官网初始化项目



1.进入项目 安装依赖且运行项目
```bash
# 使用 npm
npm create vite@latest

# 使用 yarn
yarn create vite
# 使用 pnpm
pnpm create vite

cd fastapi_vue_vite
npm install # or pnpm install
npm run dev # or pnpm run dev
```

访问地址：
http://localhost:5173/



![效果](https://cdn.jsdelivr.net/gh/itdocs-icu/img/img/20230918150553.png)


初始化项目完成。



2. 集成 eslint + prettier, 约束代码规范（重要）

> 注意1：需安装 vscode 插件: eslint、prettier、EditorConfig for VS Code
> 注意2：eslint 配置对新手来说可能有点复杂，可以暂时先使用我封装好 npm 包，后面再慢慢学习它的详细配置
> 注意3：配置完可重启 vscode 然后执行 `npm run lint:fix` 可以一次性修复所有不符合约定规范的代码


3. 配置 vite.config.js 和 jsconfig.json（重要但非必须）

  3.1 配置 `alias` 别名： `@/` 表示 src 路径  `~/` 表示跟路径
  3.2 配置 `jsconfig.json`，目的之一就是为了 `alias` 别名有提示


4. 配置样式相关的: 重置样式、全局样式、 sass、unocss

> 推荐安装 vscode 插件： `UnoCss`


5. 集成 vue-router，添加初始页面：首页和登录页（重要）

6. 集成 pinia 状态管理，并支持持久化（重要）
7. 集成 Naive UI，配置 unplugin（重要）

> 配置 unplugin 不是必须的，但它可以为开发提供极大的便利，使用 Naive UI 组件、Vue 和 Vue-Router 的api 时无需导入，并且是按需的，不会加大打包的体积
>
8. 配置 Naive UI的主题和全局api，让其用起来更得心应手（重要）

> 此点非必要，但可能会影响后续的步骤


9. 集成 `iconfy` 图标方案（建议非必要）

> 使用方式， 如 <i i-vscode-icons:file-type-light-pnpm />
> 建议安装vscode插件: Iconify IntelliSense

10. 简单封装网络请求-axios，配置本地服务接口请求代理（重要）

11. 完善登录页，并添加路由守卫控制没登录时跳转登录页（非常重要）

> 注：路由守卫里面每一步都写了详细的注释

12. 补充退出登录逻辑


13. 完善 layout 之整体布局

> 注: 为减少对 UI 组件的依赖，整体布局使用原生 html + unocss 完成，方便切换 UI组件时布局可以复用

14. 完善 layout 之权限菜单（非常重要）

> 注: 提供两种生成菜单的方式，详情看 `layout/index.vue`

15. 完善 layout 之头部（重要）

> 注: 含面包屑、退出登录等


16. 完善首页（非必要）

> 注: 含 `echarts` 示例，供参考

17. 补充过度动画（非必要）

> 注: `transition` 内置组件只能有一个根节点


18. 美化滚动条（非必要）

19. 按钮权限（重要）