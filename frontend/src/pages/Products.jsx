import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { 
  FaFilter, FaSearch, FaSort, FaMicrochip, FaMemory, FaServer,
  FaLaptop, FaMobile, FaNetworkWired, FaStar, FaGlobe, FaBox,
  FaShoppingCart, FaHeart, FaChartLine, FaDollarSign, FaCertificate,
  FaHome, FaTv, FaBlender, FaFan, FaCamera, FaTimes, FaShieldAlt,
  FaBoxes, FaUserCheck, FaTags, FaPercentage
} from 'react-icons/fa'
import { productsData } from '../data/productsData'
import { getUserCurrency, formatPrice, currencies } from '../utils/currencyUtils'
import CurrencySelector from '../components/CurrencySelector'
import { useCurrency } from '../context/CurrencyContext'

const Products = () => {
  const { currencyInfo, setCurrencyInfo } = useCurrency();
  
  // State management
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState('popular')
  const [minOrder, setMinOrder] = useState('any')
  const [showFilters, setShowFilters] = useState(false)
  const [hoveredProduct, setHoveredProduct] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [priceRange, setPriceRange] = useState('all')
  const [selectedOrigin, setSelectedOrigin] = useState('all')
  const [selectedCertification, setSelectedCertification] = useState('all')
  const [showBulkDiscount, setShowBulkDiscount] = useState(false);
  const [verifiedSellers, setVerifiedSellers] = useState(false);
  const [inStock, setInStock] = useState(false);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [deliveryTime, setDeliveryTime] = useState('any');

  // Enhanced categories with more electronics items
  const categories = {
    all: {
      name: 'All Products',
      icon: <FaMicrochip />,
      subcategories: []
    },
    smartphones: {
      name: 'Smartphones & Tablets',
      icon: <FaMobile />,
      subcategories: ['Mobile Phones', 'Tablets', 'Accessories', 'Spare Parts']
    },
    homeAppliances: {
      name: 'Home Appliances',
      icon: <FaHome />,
      subcategories: [
        'Refrigerators',
        'Washing Machines',
        'Air Conditioners',
        'Microwave Ovens',
        'Dishwashers'
      ]
    },
    entertainment: {
      name: 'Entertainment',
      icon: <FaTv />,
      subcategories: ['TVs', 'Home Theater', 'Gaming Consoles', 'Speakers']
    },
    computers: {
      name: 'Computers & Laptops',
      icon: <FaLaptop />,
      subcategories: ['Laptops', 'Desktops', 'Monitors', 'Printers']
    },
    kitchenAppliances: {
      name: 'Kitchen Appliances',
      icon: <FaBlender />,
      subcategories: [
        'Mixers & Grinders',
        'Food Processors',
        'Electric Kettles',
        'Induction Cooktops'
      ]
    },
    cooling: {
      name: 'Cooling Solutions',
      icon: <FaFan />,
      subcategories: ['Fans', 'Air Coolers', 'Exhaust Fans']
    },
    cameras: {
      name: 'Cameras & Accessories',
      icon: <FaCamera />,
      subcategories: ['DSLR Cameras', 'Security Cameras', 'Action Cameras']
    },
    components: {
      name: 'Electronic Components',
      icon: <FaMicrochip />,
      subcategories: ['Semiconductors', 'Circuit Boards', 'Power Supply']
    }
  }

  // Use productsData instead of inline products array
  const filteredProducts = productsData.filter(product => {
    // Basic category and search filtering
    const matchesCategory = selectedCategory === 'all' || 
                          product.category === selectedCategory;
    
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.category.toLowerCase().includes(searchQuery.toLowerCase());

    // Price range filtering (assuming prices are in INR)
    const productPrice = parseFloat(product.price.bulk.toString().replace(/[^0-9.-]+/g, ""));
    const matchesPriceRange = priceRange === 'all' || 
                             (priceRange === 'low' && productPrice <= 25000) ||
                             (priceRange === 'medium' && productPrice > 25000 && productPrice <= 50000) ||
                             (priceRange === 'high' && productPrice > 50000);

    // Additional filters
    const matchesOrigin = selectedOrigin === 'all' || product.origin === selectedOrigin;
    const matchesCertification = selectedCertification === 'all' || 
                                (product.certifications && product.certifications.includes(selectedCertification));
    const matchesMOQ = minOrder === 'any' || (product.moq >= parseInt(minOrder));
    const matchesVerified = !verifiedSellers || product.verifiedSeller;
    const matchesStock = !inStock || product.inStock;
    const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(product.brand);

    return matchesCategory && matchesSearch && matchesPriceRange && 
           matchesOrigin && matchesCertification && matchesMOQ &&
           matchesVerified && matchesStock && matchesBrand;
  });

  // Sort products
  const sortProducts = (products) => {
    switch(sortBy) {
      case 'price-low':
        return [...products].sort((a, b) => 
          parseFloat(a.price.bulk.replace(/[^0-9.]/g, '')) - 
          parseFloat(b.price.bulk.replace(/[^0-9.]/g, '')))
      case 'price-high':
        return [...products].sort((a, b) => 
          parseFloat(b.price.bulk.replace(/[^0-9.]/g, '')) - 
          parseFloat(a.price.bulk.replace(/[^0-9.]/g, '')))
      case 'moq-low':
        return [...products].sort((a, b) => a.moq - b.moq)
      default:
        return [...products].sort((a, b) => b.rating - a.rating)
    }
  }

  const sortedProducts = sortProducts(filteredProducts)

  // Add price range filter in the filters section
  const priceRangeFilter = (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
      <select
        value={priceRange}
        onChange={(e) => setPriceRange(e.target.value)}
        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
      >
        <option value="all">All Prices</option>
        <option value="low">Under ₹25,000</option>
        <option value="medium">₹25,000 - ₹50,000</option>
        <option value="high">Above ₹50,000</option>
      </select>
    </div>
  )

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  }

  useEffect(() => {
    const initCurrency = async () => {
      try {
        const userCurrency = await getUserCurrency();
        setCurrencyInfo(userCurrency);
      } catch (error) {
        console.error('Error initializing currency:', error);
        setCurrencyInfo({ currency: 'INR', symbol: '₹' });
      }
    };
    
    initCurrency();
  }, [setCurrencyInfo]);

  // Update the currency selector in the filters section
  const currencySelector = (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Select Currency</label>
      <select
        value={currencyInfo.currency}
        onChange={(e) => {
          setCurrencyInfo({
            currency: e.target.value,
            symbol: currencies[e.target.value].symbol
          });
        }}
        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 hover:border-blue-300 transition-colors"
      >
        {Object.entries(currencies).map(([code, { name, symbol }]) => (
          <option key={code} value={code}>
            {code} ({symbol}) - {name}
          </option>
        ))}
      </select>
    </div>
  );

  // Add popular brands list
  const popularBrands = [
    'Samsung', 'LG', 'Sony', 'Panasonic', 'Bosch', 
    'Siemens', 'Philips', 'Hitachi', 'Toshiba', 'Mitsubishi'
  ];

  // Add bulk discount tiers
  const bulkDiscountTiers = {
    tier1: { minQty: 100, discount: 5 },
    tier2: { minQty: 500, discount: 10 },
    tier3: { minQty: 1000, discount: 15 }
  };

  // Update the filters section with new filters
  const additionalFilters = (
    <>
      {/* Verified Sellers Filter */}
      <div className="col-span-1">
        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="checkbox"
            checked={verifiedSellers}
            onChange={(e) => setVerifiedSellers(e.target.checked)}
            className="form-checkbox h-5 w-5 text-blue-600 rounded"
          />
          <span className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <FaUserCheck className="text-blue-500" />
            Verified Sellers Only
          </span>
        </label>
      </div>

      {/* In Stock Filter */}
      <div className="col-span-1">
        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="checkbox"
            checked={inStock}
            onChange={(e) => setInStock(e.target.checked)}
            className="form-checkbox h-5 w-5 text-blue-600 rounded"
          />
          <span className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <FaBoxes className="text-blue-500" />
            In Stock Only
          </span>
        </label>
      </div>

      {/* Delivery Time Filter */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Delivery Time
        </label>
        <select
          value={deliveryTime}
          onChange={(e) => setDeliveryTime(e.target.value)}
          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          <option value="any">Any Time</option>
          <option value="express">Express (1-3 days)</option>
          <option value="standard">Standard (4-7 days)</option>
          <option value="economy">Economy (7-14 days)</option>
        </select>
      </div>

      {/* Brands Filter */}
      <div className="col-span-2">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Popular Brands
        </label>
        <div className="flex flex-wrap gap-2">
          {popularBrands.map(brand => (
            <button
              key={brand}
              onClick={() => {
                setSelectedBrands(prev => 
                  prev.includes(brand) 
                    ? prev.filter(b => b !== brand)
                    : [...prev, brand]
                )
              }}
              className={`px-3 py-1 rounded-full text-sm ${
                selectedBrands.includes(brand)
                  ? 'bg-blue-100 text-blue-600'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {brand}
            </button>
          ))}
        </div>
      </div>
    </>
  );

  // Add bulk discount info component
  const BulkDiscountInfo = () => (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-green-50 p-4 rounded-lg mb-4"
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold text-green-700 flex items-center gap-2">
          <FaPercentage />
          Bulk Order Discounts
        </h3>
        <button
          onClick={() => setShowBulkDiscount(false)}
          className="text-green-700 hover:text-green-800"
        >
          ×
        </button>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {Object.entries(bulkDiscountTiers).map(([tier, { minQty, discount }]) => (
          <div key={tier} className="text-center p-3 bg-white rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-green-600">{discount}%</div>
            <div className="text-sm text-green-700">Min. {minQty} units</div>
          </div>
        ))}
      </div>
    </motion.div>
  );

  // Update the product card to show more info
  const ProductCard = ({ product }) => (
    <motion.div
      variants={itemVariants}
      layout
      whileHover={{ y: -10 }}
      className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
    >
      <Link to={`/product/${product.id}`}>
        <div className="relative overflow-hidden rounded-t-xl">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-56 object-cover transform group-hover:scale-110 transition-transform duration-300"
          />
          
          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-2">
            {product.verifiedSeller && (
              <span className="px-2 py-1 bg-blue-100 text-blue-600 text-xs rounded-full flex items-center gap-1">
                <FaShieldAlt className="text-xs" /> Verified
              </span>
            )}
            {product.inStock && (
              <span className="px-2 py-1 bg-green-100 text-green-600 text-xs rounded-full">
                In Stock
              </span>
            )}
          </div>

          {product.bulkDiscount && (
            <div className="absolute top-2 right-2 px-3 py-1 bg-green-600 text-white text-sm rounded-full flex items-center gap-1">
              <FaTags className="text-xs" />
              Bulk Discount
            </div>
          )}
        </div>

        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
            {product.name}
          </h3>

          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-1">
              <FaGlobe className="text-gray-400" />
              <span className="text-sm text-gray-600">{product.origin}</span>
            </div>
            <div className="flex items-center text-yellow-400">
              <FaStar />
              <span className="ml-1 text-sm text-gray-600">{product.rating}</span>
            </div>
          </div>

          <div className="flex justify-between items-end">
            <div>
              <div className="text-sm text-gray-500">Sample Price</div>
              <div className="text-xl font-bold text-blue-600">
                {formatPrice(product.price.sample, currencyInfo)}
              </div>
              <div className="text-sm text-gray-500 mt-1">
                Bulk: {formatPrice(product.price.bulk, currencyInfo)}
              </div>
            </div>
            <div className="flex flex-wrap gap-1">
              {product.certifications && product.certifications.map((cert, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded-full"
                >
                  {cert}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-20 pb-24 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 z-0">
        {/* Circuit Pattern */}
        <div className="absolute inset-0 bg-repeat opacity-5" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10 10h80v80h-80z' fill='none' stroke='%234B5563' stroke-width='1'/%3E%3Cpath d='M30 30h40v40h-40z' fill='none' stroke='%234B5563' stroke-width='1'/%3E%3Cpath d='M20 10v80M40 10v80M60 10v80M80 10v80' stroke='%234B5563' stroke-width='0.5'/%3E%3Cpath d='M10 20h80M10 40h80M10 60h80M10 80h80' stroke='%234B5563' stroke-width='0.5'/%3E%3C/svg%3E")`
        }} />

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

      {/* Main Content with relative positioning and higher z-index */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Show bulk discount info if enabled */}
        {showBulkDiscount && <BulkDiscountInfo />}

        {/* Hero Section with enhanced design */}
        <motion.div 
          className="text-center mb-12 relative"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl blur-3xl" />
          </div>
          <div className="py-10 px-6 backdrop-blur-md rounded-3xl bg-white/30">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Global Electronics Trading Hub
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Source premium electronics from verified manufacturers worldwide. 
              B2B marketplace for quality electronic components and devices.
            </p>
          </div>
        </motion.div>

        {/* Update the search bar section */}
        <motion.div 
          className="relative max-w-3xl mx-auto mb-12 px-4 sm:px-6 lg:px-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {/* Enhanced search bar container */}
          <div className="relative flex items-center">
            {/* Search icon */}
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
              <FaSearch className="text-xl" />
            </div>

            {/* Search input */}
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products, brands, specifications..."
              className="w-full pl-12 pr-12 py-4 bg-white/90 backdrop-blur-sm border-2 
                         border-gray-200 rounded-2xl focus:border-blue-500 focus:ring-2 
                         focus:ring-blue-200 transition-all duration-300 text-lg shadow-lg
                         placeholder-gray-400"
            />

            {/* Clear button */}
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 
                           text-gray-400 hover:text-gray-600 transition-colors duration-200"
              >
                <FaTimes className="text-xl" />
              </button>
            )}
          </div>

          {/* Optional: Add search suggestions */}
          {searchQuery && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute left-0 right-0 mt-2 bg-white rounded-xl shadow-lg 
                         border border-gray-100 overflow-hidden z-50"
            >
              <div className="p-2">
                <div className="text-xs text-gray-500 px-3 py-1">Popular Searches</div>
                {['Samsung TV', 'iPhone', 'Laptop', 'Headphones'].map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => setSearchQuery(suggestion)}
                    className="w-full text-left px-3 py-2 hover:bg-gray-50 rounded-lg
                               text-gray-700 text-sm transition-colors duration-200"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Filter Toggle Button */}
        <motion.div 
          className="flex justify-center mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <motion.button
            className={`flex items-center gap-2 px-6 py-3 rounded-xl text-white transition-all duration-300 ${
              showFilters ? 'bg-blue-700' : 'bg-blue-600'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowFilters(!showFilters)}
          >
            {showFilters ? <FaTimes /> : <FaFilter />}
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </motion.button>
        </motion.div>

        {/* Filters Section */}
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
                {priceRangeFilter}

                {/* Currency Selector */}
                {currencySelector}

                {/* Additional Filters */}
                {additionalFilters}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Content Grid */}
        <div className="flex gap-8">
          {/* Categories Sidebar */}
          <motion.div 
            className="hidden lg:block w-64 bg-white rounded-2xl shadow-lg p-6 h-fit"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-xl font-bold mb-6">Categories</h3>
            <motion.div 
              className="space-y-2"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {Object.entries(categories).map(([key, category]) => (
                <motion.div key={key} variants={itemVariants}>
                  <button
                    className={`w-full text-left px-4 py-3 rounded-xl flex items-center gap-3 transition-all duration-300 ${
                      selectedCategory === key 
                        ? 'bg-blue-50 text-blue-600 shadow-md' 
                        : 'hover:bg-gray-50'
                    }`}
                    onClick={() => setSelectedCategory(key)}
                  >
                    <span className="text-lg">{category.icon}</span>
                    <span className="font-medium">{category.name}</span>
                  </button>
                  
                  <AnimatePresence>
                    {category.subcategories.length > 0 && selectedCategory === key && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="ml-6 mt-2 space-y-1"
                      >
                        {category.subcategories.map((sub) => (
                          <motion.button
                            key={sub}
                            className="w-full text-left px-4 py-2 text-sm text-gray-600 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition-all duration-300"
                            whileHover={{ x: 5 }}
                          >
                            {sub}
                          </motion.button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Products Grid */}
          <motion.div 
            className="flex-1"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence>
                {sortedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Products 