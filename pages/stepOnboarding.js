const { expect } = require("@playwright/test");

exports.stepOnBoarding = class stepOnBoarding {
  constructor(page) {
    this.page = page;
    this.modal_onboard = page.locator("//*[text()='Tell us more about you']");
    this.text_fields = page.locator(
      "div[data-v-78383bc9] .v-text-field__slot input[type='string']"
    );
    this.select_fields = page.locator("div.v-select__slot input[placeholder]");
    this.number_fields = page.locator(
      "div[data-v-78383bc9] input[type='number']"
    );
    this.select_options = page.locator(".v-menu__content .v-list-item");
    this.saveButton_onboard = page.locator(
      "//button[span[contains(text(), 'Save & Continue')]]"
    );
  }

  async handle_OnbBoarding() {
    if (!(await this.modal_onboard.isVisible())) {
      console.log("Modal tidak muncul, lanjut...");
      return;
    }

    console.log("Modal onboarding muncul");

    // Fungsi untuk mendapatkan teks acak
    const getRandomText = () => {
      const texts = ["Math", "Physics", "Bio", "Chem", "History"];
      return texts[Math.floor(Math.random() * texts.length)];
    };

    // Fungsi untuk mendapatkan angka acak
    const getRandomNumber = () => {
      return Math.floor(Math.random() * 100).toString();
    };

    // Fungsi untuk mengisi input fields
    const fillFields = async (fieldsLocator, valueFunc) => {
      const fields = await fieldsLocator.all();
      for (const field of fields) {
        const value = valueFunc();
        console.log(`Mengisi field dengan: ${value}`);
        await field.fill(value);
      }
    };

    // Fungsi untuk mengisi dropdown/select fields
    const fillSelectFields = async () => {
      const selectFields = await this.select_fields.all();
      for (const field of selectFields) {
        await field.click();
        await this.page.waitForSelector(".v-menu__content .v-list-item");
        const options = await this.select_options.all();
        if (options.length > 0) {
          await options[0].click();
        }
      }
    };

    // Fungsi untuk mengecek apakah semua field terisi
    const checkAllFieldsFilled = async () => {
      const textFields = await this.text_fields.all();
      const numberFields = await this.number_fields.all();
      const selectFields = await this.select_fields.all();

      let fieldsFilled = true;

      // Cek apakah semua field sudah diisi
      for (const field of textFields) {
        const value = await field.inputValue();
        if (!value) {
          console.log("Field teks belum diisi");
          fieldsFilled = false;
        }
      }

      for (const field of numberFields) {
        const value = await field.inputValue();
        if (!value) {
          console.log("Field angka belum diisi");
          fieldsFilled = false;
        }
      }

      for (const field of selectFields) {
        const value = await field.inputValue();
        if (!value) {
          console.log("Field select belum diisi");
          fieldsFilled = false;
        }
      }

      return fieldsFilled;
    };

    // Pastikan modal terlihat
    if (await this.modal_onboard.isVisible()) {
      // Isi semua field
      await fillFields(this.text_fields, getRandomText);
      await fillFields(this.number_fields, getRandomNumber);
      await fillSelectFields();
    } else {
      console.log("Modal tidak ditemukan.");
      return;
    }

    // Pastikan semua field terisi sebelum mengklik tombol Save
    const allFieldsFilled = await checkAllFieldsFilled();
    if (allFieldsFilled) {
      console.log("Semua field terisi, klik tombol save...");
      await this.page.waitForSelector(
        "//button[span[contains(text(), 'Save & Continue')]]"
      );
      await this.saveButton_onboard.click();
    } else {
      console.log("Belum semua field terisi, tidak klik tombol save.");
    }
  }
};
