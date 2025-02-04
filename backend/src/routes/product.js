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
router.get('/get',getProducts);
router.delete('/delete/:productId',authMiddleware,removeProduct);
router.get('/get/:sellerId',getUserProduct);
router.get('/getId/:id',getProductById);
router.post('/update/:productId',authMiddleware,updateProduct);

export default router;