import { Review } from "../models/review.model.js";

export const userReview = async (req, res, next) => {
  // const reviewer_id = req.user._id;
  const { reviewer_id, description, rating } = req.body;
  if (!reviewer_id) return res.status(401).json({ message: "Unauthorized" });

  const { reviewee_id } = req.params;
  if (!reviewee_id) return res.status(401).json({ message: "Unauthorized" });

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

export const getUserReviews = async (req, res, next) => {
  const { reviewee_id } = req.params;
  try {
    const reviews = await Review.find({ reviewee_id });
    if (!reviews || reviews.length === 0)
      return res.status(404).json({ message: "No reviews found" });
    res.json(reviews);
  } catch (error) {
    next(error);
  }
};

export const userAvgRating = async (req, res, next) => {
  const { reviewee_id } = req.params;
  try {
    const reviews = await Review.find({ reviewee_id });
    if (!reviews || reviews.length === 0)
      return res.status(404).json({ message: "No reviews found" });

    const total = reviews.reduce((acc, curr) => acc + curr.rating, 0);
    const totalReviews = reviews.filter((review) => review.rating > 0).length;

    if (!total || total === 0 || totalReviews === 0) {
      return res.status(404).json({ message: "No reviews found" });
    }

    const avg = total / reviews.length;
    res.json({ avg });
  } catch (error) {
    next(error);
  }
};

export const productReview = async (req, res, next) => {
  // const reviewer_id = req.user._id;
  const { reviewer_id, description, rating } = req.body;
  if (!reviewer_id) return res.status(401).json({ message: "Unauthorized" });

  const { product_id } = req.params;
  if (!product_id) {
    return res.status(400).json({ message: "Missing product ID" });
  }

  if (!description) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const review = new Review({
      description,
      reviewer_id,
      product_id,
      rating,
    });
    await review.save();
    res.status(201).json(review);
  } catch (error) {
    next(error);
  }
};

export const getProductReviews = async (req, res, next) => {
  const { product_id } = req.params;
  try {
    const reviews = await Review.find({ product_id });
    if (!reviews || reviews.length === 0)
      return res.status(404).json({ message: "No reviews found" });
    res.json(reviews);
  } catch (error) {
    next(error);
  }
};

export const productAvgRating = async (req, res, next) => {
  const { product_id } = req.params;
  try {
    const reviews = await Review.find({ product_id });
    if (!reviews || reviews.length === 0)
      return res.status(404).json({ message: "No reviews found" });

    const total = reviews.reduce((acc, curr) => acc + curr.rating, 0);
    const totalReviews = reviews.filter((review) => review.rating > 0).length;

    if (!total || total === 0 || totalReviews === 0) {
      return res.status(404).json({ message: "No reviews found" });
    }

    const avg = total / reviews.length;
    res.json({ avg });
  } catch (error) {
    next(error);
  }
};
