import express from 'express'
import authMiddleware from '../middlewares/auth.js';
import { addProduct } from '../controllers/product.js';

const router = express.Router();

router.post('/add',authMiddleware,addProduct);

export default router;