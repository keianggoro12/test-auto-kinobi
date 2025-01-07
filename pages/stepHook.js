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
  }

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
  async click_buttonSignIn() {
    await this.signin_button.click();
  }
  async visible_toastSuccessLogin() {
    await expect(this.toast_successLogin).toBeVisible();
  }
};
