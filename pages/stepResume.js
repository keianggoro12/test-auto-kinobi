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
    this.field_resumeTitle = page.locator('//input[@required="required"]');
    this.btn_saveResumeTitle = page.getByRole("button", {
      name: "Save",
      exact: true,
    });
    this.toast_resumeTitleSaved = page.getByText(
      "Your resume title has been saved successfully!"
    );

    //resume title

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
};
