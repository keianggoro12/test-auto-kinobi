const { expect } = require("@playwright/test");

exports.stepLoginAdmin = class stepLoginAdmin {
  constructor(page) {
    //tulis disini element nya
    this.page = page;

    this.email_admin_field = page.getByRole("textbox", { name: "Email" });
    this.password_admin_field = page.getByRole("textbox", { name: "Password" });
    this.login_admin_button = page.getByRole("button", { name: "LOGIN" });
    this.toast_success_admin_login = page.getByText(
      "Welcome back! Redirecting to the homepage.."
    );
    this.login_super_admin = page.locator(
      "//span[@class='v-chip__content' and .//span[normalize-space()='Super Admin']]"
    );
    this.login_normal_admin = page.locator(
      "//span[@class='v-chip__content' and .//span[normalize-space()='University']]"
    );
    this.login_company_admin = page.locator(
      "//span[@class='v-chip__content' and .//span[normalize-space()='Company']]"
    );
  }

  // kurung [{()}] action yg mana duluan
  // ==========================================================================================

  // TULIS DISINI METHOD NYA
  // Open URL

  async fill_inputEmail(email) {
    await this.email_admin_field.fill(email);
  }
  async fill_inputPassword(password) {
    await this.password_admin_field.fill(password);
  }
  async click_buttonSignIn() {
    await this.login_admin_button.click();
  }
  async verifyLoginAdminModal() {
    await this.toast_success_admin_login.waitFor({
      state: "visible",
      timeout: 5000,
    });
    await expect(this.toast_success_admin_login).toBeVisible();
  }
  async verifyLoginSuperAdmin() {
    await expect(this.login_super_admin).toBeVisible();
  }
  async verifyLoginNormalAdmin() {
    await expect(this.login_normal_admin).toBeVisible();
  }
  async verifyLoginCompanyAdmin() {
    await expect(this.login_company_admin).toBeVisible();
  }
};
