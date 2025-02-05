import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const PayNow = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const location = useLocation();

  const amount = location.state?.amount;
  const order_id = location.state?.order_id;
  const currency = location.state?.currency;
  const product_id = location.state?.product_id;
  const seller_id = location.state?.seller_id;
  const product = location.state?.product;
  const formData = location.state?.formData;
  // const order_details = location.state?.order_details;

  console.log("amount : ", amount);
  console.log("order_Id : ", order_id);
  console.log("currency : ", currency);

  const paymentStatus = async (response) => {
    console.log("Enter in the payment status check fuction.");

    const credentials = {
      paymentId: response.razorpay_payment_id,
      orderId: response.razorpay_order_id,
      razorpay_signature: response.razorpay_signature,
    };
    console.log("credentials :", credentials);

    try {
      const { data } = await axios.post(
        "http://localhost:3000/payment/verify-payment",
        credentials
      );
      console.log("data :", data);

      const orderData = {
        buyer_id: user.id,
        amount,
        order_id,
        currency,
        product_id,
        seller_id,
        price: product.price,
        // order_details: order_details,
        ...credentials,
        contactInfo: {
          email: formData.email,
          phone: formData.phone,
          name: formData.contactName,
        },
        shippingAddress: {
          addressLine1: formData.addressLine1,
          addressLine2: formData.addressLine2,
          city: formData.city,
          state: formData.state,
          country: formData.country,
          pincode: formData.pincode,
        },
        billingAddress: {
          addressLine1: formData.addressLine1,
          addressLine2: formData.addressLine2,
          city: formData.city,
          state: formData.state,
          country: formData.country,
          pincode: formData.pincode,
        },
        delivery_preferences: {
          deliveryType: formData.deliveryType,
          specialInstructions: formData.specialInstructions,
        },
      };

      console.log("Creating Order : ", orderData);

      if (data.success) {
        const res = await axios.post("http://localhost:3000/order", orderData);
        navigate("/payment-success"); // Redirect to success page
      } else {
        navigate("/payment-failure"); // Redirect to failure page
      }
    } catch (error) {
      console.error("Error verifying payment:", error);
      setErrorMessage("Payment verification failed. Please try again.");
      navigate("/payment-failure");
    }
  };

  const initiatePayment = () => {
    // Create the Razorpay options object
    const options = {
      key_id: "rzp_test_wqW0Rfkhr0ZOcw", // Your Razorpay test key ID
      amount: amount * 100, // Amount in paise (100 paise = 1 INR)
      currency: "INR",
      order_id: order_id, // The order ID received from your backend
      name: "Cross Trade",
      description: "Order Payment",
      image: "https://your-logo-url.com",
      handler: function (response) {
        // This will be invoked after the payment is successful
        console.log("Payment Successful:", response);
        // alert('Payment successful!');

        paymentStatus(response);

        // Optionally, send the payment response to your backend to update the order status
        // For example:
        // fetch('/update-payment-status', { method: 'POST', body: JSON.stringify(response) });
      },
      prefill: {
        name: "Customer Name",
        email: "customer@example.com",
        contact: "9999999999",
      },
      notes: {
        address: "Customer Address",
      },
      theme: {
        color: "#F00254",
      },
    };

    // Initialize Razorpay checkout
    const rzp = new Razorpay(options);
    rzp.open(); // Open the payment modal
  };

  return (
    <div className="flex items-center justify-center mt-64 ">
      <div className="payment-container ">
        <h2>Complete Your Payment</h2>
        <div className="payment-details">
          <p>Order ID: {order_id}</p>
          <p>Total Amount: ₹{amount}</p>
        </div>

        <button
          onClick={initiatePayment}
          disabled={isProcessing}
          className="payment-button"
        >
          {isProcessing ? "Processing..." : "Pay Now"}
        </button>

        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
    </div>
  );
};

export default PayNow;
