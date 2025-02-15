import { test, expect } from "@playwright/test";
import { stepLogin, stepRegister } from "../pages/stepLogin";
import { stepLoginAdmin } from "../pages/stepLoginAdmin";

const dataURL = require("../testData/dataURL.json");
const dataLogin = require("../testData/dataLogin.json");

test.describe("TS-1: Login", () => {
  let page, context, loginPage, loginDashboard;

  // Membuat context dan page sebelum semua tes
  test.beforeAll(async ({ browser }) => {
    context = await browser.newContext();
    page = await context.newPage();
    loginPage = new stepLogin(page);
    loginDashboard = new stepLoginAdmin(page);

    console.log("Opening URL...");
    await loginPage.openUrl(dataURL.URL);
    console.log("URL opened successfully.");
  });

  // TC-1: Test success login as Super Admin
  test("TC-1: Login Success Super Admin", async () => {
    await loginPage.click_buttonLoginAdmin();
    await loginDashboard.fill_inputEmail(dataLogin.email_super_admin);
    await loginDashboard.fill_inputPassword(
      dataLogin.password_success_all_admin
    );
    await loginDashboard.click_buttonSignIn();
    await loginDashboard.verifyLoginAdminModal();
    await loginDashboard.verifyLoginSuperAdmin();
  });

  //   TC-2: Test success login as Normal Admin
  test("TC-2: Login Success Normal Admin", async () => {
    await loginPage.click_buttonLoginAdmin();
    await loginDashboard.fill_inputEmail(dataLogin.email_normal_admin);
    await loginDashboard.fill_inputPassword(
      dataLogin.password_success_all_admin
    );
    await loginDashboard.click_buttonSignIn();
    await loginDashboard.verifyLoginAdminModal();
    await loginDashboard.verifyLoginNormalAdmin();
  });

  // TC-1: Test success login as Super Admin
  test("TC-3: Login Success Company Admin", async () => {
    await loginPage.click_buttonLoginAdmin();
    await loginDashboard.fill_inputEmail(dataLogin.email_company_admin);
    await loginDashboard.fill_inputPassword(
      dataLogin.password_success_all_admin
    );
    await loginDashboard.click_buttonSignIn();
    await loginDashboard.verifyLoginAdminModal();
    await loginDashboard.verifyLoginCompanyAdmin();
  });
});
