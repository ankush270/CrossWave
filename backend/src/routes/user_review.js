import express from "express";
import authMiddleware from "../middlewares/auth.js";
import {createReview, deleteReview, getAllReviews, getReviewById, updateReview} from "../controllers/user_review.js";

const router = express.Router();

router.post('/add', authMiddleware, createReview);
router.get('/get', getAllReviews);
router.get('/get/:seller_id', getReviewById);
router.post('/update/:id', authMiddleware, updateReview);
router.delete('/delete/:id', authMiddleware, deleteReview);

export default router;