import express from 'express';
const router = express.Router();

import { getSellerAnalytics , getBuyerAnalytics } from '../controllers/Analytics.js';

router.get("/get-seller-analytics", getSellerAnalytics);
router.get("/get-buyer-analytics", getBuyerAnalytics);

export default router; 