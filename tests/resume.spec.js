import { test, expect } from "@playwright/test";
import { stepLogin } from "../pages/stepLogin";
import { stepResume } from "../pages/stepResume";

const dataURL = require("../testData/dataURL.json");
const dataLogin = require("../testData/dataLogin.json");

test.describe("TS-2: Resume", () => {
  let loginPage;
  let resumePage;
  let context;
  let page;

  // Menyiapkan context dan page sebelum semua tes
  test.beforeAll(async ({ browser }) => {
    context = await browser.newContext();
    page = await context.newPage();
    loginPage = new stepLogin(page);
    resumePage = new stepResume(page);

    console.log("Opening URL...");
    await loginPage.openUrl(dataURL.URL);
    console.log("URL opened successfully.");

    await loginPage.click_buttonLoginStudent();
    await loginPage.fill_inputEmail(dataLogin.email);
    await loginPage.fill_inputPassword(dataLogin.password);
    await loginPage.click_buttonSignIn();
    await loginPage.visible_toastSuccessLogin();
  });

  // TC-1: Membuat resume baru
  test("TC-1: Create a new resume", async () => {
    // Menggunakan test.only untuk menjalankan tes ini saja
    await resumePage.handle_btnResumeBuilder();
    await resumePage.handle_btnNewResume();
    await resumePage.handle_btnNewResumeBlank();
    await resumePage.verifyToastResumeCreatedVisible();
  });

  // // TC-2: Personal information
  // test("TC-2: Login with valid credentials as student", async () => {
  //   // Tambahkan langkah untuk TC-2 di sini
  // });

  // Membersihkan resource setelah semua tes selesai
  test.afterAll(async () => {
    try {
      console.log("Closing all resources...");
      if (page) {
        await page.close();
        console.log("Page closed.");
      }
      if (context) {
        await context.close();
        console.log("Context closed.");
      }
    } catch (error) {
      console.error("Error during cleanup:", error.message);
    }
  });
});
