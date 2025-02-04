import { google } from "googleapis";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// Load authentication key
const auth = new google.auth.GoogleAuth({
    keyFile: path.join(__dirname, "../config/service_account.json"), // Adjust path
    scopes: ["https://www.googleapis.com/auth/analytics.readonly"],
  });

  // Google Analytics Data API
async function getAnalyticsData() {
    const analyticsData = google.analyticsdata({ version: "v1beta", auth });
  
    const response = await analyticsData.properties.runReport({
      property: "properties/476082887", // Replace with your GA4 property ID
      requestBody: {
        dateRanges: [{ startDate: "today", endDate: "today" }],
        dimensions: [{ name: "country" }],
        metrics: [{ name: "activeUsers" }],
      },
    });
  
    return response.data;
  }

export const getAnalytics = async (req, res) => {
    try {
      const data = await getAnalyticsData();
      res.json(data);
    } catch (error) {
      console.error("Error fetching analytics:", error);
      res.status(500).json({ error: "Failed to fetch analytics data" });
    }
};
