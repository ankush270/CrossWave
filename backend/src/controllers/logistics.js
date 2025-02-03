import prisma from "../config/prisma_db.js";

export const createLogistics = async (details) => {
  try {
    const logistics = await prisma.logistics.create({
      //   data: {
      //     order_id: orderId,
      //     provider: provider,
      //     tracking_id: null, // Placeholder for tracking ID
      //     status: "PENDING", // Default logistics status
      //     estimated_delivery: null, // Placeholder for estimated delivery
      //   },
      data: details,
    });
    return logistics;
  } catch (error) {
    throw new Error("Error creating logistics: " + error.message);
  }
};
