import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaFileContract, FaSpinner } from 'react-icons/fa';
import axios from 'axios';

const RequestQuote = ({ product, isOpen, onClose, currentUser, productSellerId }) => {
  
  const [formData, setFormData] = useState({
    productId: product?._id || '',
    productName: product?.name || '',
    initialPrice: '',
    quantity: '',
    requirements: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Add debug log when component mounts or props change
  useEffect(() => {
    console.log('RequestQuote Props:', {
      product,
      currentUser,
      isOpen,
     
    });
  }, [product, currentUser, isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate all required data
    if (!currentUser?.id) {
      console.error('Missing user ID:', currentUser);
      setError('Please login to submit a quote request');
      return;
    }
    console.log('Product Seller ID:', product.sellerId);
    if (!product?.sellerId) {
      console.error('Missing seller ID:', product);
      setError('Cannot identify seller. Please try again later.');
      return;
    }

    if (!product?._id) {
      console.error('Missing product ID:', product);
      setError('Product information is incomplete. Please try again later.');
      return;
    }

    // Prevent self-quoting
    if (currentUser.id === product.sellerId) {
      setError('You cannot request a quote for your own product');
      return;
    }

    setError('');
    setLoading(true);
    
    try {
      // Log debug information
      console.log('Creating chat with:', {
        currentUser,
        product,
        formData
      });

      const chatData = {
        productId: product._id,
        productName: product.name,
        initialPrice: parseFloat(formData.initialPrice),
        sellerId: product.sellerId,
        buyerId: currentUser.id,
        status: 'active',
        negotiations: [{
          price: parseFloat(formData.initialPrice),
          quantity: parseInt(formData.quantity),
          requirements: formData.requirements,
          proposedBy: {
            userId: currentUser.id,
            role: 'buyer'
          }
        }]
      };

      console.log('Sending chat data:', chatData);

      const response = await axios.post('http://localhost:5003/api/chats/create', chatData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        timeout: 5000
      });
      
      console.log('Response:', response.data);

      if (response.data) {
        onClose();
        alert('Quote request submitted successfully!');
      }
    } catch (err) {
      console.error('Error details:', {
        message: err.message,
        response: err.response?.data,
        data: err.response?.data,
        currentUser: currentUser,
        productSellerId: product.sellerId
      });
      setError(err.response?.data?.message || 'Failed to create quote request. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        >
          <div className="p-6 border-b border-gray-200 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <FaFileContract className="text-blue-600 text-xl" />
              <h2 className="text-xl font-semibold">Request Quote</h2>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <FaTimes />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            <div className="bg-blue-50 rounded-xl p-4 flex gap-4">
              <img
                src={product.image}
                alt={product.name}
                className="w-20 h-20 object-cover rounded-lg"
              />
              <div>
                <h3 className="font-semibold">{product.name}</h3>
                <p className="text-sm text-gray-600">MOQ: {product.moq} units</p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Proposed Price (per unit) *
              </label>
              <input
                type="number"
                required
                value={formData.initialPrice}
                onChange={(e) => setFormData({ ...formData, initialPrice: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your proposed price"
                min="0"
                step="0.01"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Quantity *
              </label>
              <input
                type="number"
                required
                min={product.moq}
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder={`Min ${product.moq} units`}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Requirements *
              </label>
              <textarea
                required
                value={formData.requirements}
                onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                rows="4"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Specify your requirements, specifications, and any other details..."
              />
            </div>

            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 rounded-lg border border-gray-300 hover:bg-gray-50"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                disabled={!currentUser || loading}
              >
                {loading ? (
                  <>
                    <FaSpinner className="animate-spin" />
                    Submitting...
                  </>
                ) : currentUser ? (
                  'Submit Quote Request'
                ) : (
                  'Login to Submit'
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default RequestQuote; 