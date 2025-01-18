const { expect } = require("@playwright/test");

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
