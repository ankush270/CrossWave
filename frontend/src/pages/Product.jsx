import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  FaShoppingCart,
  FaFileContract,
  FaHandshake,
  FaMobile,
  FaLaptop,
  FaMemory,
  FaMicrochip,
} from "react-icons/fa";
// import { productsData } from '../data/productsData';
import ProductGallery from "../components/product/ProductGallery";
import ProductInfo from "../components/product/ProductInfo";
import PricingTiers from "../components/product/PricingTiers";
import ProductTabs from "../components/product/ProductTabs";
import RequestQuote from "../components/RequestQuote";
import Chat from "../components/Chat";
import { productAPI } from "../api/api.js";
import PriceBreakdown from "../components/product/PriceBreakdown.jsx";

const Product = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedTab, setSelectedTab] = useState("overview");
  const [selectedPricing, setPricingTier] = useState("standard");
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [showChatModal, setShowChatModal] = useState(false);
  const [loading, setLoading] = useState(true);

  console.log(JSON.stringify(product));

  useEffect(() => {
    const fetchCurrentProduct = async () => {
      try {
        const { data } = await productAPI.getProductById(id);
        console.log("data: ", data);
        setProduct(data);
      } catch (e) {
        console.log("An error occurred while fetching: " + e.message);
        navigate("/products");
      } finally {
        setLoading(false);
      }
    };

    fetchCurrentProduct();
  }, []);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Add this function at the top of your component to calculate all fees
  const calculatePriceBreakdown = (basePrice, quantity) => {
    const unitPrice = parseFloat(basePrice.replace(/[^0-9.]/g, ""));
    const subtotal = unitPrice * quantity;

    return {
      unitPrice: unitPrice,
      subtotal: subtotal,
      platformFee: 20 * quantity, // 20 rupees per unit
      customDuty: subtotal * 0.05, // 5% of subtotal
      gst: subtotal * 0.05, // 5% of subtotal
      insurance: subtotal * 0.03, // 3% of subtotal
      total: subtotal + 20 * quantity + subtotal * 0.13, // Total including all fees
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
                selectedImage === index ? "ring-2 ring-blue-500" : ""
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedImage(index)}
            >
              <img
                src={image}
                alt={`View ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </motion.button>
          ))}
        </div>
      </>
    );
  };

  // Add this helper function to safely handle arrays
  const renderArrayValue = (value) => {
    if (Array.isArray(value)) {
      return value.join(", ");
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
            <div
              key={key}
              className="flex justify-between py-2 border-b border-gray-100"
            >
              <dt className="text-gray-600 capitalize">
                {key.replace(/([A-Z])/g, " $1").trim()}
              </dt>
              <dd className="font-medium">{renderArrayValue(value)}</dd>
            </div>
          ))}
        </dl>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 z-0">
        {/* Circuit Pattern */}
        <div
          className="absolute inset-0 bg-repeat opacity-5"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10 10h80v80h-80z' fill='none' stroke='%234B5563' stroke-width='1'/%3E%3Cpath d='M30 30h40v40h-40z' fill='none' stroke='%234B5563' stroke-width='1'/%3E%3Cpath d='M20 10v80M40 10v80M60 10v80M80 10v80' stroke='%234B5563' stroke-width='0.5'/%3E%3Cpath d='M10 20h80M10 40h80M10 60h80M10 80h80' stroke='%234B5563' stroke-width='0.5'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Animated Gradient Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000" />

        {/* Floating Electronics Icons */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 text-blue-500/10 text-6xl animate-float">
            <FaMicrochip />
          </div>
          <div className="absolute top-40 right-20 text-purple-500/10 text-7xl animate-float-delayed">
            <FaMemory />
          </div>
          <div className="absolute bottom-40 left-30 text-blue-500/10 text-5xl animate-float">
            <FaLaptop />
          </div>
          <div className="absolute bottom-20 right-40 text-purple-500/10 text-6xl animate-float-delayed">
            <FaMobile />
          </div>
        </div>

        {/* Animated Lines */}
        <div className="absolute inset-0">
          <div className="absolute left-0 top-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent animate-slide" />
          <div className="absolute right-0 top-0 h-full w-1 bg-gradient-to-b from-transparent via-purple-500/20 to-transparent animate-slide-vertical" />
          <div className="absolute left-0 bottom-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent animate-slide" />
          <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-transparent via-purple-500/20 to-transparent animate-slide-vertical" />
        </div>
      </div>
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb Navigation */}
        <motion.nav
          className="mb-8 bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-sm"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <ol className="flex items-center space-x-2 text-gray-500">
            <li>
              <Link to="/" className="hover:text-blue-600 transition-colors">
                Home
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link
                to="/products"
                className="hover:text-blue-600 transition-colors"
              >
                Products
              </Link>
            </li>
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
                onClick={() =>
                  navigate(`/product/${product._id}/buy`, {
                    state: { selectedPricing },
                  })
                }
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
        {/* <PriceBreakdown pricing={product.pricing} selectedPricing={selectedPricing} /> */}

        {/* Bottom Gradient */}
        <div className="fixed bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent pointer-events-none z-20" />
      </div>

      {/* Modals */}
      <RequestQuote
        product={product}
        isOpen={showQuoteModal}
        onClose={() => setShowQuoteModal(false)}
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
