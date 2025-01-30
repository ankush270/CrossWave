import { Review } from "../models/review.model.js";

export const review = async (req, res, next) => {
  // const reviewer_id = req.user._id;
  if (!reviewer_id) return res.status(401).json({ message: "Unauthorized" });
  const { reviewer_id, description, rating } = req.body;
  const { reviewee_id } = req.params;
  if (!description)
    return res.status(400).json({ message: "Missing required fields" });

  try {
    const review = new Review({
      description,
      reviewer_id,
      reviewee_id,
      rating,
    });
    await review.save();
    res.status(201).json(review);
  } catch (error) {
    next(error);
  }
};

export const getReviews = async (req, res, next) => {
  const { reviewee_id } = req.params;
  try {
    const reviews = await Review.find({ reviewee_id });
    if (!reviews || reviews.length === 0)
      return res.status(404).json({ message: "No reviews found" });
    res.json(reviews);
  } catch (error) {
    next(error);
  }
}

export const avgRating = async (req, res, next) => {
  const { reviewee_id } = req.params;
  try {
    const reviews = await Review.find({ reviewee_id });
    if (!reviews || reviews.length === 0)
      return res.status(404).json({ message: "No reviews found" });
    const total = reviews.reduce((acc, curr) => acc + curr.rating, 0);
    const avg = total / reviews.length;
    res.json({ avg });
  } catch (error) {
    next(error);
  }
}
