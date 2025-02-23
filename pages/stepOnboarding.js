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
    this.step_1of1 = page.locator("//span[.='Step 1 of  1']");
    this.step_1of2 = page.locator("//span[.='Step 1 of  2']");
    this.step_2of2 = page.locator("//span[.='Step 2 of  2']");
    this.year_field = page.locator("div[data-v-3b8b9a48] .vdp-datepicker");
    this.whatsapp_field = page.getByRole("textbox", {
      name: "Enter your WhatsApp number",
    });
    this.select_fieldsv2 = page.locator(
      "//div[contains(@class, 'v-select__slot')]"
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
    try {
      console.log("Waiting for the onboarding V2 modal to appear...");
      await this.page.waitForSelector("//*[text()='Tell us more about you']", {
        state: "visible",
        timeout: 5000, // Wait for up to 5 seconds
      });
      console.log("Onboarding V2 modal appeared.");
    } catch (error) {
      console.log(
        "Onboarding V2 modal did not appear within the specified time."
      );
      return; // If the modal doesn't appear within the timeout, continue without error
    }

    if (await this.modal_onboard.isVisible()) {
      console.log("Onboarding V2 modal found and visible.");
    } else {
      console.log("Onboarding V2 modal not found.");
      return;
    }

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

    const fillSelectFields = async (selectLocator) => {
      const selectFields = await selectLocator.all();
      console.log(`Ditemukan ${selectFields.length} select field`);

      for (let i = 0; i < selectFields.length; i++) {
        console.log(`Memilih opsi untuk select field ke-${i + 1}`);

        await this.page.keyboard.press("Escape");
        await this.page.waitForTimeout(300);

        await selectFields[i].click();
        await this.page.waitForTimeout(500);

        const dropdown = this.page.locator(".v-menu__content").nth(i);

        let previousOptionsCount = 0;
        let maxScrollAttempts = 10;
        let scrollAttempts = 0;

        while (scrollAttempts < maxScrollAttempts) {
          const options = await dropdown.locator(".v-list-item").all();
          if (options.length > previousOptionsCount) {
            previousOptionsCount = options.length;
            console.log(
              `Jumlah opsi tersedia: ${options.length}, scrolling...`
            );
            await dropdown.evaluate((el) => el.scrollBy(0, 300));
            await this.page.waitForTimeout(500);
          } else {
            break;
          }
          scrollAttempts++;
        }

        const options = await dropdown.locator(".v-list-item").all();

        if (options.length > 0) {
          const randomOption =
            options[Math.floor(Math.random() * options.length)];
          const optionText = await randomOption.textContent();
          console.log(`Memilih opsi: ${optionText}`);

          await randomOption.click();
          await this.page.waitForTimeout(500);
        } else {
          console.log("Tidak ada opsi yang tersedia untuk dipilih");
        }

        await this.page.waitForSelector(".v-menu__content", {
          state: "hidden",
        });
      }
    };

    // **Step 1**
    if (await this.step_1of2.isVisible()) {
      console.log("Step 1 of 2 terdeteksi, lanjut...");

      await fillFields(this.text_fieldsv2, getRandomText);
      await fillFields(this.number_fieldsv2, getRandomNumber);
      await this.whatsapp_field.fill(getRandomPhoneNumber());
      await fillSelectFields(this.select_fieldsv2);

      // Klik tombol dan tunggu sebelum lanjut
      await this.saveButton_onboard.waitFor({ state: "visible" });
      await this.saveButton_onboard.click();

      console.log("Menunggu perpindahan ke Step 2...");
      await this.page.waitForTimeout(1000);
      await this.page.screenshot({ path: "step1_completed.png" });

      // **Tunggu Step 2 benar-benar muncul**
      await this.page.waitForSelector("//span[.='Step 2 of  2']", {
        state: "visible",
        timeout: 5000,
      });
    }

    // **Step 2**
    if (await this.step_2of2.isVisible()) {
      console.log("Step 2 of 2 terdeteksi, lanjut...");

      await this.page.keyboard.press("Escape"); // Tutup dropdown yang mungkin masih terbuka
      await this.page.waitForTimeout(500);

      // Tunggu step 2 muncul sebelum mengisi field
      await this.step_2of2.waitFor({ state: "visible" });

      await fillFields(this.text_fieldsv2, getRandomText);
      await fillFields(this.number_fieldsv2, getRandomNumber);
      await fillSelectFields(this.select_fieldsv2);

      await this.saveButton_onboard.waitFor({ state: "visible" });
      await this.saveButton_onboard.click();
    }
  }
};
