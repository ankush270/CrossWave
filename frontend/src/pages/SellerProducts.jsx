import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import earbuds from '../assets/earbuds.jpg';
import {
  FaSearch,
  FaBell,
  FaPlus,
  FaChartLine,
  FaEdit,
  FaTrash,
  FaPause,
  FaEye,
  FaShoppingCart,
  FaComments,
  FaMedal,
  FaTimes,
  FaUpload,
  FaSave,
  FaExchangeAlt,
  FaFilter,
  FaSort,
  FaChartBar,
  FaListUl,
  FaThLarge,
  FaDownload,
  FaShare
} from 'react-icons/fa';

const SellerProducts = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [showFilters, setShowFilters] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'New inquiry for iPhone 14 Pro', type: 'inquiry', time: '2 mins ago', isRead: false },
    { id: 2, message: 'Order "MacBook Pro" is low on stock', type: 'stock', time: '5 mins ago', isRead: false },
    { id: 3, message: 'New order received', type: 'order', time: '10 mins ago', isRead: false }
  ]);

  // Analytics data with trends
  const analytics = {
    totalListings: {
      value: 24,
      trend: '+3',
      isPositive: true
    },
    monthSales: {
      value: 156,
      trend: '+12%',
      isPositive: true
    },
    totalRevenue: {
      value: 45890,
      trend: '+8%',
      isPositive: true
    },
    averageRating: {
      value: 4.8,
      trend: '+0.2',
      isPositive: true
    }
  };

  // Sample products data with more details
  const products = [
    {
      id: 1,
      name: 'iPhone 14 Pro Max',
      price: 1099,
      status: 'active',
      stock: 45,
      views: 1200,
      orders: 28,
      inquiries: 15,
      image: earbuds,
      category: 'Smartphones',
      rating: 4.8,
      salesTrend: '+15%',
      lastUpdated: '2 hours ago',
      specs: {
        storage: '256GB',
        color: 'Deep Purple',
        condition: 'New'
      }
    },
    {
      id: 2,
      name: 'MacBook Pro M2',
      price: 1999,
      status: 'low_stock',
      stock: 5,
      views: 890,
      orders: 12,
      inquiries: 8,
      image: earbuds,
      category: 'Laptops',
      rating: 4.9,
      salesTrend: '+8%',
      lastUpdated: '1 day ago',
      specs: {
        processor: 'M2 Pro',
        ram: '16GB',
        storage: '512GB'
      }
    }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  const filterOptions = {
    status: ['All', 'Active', 'Low Stock', 'Out of Stock'],
    category: ['All', 'Smartphones', 'Laptops', 'Audio', 'Accessories'],
    price: ['All', 'Under $500', '$500 - $1000', 'Over $1000'],
    sort: ['Newest', 'Price: Low to High', 'Price: High to Low', 'Best Selling']
  };

  // Function to handle marking notifications as read
  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, isRead: true })));
  };

  // Function to handle clicking outside notifications dropdown
  const handleClickOutside = (e) => {
    if (!e.target.closest('.notifications-container')) {
      setShowNotifications(false);
    }
  };

  React.useEffect(() => {
    if (showNotifications) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showNotifications]);

  // Replace the Notifications section in the header with this:
  const NotificationsSection = () => (
    <div className="relative notifications-container">
      <motion.button 
        whileHover={{ scale: 1.1 }}
        className="p-2 text-gray-600 hover:text-blue-500 relative"
        onClick={() => setShowNotifications(!showNotifications)}
      >
        <FaBell size={24} />
        {notifications.some(n => !n.isRead) && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
          >
            {notifications.filter(n => !n.isRead).length}
          </motion.span>
        )}
      </motion.button>
      
      <AnimatePresence>
        {showNotifications && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-xl z-50"
          >
            <div className="p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-gray-800">Notifications</h3>
                <button 
                  onClick={handleMarkAllAsRead}
                  className="text-sm text-blue-500 hover:text-blue-600 transition-colors"
                >
                  Mark all as read
                </button>
              </div>
              <div className="space-y-3 max-h-[400px] overflow-y-auto">
                {notifications.map((notification) => (
                  <motion.div
                    key={notification.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`flex items-start gap-3 p-3 rounded-lg transition-colors ${
                      notification.isRead ? 'bg-gray-50' : 'bg-blue-50'
                    } hover:bg-gray-100`}
                  >
                    <div className={`p-2 rounded-full ${
                      notification.type === 'inquiry' ? 'bg-blue-100 text-blue-500' :
                      notification.type === 'stock' ? 'bg-orange-100 text-orange-500' :
                      'bg-green-100 text-green-500'
                    }`}>
                      {notification.type === 'inquiry' ? <FaComments size={16} /> :
                       notification.type === 'stock' ? <FaShoppingCart size={16} /> :
                       <FaChartLine size={16} />}
                    </div>
                    <div className="flex-1">
                      <p className={`text-sm ${notification.isRead ? 'text-gray-600' : 'text-gray-800 font-medium'}`}>
                        {notification.message}
                      </p>
                      <span className="text-xs text-gray-500">{notification.time}</span>
                    </div>
                    {!notification.isRead && (
                      <div className="w-2 h-2 rounded-full bg-blue-500 mt-2"></div>
                    )}
                  </motion.div>
                ))}
              </div>
              {notifications.length === 0 && (
                <div className="text-center py-6 text-gray-500">
                  No new notifications
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gray-50"
    >
      {/* Header */}
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
        className="fixed top-0 left-0 right-0 bg-white shadow-md z-50"
      >
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Left Section */}
            <div className="flex items-center gap-4">
              <h1 className="text-xl font-bold text-gray-800">Seller Dashboard</h1>
              <button 
                onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                className="p-2 text-gray-600 hover:text-blue-500 transition-colors"
              >
                {viewMode === 'grid' ? <FaListUl size={20} /> : <FaThLarge size={20} />}
              </button>
            </div>

            {/* Center Section - Search */}
            <div className="flex-1 max-w-xl mx-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products, categories, or specs..."
                  className="w-full px-4 py-2 pl-10 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowAddProduct(true)}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2 shadow-lg"
              >
                <FaPlus /> Add Product
              </motion.button>

              <NotificationsSection />

              <motion.button
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2 text-gray-600 hover:text-blue-500"
              >
                <FaExchangeAlt /> Switch to Buyer
              </motion.button>
            </div>
          </div>

          {/* Filters Bar */}
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            className="mt-4 flex items-center gap-4"
          >
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <FaFilter /> Filters
            </button>
            
            {/* Quick Filter Pills */}
            <div className="flex gap-2 overflow-x-auto pb-2">
              {filterOptions.status.map((status) => (
                <motion.button
                  key={status}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-3 py-1 rounded-full text-sm ${
                    filterStatus === status.toLowerCase()
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                  onClick={() => setFilterStatus(status.toLowerCase())}
                >
                  {status}
                </motion.button>
              ))}
            </div>

            {/* Sort Dropdown */}
            <select className="px-3 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              {filterOptions.sort.map((option) => (
                <option key={option} value={option.toLowerCase().replace(/\s/g, '_')}>
                  {option}
                </option>
              ))}
            </select>
          </motion.div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="container mx-auto px-4 pt-40 pb-8">
        {/* Analytics Cards */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          {Object.entries(analytics).map(([key, data]) => (
            <motion.div
              key={key}
              variants={itemVariants}
              className="bg-white rounded-lg shadow-lg p-6 transform hover:scale-105 transition-transform"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-gray-500 text-sm mb-1 capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </h3>
                  <p className="text-3xl font-bold">
                    {key === 'totalRevenue' ? '$' : ''}{data.value}
                  </p>
                </div>
                <span className={`text-sm font-medium ${
                  data.isPositive ? 'text-green-500' : 'text-red-500'
                }`}>
                  {data.trend}
                </span>
              </div>
              <div className="mt-4 h-2 bg-gray-100 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '70%' }}
                  className="h-full bg-blue-500"
                />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Products Grid/List */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className={viewMode === 'grid' 
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            : "space-y-4"
          }
        >
          {products.map((product) => (
            <motion.div
              key={product.id}
              variants={itemVariants}
              className={`bg-white rounded-lg shadow-lg overflow-hidden ${
                viewMode === 'list' ? 'flex' : ''
              }`}
              whileHover={{ y: -5, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
            >
              {/* Order Image */}
              <div className={`relative ${viewMode === 'list' ? 'w-48' : 'aspect-video'}`}>
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center gap-4"
                >
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    className="p-2 bg-white rounded-full text-gray-800 hover:text-blue-500"
                  >
                    <FaEye size={20} />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    className="p-2 bg-white rounded-full text-gray-800 hover:text-blue-500"
                  >
                    <FaEdit size={20} />
                  </motion.button>
                </motion.div>
                <div className="absolute top-2 right-2 flex gap-2">
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      product.status === 'active' ? 'bg-green-100 text-green-600' :
                      product.status === 'low_stock' ? 'bg-orange-100 text-orange-600' :
                      'bg-red-100 text-red-600'
                    }`}
                  >
                    {product.status === 'active' ? 'Active' :
                     product.status === 'low_stock' ? 'Low Stock' :
                     'Out of Stock'}
                  </motion.span>
                </div>
              </div>

              {/* Order Info */}
              <div className="p-6 flex-1">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-medium text-lg mb-1">{product.name}</h3>
                    <p className="text-sm text-gray-500">{product.category}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-bold">${product.price}</span>
                    <p className="text-sm text-green-500">{product.salesTrend}</p>
                  </div>
                </div>

                {/* Specs */}
                <div className="mb-4">
                  <div className="grid grid-cols-2 gap-2">
                    {Object.entries(product.specs).map(([key, value]) => (
                      <div key={key} className="text-sm">
                        <span className="text-gray-500 capitalize">{key}:</span>{' '}
                        <span className="font-medium">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Performance Metrics */}
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 text-gray-600">
                      <FaEye size={14} />
                      <span className="text-sm">{product.views}</span>
                    </div>
                    <p className="text-xs text-gray-500">Views</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 text-gray-600">
                      <FaShoppingCart size={14} />
                      <span className="text-sm">{product.orders}</span>
                    </div>
                    <p className="text-xs text-gray-500">Orders</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 text-gray-600">
                      <FaComments size={14} />
                      <span className="text-sm">{product.inquiries}</span>
                    </div>
                    <p className="text-xs text-gray-500">Inquiries</p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
                  >
                    <FaEdit size={14} /> Edit
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-4 py-2 text-gray-600 hover:text-red-500 border rounded-lg transition-colors"
                  >
                    <FaTrash size={14} />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-4 py-2 text-gray-600 hover:text-orange-500 border rounded-lg transition-colors"
                  >
                    <FaPause size={14} />
                  </motion.button>
                </div>

                <div className="mt-4 text-xs text-gray-500">
                  Last updated: {product.lastUpdated}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </main>

      {/* Add Order Modal */}
      <AnimatePresence>
        {showAddProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-white rounded-lg max-w-4xl w-full mx-4 p-6"
            >
              {/* Modal Header */}
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold">Add New Product</h2>
                <button
                  onClick={() => setShowAddProduct(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <FaTimes size={24} />
                </button>
              </div>

              {/* Progress Steps */}
              <div className="flex justify-between mb-8">
                {formSteps.map((step, index) => (
                  <div
                    key={index}
                    className={`flex-1 relative ${
                      index < formSteps.length - 1 ? 'after:content-[""] after:absolute after:top-1/2 after:left-1/2 after:w-full after:h-0.5 after:bg-gray-200' : ''
                    }`}
                  >
                    <div className="relative z-10 flex flex-col items-center">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          currentStep > index + 1
                            ? 'bg-green-500 text-white'
                            : currentStep === index + 1
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-200 text-gray-500'
                        }`}
                      >
                        {currentStep > index + 1 ? '✓' : index + 1}
                      </div>
                      <span className="text-xs mt-1">{step.title}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Form Content */}
              <div className="mb-6">
                {currentStep === 1 && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Product Name
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter product name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Description
                      </label>
                      <textarea
                        className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows="4"
                        placeholder="Enter product description"
                      ></textarea>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Category
                      </label>
                      <select className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="">Select category</option>
                        <option value="smartphones">Smartphones</option>
                        <option value="laptops">Laptops</option>
                        <option value="audio">Audio</option>
                      </select>
                    </div>
                  </div>
                )}

                {/* Add other step content here */}
              </div>

              {/* Form Actions */}
              <div className="flex justify-between">
                <button
                  onClick={() => currentStep > 1 && setCurrentStep(currentStep - 1)}
                  className={`px-4 py-2 rounded-lg ${
                    currentStep === 1
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                  disabled={currentStep === 1}
                >
                  Previous
                </button>
                <button
                  onClick={() =>
                    currentStep < formSteps.length
                      ? setCurrentStep(currentStep + 1)
                      : setShowAddProduct(false)
                  }
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  {currentStep === formSteps.length ? 'Submit' : 'Next'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Button for Mobile */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-6 right-6 p-4 bg-blue-500 text-white rounded-full shadow-lg md:hidden"
        onClick={() => setShowAddProduct(true)}
      >
        <FaPlus size={24} />
      </motion.button>
    </motion.div>
  );
};

export default SellerProducts; 