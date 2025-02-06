import express from 'express';
const router = express.Router();

import { getSellerAnalytics , getBuyerAnalytics } from '../controllers/Analytics.js';
import authMiddleware from '../middlewares/auth.js';

router.get("/get-seller-analytics/", authMiddleware, getSellerAnalytics);
router.get("/get-buyer-analytics/",authMiddleware, getBuyerAnalytics);

export default router; 