import { test, expect } from "@playwright/test";
import { stepLogin } from "../pages/stepLogin";
import { stepTou } from "../pages/stepTou";
import {
  stepResume,
  stepResume_personalDetails,
  stepResume_workExperiences,
  stepResume_education,
  stepResume_organization,
  stepResume_others,
} from "../pages/stepResume";

const dataURL = require("../testData/dataURL.json");
const dataLogin = require("../testData/dataLogin.json");
const dataResume = require("../testData/dataResume.json");

test.describe("TS-2: Resume", () => {
  let page,
    context,
    loginPage,
    resumePage,
    personalPage,
    workPage,
    educationPage,
    organizationPage,
    othersPage,
    touPanel;

  const personalInfo = dataResume["Personal Information"];
  const workInfo = dataResume["Work Experiences"];
  const educationInfo = dataResume["Education"];
  const organizationInfo = dataResume["Organization"];
  const othersInfo = dataResume["Others"];

  test.beforeAll(async ({ browser }) => {
    context = await browser.newContext();
    page = await context.newPage();

    // Inisialisasi objek halaman
    loginPage = new stepLogin(page);
    touPanel = new stepTou(page);
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
    educationPage = new stepResume_education(
      page,
      educationInfo.SchoolStartMonth,
      educationInfo.SchoolStartYear,
      educationInfo.SchoolEndMonth,
      educationInfo.SchoolEndYear,
      educationInfo.EducationLevel,
      educationInfo.SchoolName,
      educationInfo.SchoolLocation,
      educationInfo.Major,
      educationInfo.GPA,
      educationInfo.MaxGPA,
      educationInfo.SchoolActivity
    );
    organizationPage = new stepResume_organization(
      page,
      organizationInfo.OrganizationStartMonth,
      organizationInfo.OrganizationStartYear,
      organizationInfo.OrganizationEndMonth,
      organizationInfo.OrganizationEndYear,
      organizationInfo.OrganizationName,
      organizationInfo.OrganizationLocation,
      organizationInfo.OrganizationRole,
      organizationInfo.OrganizationDescription,
      organizationInfo.OrganizationRoleDescription
    );
    othersPage = new stepResume_others(
      page,
      othersInfo.OthersType,
      othersInfo.OthersYear,
      othersInfo.OtherElaboration
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
    await touPanel.handle_termsOfUse();
  });

  // Test Case 0: Buat resume baru tanpa title
  test("TC-0: Create resume with blank title", async () => {
    await resumePage.handle_btnResumeBuilder();
    await resumePage.handle_btnNewResume();
    await resumePage.handle_btnNewResumeBlank();
    await resumePage.verifyToastResumeCreatedVisible();
    await resumePage.verify_modal_ResumeTitle();
    await resumePage.click_saveResumeTitle();
    await resumePage.verify_blankFieldResumeTitle();
  });

  // Test Case 1: Buat Resume Baru
  test("TC-1: Create a new resume", async () => {
    console.log("Creating a new resume...");
    await resumePage.fill_inputResumeTitle(dataResume["Resume Title"]);
    await resumePage.click_saveResumeTitle();
    await resumePage.visible_toastSuccessResumeCreated();
    console.log("Resume created successfully.");
  });

  //Test Case 2: Isi Personal Details
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

  // Test Case 4: Isi Education Section
  test("TC-4: Education section", async () => {
    console.log("Filling education details...");

    await educationPage.click_buttonAddEducation();
    await educationPage.fill_inputSchoolName(educationInfo.SchoolName);
    await educationPage.fill_inputSchoolLocation(educationInfo.SchoolLocation);
    await educationPage.fill_inputSchoolStartDate();
    await educationPage.fill_inputSchoolEndDate();
    await educationPage.fill_inputEducationLevel();
    await educationPage.fill_inputMajor(educationInfo.Major);
    await educationPage.fill_inputGPA(educationInfo.GPA, educationInfo.MaxGPA);
    await educationPage.fill_inputSchoolActivity(educationInfo.SchoolActivity);

    console.log("Education details filled successfully.");

    console.log("Verifying education preview...");
    await educationPage.visible_previewSchoolName();
    await educationPage.visible_previewSchoolPeriod();
    await educationPage.visible_previewSchoolDetails();
    await educationPage.visible_previewSchoolActivity();
    console.log("Education preview verified successfully.");

    await resumePage.click_buttonSaveAndContinue();
  });

  // Test Case 5: Isi Organizational Experience
  test("TC-5: Organizational experience", async () => {
    console.log("Filling organizational experience...");

    await organizationPage.click_buttonAddOrgatization();
    await organizationPage.fill_inputOrganizationName(
      organizationInfo.OrganizationName
    );
    await organizationPage.fill_inputOrganizationRole(
      organizationInfo.OrganizationRole
    );
    await organizationPage.fill_inputOrganizationDescription(
      organizationInfo.OrganizationDescription
    );
    await organizationPage.fill_inputOrganizationLocation(
      organizationInfo.OrganizationLocation
    );
    await organizationPage.fill_inputOrganizationStartDate();
    await organizationPage.fill_inputOrganizationEndDate();
    await organizationPage.fill_inputOrganizationRoleDescription(
      organizationInfo.OrganizationRoleDescription
    );

    console.log("Organizational experience filled successfully.");

    console.log("Verifying organizational experience preview...");
    await organizationPage.visible_previewOrganizationName();
    await organizationPage.visible_previewOrganizationLocation();
    await organizationPage.visible_previewOrganizationPeriod();
    await organizationPage.visible_previewOrganizationRole();
    await organizationPage.visible_previewOrganizationDescription();
    await organizationPage.visible_previewOrganizationRoleDescription();
    console.log("Organizational experience preview verified successfully.");

    await resumePage.click_buttonSaveAndContinue();
  });

  // Test Case 6: Isi Other Section
  test("TC-6: Other section", async () => {
    console.log("Filling other section...");

    await othersPage.click_buttonAddOthers();
    await othersPage.fill_inputOthersType();
    await othersPage.fill_inputOthersYear();
    await othersPage.fill_inputOthersElaboration(othersInfo.OtherElaboration);

    console.log("Other section filled successfully.");

    console.log("Verifying other section preview...");
    await othersPage.visible_previewOthersType();
    await othersPage.visible_previewOthersYear();
    await othersPage.visible_previewOthersElaboration();
    console.log("Other section preview verified successfully.");

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

// test.describe("TS-3: Resume Option", () => {
//   let page, context, loginPage, resumePage, personalPage, workPage, touPanel;
//   const personalInfo = dataResume["Personal Information"];
//   const workInfo = dataResume["Work Experiences"];

//   test.beforeAll(async ({ browser }) => {
//     context = await browser.newContext();
//     page = await context.newPage();

//     // Inisialisasi objek halaman
//     loginPage = new stepLogin(page);
//     touPanel = new stepTou(page);
//     resumePage = new stepResume(page);

//     console.log("Opening URL...");
//     await loginPage.openUrl(dataURL.URL);
//     console.log("URL opened successfully.");

//     // Login ke aplikasi
//     await loginPage.click_buttonLoginStudent();
//     await loginPage.fill_inputEmail(dataLogin.email);
//     await loginPage.fill_inputPassword(dataLogin.password);
//     await loginPage.click_buttonSignIn();
//     await loginPage.visible_toastSuccessLogin();
//     await touPanel.handle_termsOfUse();
//   });

//   // Test Case 0: Buat resume baru tanpa title
//   test("TC-0: Create resume with blank title", async () => {
//     await resumePage.handle_btnResumeBuilder();
//     await resumePage.handle_btnNewResume();
//     await resumePage.handle_btnNewResumeBlank();
//     await resumePage.verifyToastResumeCreatedVisible();
//     await resumePage.verify_modal_ResumeTitle();
//     await resumePage.click_saveResumeTitle();
//     await resumePage.verify_blankFieldResumeTitle();
//   });

//   test.afterAll(async () => {
//     try {
//       console.log("Closing all resources...");
//       if (page) {
//         await page.close();
//         console.log("Page closed.");
//       }
//       if (context) {
//         await context.close();
//         console.log("Context closed.");
//       }
//     } catch (error) {
//       console.error("Error during cleanup:", error.message);
//     }
//   });
// });
