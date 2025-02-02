import mongoose, { Schema } from "mongoose";

const logisticsSchema = new Schema(
  {
    labelResponseOptions: {
      type: String,
      required: true,
      enum: ["URL_ONLY", "LABEL"],
    },
    requestedShipment: {
      shipper: {
        contact: {
          personName: { type: String, required: true },
          phoneNumber: { type: Number, required: true },
        },
        address: {
          streetLines: [{ type: String }],
          city: { type: String, required: true },
          stateOrProvinceCode: { type: String },
          postalCode: { type: String, required: true },
          countryCode: { type: String, required: true },
        },
      },
      recipients: [
        {
          contact: {
            personName: { type: String, required: true },
            phoneNumber: { type: Number, required: true },
          },
          address: {
            streetLines: [{ type: String }],
            city: { type: String, required: true },
            stateOrProvinceCode: { type: String },
            postalCode: { type: String, required: true },
            countryCode: { type: String, required: true },
          },
        },
      ],
      shipDatestamp: { type: String },
      serviceType: { type: String, required: true },
      packagingType: { type: String, required: true },
      pickupType: {
        type: String,
        required: true,
        enum: [
          "CONTACT_FEDEX_TO_SCHEDULE",
          "DROPOFF_AT_FEDEX_LOCATION",
          "USE_SCHEDULED_PICKUP",
        ],
      },
      blockInsightVisibility: { type: Boolean, default: false },
      shippingChargesPayment: {
        paymentType: {
          type: String,
          required: true,
          enum: ["SENDER", "RECIPIENT", "THIRD_PARTY", "COLLECT"],
        },
      },
      labelSpecification: {
        imageType: { type: String },
        labelStockType: {
          type: String,
          enum: [
            "PAPER_85X11_TOP_HALF_LABEL",
            "PAPER_4X6",
            "STOCK_4X675",
            "PAPER_4X675",
            "PAPER_LETTER",
          ],
        },
      },
      customsClearanceDetail: {
        dutiesPayment: {
          paymentType: {
            type: String,
            enum: ["SENDER", "RECIPIENT", "THIRD_PARTY"],
          },
        },
        isDocumentOnly: { type: Boolean },
        commodities: [
          {
            description: { type: String },
            countryOfManufacture: { type: String },
            quantity: { type: Number },
            quantityUnits: { type: String },
            unitPrice: {
              amount: { type: Number },
              currency: { type: String },
            },
            customsValue: {
              amount: { type: Number },
              currency: { type: String },
            },
            weight: {
              units: { type: String },
              value: { type: Number },
            },
          },
        ],
      },
      shippingDocumentSpecification: {
        shippingDocumentTypes: [{ type: String }],
        commercialInvoiceDetail: {
          documentFormat: {
            stockType: { type: String },
            docType: { type: String },
          },
        },
      },
      requestedPackageLineItems: [
        {
          weight: {
            units: { type: String },
            value: { type: Number },
          },
        },
      ],
    },
    accountNumber: {
      value: { type: String, required: true },
    },
  },
  {
    timestamps: true,
  }
);

export const Logistics = mongoose.model("Logistics", logisticsSchema);
