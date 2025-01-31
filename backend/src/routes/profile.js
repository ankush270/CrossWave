import express from 'express'
import authMiddleware from '../middlewares/auth.js';
import { getProfile, updateProfile } from '../controllers/profile.js';

const router = express.Router();

router.get('/profile', authMiddleware, getProfile);
router.post('/update', authMiddleware,updateProfile);

export default router;