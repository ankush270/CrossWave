import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaTruck, FaCreditCard, FaShieldAlt, FaCheckCircle, FaBuilding, FaUser, FaShippingFast, FaFileInvoice } from 'react-icons/fa';

const BuyNow = ({ testData }) => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [orderDetails, setOrderDetails] = useState(null);
  
  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        console.log('Current product ID:', id);
        console.log('Location state:', location.state);

        // If we have deal details in location state, use those
        if (location.state?.dealDetails) {
          console.log('Using deal details from state:', location.state.dealDetails);
          setOrderDetails({
            ...location.state.dealDetails,
            type: 'negotiated'
          });
          setLoading(false);
          return;
        }

        // If we have test data, use that
        if (testData) {
          setOrderDetails({
            ...testData,
            type: 'negotiated'
          });
          setLoading(false);
          return;
        }

        // Otherwise fetch from API
        console.log('Fetching order details for product:', id);
        const response = await fetch(`/api/chats/buy-now/${id}`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Received order details:', data);
        
        if (data.isNegotiated) {
          setOrderDetails({
            ...data.details,
            type: 'negotiated'
          });
        } else {
          setOrderDetails({
            ...data.details,
            type: 'standard'
          });
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching order details:', error);
        setError(`Failed to load order details: ${error.message}`);
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [id, testData, location.state]);

  const [formData, setFormData] = useState({
    // Company Information
    companyName: '',
    gstin: '',
    businessType: 'manufacturer',
    
    // Contact Information
    contactName: '',
    email: '',
    phone: '',
    
    // Shipping Information
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    pincode: '',
    country: 'India',
    
    // Delivery Preferences
    deliveryType: 'standard',
    specialInstructions: '',
    
    // Payment Information
    paymentMethod: 'bank_transfer',
    currency: 'INR',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', {
      ...formData,
      dealDetails: orderDetails
    });
  };

  const renderPricingBanner = () => {
    if (orderDetails?.type === 'negotiated') {
      return (
        <div className="mb-8 bg-green-50 p-4 rounded-lg">
          <p className="text-center text-green-800 font-medium">
            Using negotiated deal pricing (Reference: {orderDetails.chatId})
          </p>
        </div>
      );
    }
    return (
      <div className="mb-8 bg-blue-50 p-4 rounded-lg">
        <p className="text-center text-blue-800 font-medium">
          Using standard product pricing
        </p>
      </div>
    );
  };

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8 bg-white rounded-lg shadow-lg">
          <div className="text-red-600 text-xl mb-4">{error}</div>
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  // Calculate totals based on deal details
  const calculateSubtotal = () => (orderDetails.finalPrice * orderDetails.finalQuantity).toFixed(2);
  const calculateShipping = () => (parseFloat(calculateSubtotal()) * 0.05).toFixed(2);
  const calculateTax = () => (parseFloat(calculateSubtotal()) * 0.18).toFixed(2);
  const calculateTotal = () => {
    const subtotal = parseFloat(calculateSubtotal());
    const shipping = parseFloat(calculateShipping());
    const tax = parseFloat(calculateTax());
    return (subtotal + shipping + tax).toFixed(2);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-20 pb-24"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-8 flex items-center text-blue-600 hover:text-blue-700"
        >
          <FaArrowLeft className="mr-2" /> Back
        </button>

        {/* Pricing Banner */}
        {renderPricingBanner()}

        {/* Order Summary Card */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex items-center gap-4 mb-6">
            <FaFileInvoice className="text-2xl text-blue-600" />
            <div>
              <h2 className="text-2xl font-bold">
                {orderDetails?.type === 'negotiated' ? 'Negotiated Deal Summary' : 'Order Summary'}
              </h2>
              <p className="text-gray-600">
                {orderDetails?.type === 'negotiated' 
                  ? 'Finalized terms from your accepted deal'
                  : 'Standard product pricing'}
              </p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold mb-4">Product Details</h3>
              <div className="space-y-2">
                <p><span className="text-gray-600">Product:</span> {orderDetails.productName}</p>
                <p><span className="text-gray-600">Quantity:</span> {orderDetails.finalQuantity} units</p>
                <p><span className="text-gray-600">Price per unit:</span> ₹{orderDetails.finalPrice}</p>
                <p className="font-semibold">Total Value: ₹{calculateSubtotal()}</p>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Price Breakdown</h3>
              <div className="space-y-2">
                <p><span className="text-gray-600">Subtotal:</span> ₹{calculateSubtotal()}</p>
                <p><span className="text-gray-600">Shipping:</span> ₹{calculateShipping()}</p>
                <p><span className="text-gray-600">Tax (18% GST):</span> ₹{calculateTax()}</p>
                <p className="font-semibold">Final Total: ₹{calculateTotal()}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Form Sections */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Company Information */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center gap-4 mb-6">
              <FaBuilding className="text-2xl text-blue-600" />
              <div>
                <h2 className="text-xl font-bold">Company Information</h2>
                <p className="text-gray-600">Enter your business details</p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Company Name *</label>
                <input
                  type="text"
                  name="companyName"
                  required
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
                  value={formData.companyName}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">GSTIN *</label>
                <input
                  type="text"
                  name="gstin"
                  required
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
                  value={formData.gstin}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center gap-4 mb-6">
              <FaUser className="text-2xl text-green-600" />
              <div>
                <h2 className="text-xl font-bold">Contact Information</h2>
                <p className="text-gray-600">How can we reach you?</p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Contact Name *</label>
                <input
                  type="text"
                  name="contactName"
                  required
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
                  value={formData.contactName}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>

          {/* Shipping Information */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center gap-4 mb-6">
              <FaShippingFast className="text-2xl text-purple-600" />
              <div>
                <h2 className="text-xl font-bold">Shipping Information</h2>
                <p className="text-gray-600">Where should we deliver?</p>
              </div>
            </div>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Address Line 1 *</label>
                <input
                  type="text"
                  name="addressLine1"
                  required
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
                  value={formData.addressLine1}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">City *</label>
                  <input
                    type="text"
                    name="city"
                    required
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
                    value={formData.city}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">State *</label>
                  <input
                    type="text"
                    name="state"
                    required
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
                    value={formData.state}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
            >
              Place Order
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default BuyNow; 