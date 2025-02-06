import mongoose, { Schema } from "mongoose";

const pickupSchema = new Schema({
  pickup_date: {
    type: Date,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  confirmationCode: {
    type: String,
    required: true,
  },
});

export const Pickup = mongoose.model("Pickup", pickupSchema);
