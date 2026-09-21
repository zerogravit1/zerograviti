import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',

  retries: process.env.CI ? 2 : 0,

  use: {
    baseURL: 'http://localhost:5173',
    headless: false,

    trace: 'on-first-retry',
    video: 'retain-on-failure',
  }
})