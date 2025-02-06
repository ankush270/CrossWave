import prisma from "../config/prisma_db.js";

export const verifyUser = async (req, res, next) => {
  try {
    // const { user_id } = req.body;
    // console.log("user_id : ", user_id);
    const user_id = req.id;
    // Check if user_id is provided
    if (!user_id) {
      return res.status(400).json({
        success: false,
        error: "user_id is required.",
      });
    }

    // Fetch buyer details to check KYC and document status
    const user = await prisma.user.findUnique({
      where: { id: user_id },
      select: {
        is_kyc_done: true,
        is_personal_docs_done: true,
        is_company_docs_done: true,
      },
    });

    // If buyer not found
    if (!user) {
      return res.status(404).json({
        success: false,
        error: "user not found.",
      });
    }

    console.log(user);

    // Check if all required user fields are true
    if (
      !user.is_kyc_done ||
      // !user.is_personal_docs_done ||
      !user.is_company_docs_done
    ) {
      return res.status(400).json({
        success: false,
        error:
          "user is not verified. Ensure KYC is done and documents are uploaded.",
      });
    }
    console.log("user verified");

    // If user passes the checks, proceed to the next middleware/controller
    next();
    // return res.status(200).json({
    //   success: true,
    // });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Error verifying user: " + error.message,
    });
  }
};
