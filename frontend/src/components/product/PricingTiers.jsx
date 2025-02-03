import React from 'react';
import { motion } from 'framer-motion';
import PriceBreakdown from './PriceBreakdown';

const PricingTiers = ({ product, selectedPricing, setPricingTier }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Select Pricing Tier</h3>
      <div className="grid grid-cols-3 gap-4">
        {Object.entries(product.pricing).map(([tier, details]) => (
          <motion.button
            key={tier}
            className={`p-4 rounded-lg border-2 text-left ${
              selectedPricing === tier 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-gray-200 hover:border-blue-200'
            }`}
            whileHover={{ scale: 1.02 }}
            onClick={() => setPricingTier(tier)}
          >
            <div className="font-semibold capitalize mb-2">{tier}</div>
            <div className="text-2xl font-bold text-blue-600 mb-2">{details.price}</div>
            <div className="text-sm text-gray-600">MOQ: {details.moq}</div>
          </motion.button>
        ))}
      </div>
      
      <PriceBreakdown pricing={product.pricing} selectedPricing={selectedPricing} />
    </div>
  );
};

export default PricingTiers; 