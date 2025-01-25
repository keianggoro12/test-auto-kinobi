const { expect } = require("@playwright/test");

const { createInbox, getVerificationLink } = require("../helper/emailAPI");

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

exports.stepRegister = class stepRegister {
  constructor(page) {
    //tulis disini element nya
    this.page = page;
    this.signup_modal = page.getByText("Welcome to Kinobi - Staging");
    this.signup_button = page.getByRole("button", { name: "SIGN UP" });
    this.signup_student_button = page.getByRole("menuitem", {
      name: "Sign up as Student",
    });
    this.firstName_field = page.getByRole();
    this.lastName_field = page.getByRole();
    this.registrationEmail_field = page.getByRole("textbox", {
      name: "Email Address",
    });

    this.verifyEmail_button = page.locator(
      "//button[.//span[contains(text(), 'Verify')]]"
    );
    this.unverifyEmail_notif = page.getByText(
      "Email is unverified. Please verify first."
    );
    this.verifyEmailSent_notif = page.getByText("Email Verification sent!");
    this.refreshEmail_button = page.getByRole("button", { name: "REFRESH" });
    this.verifiedEmail_notif = page.getByText("Email has been verified!");
  }
  // kurung [{()}] action yg mana duluan
  // ==========================================================================================

  // TULIS DISINI METHOD NYA
  async click_buttonSignUp() {
    await this.signup_button.click();
    await this.signup_student_button.click();
  }

  async registerAndVerifyEmail() {
    // 1️⃣ Create inbox
    const inbox = await createInbox(false); // false for default domain
    const testEmail = inbox.emailAddress;
    console.log(`Generated email: ${testEmail}`);

    // 2️⃣ Fill registration form with the generated email
    await this.registrationEmail_field.fill(testEmail);
    console.log(`Using email: ${testEmail}`);
    await this.signup_modal.click();

    // 3️⃣ Wait for 'Email is unverified' notification
    await this.unverifyEmail_notif.waitFor();

    // 4️⃣ Click 'Verify' button and wait for confirmation
    await this.verifyEmail_button.click();
    await this.verifyEmailSent_notif.waitFor();

    // 5️⃣ Get verification link from email
    const verificationLink = await getVerificationLink(inbox.id);

    // Log the verification link to inspect if it's correct
    console.log(`Verification link: ${verificationLink}`);

    // Ensure link is valid and matches the expected structure
    if (
      verificationLink?.includes("verify-email") &&
      verificationLink.startsWith("https://sim-staging.server.kinobi.asia")
    ) {
      console.log(`Verification link is valid`);

      // 6️⃣ No need to navigate to the link here, it's already handled in getVerificationLink
      // 7️⃣ Wait for 5 seconds to ensure verification is completed
      await this.page.waitForTimeout(5000);

      console.log("✅ Email verified successfully!");
    } else {
      throw new Error(
        "No valid verification link found or invalid link format"
      );
    }

    // 8️⃣ Refresh and check if email is verified
    await this.refreshEmail_button.click();
    await this.verifiedEmail_notif.waitFor();
  }
};
