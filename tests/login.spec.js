import { test, expect } from "@playwright/test";
import { stepLogin } from "../pages/stepLogin";
import { stepTou } from "../pages/stepTou";

const dataURL = require("../testData/dataURL.json");
const dataLogin = require("../testData/dataLogin.json");

test.describe("TS-1: Login", () => {
  let loginPage;
  let context;
  let page;
  let touPanel;

  // Membuat context dan page sebelum semua tes
  test.beforeAll(async ({ browser }) => {
    context = await browser.newContext();
    page = await context.newPage();
    loginPage = new stepLogin(page);
    touPanel = new stepTou(page);

    console.log("Opening URL...");
    await loginPage.openUrl(dataURL.URL);
    console.log("URL opened successfully.");
  });

  // TC-1: Test untuk login dengan disable login - no data
  test("TC-1: Login with disabled button", async () => {
    await loginPage.click_buttonLoginStudent();
    await loginPage.disabled_buttonLogin();
  });

  // // TC-2: Test untuk login dengan password tidak valid
  // test("TC-2: Login with invalid password", async () => {
  //   await loginPage.fill_inputEmail(dataLogin.email);
  //   await loginPage.fill_inputinvalidPassword(dataLogin.invalid_password);
  //   await loginPage.click_buttonSignIn();
  //   await loginPage.visible_toastinvalidPassword();
  // });

  // TC-3: Test untuk login dengan kredensial valid
  test("TC-3: Login with valid credentials as student", async () => {
    await loginPage.fill_inputEmail(dataLogin.email);
    await loginPage.fill_inputPassword(dataLogin.password);
    await loginPage.click_buttonSignIn();
    await loginPage.visible_toastSuccessLogin();
    await touPanel.handle_termsOfUse();
  });

  // TC-4: Test untuk logout
  test("TC-4: Test log out as student", async () => {
    await loginPage.click_threeDotsButton();
    await loginPage.click_logout();
    await loginPage.visible_buttonLogin();
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
      console.error("Error during cleanup:", error.message);
    }
  });
});
