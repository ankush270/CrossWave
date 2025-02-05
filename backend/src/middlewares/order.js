import prisma from "../config/prisma_db.js";

export const verifyBuyer = async (req, res, next) => {
  try {
    const { buyer_id } = req.body;
    console.log("buyer_id : ", buyer_id);

    // Check if buyer_id is provided
    if (!buyer_id) {
      return res.status(400).json({
        success: false,
        error: "buyer_id is required.",
      });
    }

    // Fetch buyer details to check KYC and document status
    const buyer = await prisma.user.findUnique({
      where: { id: buyer_id },
      select: {
        is_kyc_done: true,
        is_personal_docs_done: true,
        is_business_docs_done: true,
      },
    });

    // If buyer not found
    if (!buyer) {
      return res.status(404).json({
        success: false,
        error: "Buyer not found.",
      });
    }

    // Check if all required buyer fields are true
    if (
      !buyer.is_kyc_done ||
      !buyer.is_personal_docs_done ||
      !buyer.is_business_docs_done
    ) {
      return res.status(400).json({
        success: false,
        error:
          "Buyer is not verified. Ensure KYC, personal, and business documents are completed.",
      });
    }
    console.log("buyer verified");

    // If buyer passes the checks, proceed to the next middleware/controller
    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Error verifying buyer: " + error.message,
    });
  }
};
