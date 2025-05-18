import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'
import path from 'path'

export default defineConfig({
  plugins: [preact()],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.tsx'),
      name: 'TriviaWidget',
      fileName: (format) => `widget.${format}.js`,
    },
    rollupOptions: {
      // externalize deps that shouldn't be bundled
      external: ['preact'],
      output: {
        globals: {
          preact: 'Preact',
        },
      },
    },
    minify: 'esbuild',
  },
})