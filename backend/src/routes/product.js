import express from 'express'
import authMiddleware from '../middlewares/auth.js';
import {
  addProduct,
  getProductBySellerId,
  getProducts,
  getUserProduct,
  removeProduct,
  updateProduct,
  getProductById
} from '../controllers/product.js';

const router = express.Router();

router.post('/add',authMiddleware,addProduct);
router.get('/getId/:id', authMiddleware,getProductById)
router.get('/get',authMiddleware,getProducts);
router.delete('/delete/:productId',authMiddleware,removeProduct);
router.get('/get/:sellerId',getUserProduct);
router.get('/get-product/:seller_id', authMiddleware,getProductBySellerId);
router.post('/update/:productId',authMiddleware,updateProduct);

export default router;