const { expect } = require("@playwright/test");

exports.stepTou = class stepTou {
  constructor(page) {
    this.page = page;
    this.modal_tou = page.locator(".v-dialog.v-dialog--active");
    this.touPanels = page.locator(".v-expansion-panel");
    this.btn_saveContinue = page.locator(
      "//button[span[contains(text(), 'Save & Continue')]]"
    );
    this.icon_checkbox_blank = ".v-input--selection-controls__ripple";
  }

  async handle_termsOfUse() {
    try {
      console.log("Waiting for the Terms of Use modal to appear...");
      await this.page.waitForSelector(".v-dialog.v-dialog--active", {
        state: "visible", // Waiting for the modal to appear and be visible
        timeout: 5000, // Timeout 5 seconds
      });
      console.log("Terms of Use modal appeared.");
    } catch (error) {
      console.log(
        "Terms of Use modal did not appear within the specified time."
      );
      return; // If the modal doesn't appear within the specified time, continue
    }

    if (await this.modal_tou.isVisible()) {
      console.log("TOU modal found and visible.");
      try {
        console.log("Waiting for TOU panels to appear...");
        await this.page.waitForSelector(".v-expansion-panel", {
          state: "visible", // Waiting for TOU panels to appear and be visible
          timeout: 5000, // Timeout 5 seconds
        });
        console.log("TOU panels appeared.");
      } catch (error) {
        console.log("TOU panels did not appear within the specified time.");
        return; // If the panels don't appear within the specified time, continue
      }

      // Get all TOU panels
      const panels = await this.touPanels.all();
      console.log(`Found ${panels.length} TOU panels.`);

      if (panels.length === 0) {
        console.log("No TOU panels found, continuing process.");
        return; // If no TOU panels, continue
      }

      // Loop through to click the TOU panels and check the checkboxes inside them
      for (const panel of panels) {
        // Click panel to open content
        await panel.click();
        console.log("TOU panel clicked.");

        // Click the checkbox icon to check it
        await panel.locator(this.icon_checkbox_blank).click();
        console.log("Checkbox checked.");
      }

      if (await this.btn_saveContinue.isEnabled()) {
        await this.btn_saveContinue.click();
        console.log("Save & Continue button clicked.");
      } else {
        console.log("Save & Continue button is not enabled, cannot click.");
      }
    } else {
      console.log("Terms of Use modal not visible, proceeding directly.");
    }
  }
};
