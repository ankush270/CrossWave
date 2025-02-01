import Razorpay from 'razorpay';

const razorpay = new Razorpay({
  key_id: 'rzp_test_wqW0Rfkhr0ZOcw',
  key_secret: 'AIyIJ88xFIWUJvoco5WELwIT',
});

// Initialize RazorpayX with test credentials
const razorpayX = new Razorpay({
    key_id: 'rzp_test_wqW0Rfkhr0ZOcw',  // Replace with your RazorpayX Test API Key ID
    key_secret: 'AIyIJ88xFIWUJvoco5WELwIT',  // Replace with your RazorpayX Test API Key Secret
  });

export const createOrder = async (req, res) => {
  // Ensure amount is retrieved from the request body
  const amount = req.body.amount;

  console.log("amount : " , amount);

  try {
    // Create Razorpay order with the provided amount (in paise)
    const order = await razorpay.orders.create({
      amount: amount * 100, // Amount in paise (100 paise = 1 INR)
      currency: 'INR',
      receipt: 'order_receipt_001',
      payment_capture: 1, // Auto-capture payment
    });

    // Return the created order object
    return res.json(order);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ error: error.message });
  }
};


import crypto from 'crypto';

export const verifyPayment = async (req, res) => {
  const { paymentId, orderId, razorpay_signature } = req.body;
  
  try {
    // Fetch payment details from Razorpay
    const paymentDetails = await razorpay.payments.fetch(paymentId);
    
    // Verify the payment signature
    const body = orderId + "|" + paymentId;
    const generatedSignature = crypto.createHmac('sha256', 'AIyIJ88xFIWUJvoco5WELwIT')
                                      .update(body)
                                      .digest('hex');

    if (generatedSignature === razorpay_signature) {
      if (paymentDetails.status === 'captured') {
        // Payment is successful, hold it or store in your database
        // console.log('Payment successful:', paymentDetails);
        res.status(200).json({success : true , message: 'Payment verified successfully' });
      } else {
        console.error('Payment not captured, status:', paymentDetails.status);
        res.status(400).json({success : false , message: 'Payment not captured' });
      }
    } else {
      console.error('Signature verification failed');
      res.status(400).json({success : false, message: 'Signature verification failed' });
    }
  } catch (error) {
    console.error('Payment verification failed', error);
    res.status(500).json({success : false , message: 'Payment verification failed', error: error.message });
  }
}