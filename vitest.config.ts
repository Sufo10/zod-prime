import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    globals: true,
    include: ['test/**/*.test.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: ['**/node_modules/**', '**/dist/**', '**/coverage/**', '**/*.test.ts'],
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
    watchExclude: ['**/node_modules/**', '**/dist/**'],
  },
});
