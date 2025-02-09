const { expect } = require("@playwright/test");

exports.stepJobPortal = class stepApplyJob {
  constructor(page) {
    this.page = page;
  }
};
