import React from 'react';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaCertificate, FaDownload } from 'react-icons/fa';

const ProductTabs = ({ selectedTab, setSelectedTab, product }) => {
  const renderSpecifications = (specs, title) => {
    if (!specs || specs.length === 0) return null;
    
    return (
      <div>
        <h3 className="text-lg font-semibold mb-4">{title}</h3>
        <dl className="space-y-2">
          {specs.map((spec, index) => (
            <div key={index} className="flex justify-between py-2 border-b border-gray-100">
              <dt className="text-gray-600 capitalize">{spec.key}</dt>
              <dd className="font-medium">{spec.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    );
  };

  return (
    <motion.div 
      className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Tab Navigation */}
      <div className="flex gap-8 border-b border-gray-200/50 mb-6">
        {['overview', 'specifications', 'market-insights', 'documentation'].map((tab) => (
          <motion.button
            key={tab}
            className={`px-4 py-2 capitalize relative ${
              selectedTab === tab 
                ? 'text-blue-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setSelectedTab(tab)}
            whileHover={{ y: -2 }}
          >
            {tab.replace('-', ' ')}
            {selectedTab === tab && (
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"
                layoutId="activeTab"
              />
            )}
          </motion.button>
        ))}
      </div>

      {/* Tab Content */}
      <motion.div
        key={selectedTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="prose prose-blue max-w-none"
      >
        {/* Add tab content components here */}
      </motion.div>
    </motion.div>
  );
};

export default ProductTabs; 