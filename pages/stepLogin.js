const { expect } = require("@playwright/test");

exports.stepLogin = class stepLogin {
  constructor(page) {
    //tulis disini element nya
    this.page = page;
    this.login_button = page.getByRole("button", { name: "Login" });
    this.login_student_button = page.getByRole("menuitem", {
      name: "Login as Student",
    });
    this.login_admin_button = page.getByRole("menuitem", {
      name: "Login as Admin",
    });
    this.email_field = page.getByRole("textbox", { name: "Email Address" });
    this.password_field = page.getByRole("textbox", { name: "Password" });
    this.signin_button = page.getByRole("button", { name: "SIGN IN" });
    this.toast_successLogin = page.getByText(
      "Welcome back! You have successfully logged in."
    );
    this.three_dots_button = page.locator(
      "//i[contains(@class, 'mdi-dots-horizontal')]"
    );
    this.logout_button = page.locator(
      "//div[contains(@class, 'menu-item') and .//i[contains(@class, 'mdi-logout')]]"
    );
    //i[contains(@class, 'mdi-dots-horizontal')]

    this.toast_invalidPassword = page.getByText(
      "Encountered error logging in: Invalid email/password."
    );
  }
  // kurung [{()}] action yg mana duluan
  // ==========================================================================================

  // TULIS DISINI METHOD NYA

  // Open URL
  async openUrl(url) {
    await this.page.goto(url);
  }

  async click_buttonLoginStudent() {
    await this.login_button.click();
    await this.login_student_button.click();
  }

  async fill_inputEmail(email) {
    await this.email_field.fill(email);
  }
  async fill_inputPassword(password) {
    await this.password_field.fill(password);
  }
  async fill_inputinvalidPassword(invalid_password) {
    await this.password_field.fill(invalid_password);
  }

  async click_buttonSignIn() {
    await this.signin_button.click();
  }
  async visible_toastSuccessLogin() {
    await expect(this.toast_successLogin).toBeVisible();
  }
  async visible_toastinvalidPassword() {
    await expect(this.toast_invalidPassword).toBeVisible();
  }

  async click_threeDotsButton() {
    await this.three_dots_button.waitFor({ state: "visible", timeout: 5000 });
    await this.three_dots_button.click();
  }
  async click_logout() {
    await this.logout_button.click();
  }
  async visible_buttonLogin() {
    await expect(this.login_button).toBeVisible();
  }
  async disabled_buttonLogin() {
    await expect(this.signin_button).toBeDisabled();
  }
};
