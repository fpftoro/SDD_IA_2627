import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: 'e2e',
  testMatch: '*.e2e.js',
  workers: 1,
  use: {
    baseURL: 'http://localhost:3100',
  },
  webServer: {
    command: 'npm start',
    env: { PUERTO: '3100' },
    url: 'http://localhost:3100',
    reuseExistingServer: false,
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
});
