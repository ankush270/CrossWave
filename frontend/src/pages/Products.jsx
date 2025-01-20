import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { 
  FaFilter, FaSearch, FaSort, FaMicrochip, FaMemory, FaServer,
  FaLaptop, FaMobile, FaNetworkWired, FaStar, FaGlobe, FaBox,
  FaShoppingCart, FaHeart, FaChartLine, FaDollarSign, FaCertificate,
  FaHome, FaTv, FaBlender, FaFan, FaCamera, FaTimes
} from 'react-icons/fa'
import { productsData } from '../data/productsData'

const Products = () => {
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
    const matchesCategory = selectedCategory === 'all' || 
                          product.category === selectedCategory ||
                          product.subcategory === selectedCategory
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.specifications?.size?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.specifications?.capacity?.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesOrigin = selectedOrigin === 'all' || product.origin === selectedOrigin
    const matchesCertification = selectedCertification === 'all' || 
                                product.certifications.includes(selectedCertification)
    const matchesMOQ = minOrder === 'any' || product.moq >= parseInt(minOrder)
    const matchesPriceRange = priceRange === 'all' || 
                             (priceRange === 'low' && parseFloat(product.price.bulk.replace(/[^0-9.]/g, '')) <= 500) ||
                             (priceRange === 'medium' && parseFloat(product.price.bulk.replace(/[^0-9.]/g, '')) > 500 && parseFloat(product.price.bulk.replace(/[^0-9.]/g, '')) <= 1000) ||
                             (priceRange === 'high' && parseFloat(product.price.bulk.replace(/[^0-9.]/g, '')) > 1000)
    
    return matchesCategory && matchesSearch && matchesOrigin && 
           matchesCertification && matchesMOQ && matchesPriceRange
  })

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
        <option value="low">Under $500</option>
        <option value="medium">$500 - $1000</option>
        <option value="high">Above $1000</option>
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

        {/* Enhanced Search Bar with floating effect */}
        <motion.div 
          className="relative max-w-3xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="absolute inset-0 bg-blue-500/20 rounded-2xl blur-xl transform -rotate-1" />
          <div className="relative">
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products, brands, specifications..."
              className="w-full pl-12 pr-12 py-4 bg-white/90 backdrop-blur-sm border-2 border-gray-200 rounded-2xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 text-lg shadow-lg"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <FaTimes />
              </button>
            )}
          </div>
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
                  <motion.div
                    key={product.id}
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
                        <div className="absolute top-2 right-2 px-3 py-1 bg-blue-600 text-white text-sm rounded-full">
                          MOQ: {product.moq}
                        </div>
                        
                        {hoveredProduct === product.id && (
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
                              {product.price.sample}
                            </div>
                            <div className="text-sm text-gray-500 mt-1">
                              Bulk: {product.price.bulk}
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {product.certifications.map((cert, index) => (
                              <span
                                key={index}
                                className="px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded-full"
                              >
                                {cert}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Add specifications */}
                        <div className="mt-4 text-sm text-gray-600">
                          {product.specifications && product.specifications.technical && (
                            Object.entries(product.specifications.technical).map(([key, value]) => (
                              <div key={key} className="flex justify-between items-center">
                                <span className="capitalize">{key}:</span>
                                <span className="font-medium">{value.toString()}</span>
                              </div>
                            ))
                          )}
                        </div>
                      </div>
                    </Link>
                  </motion.div>
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