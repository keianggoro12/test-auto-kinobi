const { expect } = require("@playwright/test");

exports.stepTou = class stepTou {
  constructor(page) {
    this.page = page;

    // Modal TOU
    this.modal_tou = page.locator(".v-dialog.v-dialog--active"); // Selector untuk modal TOU

    // Panel dan checkbox TOU
    this.touPanels = page.locator(".v-expansion-panel"); // Selector untuk semua panel TOU
    this.btn_saveContinue = page.locator(
      "//button[span[contains(text(), 'Save & Continue')]]"
    ); // Tombol Save & Continue

    // Ikon checkbox dalam panel TOU
    this.icon_checkbox_blank = ".v-input--selection-controls__ripple"; // Ikon checkbox belum dicentang
  }

  async handle_termsOfUse() {
    // Tunggu modal Terms of Use muncul dan pastikan terlihat
    try {
      console.log("Menunggu modal Terms of Use muncul...");
      await this.page.waitForSelector(".v-dialog.v-dialog--active", {
        state: "visible", // Menunggu modal muncul dan terlihat
        timeout: 5000, // Timeout 5 detik
      });
      console.log("Modal Terms of Use muncul.");
    } catch (error) {
      console.log(
        "Modal Terms of Use tidak muncul dalam waktu yang ditentukan."
      );
      return; // Jika modal tidak muncul dalam waktu yang ditentukan, lanjutkan
    }

    // Pastikan modal TOU ditemukan dan terlihat
    if (await this.modal_tou.isVisible()) {
      console.log("Modal TOU ditemukan dan terlihat.");

      // Tunggu panel TOU terlihat sebelum ambil
      try {
        console.log("Menunggu panel TOU terlihat...");
        await this.page.waitForSelector(".v-expansion-panel", {
          state: "visible", // Menunggu panel-panel TOU muncul dan terlihat
          timeout: 5000, // Timeout 5 detik
        });
        console.log("Panel TOU terlihat.");
      } catch (error) {
        console.log("Panel TOU tidak muncul dalam waktu yang ditentukan.");
        return; // Jika panel tidak muncul dalam waktu yang ditentukan, lanjutkan
      }

      // Ambil semua panel TOU
      const panels = await this.touPanels.all();
      console.log(`Ditemukan ${panels.length} panel TOU.`);

      if (panels.length === 0) {
        console.log("Tidak ada panel TOU, lanjutkan proses.");
        return; // Jika tidak ada panel TOU, lanjutkan
      }

      // Loop untuk mengklik panel TOU dan checkbox di dalamnya
      for (const panel of panels) {
        // Klik panel untuk membuka konten
        await panel.click();
        console.log("Panel TOU diklik.");

        // Klik ikon checkbox untuk mencentang
        await panel.locator(this.icon_checkbox_blank).click();
        console.log("Checkbox dicentang.");
      }

      // Periksa dan klik tombol Save & Continue jika bisa
      if (await this.btn_saveContinue.isEnabled()) {
        await this.btn_saveContinue.click();
        console.log("Tombol Save & Continue diklik.");
      } else {
        console.log("Tombol Save & Continue tidak aktif, tidak bisa diklik.");
      }
    } else {
      console.log("Modal Terms of Use tidak terlihat, langsung lanjut.");
    }
  }
};
