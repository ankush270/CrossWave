import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useParams, useNavigate } from 'react-router-dom';
import p1 from '../assets/p1.jpg';
import p2 from '../assets/p2.jpg';
import p3 from '../assets/p3.jpg';
import p4 from '../assets/p4.jpg';
import {
  FaShoppingCart, FaHeart, FaShare, FaStar, FaTruck, FaShieldAlt,
  FaUndo, FaInfoCircle, FaBox, FaGlobe, FaFileContract, FaHandshake,
  FaCertificate, FaWarehouse, FaChartLine, FaDownload, FaCheckCircle
} from 'react-icons/fa';
import { productsData } from '../data/productsData';
import RequestQuote from '../components/RequestQuote';
import Chat from '../components/Chat';

const Product = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedTab, setSelectedTab] = useState('overview');
  const [selectedPricing, setPricingTier] = useState('standard');
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [showChatModal, setShowChatModal] = useState(false);

  useEffect(() => {
    const foundProduct = productsData.find(p => p.id === parseInt(id));
    if (foundProduct) {
      setProduct(foundProduct);
    } else {
      navigate('/products');
    }
  }, [id, navigate]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Add this function at the top of your component to calculate all fees
  const calculatePriceBreakdown = (basePrice, quantity) => {
    const unitPrice = parseFloat(basePrice.replace(/[^0-9.]/g, ''));
    const subtotal = unitPrice * quantity;
    
    return {
      unitPrice: unitPrice,
      subtotal: subtotal,
      platformFee: 20 * quantity, // 20 rupees per unit
      customDuty: subtotal * 0.05, // 5% of subtotal
      gst: subtotal * 0.05, // 5% of subtotal
      insurance: subtotal * 0.03, // 3% of subtotal
      total: subtotal + (20 * quantity) + (subtotal * 0.13) // Total including all fees
    };
  };

  // Add this after the pricing tiers section
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
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Base Price (per unit)</span>
            <span className="font-medium">₹{breakdown.unitPrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Quantity</span>
            <span className="font-medium">{quantity} units</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Subtotal</span>
            <span className="font-medium">₹{breakdown.subtotal.toFixed(2)}</span>
          </div>
          <div className="h-px bg-gray-200 my-2"></div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Platform Fee (₹20/unit)</span>
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
          <div className="h-px bg-gray-200 my-2"></div>
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

  // Add this check for the image gallery
  const renderImageGallery = () => {
    if (!product.images || product.images.length === 0) {
      return (
        <div className="aspect-w-1 aspect-h-1 rounded-2xl overflow-hidden bg-white shadow-lg">
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>
      );
    }

    return (
      <>
        <div className="aspect-w-1 aspect-h-1 rounded-2xl overflow-hidden bg-white shadow-lg">
          <img 
            src={product.images[selectedImage]} 
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="grid grid-cols-4 gap-4">
          {product.images.map((image, index) => (
            <motion.button
              key={index}
              className={`aspect-w-1 aspect-h-1 rounded-lg overflow-hidden ${
                selectedImage === index ? 'ring-2 ring-blue-500' : ''
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedImage(index)}
            >
              <img src={image} alt={`View ${index + 1}`} className="w-full h-full object-cover" />
            </motion.button>
          ))}
        </div>
      </>
    );
  };

  // Add this helper function to safely handle arrays
  const renderArrayValue = (value) => {
    if (Array.isArray(value)) {
      return value.join(', ');
    }
    return value.toString();
  };

  // In the specifications section, update the rendering:
  const renderSpecifications = (specs, title) => {
    if (!specs) return null;
    
    return (
      <div>
        <h3 className="text-lg font-semibold mb-4">{title}</h3>
        <dl className="space-y-2">
          {Object.entries(specs).map(([key, value]) => (
            <div key={key} className="flex justify-between py-2 border-b border-gray-100">
              <dt className="text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</dt>
              <dd className="font-medium">{renderArrayValue(value)}</dd>
            </div>
          ))}
        </dl>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-20 pb-24 relative overflow-hidden">
      {/* Animated Background Elements - Similar to Products.jsx */}
      <div className="fixed inset-0 z-0">
        {/* Circuit Pattern */}
        <div className="absolute inset-0 bg-repeat opacity-5" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10 10h80v80h-80z' fill='none' stroke='%234B5563' stroke-width='1'/%3E%3Cpath d='M30 30h40v40h-40z' fill='none' stroke='%234B5563' stroke-width='1'/%3E%3Cpath d='M20 10v80M40 10v80M60 10v80M80 10v80' stroke='%234B5563' stroke-width='0.5'/%3E%3Cpath d='M10 20h80M10 40h80M10 60h80M10 80h80' stroke='%234B5563' stroke-width='0.5'/%3E%3C/svg%3E")`
        }} />

        {/* Animated Gradient Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000" />

        {/* Animated Lines */}
        <div className="absolute inset-0">
          <div className="absolute left-0 top-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent animate-slide" />
          <div className="absolute right-0 top-0 h-full w-1 bg-gradient-to-b from-transparent via-purple-500/20 to-transparent animate-slide-vertical" />
          <div className="absolute left-0 bottom-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent animate-slide" />
          <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-transparent via-purple-500/20 to-transparent animate-slide-vertical" />
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb with enhanced design */}
        <motion.nav 
          className="mb-8 bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-sm"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <ol className="flex items-center space-x-2 text-gray-500">
            <li><Link to="/" className="hover:text-blue-600 transition-colors">Home</Link></li>
            <li>/</li>
            <li><Link to="/products" className="hover:text-blue-600 transition-colors">Products</Link></li>
            <li>/</li>
            <li className="text-blue-600 font-medium">{product.name}</li>
          </ol>
        </motion.nav>

        {/* Order Overview with Glass Effect */}
        <div className="grid lg:grid-cols-2 gap-12 mb-12">
          {/* Image Gallery with Enhanced Design */}
          <motion.div 
            className="space-y-4 bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            {renderImageGallery()}
          </motion.div>

          {/* Order Info with Glass Effect */}
          <motion.div 
            className="space-y-6 bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
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

            {/* Pricing Tiers */}
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
              
              {/* Add the Price Breakdown component here */}
              <PriceBreakdown pricing={product.pricing} selectedPricing={selectedPricing} />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mt-6">
              <motion.button
                className="flex-1 bg-green-600 text-white px-6 py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-green-700"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate(`/product/${product.id}/buy`, {
                  state: { selectedPricing }
                })}
              >
                <FaShoppingCart />
                Buy Now
              </motion.button>
              <motion.button
                className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-700"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowQuoteModal(true)}
              >
                <FaFileContract />
                Request Quote
              </motion.button>
              <motion.button
                className="flex-1 border border-blue-600 text-blue-600 px-6 py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-50"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowChatModal(true)}
              >
                <FaHandshake />
                Contact Supplier
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Detailed Information Tabs with Glass Effect */}
        <motion.div 
          className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Enhanced Tab Navigation */}
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

          {/* Tab Content with Animation */}
          <motion.div
            key={selectedTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="prose prose-blue max-w-none"
          >
            {selectedTab === 'overview' && (
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Product Features</h3>
                  <ul className="space-y-2">
                    {product.pricing[selectedPricing].features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <FaCheckCircle className="text-green-500" />
                        {feature}
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
            )}

            {selectedTab === 'specifications' && (
              <div className="grid md:grid-cols-2 gap-8">
                {product.specifications && (
                  <>
                    {renderSpecifications(product.specifications.technical, 'Technical Specifications')}
                    {renderSpecifications(product.specifications.physical, 'Physical Specifications')}
                  </>
                )}
              </div>
            )}

            {selectedTab === 'market-insights' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold mb-4">Market Analysis</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {Object.entries(product.marketInsights).map(([key, value]) => (
                    <div key={key} className="bg-gray-50 p-4 rounded-lg">
                      <div className="text-sm text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</div>
                      <div className="text-2xl font-bold text-blue-600">{value}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-8">
                  <h4 className="font-semibold mb-4">Market Trend Analysis</h4>
                  {/* Add your market trend chart here */}
                </div>
              </div>
            )}

            {selectedTab === 'documentation' && (
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
            )}
          </motion.div>
        </motion.div>

        {/* Price Breakdown Section */}
        <motion.div 
          className="mt-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <PriceBreakdown pricing={product.pricing} selectedPricing={selectedPricing} />
        </motion.div>

        {/* Bottom Gradient */}
        <div className="fixed bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent pointer-events-none z-20" />
      </div>

      {/* Add Modals */}
      <RequestQuote 
        product={product}
        isOpen={showQuoteModal}
        onClose={() => setShowQuoteModal(false)}
      />
      <Chat 
        product={product}
        isOpen={showChatModal}
        onClose={() => setShowChatModal(false)}
      />
    </div>
  );
};

export default Product; 