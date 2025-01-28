import { Router } from "express";
import { review } from "../controllers/orders.controller.js";

const router = Router();

router.route('/review').post(review)

export default router;