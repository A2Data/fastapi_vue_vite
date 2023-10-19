import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path';
import unocss from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
// rollup打包分析插件
import { visualizer } from 'rollup-plugin-visualizer'

// 定义项目根目录的绝对路径
// https://vitejs.dev/config/
export default defineConfig({
  // 项目的根路径，默认为 '/'
  base: '/',
  // 插件配置，这里包括 Vue 插件
  plugins: [
    vue(),
    unocss(), 
    AutoImport({
      imports: ['vue', 'vue-router'],
      dts: false,
    }),
    Components({
      resolvers: [NaiveUiResolver()],
      dts: false,
    }),
    visualizer({
      open: true,
      gzipSize: true,
      brotliSize: true,
    }),
  ],

  resolve: {
    // 设置别名
    alias: {
      '~': path.resolve(process.cwd()),
      '@': path.resolve(__dirname, 'src'),
    },
  },
  // 服务器配置
  server: {
    host: '0.0.0.0', // 允许外部访问
    port: 2023, // 端口号
    open: false, // 是否自动打开浏览器
    // 根据环境配置是否使用代理
    proxy: {
      /**
       * @desc    替换匹配值
       * @请求路径  http://localhost:5173/api/user
       * @转发路径  http://localhost:8080/user
       */
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        rewrite: (path) => path.replace(new RegExp('^/api'), ''),
      },
    },
  },
   // 构建配置
   build: {
    target: 'es2015', // 构建目标
    outDir:  'dist', // 输出目录
    reportCompressedSize: false, // 启用/禁用 gzip 压缩大小报告
    chunkSizeWarningLimit: 1024, // chunk 大小警告的限制（单位kb）
  },
  
})

