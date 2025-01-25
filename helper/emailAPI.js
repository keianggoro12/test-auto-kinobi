// helper/emailAPI.js
require("dotenv").config();
const { chromium } = require("playwright"); // Import Playwright
const he = require("he");
const { MailSlurp } = require("mailslurp-client");
const mailslurp = new MailSlurp({ apiKey: process.env.MAILSLURP_API_KEY });
const { decode } = require("html-entities");

async function createInbox(useCustomDomain = false) {
  try {
    let inbox;

    if (useCustomDomain) {
      inbox = await mailslurp.createInboxWithOptions({
        emailAddress: `juliardi+testauto${Math.floor(
          Math.random() * 1000
        )}@kinobi.asia`,
      });
      console.log(`Custom domain inbox created: ${inbox.emailAddress}`);
    } else {
      inbox = await mailslurp.createInbox();
      console.log(`MailSlurp default inbox created: ${inbox.emailAddress}`);
    }

    return inbox;
  } catch (error) {
    console.error("Error creating inbox:", error);
    throw error;
  }
}

async function getVerificationLink(inboxId) {
  const timeout = 60000; // Set timeout to 60 seconds

  // Wait for the latest email (instead of continuously fetching emails)
  const email = await mailslurp.waitForLatestEmail(inboxId, timeout);

  if (!email) {
    throw new Error("No email received within the timeout period");
  }

  console.log("Email fetched: ", email);

  // Log email body to debug
  console.log("Email Body:", email.body);

  const emailBody = email.body;

  // Regex to capture the full URL inside the <p class="body-action-url"> tag
  const linkMatch = emailBody.match(
    /<p class="body-action-url"[^>]*>(https?:\/\/[^<]+)<\/p>/
  );

  if (linkMatch && linkMatch[1]) {
    let verificationLink = linkMatch[1]; // Full URL inside the <p> tag
    console.log("Found verification link:", verificationLink);

    // Replace &#x3D; with '=' and add #reactive to the URL if necessary
    let decodedVerificationLink = verificationLink.replace(/&#x3D;/g, "=");

    // Append #reactive to the URL if it's not already there
    if (!decodedVerificationLink.includes("#reactive")) {
      decodedVerificationLink += "#reactive";
    }

    console.log("Decoded verification link:", decodedVerificationLink);

    // Launch the browser and create a context for the same tab
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext(); // New context to handle the session
    const page = await context.newPage(); // Open the main page tab

    // Directly navigate to the verification link in the same tab
    await page.goto(decodedVerificationLink);

    // Wait for 3 seconds before proceeding
    await page.waitForTimeout(3000);

    // After waiting, continue with your tests or close the tab
    await page.close(); // If you want to close the tab after verification, or remove this line if you need to keep it open

    // Optionally close the browser at the end of your test
    // await browser.close();

    return decodedVerificationLink; // Return the updated URL
  } else {
    throw new Error("Verification link not found in the email");
  }
}

module.exports = { createInbox, getVerificationLink };
