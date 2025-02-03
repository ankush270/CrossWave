import express from 'express';
const router = express.Router();

import { createOrder , verifyPayment } from '../controllers/Payment.js';

router.post('/create-payment' , createOrder);
router.post('/verify-payment' , verifyPayment);



export default router;


// for paying to the seller we have api at postman
