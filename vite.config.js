import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'pantry',
      formats: ['es'],
      fileName: 'pantry',
    },
    // rollupOptions: {
    // external: ['@dolanske/crumbs', '@dolanske/cascade'],
    // },
    sourcemap: true,
  },
  plugins: [dts()],
})
