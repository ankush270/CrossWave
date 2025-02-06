import mongoose, { Schema } from "mongoose";

const pickupSchema = new Schema({
  pickup_date: {
    type: Date,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  confirmationCode: {
    type: String,
    required: true,
  },
  seller_id:{
    type: String,
    // required: true,
  }
});

export const Pickup = mongoose.model("Pickup", pickupSchema);
