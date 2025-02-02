import axios from "axios";

export const shipmentAuth = async (req, res, next) => {
  try {
    const fedexResponse = await axios.post(
      "https://apis-sandbox.fedex.com/oauth/token",
      {
        grant_type: "client_credentials",
        client_id: "l7208f1f278bfe47ae9979241347f93317",
        client_secret: "7bf47444abcb4251b4b68c3135e63899",
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    const accessToken = fedexResponse.data.access_token;
    req.shipmentAuthToken = accessToken;
    next();
  } catch (error) {
    console.error("Error authenticating with FedEx:", error);
    res.status(500).json({ error: "Failed to authenticate with FedEx" });
  }
};
