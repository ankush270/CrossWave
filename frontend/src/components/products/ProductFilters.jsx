import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ProductFilters = ({ 
  showFilters, 
  sortBy, 
  setSortBy,
  minOrder, 
  setMinOrder,
  selectedOrigin, 
  setSelectedOrigin,
  selectedCertification, 
  setSelectedCertification,
  priceRange, 
  setPriceRange 
}) => {
  return (
    <AnimatePresence>
      {showFilters && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-8"
        >
          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4">
            {/* Sort Options */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="popular">Most Popular</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="moq-low">MOQ: Low to High</option>
              </select>
            </div>
            
            {/* MOQ Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Minimum Order</label>
              <select
                value={minOrder}
                onChange={(e) => setMinOrder(e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="any">Any MOQ</option>
                <option value="100">100+ units</option>
                <option value="500">500+ units</option>
                <option value="1000">1000+ units</option>
              </select>
            </div>

            {/* Origin Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Origin</label>
              <select
                value={selectedOrigin}
                onChange={(e) => setSelectedOrigin(e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Countries</option>
                <option value="China">China</option>
                <option value="USA">USA</option>
                <option value="Japan">Japan</option>
                <option value="Germany">Germany</option>
                <option value="Taiwan">Taiwan</option>
                <option value="South Korea">South Korea</option>
                <option value="India">India</option>
              </select>
            </div>

            {/* Certification Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Certification</label>
              <select
                value={selectedCertification}
                onChange={(e) => setSelectedCertification(e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Certifications</option>
                <option value="ISO 9001">ISO 9001</option>
                <option value="CE">CE</option>
                <option value="RoHS">RoHS</option>
                <option value="UL">UL</option>
              </select>
            </div>

            {/* Price Range Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Prices</option>
                <option value="low">Under $500</option>
                <option value="medium">$500 - $1000</option>
                <option value="high">Above $1000</option>
              </select>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProductFilters; 