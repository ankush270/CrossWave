import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaHeart, FaShoppingCart, FaGlobe, FaStar } from 'react-icons/fa';

const ProductCard = ({ product, hoveredProduct, setHoveredProduct }) => {
  return (
    <motion.div
      layout
      whileHover={{ y: -10 }}
      className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
    >
      <Link to={`/product/${product._id}`}>
        <div className="relative overflow-hidden rounded-t-xl">
          <img
            src={product.images?.[0] || '/placeholder-image.jpg'}
            alt={product.name}
            className="w-full h-56 object-cover transform group-hover:scale-110 transition-transform duration-300"
          />
          <div className="absolute top-2 right-2 px-3 py-1 bg-blue-600 text-white text-sm rounded-full">
            MOQ: {product.moq}
          </div>
          
          {hoveredProduct === product._id && (
            <motion.div 
              className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex justify-between items-center">
                <span className="text-white">View Details</span>
                <div className="flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 bg-white/20 rounded-full text-white backdrop-blur-sm"
                  >
                    <FaHeart />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 bg-white/20 rounded-full text-white backdrop-blur-sm"
                  >
                    <FaShoppingCart />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
            {product.name}
          </h3>

          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {product.overview}
          </p>

          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-1">
              <FaGlobe className="text-gray-400" />
              <span className="text-sm text-gray-600">{product.origin}</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-sm text-gray-600">Stock: {product.stock}</span>
            </div>
          </div>

          <div className="flex justify-between items-end">
            <div>
              <div className="text-sm text-gray-500">Sample Price</div>
              <div className="text-xl font-bold text-blue-600">
                ₹{product.pricing.sample.price}
              </div>
              <div className="text-sm text-gray-500 mt-1">
                Bulk: ₹{product.pricing.premium.price}
              </div>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-sm text-gray-600">MOQ: {product.moq}</span>
              <span className="text-sm text-gray-600">{product.pricing.subcategory}</span>
            </div>
          </div>

          {product.specifications?.technical && product.specifications.technical.length > 0 && (
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="text-sm text-gray-600 grid gap-2">
                {product.specifications.technical.map((spec, index) => (
                  <div key={index} className="flex justify-between">
                    <span className="text-gray-500">{spec.key}:</span>
                    <span className="font-medium">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard; 