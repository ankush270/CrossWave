import express from 'express'
import authMiddleware from '../middlewares/auth.js';
import {
  addProduct,
  getProductById,
  getProducts,
  getUserProduct,
  removeProduct,
  updateProduct
} from '../controllers/product.js';

const router = express.Router();

router.post('/add',authMiddleware,addProduct);
router.get('/get',authMiddleware,getProducts);
router.delete('/delete/:productId',authMiddleware,removeProduct);
router.get('/get/:sellerId',getUserProduct);
router.get('/getId/:id', authMiddleware,getProductById);
router.post('/update/:productId',authMiddleware,updateProduct);

export default router;