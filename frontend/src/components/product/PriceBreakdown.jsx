import React from 'react';
import { motion } from 'framer-motion';

const calculatePriceBreakdown = (basePrice, quantity) => {
  const subtotal = basePrice * quantity;
  
  return {
    unitPrice: basePrice,
    subtotal: subtotal,
    platformFee: 0.10 * quantity*basePrice,
    customDuty: subtotal * 0.05,
    gst: subtotal * 0.05,
    insurance: subtotal * 0.03,
    total: subtotal + (20 * quantity) + (subtotal * 0.13)
  };
};

const PriceBreakdown = ({ pricing, selectedPricing }) => {
  const quantity = parseInt(pricing[selectedPricing].moq);
  const breakdown = calculatePriceBreakdown(pricing[selectedPricing].price, quantity);

  return (
    <motion.div 
      className="mt-6 bg-gray-50 rounded-lg p-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h4 className="font-semibold mb-4">Price Breakdown</h4>
      <div className="space-y-3">
        {/* Price breakdown details */}
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Base Price (per unit)</span>
          <span className="font-medium">₹{breakdown.unitPrice.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
        <span className="text-gray-600">SubTotal (per unit * Total quantity)</span>
        <span className="font-medium">₹{breakdown.subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
        <span className="text-gray-600">Platform Fee </span>
        <span className="font-medium">₹{breakdown.platformFee.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
        <span className="text-gray-600">Custom Duty (5%)</span>
        <span className="font-medium">₹{breakdown.customDuty.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
        <span className="text-gray-600">GST (5%)</span>
        <span className="font-medium">₹{breakdown.gst.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
        <span className="text-gray-600">Insurance (3%)</span>
        <span className="font-medium">₹{breakdown.insurance.toFixed(2)}</span>
        </div>
        {/* Add other breakdown items... */}
        <div className="flex justify-between font-semibold">
          <span>Total Amount</span>
          <span className="text-blue-600">₹{breakdown.total.toFixed(2)}</span>
        </div>
        <div className="text-xs text-gray-500 mt-2">
          * All prices are inclusive of taxes and fees
        </div>
      </div>
    </motion.div>
  );
};

export default PriceBreakdown; 