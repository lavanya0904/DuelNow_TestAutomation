// playwright.config.ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',                // Directory where tests are located
  timeout: 60000,                   // 60 seconds per test
  expect: {
    timeout: 10000                  // 10 seconds for expect checks
  },
  fullyParallel: true,              // Run tests in parallel where possible
  retries: 0,                       // Configure retries (0 or 1 is common)
  reporter: [['html', { outputFolder: 'playwright-report' }], ['list']],
  use: {
    baseURL: 'https://demo.nopcommerce.com',
    headless: true,                 // true: run in headless mode, false: show browser
    screenshot: 'only-on-failure',  // Capture screenshot on failure
    video: 'retain-on-failure',     // Capture video on failure
    trace: 'retain-on-failure',     // Collect trace on failure
  },
  projects: [
    {
      name: 'Chromium',
      use: { ...devices['Desktop Chrome'] },
    }
    // You can add more projects here (Firefox, WebKit, etc.)
  ]
});
