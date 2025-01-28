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
  price: {
    type: Number,
    required: true,
  },
  min_quantity: {
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
  weight_per_unit: {
    type: Number,
    required: true,
  },
  buy_options: [
    {
      type: String,
      required: true,
    },
  ],
});

export const Product = mongoose.model("Product", productSchema);
