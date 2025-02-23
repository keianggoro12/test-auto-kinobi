// @ts-check
const { defineConfig, devices } = require("@playwright/test");

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
module.exports = defineConfig({
  testDir: "./tests", // Directory for test files
  fullyParallel: false, // Run tests in each file sequentially
  forbidOnly: !!process.env.CI, // Prevents `test.only` from being pushed in CI/CD
  retries: process.env.CI ? 2 : 0, // Retry failed tests in CI/CD
  workers: 1, // Number of parallel workers
  reporter: "html", // Generate test report in HTML format
  maxFailures: 1, // Stop execution after the first failed test
  use: {
    trace: "on-first-retry", // Collect trace only when retrying failed tests
    screenshot: "on", // Capture screenshots on test failure
    headless: false, // Run tests in headed mode to see browser actions
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36", // Set a valid User-Agent
  },

  /* Project configurations for main browsers */
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] }, // Use Desktop Chrome settings
    },

    // {
    //   name: "firefox",
    //   use: { ...devices["Desktop Firefox"] }, // Use Desktop Firefox settings
    // },

    // {
    //   name: "webkit",
    //   use: { ...devices["Desktop Safari"] }, // Use Desktop Safari settings
    // },

    /* Testing on mobile devices */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Testing on branded browsers */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Start a local development server before running tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
