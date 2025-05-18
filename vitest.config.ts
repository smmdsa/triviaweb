import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    coverage: {
      provider: 'c8',
      reporter: ['text', 'lcov'],
      lines: 70,
      statements: 70,
      branches: 70,
      functions: 70,
    },
  },
})