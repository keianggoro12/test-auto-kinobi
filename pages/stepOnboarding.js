const { expect } = require("@playwright/test");

exports.stepOnBoarding = class stepOnBoarding {
  constructor(page) {
    this.page = page;
    this.modal_onboard = page.locator("//*[text()='Tell us more about you']");
    this.text_fields = page.locator(".v-text-field__slot input");
    this.select_fields = page.locator(".v-select__slot input");
    this.number_fields = page.locator("input[type='number']");
    this.select_options = page.locator(".v-menu__content .v-list-item");
    this.saveButton_onboard = page.locator(
      "//button[span[contains(text(), 'Save & Continue')]]"
    );
  }

  async handle_OnbBoarding() {
    // Cek apakah modal muncul
    if (!(await this.modal_onboard.isVisible())) {
      console.log("Modal tidak muncul, lanjut...");
      return;
    }

    console.log("Modal onboarding muncul");

    // Mengisi text fieldsx
    const textFields = await this.text_fields.all();
    for (const field of textFields) {
      const value = this.getRandomText();
      console.log(`Mengisi text field dengan: ${value}`);
      await field.fill(value);
    }

    // Mengisi number fields
    const numberFields = await this.number_fields.all();
    for (const field of numberFields) {
      const value = this.getRandomNumber();
      console.log(`Mengisi number field dengan: ${value}`);
      await field.fill(value);
    }

    // Mengisi select fields
    const selectFields = await this.select_fields.all();
    for (const field of selectFields) {
      await field.click();
      await this.page.waitForSelector(".v-menu__content .v-list-item"); // Pastikan dropdown muncul
      const options = await this.select_options.all();
      if (options.length > 0) {
        const randomIndex = Math.floor(Math.random() * options.length);
        console.log(`Memilih opsi dropdown ke-${randomIndex + 1}`);
        await options[randomIndex].click();
      }
    }

    // Klik tombol save
    await this.saveButton_onboard.click();
    console.log("Tombol save diklik");
  }

  getRandomText() {
    const texts = ["Mathematics", "Physics", "Chemistry", "Biology", "History"];
    return texts[Math.floor(Math.random() * texts.length)];
  }

  getRandomNumber() {
    return Math.floor(Math.random() * 100).toString();
  }
};
