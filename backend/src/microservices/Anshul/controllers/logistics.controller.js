import axios from "axios";

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

    // console.log(shipment.data.output);

    // const shipment = await ShipmentRequest.create(body);

    // res.status(201).json({
    //   success: true,
    //   data: shipment,
    //   fedexToken: accessToken
    // });

    res.status(201).json({
      success: true,
      data: shipment.data.output,
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

    res.status(200).json({
      success: true,
      data: shipment.data.output,
    });
  } catch (error) {
    next(error);
  }
};

export const getAsyncShipment = async (req, res, next) => {
  try {
    const accessToken = req.shipmentAuthToken;
    if (!accessToken) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { accountNumber, jobId } = req.body;

    if (!accountNumber || !jobId) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const shipment = await axios.post(
      `https://apis-sandbox.fedex.com/ship/v1/shipments/results`,
      {
        accountNumber,
        jobId,
      },
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
  } catch (err) {
    console.log(err);
  }
};

export const varifyShipment = async (req, res, next) => {
  try {
    const accessToken = req.shipmentAuthToken;
    if (!accessToken) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { body } = req;

    const shipment = await axios.post(
      "https://apis-sandbox.fedex.com/ship/v1/shipments/packages/validate",
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
  } catch (err) {
    console.log(err);
  }
};

export const returnShipment = async (req, res) => {
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
};

export const createPickup = async (req, res) => {
  const accessToken = req.shipmentAuthToken;
  if (!accessToken) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const { body } = req;
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

    res.status(200).json({
      success: true,
      data: pickup.data.output,
    });
  } catch (error) {
    console.log(error);
  }
};

export const cancelPickup = async (req, res) => {
  const accessToken = req.shipmentAuthToken;
  if (!accessToken) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const { body } = req;

  try {
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

    res.status(200).json({
      success: true,
      data: pickup.data.output,
    });
  } catch (error) {
    console.log(error);
  }
};
