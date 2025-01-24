import { test, expect } from "@playwright/test";
import { stepLogin } from "../pages/stepLogin";
import {
  stepResume,
  stepResume_personalDetails,
  stepResume_workExperiences,
} from "../pages/stepResume";

const dataURL = require("../testData/dataURL.json");
const dataLogin = require("../testData/dataLogin.json");
const dataResume = require("../testData/dataResume.json");

test.describe("TS-2: Resume", () => {
  let page, context, loginPage, resumePage, personalPage, workPage;
  const personalInfo = dataResume["Personal Information"];
  const workInfo = dataResume["Work Experiences"];

  test.beforeAll(async ({ browser }) => {
    context = await browser.newContext();
    page = await context.newPage();

    // Inisialisasi objek halaman
    loginPage = new stepLogin(page);
    resumePage = new stepResume(page);
    personalPage = new stepResume_personalDetails(
      page,
      personalInfo.Name,
      personalInfo.Bio,
      personalInfo.Address
    );
    workPage = new stepResume_workExperiences(
      page,
      workInfo.monthStartDate,
      workInfo.yearStartDate,
      workInfo.monthEndDate,
      workInfo.yearEndDate,
      workInfo.CompanyName,
      workInfo.CompanyLocation,
      workInfo.Role,
      workInfo.CompanyDescription,
      workInfo.roleDescription
    );

    console.log("Opening URL...");
    await loginPage.openUrl(dataURL.URL);
    console.log("URL opened successfully.");

    // Login ke aplikasi
    await loginPage.click_buttonLoginStudent();
    await loginPage.fill_inputEmail(dataLogin.email);
    await loginPage.fill_inputPassword(dataLogin.password);
    await loginPage.click_buttonSignIn();
    await loginPage.visible_toastSuccessLogin();
  });

  // Test Case 1: Buat Resume Baru
  test("TC-1: Create a new resume", async () => {
    console.log("Creating a new resume...");
    await resumePage.handle_btnResumeBuilder();
    await resumePage.handle_btnNewResume();
    await resumePage.handle_btnNewResumeBlank();
    await resumePage.verifyToastResumeCreatedVisible();
    await resumePage.fill_inputResumeTitle(dataResume["Resume Title"]);
    await resumePage.visible_toastSuccessResumeCreated();
    console.log("Resume created successfully.");
  });

  // Test Case 2: Isi Personal Details
  test("TC-2: Fill personal details", async () => {
    console.log("Filling in personal details...");

    await personalPage.fill_inputName(personalInfo.Name);
    await personalPage.fill_inputPhoneNumber(personalInfo.PhoneNumber);
    await personalPage.fill_inputEmail(personalInfo.Email);
    await personalPage.fill_inputLinkedInUrl(personalInfo.LinkedIn);
    await personalPage.fill_inputPortfolio(personalInfo.Portfolio);
    await personalPage.fill_inputAddress(personalInfo.Address);
    await personalPage.fill_inputBio(personalInfo.Bio);
    console.log("Personal details filled successfully.");

    console.log("Uploading profile image...");
    await personalPage.fill_uploadProfileImage("testData/images/image.jpg");
    await personalPage.visible_toastSuccessUploadImage();
    console.log("Profile image uploaded successfully.");

    console.log("Verifying preview details...");
    await personalPage.visible_previewName();
    await personalPage.visible_previewAddress();
    await personalPage.visible_previewBio();
    console.log("Preview details verified successfully.");
    await resumePage.click_buttonSaveAndContinue();
  });

  // Test Case 3: Isi Pengalaman Kerja
  test("TC-3: Work experience", async () => {
    await workPage.click_buttonAddExperience();
    await workPage.fill_inputCompanyName(workInfo.CompanyName);
    await workPage.fill_inputRole(workInfo.Role);
    await workPage.fill_inputCompanyLocation(workInfo.CompanyLocation);
    await workPage.fill_inputCompanyDescription(workInfo.CompanyDescription);
    await workPage.fill_inputStartDate();
    await workPage.fill_inputEndDate();
    await workPage.fill_inputRoleDescription(workInfo.roleDescription);

    console.log("Work experience filled successfully.");

    await workPage.visible_previewCompanyName();
    await workPage.visible_previewCompanyLocation();
    await workPage.visible_previewRole();
    await workPage.visible_previewCompanyDescription();
    await workPage.visible_previewRoleDescription();
    console.log("Work experience preview verified successfully.");

    await resumePage.click_buttonSaveAndContinue();
  });

  test.afterAll(async () => {
    try {
      console.log("Closing all resources...");
      if (page) {
        await page.close();
        console.log("Page closed.");
      }
      if (context) {
        await context.close();
        console.log("Context closed.");
      }
    } catch (error) {
      console.error("Error during cleanup:", error.message);
    }
  });
});
