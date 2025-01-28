import mongoose, { Schema } from "mongoose";

const orderSchema = new Schema({
  seller_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  buyer_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  product_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quote_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Quote",
    required: true,
  },
  logistics_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Logistics",
    required: true,
  },
  payment_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Payment",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
    default: "pending",
  },
  shiping_address: {  
    address_lane1: {
      type: String,
      required: true,
    },
    city:{
      type: String,
      required: true,
    },
    state:{
      type: String,
      required: true,
    },
    pincode:{
      type: String,
      required: true,
    },
    country:{
      type: String,
      required: true,
    },
  },
  billing_address: {
    address_lane1: {
      type: String,
      required: true,
    },
    city:{
      type: String,
      required: true,
    },
    state:{
      type: String,
      required: true,
    },
    pincode:{
      type: String,
      required: true,
    },
    country:{
      type: String,
      required: true,
    },
  },
});

export const Order = mongoose.model('Order', orderSchema);
