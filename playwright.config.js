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
  testDir: "./tests", // Folder untuk file tes
  fullyParallel: false, // Menjalankan tes di file secara paralel
  forbidOnly: !!process.env.CI, // Menangani pengaturan untuk CI/CD (mencegah penggunaan test.only)
  retries: process.env.CI ? 2 : 0, // Retry pada CI/CD
  workers: 1, // Menentukan jumlah worker
  reporter: "html", // Laporan hasil tes dalam format HTML
  use: {
    trace: "on-first-retry", // Mengumpulkan trace jika tes gagal dan dicoba ulang
    screenshot: "on", // Ambil screenshot jika tes gagal
    headless: false, // Menonaktifkan headless untuk melihat tes di browser
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36", // User-Agent yang valid
  },

  /* Konfigurasi proyek untuk browser utama */
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] }, // Menggunakan konfigurasi perangkat desktop Chrome
    },

    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] }, // Menggunakan konfigurasi perangkat desktop Firefox
    },

    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] }, // Menggunakan konfigurasi perangkat desktop Safari
    },

    /* Tes terhadap tampilan mobile */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Tes terhadap browser branded */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Jalankan server pengembangan lokal sebelum memulai tes */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
