import { test, expect } from "@playwright/test";
import { stepLogin } from "../pages/stepLogin";
import { stepResume, stepResume_personalDetails } from "../pages/stepResume";

const dataURL = require("../testData/dataURL.json");
const dataLogin = require("../testData/dataLogin.json");
const dataResume = require("../testData/dataResume.json");

test.describe("TS-2: Resume", () => {
  let loginPage;
  let resumePage;
  let context;
  let personalPage;
  let page;

  // Menyiapkan context dan page sebelum semua tes
  test.beforeAll(async ({ browser }) => {
    context = await browser.newContext();
    page = await context.newPage(); // Hanya satu page yang digunakan
    loginPage = new stepLogin(page);
    resumePage = new stepResume(page);

    console.log("Opening URL...");
    await loginPage.openUrl(dataURL.URL);
    console.log("URL opened successfully.");

    await loginPage.click_buttonLoginStudent();
    await loginPage.fill_inputEmail(dataLogin.email);
    await loginPage.fill_inputPassword(dataLogin.password);
    await loginPage.click_buttonSignIn();
    await loginPage.visible_toastSuccessLogin();
  });

  // Test Case 1: Buat Resume Baru
  test("TC-1: Create a new resume", async () => {
    const title = dataResume["Resume Title"];

    // Buat resume baru
    await resumePage.handle_btnResumeBuilder();
    await resumePage.handle_btnNewResume();
    await resumePage.handle_btnNewResumeBlank();
    await resumePage.verifyToastResumeCreatedVisible();
    await resumePage.fill_inputResumeTitle(title);
    await resumePage.visible_toastSuccessResumeCreated();
  });

  // Test Case 2: Isi Personal Details
  test("TC-2: Fill personal details", async () => {
    const fullName = dataResume["Personal Information"].Name;
    const phoneNumber = dataResume["Personal Information"].PhoneNumber;
    const email = dataResume["Personal Information"].Email;
    const linkedinUrl = dataResume["Personal Information"].LinkedIn;
    const portfolioUrl = dataResume["Personal Information"].Portfolio;
    const address = dataResume["Personal Information"].Address;
    const bio = dataResume["Personal Information"].Bio;
    const profileImage = "testData/images/image.jpg";

    // Hanya deklarasikan personalPage sekali
    personalPage = new stepResume_personalDetails(page, fullName, bio, address);

    console.log("Navigating to Resume Personal Information section...");
    console.log("Navigation successful.");

    console.log("Filling in personal details...");
    await personalPage.fill_inputName(fullName);
    await personalPage.fill_inputPhoneNumber(phoneNumber);
    await personalPage.fill_inputEmail(email);
    await personalPage.fill_inputLinkedInUrl(linkedinUrl);
    await personalPage.fill_inputPortfolio(portfolioUrl);
    await personalPage.fill_inputAddress(address);
    await personalPage.fill_inputBio(bio);
    console.log("Personal details filled successfully.");

    console.log("Uploading profile image...");
    await personalPage.fill_uploadProfileImage(profileImage);
    await personalPage.visible_toastSuccessUploadImage();
    console.log("Profile image uploaded successfully.");

    console.log("Verifying preview details...");
    await personalPage.visible_previewName();
    await personalPage.visible_previewAddress();
    await personalPage.visible_previewBio();
    console.log("Preview details verified successfully.");
  });
});
