import axios from "axios";
import { Logistics } from "../../../../models/logistics.model.js";
import { Pickup } from "../../../../models/pickup.model.js";

export const createShipment = async (req, res, next) => {
  try {
    const { body } = req;

    const accessToken = req.shipmentAuthToken;
    if (!accessToken) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const shipment = await axios.post(
      "https://apis-sandbox.fedex.com/ship/v1/shipments",
      body,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    const data = shipment?.data?.output?.transactionShipments[0];
    if (!data) {
      throw new Error("Failed to create shipment");
    }

    const newShipment = new Logistics({
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

    const result = await newShipment.save();
    // console.log(shipment.data.transactionId);

    res.status(201).json({
      success: true,
      result,
    });
  } catch (error) {
    next(error);
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

    if(pickup.isCancelled) {
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
  const accessToken = req.shipmentAuthToken;
  if (!accessToken) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const { body } = req;
  console.log(body);

  try {
    const pickup = await axios.post(
      "https://apis-sandbox.fedex.com/pickup/v1/pickups",
      body,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    const newPickup = await new Pickup({
      confirmationCode: pickup.data.output.pickupConfirmationCode,
      location: pickup.data.output.location,
      scheduledDate: body.originDetail.readyDateTimestamp.split("T")[0],
    });

    await newPickup.save();

    res.status(200).json({
      success: true,
      data: pickup.data.output,
    });
  } catch (error) {
    console.log(error);
  }
};

export const cancelPickup = async (req, res) => {
  try {
    const accessToken = req.shipmentAuthToken;
    if (!accessToken) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { pickupConfirmationCode, location, scheduledDate } = req.body;
    const { body } = req;

    // Ensure we have required fields
    if (!pickupConfirmationCode || !location || !scheduledDate) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Find the pickup in database
    const result = await Pickup.findOne({
      confirmationCode: pickupConfirmationCode,
      location: location,
      scheduledDate: scheduledDate,
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
