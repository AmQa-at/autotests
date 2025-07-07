import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  reporter: [['html', { outputFolder: 'playwright-report', open: 'never' }]],
  timeout: 30000,
  fullyParallel: false,
  workers: 1,
  use: {
    baseURL: 'https://demo.sboard.su/', 
    headless: true,
    screenshot: 'only-on-failure',
    locale: 'ru-RU',
    acceptLanguage: 'ru',
  },
  projects: [
    { name: 'chromium', use: { browserName: 'chromium' } },
  ],
});