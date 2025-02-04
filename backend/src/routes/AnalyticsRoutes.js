import express from 'express';
const router = express.Router();

import { getAnalytics } from '../controllers/Analytics.js';

router.get("/get-analytics", getAnalytics);

export default router;