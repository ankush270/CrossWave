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
import ProductCard from '../components/products/ProductCard'
import ProductFilters from '../components/products/ProductFilters'
import CategorySidebar from '../components/products/CategorySidebar'
import { categories } from '../data/categories'

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
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API call with the local data
    setProducts(productsData)
    setLoading(false)
  }, [])

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

  if (loading) {
    return <div>Loading...</div>
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

        <ProductFilters 
          showFilters={showFilters}
          sortBy={sortBy}
          setSortBy={setSortBy}
          minOrder={minOrder}
          setMinOrder={setMinOrder}
          selectedOrigin={selectedOrigin}
          setSelectedOrigin={setSelectedOrigin}
          selectedCertification={selectedCertification}
          setSelectedCertification={setSelectedCertification}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
        />

        <div className="flex gap-8">
          <CategorySidebar 
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />

          <motion.div 
            className="flex-1"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedProducts.map((product) => (
                <ProductCard 
                  key={product.id}
                  product={product}
                  hoveredProduct={hoveredProduct}
                  setHoveredProduct={setHoveredProduct}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Products 