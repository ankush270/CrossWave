import mongoose, { Schema } from "mongoose";

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  stock : {
    type: Number,
    required: true,
  },
  images: [
    {
      type: String,
    },
  ],
  category: {
    type: String,
    required: true,
  },
  seller: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  seller_name: {
    type: String,
    required: true,
  },
  seller_country: {
    type: String,
    required: true,
  },
  features: [
    {
      type: String,
    },
  ],
  specifications: [
    {
      type: String,
    },
  ],
  weight_per_unit_in_gm: {
    type: Number,
    required: true,
  },
  buy_options: [{
    categories:{
      type: String,
      enum: ["Sample", "Standard", "Premium"],
      required: true,
    },
    min_quantity: {
      type: Number,
      required: true,
    },
    price_per_unit: {
      type: Number,
      required: true,
    },
  }],
  height_in_cm: {
    type: Number,
    required: true,
  },
  width_in_cm: {
    type: Number,
    required: true,
  },
});

export const Product = mongoose.model("Product", productSchema);
