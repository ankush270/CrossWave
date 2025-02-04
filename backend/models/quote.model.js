import mongoose, { Schema } from "mongoose";

const quoteSchema = new Schema({
  buyer_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  seller_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  product_id: {
    type: Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  history: [
    {
      quantity: {
        type: Number,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
    },
  ],
  is_accepted:{
    type: Boolean,
    default: false,
  }
});

export const Quote = mongoose.model("Quote", quoteSchema);
