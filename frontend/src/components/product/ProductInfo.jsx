import React from 'react';
import { motion } from 'framer-motion';
import { FaGlobe, FaBox, FaTruck, FaCertificate } from 'react-icons/fa';

const ProductInfo = ({ product }) => {
  return (
    <div>
      <motion.div className="flex items-center gap-4 mb-2">
        <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-medium">
          {product.category}
        </span>
        <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm font-medium">
          In Stock
        </span>
      </motion.div>
      
      <motion.h1 
        className="text-3xl font-bold text-gray-900"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        {product.name}
      </motion.h1>
      
      <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <FaGlobe />
          <span>Made in {product.origin}</span>
        </div>
        <div className="flex items-center gap-2">
          <FaBox />
          <span>MOQ: {product.moq} units</span>
        </div>
        <div className="flex items-center gap-2">
          <FaTruck />
          <span>Lead Time: {product.leadTime}</span>
        </div>
        <div className="flex items-center gap-2">
          <FaCertificate />
          <span>
            {product.certifications ? product.certifications.join(", ") : "N/A"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo; 