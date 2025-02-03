import mongoose, { Schema } from "mongoose";

const reviewSchema = new Schema({
  reviewer_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  reviewee_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    // required: true
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
  },
  product_id: {
    type: Schema.Types.ObjectId,
    ref: "Product",
  },
});

export const Review = mongoose.model("Review", reviewSchema);
