import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import {fileURLToPath, URL} from 'url'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: [
      { find: '@', replacement: fileURLToPath(new URL('./src', import.meta.url)) },
    ]
  },
  plugins: [vue({
    template: {
      compilerOptions: {
        isCustomElement: (tag) => tag.includes('weather-widget')
      }
    }
  })],
  build: {
    lib: {
      entry: './src/main.ce.ts',
      name: 'weather-widget',
      fileName: 'weather-widget'
    }
  },
  define: {
    'process.env': process.env
  }
})
