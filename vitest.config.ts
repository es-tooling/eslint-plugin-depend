import {defineConfig} from 'vitest/config';

export default defineConfig({
  test: {
    include: ["./lib/test/**/*_test.js"],
    coverage: {
      enabled: true,
      provider: 'v8',
      reporter: ['text-summary', 'lcov']
    },
    env: {
      NODE_ENV: 'test'
    }
  }
});
