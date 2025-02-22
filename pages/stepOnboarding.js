const { expect } = require("@playwright/test");

exports.stepOnBoarding = class stepOnBoarding {
  constructor(page) {
    this.page = page;
    this.modal_onboard = page.locator("//*[text()='Tell us more about you']");
    this.saveButton_onboard = page.locator(
      "//button[span[contains(text(), 'Save & Continue')]]"
    );

    // Onboarding V1
    this.text_fields = page.locator(
      "div[data-v-78383bc9] .v-text-field__slot input[type='string']"
    );
    this.select_fields = page.locator("div.v-select__slot input[placeholder]");
    this.number_fields = page.locator(
      "div[data-v-78383bc9] input[type='number']"
    );
    this.select_options = page.locator(".v-menu__content .v-list-item");

    // Onboarding V2
    this.step_1 = page.locator("//span[.='Step 1 of  1']");
    this.step_2 = page.locator("//span[.='Step 2 of  2']");
    this.year_field = page.locator("div[data-v-3b8b9a48] .vdp-datepicker");
    this.whatsapp_field = page.getByRole("textbox", {
      name: "Enter your WhatApp number",
    });
    this.select_fieldsv2 = page.locator(
      "div.v-select__slot input[placeholder]"
    );
    this.text_fieldsv2 = page.locator(
      "div[data-v-020023a5] .v-text-field__slot input[type='string']"
    );
    this.number_fieldsv2 = page.locator(
      "div[data-v-020023a5] input[type='number']"
    );
    this.select_optionsv2 = page.locator(".v-menu__content .v-list-item");
  }

  // // handle v1
  // async handle_OnbBoarding() {
  //   if (!(await this.modal_onboard.isVisible())) {
  //     console.log("Modal tidak muncul, lanjut...");
  //     return;
  //   }

  //   console.log("Modal onboarding muncul");

  //   const getRandomText = () => {
  //     const texts = ["Math", "Physics", "Bio", "Chem", "History"];
  //     return texts[Math.floor(Math.random() * texts.length)];
  //   };

  //   const getRandomNumber = () => {
  //     return Math.floor(Math.random() * 100).toString();
  //   };

  //   const fillFields = async (fieldsLocator, valueFunc) => {
  //     const fields = await fieldsLocator.all();
  //     for (const field of fields) {
  //       const value = valueFunc();
  //       console.log(`Mengisi field dengan: ${value}`);
  //       await field.fill(value);
  //     }
  //   };

  //   const fillSelectFields = async () => {
  //     const selectFields = await this.select_fields.all();
  //     for (const field of selectFields) {
  //       await field.click();
  //       await this.page.waitForSelector(".v-menu__content .v-list-item");
  //       const options = await this.select_options.all();
  //       if (options.length > 0) {
  //         await options[0].click();
  //       }
  //     }
  //   };

  //   if (await this.modal_onboard.isVisible()) {
  //     await fillFields(this.text_fields, getRandomText);
  //     await fillFields(this.number_fields, getRandomNumber);
  //     await fillSelectFields();
  //   } else {
  //     console.log("Modal tidak ditemukan.");
  //     return;
  //   }

  //   console.log("Klik tombol save...");
  //   await this.page.waitForSelector(
  //     "//button[span[contains(text(), 'Save & Continue')]]"
  //   );
  //   await this.saveButton_onboard.click();
  // }

  // handle v2

  async handle_OnboardingV2() {
    if (!(await this.modal_onboard.isVisible())) {
      console.log("Modal tidak muncul, lanjut...");
      return;
    }

    console.log("Modal onboarding V2 muncul");

    const getRandomText = () => {
      const texts = ["Math", "Physics", "Bio", "Chem", "History"];
      return texts[Math.floor(Math.random() * texts.length)];
    };

    const getRandomNumber = () => {
      return Math.floor(Math.random() * 100).toString();
    };

    const getRandomPhoneNumber = () => {
      return "08" + Math.floor(1000000000 + Math.random() * 9000000000);
    };

    const fillFields = async (fieldsLocator, valueFunc) => {
      const fields = await fieldsLocator.all();
      for (const field of fields) {
        const value = valueFunc();
        console.log(`Mengisi field dengan: ${value}`);
        await field.fill(value);
      }
    };

    const fillSelectFields = async () => {
      const selectFields = await this.select_fieldsv2.all();
      for (const field of selectFields) {
        await field.click();
        await this.page.waitForTimeout(500); // Tambah delay buat pastiin list muncul

        const options = await this.page
          .locator(".v-menu__content .v-list-item")
          .all();
        if (options.length > 0) {
          const randomOption =
            options[Math.floor(Math.random() * options.length)];
          console.log(`Memilih opsi: ${await randomOption.textContent()}`);
          await randomOption.click();
        } else {
          console.log("Tidak ada opsi yang tersedia untuk dipilih");
        }
      }
    };

    await fillFields(this.text_fieldsv2, getRandomText);
    await fillFields(this.number_fieldsv2, getRandomNumber);
    await this.whatsapp_field.fill(getRandomPhoneNumber());
    await fillSelectFields();

    console.log("Klik tombol save...");
    await this.saveButton_onboard.waitFor({ state: "visible" });
    await this.saveButton_onboard.click();

    if (await this.step_2.isVisible()) {
      console.log("Step 2 of 2 terdeteksi, lanjut...");
      await this.saveButton_onboard.waitFor({ state: "visible" });
      await this.saveButton_onboard.click();
    }
  }
};
