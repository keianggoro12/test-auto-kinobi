const { expect } = require("@playwright/test");
const { createInbox, getVerificationLink } = require("../helper/emailAPI");

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
    this.blank_field_resumeTitle = page.getByText("Title is required");
    this.field_resumeTitle = page.locator('//input[@required="required"]');
    this.btn_saveResumeTitle = page.getByRole("button", {
      name: "Save",
      exact: true,
    });
    this.toast_resumeTitleSaved = page.getByText(
      "Your resume title has been saved successfully!"
    );
    this.btn_continueResume = page.getByRole("button", {
      name: "Save & Continue",
    });
    this.threedot_ResumeCard = page.locator(
      ".v-btn__content i.mdi-dots-vertical"
    );

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
  async verify_blankFieldResumeTitle() {
    await this.blank_field_resumeTitle.waitFor({
      state: "visible",
      timeout: 5000,
    });
    await expect(this.blank_field_resumeTitle).toBeVisible();
  }
  async click_saveResumeTitle() {
    await this.btn_saveResumeTitle.waitFor({ state: "visible", timeout: 5000 });
    await this.btn_saveResumeTitle.click();
  }
  async fill_inputResumeTitle(resumeTitle) {
    await this.modal_resumeTitle.waitFor({ state: "visible", timeout: 5000 });
    await this.field_resumeTitle.fill(resumeTitle);
  }
  async verify_modal_ResumeTitle() {
    await this.field_resumeTitle.click();
    await this.modal_resumeTitle.waitFor({ state: "visible", timeout: 5000 });
  }
  async visible_toastSuccessResumeCreated() {
    await this.toast_resumeTitleSaved.waitFor({
      state: "visible",
      timeout: 5000,
    });
    await expect(this.toast_resumeTitleSaved).toBeVisible();
  }
  async click_buttonSaveAndContinue() {
    await this.btn_continueResume.waitFor({ state: "visible", timeout: 5000 });
    await this.btn_continueResume.click();
  }
  async click_randomOptionResumeCard() {
    const count = await this.threedot_ResumeCard.count();

    if (count > 0) {
      const randomIndex = Math.floor(Math.random() * count);
      await this.threedot_ResumeCard.nth(randomIndex).click();
    } else {
      console.log("No resume options available.");
    }
  }
};

exports.stepResume_personalDetails = class stepResume_personalDetails {
  constructor(page, fullName, bio, address) {
    this.page = page;
    this.input_nameResume = page.locator(
      "//span[normalize-space()='Fill In Your Personal Information']/ancestor::div[@class='container']/descendant::input[@id='name']"
    );
    this.input_phoneResume = page.locator(
      "//span[normalize-space()='Fill In Your Personal Information']/ancestor::div[@class='container']/descendant::input[@id='phone']"
    );
    this.input_emailResume = page.locator(
      "//span[normalize-space()='Fill In Your Personal Information']/ancestor::div[@class='container']/descendant::input[@id='email']"
    );
    this.input_linkedInResume = page.locator(
      "//span[normalize-space()='Fill In Your Personal Information']/ancestor::div[@class='container']/descendant::input[@id='linked-in']"
    );
    this.input_portfolioResume = page.locator(
      "//span[normalize-space()='Fill In Your Personal Information']/ancestor::div[@class='container']/descendant::input[@id='portfolio-url']"
    );
    this.input_addressResume = page.locator(
      "//span[normalize-space()='Fill In Your Personal Information']/ancestor::div[@class='container']/descendant::input[@id='address']"
    );
    this.input_bioResume = page.locator(
      "//span[normalize-space()='Fill In Your Personal Information']/ancestor::div[@class='container']/descendant::textarea[@id='description']"
    );
    this.upload_profileImage = page.locator('//input[@type="file"][2]');
    this.btn_uploadConfirmation = page.getByRole("button", {
      name: "Save",
      exact: true,
    });
    this.toast_successUploadImage = page.getByText(
      "Profile has been saved and uploaded successfully."
    );
    this.txt_previewName = page.getByRole("heading", {
      name: fullName.toUpperCase(),
    });
    this.txt_previewBio = page.getByText(bio, { exact: true });
    this.txt_previewAddress = page.getByText(address, { exact: true });
  }

  async fill_inputName(fullName) {
    await this.input_nameResume.fill(fullName);
  }

  async fill_inputPhoneNumber(phoneNumber) {
    await this.input_phoneResume.fill(phoneNumber);
  }

  async fill_inputEmail(email) {
    await this.input_emailResume.fill(email);
  }

  async fill_inputLinkedInUrl(linkedinUrl) {
    await this.input_linkedInResume.fill(linkedinUrl);
  }

  async fill_inputPortfolio(portfolioUrl) {
    await this.input_portfolioResume.fill(portfolioUrl);
  }

  async fill_inputAddress(address) {
    await this.input_addressResume.fill(address);
  }

  async fill_inputBio(bio) {
    await this.input_bioResume.fill(bio);
  }

  async visible_previewName() {
    await expect(this.txt_previewName).toBeVisible();
  }

  async visible_previewAddress() {
    await expect(this.txt_previewAddress).toBeVisible();
  }

  async visible_previewBio() {
    await expect(this.txt_previewBio).toBeVisible();
  }

  async fill_uploadProfileImage(fileDir) {
    await this.upload_profileImage.setInputFiles(fileDir);
    await this.btn_uploadConfirmation.click();
  }

  async visible_toastSuccessUploadImage() {
    await expect(this.toast_successUploadImage).toBeVisible();
  }
};

exports.stepResume_workExperiences = class stepResume_workExperiences {
  constructor(
    page,
    monthStartDate,
    yearStartDate,
    monthEndDate,
    yearEndDate,
    companyName,
    companyLocation,
    role,
    companyDescription,
    roleDescription
  ) {
    this.page = page;
    this.btn_addExperience = page.locator(
      "//div[@data-v-19a8b42a]//button[contains(@class, 'v-btn') and contains(., 'Add experience')]"
    );
    this.input_companyName = page.locator("//input[@id='company-name']");
    this.input_role = page.locator("//input[@id='job-title']");
    this.input_companyLocation = page.locator(
      "//input[@id='company-location']"
    );
    this.input_companyDescription = page.locator(
      "//textarea[@id='company-description']"
    );
    this.option_monthStartDate = page.locator(
      "//div[normalize-space()='Work Experiences']/ancestor::div[@class='container']/descendant::input[@id='start-date-month']"
    );
    this.select_monthStartDate = page.getByRole("option", {
      name: monthStartDate,
    });
    this.option_yearStartDate = page.locator(
      "//div[normalize-space()='Work Experiences']/ancestor::div[@class='container']/descendant::input[@id='start-date-year']"
    );
    this.select_yearStartDate = page.getByRole("option", {
      name: yearStartDate,
    });
    this.option_monthEndDate = page.locator(
      "//div[normalize-space()='Work Experiences']/ancestor::div[@class='container']/descendant::input[@id='end-date-month']"
    );
    this.select_monthEndDate = page.getByRole("option", { name: monthEndDate });
    this.option_yearEndDate = page.locator(
      "//div[normalize-space()='Work Experiences']/ancestor::div[@class='container']/descendant::input[@id='end-date-year']"
    );
    this.select_yearEndDate = page.getByRole("option", { name: yearEndDate });
    this.input_roleDescription = page.locator(
      "#elaboration-list-professional_experience0"
    );
    this.txt_previewCompanyName = page
      .locator("#pdf")
      .locator("text=" + companyName);
    this.txt_previewCompanyLocation = page
      .locator("table.body-title-country-date")
      .locator("span.body-country", { hasText: companyLocation });
    this.txt_previewRole = page.getByText(role, { exact: true });
    this.txt_previewCompanyDescription = page.getByText(companyDescription, {
      exact: true,
    });
    this.txt_previewRoleDescription = page
      .locator("#pdf")
      .getByText(roleDescription, { exact: true });
  }

  async click_buttonAddExperience() {
    await this.btn_addExperience.click();
  }

  async fill_inputCompanyName(companyName) {
    await this.input_companyName.fill(companyName);
  }

  async fill_inputRole(role) {
    await this.input_role.fill(role);
  }

  async fill_inputCompanyLocation(companyLocation) {
    await this.input_companyLocation.fill(companyLocation);
  }

  async fill_inputCompanyDescription(companyDescription) {
    await this.input_companyDescription.fill(companyDescription);
  }

  async fill_inputStartDate() {
    await this.option_monthStartDate.click();
    await this.select_monthStartDate.click();

    await this.option_yearStartDate.click();
    await this.select_yearStartDate.click();
  }

  async fill_inputEndDate() {
    await this.option_monthEndDate.click();
    await this.select_monthEndDate.click();

    await this.option_yearEndDate.click();
    await this.select_yearEndDate.click();
  }

  async fill_inputRoleDescription(roleDescription) {
    await this.input_roleDescription.fill(roleDescription);
  }

  async visible_previewCompanyName() {
    await expect(this.txt_previewCompanyName).toBeVisible();
  }

  async visible_previewCompanyLocation() {
    await expect(this.txt_previewCompanyLocation).toBeVisible();
  }

  async visible_previewRole() {
    await expect(this.txt_previewRole).toBeVisible();
  }

  async visible_previewCompanyDescription() {
    await expect(this.txt_previewCompanyDescription).toBeVisible();
  }

  async visible_previewRoleDescription() {
    await expect(this.txt_previewRoleDescription).toBeVisible();
  }
};
exports.stepResume_education = class stepResume_education {
  constructor(
    page,
    schoolStartMonth,
    schoolStartYear,
    schoolEndMonth,
    schoolEndYear,
    educationLevel,
    schoolName,
    schoolLocation,
    major,
    GPA,
    maxGPA,
    schoolActivity
  ) {
    this.page = page;

    this.btn_addEducation = page.getByRole("button", { name: "Add education" });
    this.input_schoolName = page.locator("//input[@id='school-name']");
    this.input_schoolLocation = page.locator("//input[@id='school-location']");
    this.option_schoolStartMonth = page.locator(
      "//div[normalize-space()='Education Level']/ancestor::div[@class='container']/descendant::input[@id='start-date-month']"
    );
    this.select_schoolStartMonth = page.getByRole("option", {
      name: schoolStartMonth,
    });
    this.option_schoolStartYear = page.locator(
      "//div[normalize-space()='Education Level']/ancestor::div[@class='container']/descendant::input[@id='start-date-year']"
    );
    this.select_schoolStartYear = page.getByRole("option", {
      name: schoolStartYear,
    });
    this.option_schoolEndMonth = page.locator(
      "//input[@id='graduation-date-month']"
    );
    this.select_schoolEndMonth = page.getByRole("option", {
      name: schoolEndMonth,
    });
    this.option_schoolEndYear = page.locator(
      "//input[@id='graduation-date-year']"
    );
    this.select_schoolEndYear = page.getByRole("option", {
      name: schoolEndYear,
    });
    this.option_educationLevel = page.locator("//input[@id='education-level']");
    this.select_educationLevel = page.getByText(educationLevel);
    this.input_Major = page.getByPlaceholder("Information System", {
      exact: false,
    });
    this.input_GPA = page.locator("//input[@id='gpa-recommended']");
    this.input_maxGPA = page.locator("//input[@id='max-gpa']");
    this.input_schoolActivity = page.locator("#elaboration-list-education0");
    this.txt_previewSchoolName = page.getByText(schoolName, { exact: true });
    this.txt_previewSchoolLocation = page.getByText("- " + schoolLocation);
    this.txt_previewSchoolPeriod = page.getByRole("cell", {
      name:
        schoolStartMonth +
        " " +
        schoolStartYear +
        " - " +
        schoolEndMonth +
        " " +
        schoolEndYear,
    });
    this.txt_previewSchoolDetails = page.getByText(
      educationLevel + " of " + major + ", " + GPA + "/" + maxGPA
    );
    this.txt_previewSchoolActivity = page
      .locator("#pdf")
      .getByText(schoolActivity);
  }

  async click_buttonAddEducation() {
    await this.btn_addEducation.click();
  }

  async fill_inputSchoolName(schoolName) {
    await this.input_schoolName.fill(schoolName);
    await this.input_schoolName.press("Enter");
  }

  async fill_inputSchoolLocation(schoolLocation) {
    await this.input_schoolLocation.fill(schoolLocation);
  }

  async fill_inputSchoolStartDate() {
    await this.option_schoolStartMonth.click();
    await this.select_schoolStartMonth.click();

    await this.option_schoolStartYear.click();
    await this.select_schoolStartYear.click();
  }

  async fill_inputSchoolEndDate() {
    await this.option_schoolEndMonth.click();
    await this.select_schoolEndMonth.click();

    await this.option_schoolEndYear.click();
    await this.select_schoolEndYear.click();
  }

  async fill_inputEducationLevel() {
    await this.option_educationLevel.click();
    await this.select_educationLevel.click();
  }

  async fill_inputMajor(major) {
    await this.input_Major.fill(major);
  }

  async fill_inputGPA(GPA, maxGPA) {
    await this.input_GPA.fill(GPA);
    await this.input_maxGPA.fill(maxGPA);
  }

  async fill_inputSchoolActivity(schoolActivity) {
    await this.input_schoolActivity.fill(schoolActivity);
  }

  async visible_previewSchoolName() {
    await expect(this.txt_previewSchoolName).toBeVisible();
  }

  async visible_previewSchoolPeriod() {
    await expect(this.txt_previewSchoolPeriod).toBeVisible();
  }

  async visible_previewSchoolDetails() {
    await expect(this.txt_previewSchoolDetails).toBeVisible();
  }

  async visible_previewSchoolActivity() {
    await expect(this.txt_previewSchoolActivity).toBeVisible();
  }
};

exports.stepResume_organization = class stepResume_organization {
  constructor(
    page,
    organizationStartMonth,
    organizationStartYear,
    organizationEndMonth,
    organizationEndYear,
    organizationName,
    organizationLocation,
    organizationRole,
    organizationDescription,
    organizationRoleDescription
  ) {
    this.page = page;
    this.btn_addOrganization = page.getByRole("button", {
      name: "Add experience",
    });
    this.input_organizationName = page.locator(
      "//input[@id='organization-name']"
    );
    this.input_organizationRole = page.locator(
      "//input[@id='your-role-title']"
    );
    this.input_organizationDescription = page.locator(
      "//textarea[@id='organisation-description']"
    );
    this.input_organizationLocation = page.locator(
      "//input[@id='organization-location']"
    );
    this.option_organizationStartMonth = page.locator(
      "//div[normalize-space()='Organisational Experience']/ancestor::div[@class='container']/descendant::input[@id='start-date-month']"
    );
    this.select_organizationStartMonth = page.getByRole("option", {
      name: organizationStartMonth,
    });
    this.option_organizationStartYear = page.locator(
      "//div[normalize-space()='Organisational Experience']/ancestor::div[@class='container']/descendant::input[@id='start-date-year']"
    );
    this.select_organizationStartYear = page.getByRole("option", {
      name: organizationStartYear,
    });
    this.btn_dateCurrentStillActive = page
      .locator("div")
      .filter({ hasText: /^I am currently active here$/ })
      .nth(2);
    this.option_organizationEndMonth = page.locator(
      "//div[normalize-space()='Organisational Experience']/ancestor::div[@class='container']/descendant::input[@id='end-date-month']"
    );
    this.select_organizationEndMonth = page.getByRole("option", {
      name: organizationEndMonth,
    });
    this.option_organizationEndYear = page.locator(
      "//div[normalize-space()='Organisational Experience']/ancestor::div[@class='container']/descendant::input[@id='end-date-year']"
    );
    this.select_organizationEndYear = page.getByRole("option", {
      name: organizationEndYear,
    });
    this.input_organizationRoleDescription = page.locator(
      "#elaboration-list-leadership_experience0"
    );
    this.txt_previewOrganizationName = page.getByText(organizationName, {
      exact: true,
    });
    this.txt_previewOrganizationLocation = page.getByText(
      "- " + organizationLocation
    );
    this.txt_previewOrganizationPeriod = page.getByRole("cell", {
      name:
        organizationStartMonth +
        " " +
        organizationStartYear +
        " - " +
        organizationEndMonth +
        " " +
        organizationEndYear,
    });
    this.txt_previewOrganizationRole = page.getByText(organizationRole, {
      exact: true,
    });
    this.txt_previewOrganizationDescription = page.getByText(
      organizationDescription
    );
    this.txt_previewOrganizationRoleDescription = page
      .locator("#pdf")
      .getByText(organizationRoleDescription);
  }

  async click_buttonAddOrgatization() {
    await this.btn_addOrganization.click();
  }
  async fill_inputOrganizationName(organizationName) {
    await this.input_organizationName.fill(organizationName);
  }
  async fill_inputOrganizationRole(organizationRole) {
    await this.input_organizationRole.fill(organizationRole);
  }
  async fill_inputOrganizationDescription(organizationDescription) {
    await this.input_organizationDescription.fill(organizationDescription);
  }

  async fill_inputOrganizationLocation(organizationLocation) {
    await this.input_organizationLocation.fill(organizationLocation);
  }

  async fill_inputOrganizationStartDate() {
    await this.option_organizationStartMonth.click();
    await this.select_organizationStartMonth.click();

    await this.option_organizationStartYear.click();
    await this.select_organizationStartYear.click();
  }

  async fill_inputOrganizationEndDate() {
    await this.btn_dateCurrentStillActive.click();

    await this.option_organizationEndMonth.click();
    await this.select_organizationEndMonth.click();

    await this.option_organizationEndYear.click();
    await this.select_organizationEndYear.click();
  }

  async fill_inputOrganizationRoleDescription(organizationRoleDescription) {
    await this.input_organizationRoleDescription.fill(
      organizationRoleDescription
    );
  }

  async visible_previewOrganizationName() {
    await expect(this.txt_previewOrganizationName).toBeVisible();
  }

  async visible_previewOrganizationLocation() {
    await expect(this.txt_previewOrganizationLocation).toBeVisible();
  }

  async visible_previewOrganizationPeriod() {
    await expect(this.txt_previewOrganizationPeriod).toBeVisible();
  }

  async visible_previewOrganizationRole() {
    await expect(this.txt_previewOrganizationRole).toBeVisible();
  }

  async visible_previewOrganizationDescription() {
    await expect(this.txt_previewOrganizationDescription).toBeVisible();
  }
  async visible_previewOrganizationRoleDescription() {
    await expect(this.txt_previewOrganizationRoleDescription).toBeVisible();
  }
};

exports.stepResume_others = class stepResume_others {
  constructor(page, othersType, othersYear, othersElaboration) {
    this.page = page;
    this.btn_addOthers = page.locator(
      "//div[@data-v-126f118b]//button[contains(@class, 'v-btn') and contains(., 'Add experience')]"
    );
    this.option_othersType = page.locator("//input[@id='category']");
    this.select_othersType = page.getByRole("option", { name: othersType });
    this.option_othersYear = page.locator("//input[@id='experience-year']");
    this.select_othersYear = page.getByRole("option", { name: othersYear });
    this.input_othersElaboration = page.locator(
      "//div[normalize-space()='Elaboration']/following-sibling::div/descendant::input"
    );
    this.txt_previewOthersType = page
      .locator("#pdf")
      .getByText(othersType, { exact: true });
    this.txt_previewOthersYear = page.getByText("(" + othersYear + ")");
    this.txt_previewOthersElaboration = page.getByText(
      ": " + othersElaboration
    );
  }

  async click_buttonAddOthers() {
    await this.btn_addOthers.waitFor({ state: "visible", timeout: 5000 });
    await this.btn_addOthers.click();
  }

  async fill_inputOthersType() {
    await this.option_othersType.click();
    await this.select_othersType.click();
  }

  async fill_inputOthersYear() {
    await this.option_othersYear.click();
    await this.select_othersYear.click();
  }

  async fill_inputOthersElaboration(othersElaboration) {
    await this.input_othersElaboration.fill(othersElaboration);
  }

  async visible_previewOthersType() {
    await expect(this.txt_previewOthersType).toBeVisible();
  }

  async visible_previewOthersYear() {
    await expect(this.txt_previewOthersYear).toBeVisible();
  }

  async visible_previewOthersElaboration() {
    await expect(this.txt_previewOthersElaboration).toBeVisible();
  }
};

exports.stepResume_review = class stepResume_review {
  constructor(page) {
    this.page = page;
    this.txt_tabHeader = page.getByText("Review your Resume");
    this.txt_resumeScore = page
      .locator("span")
      .filter({ hasText: ", your overall resume score is" });
    this.btn_saveAsDraft = page.getByRole("button", { name: "Save as Draft" });
    this.btn_completeDownload = page.getByRole("button", {
      name: "Complete & Download",
    });
    this.txt_resumeDownloaded = page.getByText("Congratulations!");
    this.txt_resumeCompleted = page.getByText(
      "Your resume has been successfully saved, and you're all set"
    );
    this.btn_closeDialogBox = page.locator("#btn_close");
    this.btn_startYourJourney = page.getByRole("button", {
      name: "Start Your Journey",
    });
    this.btn_backToResumeBuilder = page.getByRole("button", {
      name: "Back to resume builder",
    });
    this.txt_resumeTitle = page.getByText("Resume Title");
    this.txt_reviewYourResume = page.getByText("Review your Resume");
    this.section_personalInformation = page.getByRole("button", {
      name: "Personal Information",
      exact: false,
    });
    this.section_professionalExperience = page.getByRole("button", {
      name: "Professional Experience",
      exact: false,
    });
    this.section_education = page.getByRole("button", {
      name: "Education",
      exact: false,
    });
    this.section_organisational = page.getByRole("button", {
      name: "Organisational Experience",
      exact: false,
    });
    this.section_others = page.getByRole("button", {
      name: "Skills, Achievements & Other Experience",
      exact: false,
    });
  }
  async visible_txtTabHeader() {
    await expect(this.txt_tabHeader).toBeVisible();
  }

  async visible_txtResumeScore() {
    await expect(this.txt_resumeScore).toBeVisible();
  }

  async visible_buttonSaveAsDraft() {
    await expect(this.btn_saveAsDraft).toBeVisible();
  }

  async visible_buttonCompleteDownload() {
    await expect(this.btn_completeDownload).toBeVisible();
  }

  async click_buttonCompleteDownload() {
    await this.btn_completeDownload.click();
  }

  async visible_txtResumeDownloaded() {
    await expect(this.txt_resumeDownloaded).toBeVisible();
  }

  async visible_txtResumeCompleted() {
    await expect(this.txt_resumeCompleted).toBeVisible();
  }

  async visible_buttonCloseDialogBox() {
    await expect(this.btn_closeDialogBox).toBeVisible();
  }

  async click_buttonSaveAsDraft() {
    await this.btn_saveAsDraft.click();
  }

  async click_buttonStartYourJourney() {
    await this.btn_startYourJourney.click();
  }

  async click_buttonBackToResumeBuilder() {
    await this.btn_backToResumeBuilder.click();
  }

  async visible_sectionReview() {
    await expect(this.txt_resumeTitle).toBeVisible();
    await expect(this.txt_reviewYourResume).toBeVisible();
    await expect(this.section_personalInformation).toBeVisible();
    await expect(this.section_professionalExperience).toBeVisible();
    await expect(this.section_education).toBeVisible();
    await expect(this.section_organisational).toBeVisible();
    await expect(this.section_others).toBeVisible();
  }
};
