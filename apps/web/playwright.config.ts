import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',

  retries: process.env.CI ? 2 : 0,

  use: {
    baseURL: 'http://localhost:5173',

    trace: 'on-first-retry',
    video: 'retain-on-failure',
  },

  webServer: {
    command: 'npm run dev -- --host 127.0.0.1',
    url: 'http://127.0.0.1:5173',
    reuseExistingServer: !process.env.CI,
  },
})