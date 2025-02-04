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
        console.log('Payment successful:', paymentDetails);
        res.status(200).json({ message: 'Payment verified successfully' });
      } else {
        console.error('Payment not captured, status:', paymentDetails.status);
        res.status(400).json({ message: 'Payment not captured' });
      }
    } else {
      console.error('Signature verification failed');
      res.status(400).json({ message: 'Signature verification failed' });
    }
  } catch (error) {
    console.error('Payment verification failed', error);
    res.status(500).json({ message: 'Payment verification failed', error: error.message });
  }
};


export const checkBalance = async (req, res) => {
    try {
        // Fetch balance
        const balance = await razorpay.balance.fetch();

        // Return balance in INR (divide by 100 to convert paise to INR)
        res.status(200).json({
            currency: balance.currency,
            availableBalance: balance.balance / 100  // Convert paise to INR
        });

    } catch (error) {
        console.error('Error fetching Razorpay balance:', error);
        res.status(500).json({ error: 'Failed to fetch balance' });
    }
};


// Function to create a payout
export const createPayout = async (req, res) => {

  console.log("razorpayX : ",razorpayX);

    const payoutDetails = {
      account_number: 'test_account_number', // Use RazorpayX test account number
      ifsc_code: 'test_ifsc_code', // Use RazorpayX test IFSC code
      amount: 1000,  // Amount in paise (1000 means ₹10)
      currency: 'INR',  // Currency
      purpose: 'payment for order',  // Purpose for the payout
    };
  
    try {
      // Make the payout request using RazorpayX API
      const response = await razorpayX.payout.create(payoutDetails);
  
      // Log the response
      console.log('Payout Success (Test Mode):', response);
  
      // Return success response
      res.status(200).json({
        message: 'Payout successfully created in test mode',
        data: response,
      });
    } catch (error) {
      // Handle error
      console.error('Payout Error:', error);
  
      // Return error response
      res.status(500).json({
        error: 'Failed to create payout',
        message: error.message,
      });
    }
  };
  
