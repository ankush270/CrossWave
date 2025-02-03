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

  const renderTabContent = () => {
    switch (selectedTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            <p className="text-gray-600 leading-relaxed">
              {product.overview}
            </p>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Key Features</h3>
                <ul className="space-y-2">
                  {product.pricing.premium.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <FaCheckCircle className="text-green-500" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-4">Certifications</h3>
                <div className="grid grid-cols-2 gap-4">
                  {(product.certifications || []).map((cert, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <FaCertificate className="text-blue-500" />
                      {cert}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 'specifications':
        return (
          <div className="grid md:grid-cols-2 gap-8">
            {renderSpecifications(product.specifications.technical, 'Technical Specifications')}
            {renderSpecifications(product.specifications.physical, 'Physical Specifications')}
          </div>
        );

      case 'documentation':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold mb-4">Available Documents</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { name: "Technical Datasheet", size: "2.5 MB" },
                { name: "Compliance Certificate", size: "1.2 MB" },
                { name: "User Manual", size: "3.8 MB" },
                { name: "Integration Guide", size: "1.7 MB" }
              ].map((doc, index) => (
                <motion.button
                  key={index}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-blue-500"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center gap-3">
                    <FaDownload className="text-blue-500" />
                    <div className="text-left">
                      <div className="font-medium">{doc.name}</div>
                      <div className="text-sm text-gray-500">{doc.size}</div>
                    </div>
                  </div>
                  <span className="text-blue-600">Download</span>
                </motion.button>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <motion.div 
      className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Tab Navigation */}
      <div className="flex gap-8 border-b border-gray-200/50 mb-6">
        {['overview', 'specifications', 'documentation'].map((tab) => (
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
        {renderTabContent()}
      </motion.div>
    </motion.div>
  );
};

export default ProductTabs; 