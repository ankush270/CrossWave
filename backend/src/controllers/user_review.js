import prisma from "../config/prisma_db.js";

export const createReview = async (req, res) => {
  try {
    const { reviewGiverId, orderId, review } = req.body;
    const userId = req.id;

    const newReview = await prisma.userReview.create({
      data: {
        userId,
        reviewGiverId,
        orderId,
        review,
      },
    });

    res.status(201).json(newReview);
  } catch (error) {
    console.error("Error creating review:", error);
    res.status(500).json({ error: "Failed to create review" });
  }
};

export const getAllReviews = async (req, res) => {
  try {
    const reviews = await prisma.userReview.findMany({
      include: { reviewUser: true, reviewGiver: true, order: true },
    });

    res.status(200).json(reviews);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({ error: "Failed to fetch reviews" });
  }
};

export const getReviewById = async (req, res) => {
  try {
    const { id } = req.params;
    const review = await prisma.userReview.findUnique({
      where: { id },
      include: { reviewUser: true, reviewGiver: true, order: true },
    });

    if (!review) {
      return res.status(404).json({ error: "Review not found" });
    }

    res.status(200).json(review);
  } catch (error) {
    console.error("Error fetching review:", error);
    res.status(500).json({ error: "Failed to fetch review" });
  }
};

export const updateReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { review } = req.body;

    const updatedReview = await prisma.userReview.update({
      where: { id },
      data: { review },
    });

    res.status(200).json(updatedReview);
  } catch (error) {
    console.error("Error updating review:", error);
    res.status(500).json({ error: "Failed to update review" });
  }
};

export const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.userReview.delete({ where: { id } });

    res.status(200).json({ message: "Review deleted successfully" });
  } catch (error) {
    console.error("Error deleting review:", error);
    res.status(500).json({ error: "Failed to delete review" });
  }
};

