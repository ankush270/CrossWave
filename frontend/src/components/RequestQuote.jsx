import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaFileContract } from 'react-icons/fa';

const RequestQuote = ({ product, isOpen, onClose, currentUser }) => {
  const [formData, setFormData] = useState({
    productId: product?.id || '',
    productName: product?.name || '',
    initialPrice: '',
    quantity: '',
    requirements: '',
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!currentUser) {
      setError('Please login to submit a quote request');
      return;
    }

    setError('');
    
    const chatData = {
      productId: formData.productId,
      productName: formData.productName,
      initialPrice: formData.initialPrice,
      buyerId: currentUser.id,
      sellerId: product.sellerId,
      status: 'active',
      negotiations: [{
        price: formData.initialPrice,
        quantity: formData.quantity,
        requirements: formData.requirements,
        proposedBy: {
          userId: currentUser.id,
          role: 'buyer'
        }
      }]
    };

    console.log('Chat initiated:', chatData);
    onClose();
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
                onChange={(e) => setFormData({ ...formData, initialPrice: parseFloat(e.target.value) })}
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
                onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) })}
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
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!currentUser}
              >
                {currentUser ? 'Submit Quote Request' : 'Login to Submit'}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default RequestQuote; 