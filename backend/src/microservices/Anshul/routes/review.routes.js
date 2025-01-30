import { Router } from "express";
import { avgRating, getReviews, review } from "../controllers/review.controller.js";

const router = Router();

router.route('/review/:reviewee_id').post(review);
router.route('/get-reviews/:reviewee_id').get(getReviews);
router.route('/avg-rating/:reviewee_id').get(avgRating);

export default router;