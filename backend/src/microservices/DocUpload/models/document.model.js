// const mongoose = require("mongoose");
import mongoose from "mongoose";

const documentSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      unique: true,
    },
    userEmail: {
      type: String,
      // required: true
    },
    // documents: {
    //   cic: {
    //     documentNumber: String,
    //     cloudinaryId: String,
    //     fileUrl: String,
    //     fileType: String,
    //     size: Number,
    //     status: {
    //       type: String,
    //       enum: ["PENDING", "VERIFIED", "REJECTED", "NOT_UPLOADED"],
    //       default: "NOT_UPLOADED",
    //     },
    //     verificationComments: String,
    //     uploadedAt: Date,
    //     verifiedAt: Date,
    //   },
    //   bis: {
    //     documentNumber: String,
    //     cloudinaryId: String,
    //     fileUrl: String,
    //     fileType: String,
    //     size: Number,
    //     status: {
    //       type: String,
    //       enum: ["PENDING", "VERIFIED", "REJECTED", "NOT_UPLOADED"],
    //       default: "NOT_UPLOADED",
    //     },
    //     verificationComments: String,
    //     uploadedAt: Date,
    //     verifiedAt: Date,
    //   },
    //   coo: {
    //     documentNumber: String,
    //     cloudinaryId: String,
    //     fileUrl: String,
    //     fileType: String,
    //     size: Number,
    //     status: {
    //       type: String,
    //       enum: ["PENDING", "VERIFIED", "REJECTED", "NOT_UPLOADED"],
    //       default: "NOT_UPLOADED",
    //     },
    //     verificationComments: String,
    //     uploadedAt: Date,
    //     verifiedAt: Date,
    //   },
    //   gstin: {
    //     documentNumber: String,
    //     cloudinaryId: String,
    //     fileUrl: String,
    //     fileType: String,
    //     size: Number,
    //     status: {
    //       type: String,
    //       enum: ["PENDING", "VERIFIED", "REJECTED", "NOT_UPLOADED"],
    //       default: "NOT_UPLOADED",
    //     },
    //     verificationComments: String,
    //     uploadedAt: Date,
    //     verifiedAt: Date,
    //   },
    //   iec: {
    //     documentNumber: String,
    //     cloudinaryId: String,
    //     fileUrl: String,
    //     fileType: String,
    //     size: Number,
    //     status: {
    //       type: String,
    //       enum: ["PENDING", "VERIFIED", "REJECTED", "NOT_UPLOADED"],
    //       default: "NOT_UPLOADED",
    //     },
    //     verificationComments: String,
    //     uploadedAt: Date,
    //     verifiedAt: Date,
    //   },
    //   shipping: {
    //     documentNumber: String,
    //     cloudinaryId: String,
    //     fileUrl: String,
    //     fileType: String,
    //     size: Number,
    //     status: {
    //       type: String,
    //       enum: ["PENDING", "VERIFIED", "REJECTED", "NOT_UPLOADED"],
    //       default: "NOT_UPLOADED",
    //     },
    //     verificationComments: String,
    //     uploadedAt: Date,
    //     verifiedAt: Date,
    //   },
    //   tradeLicense: {
    //     documentNumber: String,
    //     cloudinaryId: String,
    //     fileUrl: String,
    //     fileType: String,
    //     size: Number,
    //     status: {
    //       type: String,
    //       enum: ["PENDING", "VERIFIED", "REJECTED", "NOT_UPLOADED"],
    //       default: "NOT_UPLOADED",
    //     },
    //     verificationComments: String,
    //     uploadedAt: Date,
    //     verifiedAt: Date,
    //   },
    //   UAEcoo: {
    //     documentNumber: String,
    //     cloudinaryId: String,
    //     fileUrl: String,
    //     fileType: String,
    //     size: Number,
    //     status: {
    //       type: String,
    //       enum: ["PENDING", "VERIFIED", "REJECTED", "NOT_UPLOADED"],
    //       default: "NOT_UPLOADED",
    //     },
    //     verificationComments: String,
    //     uploadedAt: Date,
    //     verifiedAt: Date,
    //   },
    //   UAEesma: {
    //     documentNumber: String,
    //     cloudinaryId: String,
    //     fileUrl: String,
    //     fileType: String,
    //     size: Number,
    //     status: {
    //       type: String,
    //       enum: ["PENDING", "VERIFIED", "REJECTED", "NOT_UPLOADED"],
    //       default: "NOT_UPLOADED",
    //     },
    //     verificationComments: String,
    //     uploadedAt: Date,
    //     verifiedAt: Date,
    //   },
    //   UAEid: {
    //     documentNumber: String,
    //     cloudinaryId: String,
    //     fileUrl: String,
    //     fileType: String,
    //     size: Number,
    //     status: {
    //       type: String,
    //       enum: ["PENDING", "VERIFIED", "REJECTED", "NOT_UPLOADED"],
    //       default: "NOT_UPLOADED",
    //     },
    //     verificationComments: String,
    //     uploadedAt: Date,
    //     verifiedAt: Date,
    //   },
    //   UAEvat: {
    //     documentNumber: String,
    //     cloudinaryId: String,
    //     fileUrl: String,
    //     fileType: String,
    //     size: Number,
    //     status: {
    //       type: String,
    //       enum: ["PENDING", "VERIFIED", "REJECTED", "NOT_UPLOADED"],
    //       default: "NOT_UPLOADED",
    //     },
    //     verificationComments: String,
    //     uploadedAt: Date,
    //     verifiedAt: Date,
    //   },
    //   aadhaar: {
    //     documentNumber: String,
    //     cloudinaryId: String,
    //     fileUrl: String,
    //     fileType: String,
    //     size: Number,
    //     status: {
    //       type: String,
    //       enum: ["PENDING", "VERIFIED", "REJECTED", "NOT_UPLOADED"],
    //       default: "NOT_UPLOADED",
    //     },
    //     verificationComments: String,
    //     uploadedAt: Date,
    //     verifiedAt: Date,
    //   },
    //   pan: {
    //     documentNumber: String,
    //     cloudinaryId: String,
    //     fileUrl: String,
    //     fileType: String,
    //     size: Number,
    //     status: {
    //       type: String,
    //       enum: ["PENDING", "VERIFIED", "REJECTED", "NOT_UPLOADED"],
    //       default: "NOT_UPLOADED",
    //     },
    //     verificationComments: String,
    //     uploadedAt: Date,
    //     verifiedAt: Date,
    //   },
    // },
    documents: {
      type: Map, // This allows dynamic document types
      of: {
        // documentNumber: String,
        cloudinaryId: String,
        fileUrl: String,
        fileType: String,
        size: Number,
        status: {
          type: String,
          enum: ["PENDING", "VERIFIED", "REJECTED", "NOT_UPLOADED"],
          default: "NOT_UPLOADED",
        },
        verificationComments: String,
        uploadedAt: Date,
        verifiedAt: Date,
      },
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt
    strict: false, // Allows flexible schema
  }
);

// Update timestamp on document changes
documentSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

const Document = mongoose.model("Document", documentSchema);

export default Document;
