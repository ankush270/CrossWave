import mongoose, { Schema } from "mongoose";

const paymentSchema = new Schema({
  order_id: {
    type: Schema.Types.ObjectId,
    ref: "Order",
    required: true,
  },
  transaction_id: {
    type: String,
    required: true,
  },
  total_amount: {
    type: Number,
    required: true,
  },
  tax_details: {
    type: Object,
    required: true,
  },
  payment_method: {
    type: String,
    required: true,
  },
  shiping_cost: {
    type: Number,
    required: true,
  },
});

export const Payment = mongoose.model("Payment", paymentSchema);
