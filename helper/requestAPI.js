import axios from "axios";
import dataURL from "../testData/dataURL.json"; // URL API
import dataLogin from "../testData/dataLogin.json"; // Data login admin

export async function getAdminToken() {
  try {
    console.log("🔑 Logging in to get admin token...");

    const response = await axios.post(`${dataURL.apiURL}auth/login`, {
      email: dataLogin.email_admin,
      password: dataLogin.password_admin,
    });

    const token = response.data.access_token; // Sesuaikan dengan response API
    console.log("✅ Admin token retrieved:", token);
    return token;
  } catch (error) {
    console.error(
      "❌ Error getting admin token:",
      error.response ? error.response.data : error
    );
    return null;
  }
}

export async function getFeatureStatus(featureName) {
  try {
    const token = await getAdminToken();
    if (!token) {
      console.error("❌ Failed to get admin token. Skipping feature check...");
      return false;
    }

    console.log(`🔍 Checking status for feature: ${featureName}`);

    const response = await axios.get(
      `${dataURL.apiURL}system-configuration/${dataURL.ClientID}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    const response_body = response.data;
    const accessible_features = response_body.data.accessible_features || [];

    // Cek apakah featureName ada di dalam array accessible_features
    const isFeatureEnabled = accessible_features.includes(featureName);
    console.log(
      `✅ Feature ${featureName} is ${
        isFeatureEnabled ? "ENABLED" : "DISABLED"
      }`
    );

    return isFeatureEnabled;
  } catch (error) {
    console.error(
      `❌ Error fetching ${featureName} status:`,
      error.response ? error.response.data : error
    );
    return false;
  }
}
