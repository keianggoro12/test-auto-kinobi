const { expect } = require("@playwright/test");
const { createInbox, getVerificationLink } = require("../helper/emailAPI");

exports.stepResume = class stepResume {
  constructor(page) {
    this.page = page;
    this.btn_resumeBuilder = page.getByRole("link", { name: "Resume Builder" });
    this.btn_newResume = page.getByRole("button", { name: "NEW RESUME" });
    this.btn_newResumeBlank = page.locator(
      '//button[@data-v-1f0c1fe0]//span[contains(text(), "New Resume")]'
    );
    this.toast_resumeCreated = page.getByText(
      "Created your resume successfully!"
    );

    //resume title modal
    this.modal_resumeTitle = page.getByText("Give your resume a title");
    this.blank_field_resumeTitle = page.getByText("Title is required");
    this.field_resumeTitle = page.locator('//input[@required="required"]');
    this.btn_saveResumeTitle = page.getByRole("button", {
      name: "Save",
      exact: true,
    });
    this.toast_resumeTitleSaved = page.getByText(
      "Your resume title has been saved successfully!"
    );
    this.btn_continueResume = page.getByRole("button", {
      name: "Save & Continue",
    });
    this.threedot_ResumeCard = page.locator(
      ".v-btn__content i.mdi-dots-vertical"
    );

    //
  }

  async handle_btnResumeBuilder() {
    await this.btn_resumeBuilder.waitFor({ state: "visible", timeout: 5000 });
    if (await this.btn_resumeBuilder.isEnabled()) {
      await this.btn_resumeBuilder.click();
    }
  }
  async handle_btnNewResume() {
    await this.btn_newResume.waitFor({ state: "visible", timeout: 5000 });
    if (await this.btn_newResume.isEnabled()) {
      await this.btn_newResume.click();
    }
  }
  async handle_btnNewResumeBlank() {
    await this.btn_newResumeBlank.click();
  }
  async verifyToastResumeCreatedVisible() {
    await this.toast_resumeCreated.waitFor({ state: "visible", timeout: 5000 });
    await expect(this.toast_resumeCreated).toBeVisible();
  }
  async verify_blankFieldResumeTitle() {
    await this.blank_field_resumeTitle.waitFor({
      state: "visible",
      timeout: 5000,
    });
    await expect(this.blank_field_resumeTitle).toBeVisible();
  }
  async click_saveResumeTitle() {
    await this.btn_saveResumeTitle.waitFor({ state: "visible", timeout: 5000 });
    await this.btn_saveResumeTitle.click();
  }
  async fill_inputResumeTitle(resumeTitle) {
    await this.modal_resumeTitle.waitFor({ state: "visible", timeout: 5000 });
    await this.field_resumeTitle.fill(resumeTitle);
  }
  async verify_modal_ResumeTitle() {
    await this.field_resumeTitle.click();
    await this.modal_resumeTitle.waitFor({ state: "visible", timeout: 5000 });
  }
  async visible_toastSuccessResumeCreated() {
    await this.toast_resumeTitleSaved.waitFor({
      state: "visible",
      timeout: 5000,
    });
    await expect(this.toast_resumeTitleSaved).toBeVisible();
  }
  async click_buttonSaveAndContinue() {
    await this.btn_continueResume.waitFor({ state: "visible", timeout: 5000 });
    await this.btn_continueResume.click();
  }
  async click_randomOptionResumeCard() {
    const count = await this.threedot_ResumeCard.count();

    if (count > 0) {
      const randomIndex = Math.floor(Math.random() * count);
      await this.threedot_ResumeCard.nth(randomIndex).click();
    } else {
      console.log("No resume options available.");
    }
  }
};

exports.stepResume_personalDetails = class stepResume_personalDetails {
  constructor(page, fullName, bio, address) {
    this.page = page;
    this.input_nameResume = page.locator(
      "//span[normalize-space()='Fill In Your Personal Information']/ancestor::div[@class='container']/descendant::input[@id='name']"
    );
    this.input_phoneResume = page.locator(
      "//span[normalize-space()='Fill In Your Personal Information']/ancestor::div[@class='container']/descendant::input[@id='phone']"
    );
    this.input_emailResume = page.locator(
      "//span[normalize-space()='Fill In Your Personal Information']/ancestor::div[@class='container']/descendant::input[@id='email']"
    );
    this.input_linkedInResume = page.locator(
      "//span[normalize-space()='Fill In Your Personal Information']/ancestor::div[@class='container']/descendant::input[@id='linked-in']"
    );
    this.input_portfolioResume = page.locator(
      "//span[normalize-space()='Fill In Your Personal Information']/ancestor::div[@class='container']/descendant::input[@id='portfolio-url']"
    );
    this.input_addressResume = page.locator(
      "//span[normalize-space()='Fill In Your Personal Information']/ancestor::div[@class='container']/descendant::input[@id='address']"
    );
    this.input_bioResume = page.locator(
      "//span[normalize-space()='Fill In Your Personal Information']/ancestor::div[@class='container']/descendant::textarea[@id='description']"
    );
    this.upload_profileImage = page.locator('//input[@type="file"][2]');
    this.btn_uploadConfirmation = page.getByRole("button", {
      name: "Save",
      exact: true,
    });
    this.toast_successUploadImage = page.getByText(
      "Profile has been saved and uploaded successfully."
    );
    this.txt_previewName = page.getByRole("heading", {
      name: fullName.toUpperCase(),
    });
    this.txt_previewBio = page.getByText(bio, { exact: true });
    this.txt_previewAddress = page.getByText(address, { exact: true });
  }

  async fill_inputName(fullName) {
    await this.input_nameResume.fill(fullName);
  }

  async fill_inputPhoneNumber(phoneNumber) {
    await this.input_phoneResume.fill(phoneNumber);
  }

  async fill_inputEmail(email) {
    await this.input_emailResume.fill(email);
  }

  async fill_inputLinkedInUrl(linkedinUrl) {
    await this.input_linkedInResume.fill(linkedinUrl);
  }

  async fill_inputPortfolio(portfolioUrl) {
    await this.input_portfolioResume.fill(portfolioUrl);
  }

  async fill_inputAddress(address) {
    await this.input_addressResume.fill(address);
  }

  async fill_inputBio(bio) {
    await this.input_bioResume.fill(bio);
  }

  async visible_previewName() {
    await expect(this.txt_previewName).toBeVisible();
  }

  async visible_previewAddress() {
    await expect(this.txt_previewAddress).toBeVisible();
  }

  async visible_previewBio() {
    await expect(this.txt_previewBio).toBeVisible();
  }

  async fill_uploadProfileImage(fileDir) {
    await this.upload_profileImage.setInputFiles(fileDir);
    await this.btn_uploadConfirmation.click();
  }

  async visible_toastSuccessUploadImage() {
    await expect(this.toast_successUploadImage).toBeVisible();
  }
};

exports.stepResume_workExperiences = class stepResume_workExperiences {
  constructor(
    page,
    monthStartDate,
    yearStartDate,
    monthEndDate,
    yearEndDate,
    companyName,
    companyLocation,
    role,
    companyDescription,
    roleDescription
  ) {
    this.page = page;
    this.btn_addExperience = page.getByRole("button", {
      name: "Add experience",
    });
    this.input_companyName = page.locator("//input[@id='company-name']");
    this.input_role = page.locator("//input[@id='job-title']");
    this.input_companyLocation = page.locator(
      "//input[@id='company-location']"
    );
    this.input_companyDescription = page.locator(
      "//textarea[@id='company-description']"
    );
    this.option_monthStartDate = page.locator(
      "//div[normalize-space()='Work Experiences']/ancestor::div[@class='container']/descendant::input[@id='start-date-month']"
    );
    this.select_monthStartDate = page.getByRole("option", {
      name: monthStartDate,
    });
    this.option_yearStartDate = page.locator(
      "//div[normalize-space()='Work Experiences']/ancestor::div[@class='container']/descendant::input[@id='start-date-year']"
    );
    this.select_yearStartDate = page.getByRole("option", {
      name: yearStartDate,
    });
    this.option_monthEndDate = page.locator(
      "//div[normalize-space()='Work Experiences']/ancestor::div[@class='container']/descendant::input[@id='end-date-month']"
    );
    this.select_monthEndDate = page.getByRole("option", { name: monthEndDate });
    this.option_yearEndDate = page.locator(
      "//div[normalize-space()='Work Experiences']/ancestor::div[@class='container']/descendant::input[@id='end-date-year']"
    );
    this.select_yearEndDate = page.getByRole("option", { name: yearEndDate });
    this.input_roleDescription = page.locator(
      "#elaboration-list-professional_experience0"
    );
    this.txt_previewCompanyName = page
      .locator("#pdf")
      .locator("text=" + companyName);
    this.txt_previewCompanyLocation = page
      .locator("table.body-title-country-date")
      .locator("span.body-country", { hasText: companyLocation });
    this.txt_previewRole = page.getByText(role, { exact: true });
    this.txt_previewCompanyDescription = page.getByText(companyDescription, {
      exact: true,
    });
    this.txt_previewRoleDescription = page
      .locator("#pdf")
      .getByText(roleDescription, { exact: true });
  }

  async click_buttonAddExperience() {
    await this.btn_addExperience.click();
  }

  async fill_inputCompanyName(companyName) {
    await this.input_companyName.fill(companyName);
  }

  async fill_inputRole(role) {
    await this.input_role.fill(role);
  }

  async fill_inputCompanyLocation(companyLocation) {
    await this.input_companyLocation.fill(companyLocation);
  }

  async fill_inputCompanyDescription(companyDescription) {
    await this.input_companyDescription.fill(companyDescription);
  }

  async fill_inputStartDate() {
    await this.option_monthStartDate.click();
    await this.select_monthStartDate.click();

    await this.option_yearStartDate.click();
    await this.select_yearStartDate.click();
  }

  async fill_inputEndDate() {
    await this.option_monthEndDate.click();
    await this.select_monthEndDate.click();

    await this.option_yearEndDate.click();
    await this.select_yearEndDate.click();
  }

  async fill_inputRoleDescription(roleDescription) {
    await this.input_roleDescription.fill(roleDescription);
  }

  async visible_previewCompanyName() {
    await expect(this.txt_previewCompanyName).toBeVisible();
  }

  async visible_previewCompanyLocation() {
    await expect(this.txt_previewCompanyLocation).toBeVisible();
  }

  async visible_previewRole() {
    await expect(this.txt_previewRole).toBeVisible();
  }

  async visible_previewCompanyDescription() {
    await expect(this.txt_previewCompanyDescription).toBeVisible();
  }

  async visible_previewRoleDescription() {
    await expect(this.txt_previewRoleDescription).toBeVisible();
  }
};
