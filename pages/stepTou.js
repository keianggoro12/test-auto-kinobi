const { expect } = require("@playwright/test");

exports.stepTou = class stepTou {
  constructor(page) {
    this.page = page;
    this.btn_tou = page.locator(
      "//button[contains(@class, 'v-expansion-panel-header')]"
    );
    this.checkbox_tou = page.locator(
      "//input[@type='checkbox' and contains(@id, 'input-')]"
    );
    this.btn_saveContinue = page.locator(
      "//button[span[contains(text(), 'Save & Continue')]]"
    );
  }

  async handle_termsOfUse() {
    const touPanels = await this.btn_tou.all();
    if (!touPanels.length)
      return console.log("Tidak ada Terms of Use yang muncul.");

    for (const panel of touPanels) {
      await panel.click(); // Klik untuk membuka TOU

      const checkbox = panel.locator(
        "//input[@type='checkbox' and contains(@id, 'input-')]"
      );
      await checkbox.waitFor({ state: "visible" });

      if (!(await checkbox.isChecked())) {
        await checkbox.check();
        console.log("Checkbox dicentang.");
      }
    }

    if (await this.btn_saveContinue.isVisible())
      await this.btn_saveContinue.click();
  }
};
