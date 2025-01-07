import { test, expect } from "@playwright/test";
import { stepLogin } from "../pages/stepHook";

const dataURL = require("../testData/dataURL.json");
const dataLogin = require("../testData/dataLogin.json");

test.describe("TS-1: Testing apa ini", () => {
  let loginPage;
  let context;
  let page;

  // Membuat context dan page sebelum semua tes
  test.beforeAll(async ({ browser }) => {
    context = await browser.newContext();
    page = await context.newPage();
    loginPage = new stepLogin(page);

    console.log("Opening URL...");
    await loginPage.openUrl(dataURL.URL);
    console.log("URL opened successfully.");
  });

  // TC-1: contoh case 1 bukar
  test("TC-1: contoh case 1 buka", async () => {
    await loginPage.click_buttonLoginStudent();
    await loginPage.fill_inputEmail(dataLogin.email);
    await loginPage.fill_inputPassword(dataLogin.password);
    await loginPage.click_buttonSignIn();
    await loginPage.visible_toastSuccessLogin();
  });

  // Menutup semua resource setelah semua tes selesai
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
      console.error("Error during cleanup:", error);
    }
  });
});
