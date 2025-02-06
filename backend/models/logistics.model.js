import mongoose, { Schema } from "mongoose";

const logisticsSchema = new Schema(
  {
    transactionId: {
      type: String,
      required: true,
    },
    isCancelled: {
      type: Boolean,
      default: false,
    },
    trackingNumber: {
      type: String,
      required: true,
    },
    shipmentDocuments: {
      type: [String],
      required: true,
    },
    carrierCode: {
      type: String,
      required: true,
    },
    serviceId: {
      type: String,
      required: true,
    },
    serviceType: {
      type: String,
      required: true,
    },
    serviceCategory: {
      type: String,
      required: true,
    },
    totalBillingWeight: {
      units: {
        type: String,
        enum: ["LB", "KG"],
        required: true,
      },
      value: {
        type: Number,
        required: true,
      },
    },
    surcharges: [
      {
        surchargeType: {
          type: String,
          required: true,
        },
        level: {
          type: String,
          required: true,
        },
        amount: {
          type: Number,
          required: true,
        },
        description: {
          type: String,
          // required: true,
        },
      },
    ],
    totalBaseCharge: {
      type: Number,
      required: true,
    },
    totalFreightDiscounts: {
      type: Number,
      required: true,
    },
    totalNetFreight: {
      type: Number,
      required: true,
    },
    totalSurcharges: {
      type: Number,
      required: true,
    },
    totalNetFedExCharge: {
      type: Number,
      required: true,
    },
    totalTaxes: {
      type: Number,
      required: true,
    },
    totalNetCharge: {
      type: Number,
      required: true,
    },
    totalRebates: {
      type: Number,
      required: true,
    },
    totalDutiesAndTaxes: {
      type: Number,
      required: true,
    },
    totalAncillaryFeesAndTaxes: {
      type: Number,
      required: true,
    },
    totalDutiesTaxesAndFees: {
      type: Number,
      required: true,
    },
    totalNetChargeWithDutiesAndTaxes: {
      type: Number,
      required: true,
    },
    trackingIds: [
      {
        trackingIdType: {
          type: String,
          required: true,
        },
        formId: {
          type: String,
          required: true,
        },
        trackingNumber: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const Logistics = mongoose.model("Logistics", logisticsSchema);
