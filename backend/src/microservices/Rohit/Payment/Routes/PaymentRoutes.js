import express from 'express';
const router = express.Router();

import { createOrder , verifyPayment ,checkBalance  ,createPayout } from '../Controllers/Payment.js';

router.post('/create-payment' , createOrder);
router.get('/verify-payment' , verifyPayment);
router.get('/check-balance' , checkBalance);



export default router;


// for paying to the seller we have api at postman