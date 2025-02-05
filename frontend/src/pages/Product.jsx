import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaFileContract, FaHandshake } from 'react-icons/fa';
// import { productsData } from '../data/productsData';
import ProductGallery from '../components/product/ProductGallery';
import ProductInfo from '../components/product/ProductInfo';
import PricingTiers from '../components/product/PricingTiers';
import ProductTabs from '../components/product/ProductTabs';
import RequestQuote from '../components/RequestQuote';
import Chat from '../components/Chat';
import {productAPI} from "../api/api.js";
import PriceBreakdown from "../components/product/PriceBreakdown.jsx";
import {useAuth} from '../contexts/AuthContext';
const Product = () => {
  const { user } = useAuth();
  const currentUser = user;
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedTab, setSelectedTab] = useState('overview');
  const [selectedPricing, setPricingTier] = useState('standard');
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [showChatModal, setShowChatModal] = useState(false);
  const [loading, setLoading] = useState(true);

  console.log(JSON.stringify(product))

  useEffect(() => {
    const fetchCurrentProduct = async () => {
      try {
        const { data } = await productAPI.getProductById(id);
        console.log("Product data:", data); // Debug log
        setProduct(data);
      } catch (e) {
        console.log("An error occurred while fetching: " + e.message);
        navigate('/products');
      } finally {
        setLoading(false);
      }
    }

    fetchCurrentProduct();
  }, [])

  // Add debug log when user changes
  useEffect(() => {
    console.log('Current user in Product:', user);
  }, [user]);

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
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb Navigation */}
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

        {/* Product Overview with Glass Effect */}
        <div className="grid lg:grid-cols-2 gap-12 mb-12">
          {/* Image Gallery */}
          <motion.div 
            className="space-y-4 bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <ProductGallery 
              product={product} 
              selectedImage={selectedImage} 
              setSelectedImage={setSelectedImage} 
            />
          </motion.div>

          {/* Product Info */}
          <motion.div 
            className="space-y-6 bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <ProductInfo product={product} />

            {/* Pricing Tiers */}
            <PricingTiers 
              product={product} 
              selectedPricing={selectedPricing} 
              setPricingTier={setPricingTier} 
            />

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

        {/* Product Tabs */}
        <ProductTabs 
          selectedTab={selectedTab} 
          setSelectedTab={setSelectedTab} 
          product={product} 
        />
        {/* Price Breakdown Section */}
        <PriceBreakdown pricing={product.pricing} selectedPricing={selectedPricing} />

        {/* Bottom Gradient */}
        <div className="fixed bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent pointer-events-none z-20" />
      </div>

      {/* Modals */}
      <RequestQuote 
        product={{
          _id: product._id,
          name: product.name,
          sellerId: product.seller_id,
          moq: product.moq,
          image: product.image || product.images?.[0]
        }}
        isOpen={showQuoteModal}
        onClose={() => setShowQuoteModal(false)}
        currentUser={currentUser}
      />
      {/*<Chat */}
      {/*  product={product}*/}
      {/*  isOpen={showChatModal}*/}
      {/*  onClose={() => setShowChatModal(false)}*/}
      {/*/>*/}
    </div>
  );
};

export default Product; 