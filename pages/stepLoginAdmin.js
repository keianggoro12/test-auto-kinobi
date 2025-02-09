const { expect } = require("@playwright/test");

exports.stepLoginAdmin = class stepLoginAdmin {
  constructor(page) {
    //tulis disini element nya
    this.page = page;
  }
  async fill_inputEmailAdmin(email) {
    await this.email_field.fill(email);
  }
  async fill_inputPasswordAdmin(password) {
    await this.password_field.fill(password);
  }
};
