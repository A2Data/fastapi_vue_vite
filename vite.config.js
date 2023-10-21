import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import unocss from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
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
  ],
  resolve: {
    alias: {
      '~': path.resolve(process.cwd()),
      '@': path.resolve(process.cwd(), 'src'),
    },
  },
})
