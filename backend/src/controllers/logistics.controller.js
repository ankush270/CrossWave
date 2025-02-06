import axios from "axios";
import { Logistics } from "../models/logistics.model.js";
import { Pickup } from "../models/pickup.model.js";

// Add these mappings at the top of the file
const countryMapping = {
  'India': 'IN',
  'United Arab Emirates': 'AE',
  'United States': 'US',
  'China': 'CN',
  'Japan': 'JP',
  'United Kingdom': 'GB',
  // Common variations
  'in': 'IN',
  'ind': 'IN',
  'ae': 'AE',
  'uae': 'AE',
  'us': 'US',
  'usa': 'US',
  'uk': 'GB',
  'cn': 'CN',
  'jp': 'JP',
  // Already in code format
  'IN': 'IN',
  'AE': 'AE',
  'US': 'US',
  'GB': 'GB',
  'CN': 'CN',
  'JP': 'JP'
};

const indianStatesMapping = {
  // Full names to codes
  'Andhra Pradesh': 'AP',
  'Arunachal Pradesh': 'AR',
  'Assam': 'AS',
  'Bihar': 'BR',
  'Chhattisgarh': 'CG',
  'Goa': 'GA',
  'Gujarat': 'GJ',
  'Haryana': 'HR',
  'Himachal Pradesh': 'HP',
  'Jharkhand': 'JH',
  'Karnataka': 'KA',
  'Kerala': 'KL',
  'Madhya Pradesh': 'MP',
  'Maharashtra': 'MH',
  'Manipur': 'MN',
  'Meghalaya': 'ML',
  'Mizoram': 'MZ',
  'Nagaland': 'NL',
  'Odisha': 'OD',
  'Punjab': 'PB',
  'Rajasthan': 'RJ',
  'Sikkim': 'SK',
  'Tamil Nadu': 'TN',
  'Telangana': 'TS',
  'Tripura': 'TR',
  'Uttar Pradesh': 'UP',
  'Uttarakhand': 'UK',
  'West Bengal': 'WB',
  // Union Territories
  'Andaman and Nicobar Islands': 'AN',
  'Chandigarh': 'CH',
  'Dadra and Nagar Haveli and Daman and Diu': 'DH',
  'Delhi': 'DL',
  'Jammu and Kashmir': 'JK',
  'Ladakh': 'LA',
  'Lakshadweep': 'LD',
  'Puducherry': 'PY',
  // Common variations
  'AP': 'AP',
  'AR': 'AR',
  'AS': 'AS',
  'BR': 'BR',
  'CG': 'CG',
  'GA': 'GA',
  'GJ': 'GJ',
  'HR': 'HR',
  'HP': 'HP',
  'JH': 'JH',
  'KA': 'KA',
  'KL': 'KL',
  'MP': 'MP',
  'MH': 'MH',
  'MN': 'MN',
  'ML': 'ML',
  'MZ': 'MZ',
  'NL': 'NL',
  'OD': 'OD',
  'PB': 'PB',
  'RJ': 'RJ',
  'SK': 'SK',
  'TN': 'TN',
  'TS': 'TS',
  'TR': 'TR',
  'UP': 'UP',
  'UK': 'UK',
  'WB': 'WB'
};

const uaeStatesMapping = {
  // Emirates
  'Abu Dhabi': 'AZ',
  'Ajman': 'AJ',
  'Dubai': 'DU',
  'Fujairah': 'FU',
  'Ras Al Khaimah': 'RK',
  'Sharjah': 'SH',
  'Umm Al Quwain': 'UQ',
  // Common variations
  'AZ': 'AZ',
  'AJ': 'AJ',
  'DU': 'DU',
  'FU': 'FU',
  'RK': 'RK',
  'SH': 'SH',
  'UQ': 'UQ',
  // Alternative names
  'Abu Zaby': 'AZ',
  'Dubayy': 'DU',
  'Al Fujayrah': 'FU',
  'Ras al Khaymah': 'RK',
  'Ash Shariqah': 'SH',
  'Umm al Qaywayn': 'UQ'
};

export const createShipment = async (req, res, next) => {
  try {
    const { body } = req;
    console.log("Original Request body:", JSON.stringify(body, null, 2));

    // Create a deep copy of the request body
    let modifiedBody = JSON.parse(JSON.stringify(body));

    // Update recipient's state code and address
    modifiedBody.requestedShipment.recipients = modifiedBody.requestedShipment.recipients.map(recipient => {
      const stateOrProvince = recipient.address.stateOrProvinceCode;
      let stateCode;

      if (recipient.address.countryCode === 'IN') {
        stateCode = indianStatesMapping[stateOrProvince] || stateOrProvince;
      }else {
        stateCode = uaeStatesMapping[stateOrProvince] || stateOrProvince;
      }

      return {
        ...recipient,
        address: {
          ...recipient.address,
          stateOrProvinceCode: stateCode.toUpperCase()
        }
        };
    });

    // Update both recipient's address and commodity country codes
    modifiedBody.requestedShipment.customsClearanceDetail.commodities = 
      modifiedBody.requestedShipment.customsClearanceDetail.commodities.map(commodity => {
        const countryName = commodity.countryOfManufacture;
        const countryCode = countryMapping[countryName] || countryName;
        
        return {
          ...commodity,
          countryOfManufacture: countryCode.toUpperCase()
        };
    });

    console.log("Modified Request body:", JSON.stringify(modifiedBody, null, 2));

    const accessToken = req.shipmentAuthToken;
    if (!accessToken) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    let shipment;
    try {
      shipment = await axios.post(
        "https://apis-sandbox.fedex.com/ship/v1/shipments",
        modifiedBody,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
    } catch (axiosError) {
      console.error("FedEx API Error:", {
        status: axiosError.response?.status,
        data: axiosError.response?.data?.errors,
      });
      return res.status(axiosError.response?.status || 500).json({
        success: false,
        message: "Failed to create shipment with FedEx",
        error: axiosError.response?.data || axiosError.message
      });
    }

    const data = shipment?.data?.output?.transactionShipments[0];
    if (!data) {
      console.error("Invalid response from FedEx:", shipment?.data);
      return res.status(400).json({
        success: false,
        message: "Invalid response from FedEx API"
      });
    }
    console.log(req.params);
    
    const newShipment = new Logistics({
      seller_id: req.params.id,
      customerName: body.requestedShipment.recipients[0].contact.personName,
      destination: body.requestedShipment.recipients[0].address.city,
      transactionId: shipment.data.transactionId,
      trackingNumber: data.masterTrackingNumber,
      carrierCode: data?.completedShipmentDetail?.carrierCode,
      serviceId: data.completedShipmentDetail?.serviceDescription?.serviceId,
      serviceType: data.serviceType,
      serviceCategory: data.serviceCategory,
      totalBillingWeight:
        data.completedShipmentDetail?.shipmentRating?.shipmentRateDetails[0]
          ?.totalBillingWeight,
      surcharges:
        data.completedShipmentDetail?.shipmentRating?.shipmentRateDetails[0]
          ?.surcharges,
      totalBaseCharge:
        data.completedShipmentDetail?.shipmentRating?.shipmentRateDetails[0]
          ?.totalBaseCharge,
      totalNetCharge:
        data.completedShipmentDetail?.shipmentRating?.shipmentRateDetails[0]
          ?.totalNetCharge,
      totalFreightDiscounts:
        data.completedShipmentDetail?.shipmentRating?.shipmentRateDetails[0]
          ?.totalFreightDiscounts,
      totalNetFreight:
        data.completedShipmentDetail?.shipmentRating?.shipmentRateDetails[0]
          ?.totalNetFreight,
      totalSurcharges:
        data.completedShipmentDetail?.shipmentRating?.shipmentRateDetails[0]
          ?.totalSurcharges,
      totalNetFedExCharge:
        data.completedShipmentDetail?.shipmentRating?.shipmentRateDetails[0]
          ?.totalNetFedExCharge,
      totalTaxes:
        data.completedShipmentDetail?.shipmentRating?.shipmentRateDetails[0]
          ?.totalTaxes,
      totalRebates:
        data.completedShipmentDetail?.shipmentRating?.shipmentRateDetails[0]
          ?.totalRebates,
      totalDutiesAndTaxes:
        data.completedShipmentDetail?.shipmentRating?.shipmentRateDetails[0]
          ?.totalDutiesAndTaxes,
      totalAncillaryFeesAndTaxes:
        data.completedShipmentDetail?.shipmentRating?.shipmentRateDetails[0]
          ?.totalAncillaryFeesAndTaxes,
      totalDutiesTaxesAndFees:
        data.completedShipmentDetail?.shipmentRating?.shipmentRateDetails[0]
          ?.totalDutiesTaxesAndFees,
      totalNetChargeWithDutiesAndTaxes:
        data.completedShipmentDetail?.shipmentRating?.shipmentRateDetails[0]
          ?.totalNetChargeWithDutiesAndTaxes,
      trackingIds:
        data.completedShipmentDetail?.completedPackageDetails[0]?.trackingIds,
    });

    await newShipment.save();

    res.status(201).json({
      success: true,
      result: newShipment
    });
  } catch (error) {
    console.error("Server Error:", error);
    next(error);
  }
};

export const getShipments = async (req, res) => {
  try {
    const accessToken = req.shipmentAuthToken;
    if (!accessToken) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const seller_id = req.params.id;

    const shipments = await Logistics.find({ seller_id });
    if (!shipments) {
      return res.status(404).json({ message: "No shipments found" });
    }

    res.status(200).json({
      success: true,
      data: shipments,
    });
  } catch {
    // console.error("Error validating access token:", error);
    res.status(500).json({
      success: false,
      message: "Failed to validate access token",
    });
  }
};

export const cancelShipment = async (req, res, next) => {
  try {
    const accessToken = req.shipmentAuthToken;
    if (!accessToken) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { accountNumber, trackingNumber } = req.body;
    if (!accountNumber || !trackingNumber) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const pickup = await Logistics.findOne({ trackingNumber });
    if (!pickup) {
      return res.status(404).json({ message: "Pickup not found" });
    }

    if (pickup.isCancelled) {
      return res.status(400).json({ message: "Shipment is already cancelled" });
    }

    const shipment = await axios.put(
      "https://apis-sandbox.fedex.com/ship/v1/shipments/cancel",
      {
        accountNumber,
        trackingNumber,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    pickup.isCancelled = true;
    await pickup.save();

    res.status(200).json({
      success: true,
      data: shipment.data.output,
    });
  } catch (error) {
    next(error);
  }
};

// export const getAsyncShipment = async (req, res, next) => {
//   try {
//     const accessToken = req.shipmentAuthToken;
//     if (!accessToken) {
//       return res.status(401).json({ message: "Unauthorized" });
//     }

//     const { accountNumber, jobId } = req.body;

//     if (!accountNumber || !jobId) {
//       return res.status(400).json({ message: "Missing required fields" });
//     }

//     const shipment = await axios.post(
//       `https://apis-sandbox.fedex.com/ship/v1/shipments/results`,
//       {
//         accountNumber,
//         jobId,
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     res.status(200).json({
//       success: true,
//       data: shipment.data.output,
//     });
//   } catch (err) {
//     console.log(err);
//   }
// };

// export const verifyShipment = async (req, res, next) => {
//   try {
//     const accessToken = req.shipmentAuthToken;
//     if (!accessToken) {
//       return res.status(401).json({ message: "Unauthorized" });
//     }

//     const { body } = req;

//     const shipment = await axios.post(
//       "https://apis-sandbox.fedex.com/ship/v1/shipments/packages/validate",
//       body,
//       {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     res.status(200).json({
//       success: true,
//       data: shipment.data.output,
//     });
//   } catch (err) {
//     console.log(err);
//   }
// };

export const returnShipment = async (req, res) => {
  try {
    const accessToken = req.shipmentAuthToken;
    if (!accessToken) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { body } = req;

    const shipment = await axios.post(
      "https://apis-sandbox.fedex.com/ship/v1/shipments/tag",
      body,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    res.status(200).json({
      success: true,
      data: shipment.data.output,
    });
  } catch (error) {
    console.log(error);
  }
};

export const createPickup = async (req, res) => {
  try {
    const accessToken = req.shipmentAuthToken;
    if (!accessToken) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { body } = req;
    console.log("Original Pickup Request Body:", JSON.stringify(body, null, 2));

    // Create a deep copy of the request body
    let modifiedBody = JSON.parse(JSON.stringify(body));

    // Update pickup location's state code based on country
    const countryCode = modifiedBody.originDetail.pickupLocation.address.countryCode;
    const stateOrProvince = modifiedBody.originDetail.pickupLocation.address.stateOrProvinceCode;
    
    let stateCode;
    if (countryCode === 'IN') {
      stateCode = indianStatesMapping[stateOrProvince] || 'MP'; // Default to MP for Madhya Pradesh
    } else if (countryCode === 'AE') {
      stateCode = uaeStatesMapping[stateOrProvince] || stateOrProvince;
    }

    // Update the state code in the request body
    modifiedBody.originDetail.pickupLocation.address.stateOrProvinceCode = stateCode.toUpperCase();

    console.log("Modified Pickup Request Body:", JSON.stringify(modifiedBody, null, 2));

    let pickup;
    try {
      pickup = await axios.post(
        "https://apis-sandbox.fedex.com/pickup/v1/pickups",
        modifiedBody,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
    } catch (axiosError) {
      console.error("FedEx Pickup API Error:", {
        status: axiosError.response?.status,
        data: axiosError.response?.data?.errors,
      });
      return res.status(axiosError.response?.status || 500).json({
        success: false,
        message: "Failed to create pickup with FedEx",
        error: axiosError.response?.data || axiosError.message
      });
    }

    if (!pickup.data?.output?.pickupConfirmationCode) {
      console.error("Invalid pickup response from FedEx:", pickup?.data);
      return res.status(400).json({
        success: false,
        message: "Invalid response from FedEx Pickup API"
      });
    }

    const newPickup = new Pickup({
      confirmationCode: pickup.data.output.pickupConfirmationCode,
      country: pickup.data.output.location,
      pickup_date: body.originDetail.readyDateTimestamp.split("T")[0],
      seller_id:req.params.id
    });

    await newPickup.save();

    res.status(200).json({
      success: true,
      data: pickup.data.output,
    });
  } catch (error) {
    console.error("Server Error in createPickup:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error while creating pickup",
      error: error.message
    });
  }
};

export const cancelPickup = async (req, res) => {
  try {
    const accessToken = req.shipmentAuthToken;
    if (!accessToken) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    console.log("Anshul");
    

    const { pickupConfirmationCode, location, scheduledDate } = req.body;
    const { body } = req;

    // Ensure we have required fields
    if (!pickupConfirmationCode || !location || !scheduledDate) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Find the pickup in database
    const result = await Pickup.findOne({
      confirmationCode: pickupConfirmationCode,
      country: location,
      pickup_date: scheduledDate,
    });

    if (!result) {
      return res.status(404).json({ message: "Pickup not found" });
    }

    // Call FedEx API to cancel pickup
    const pickup = await axios.put(
      "https://apis-sandbox.fedex.com/pickup/v1/pickups/cancel",
      body,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log(result._id);
    
    // Delete the pickup from database after successful cancellation
    await Pickup.findByIdAndDelete(result._id);

    res.status(200).json({
      success: true,
      data: pickup.data.output,
    });
  } catch (error) {
    console.error("Error canceling pickup:", error);
    res.status(500).json({
      success: false,
      message: "Failed to cancel pickup",
      error: error.message,
    });
  }
};
