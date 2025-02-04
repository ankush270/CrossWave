import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaHeart, FaFileAlt, FaPlus, FaTrash, FaEdit,
  FaSearch, FaFilter, FaShare, FaShoppingCart,
  FaExclamationCircle, FaCheckCircle, FaClock,
  FaArrowRight, FaStar, FaEllipsisV, FaBox, FaFileContract, FaSpinner
} from 'react-icons/fa';

const BuyerWishlist = ({ currentUser }) => {
  const [activeTab, setActiveTab] = useState('wishlist');
  const [searchQuery, setSearchQuery] = useState('');
  const [showRfqForm, setShowRfqForm] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);

  const wishlistItems = [
    {
      id: 'WL001',
      product: 'High-Performance Microcontrollers',
      supplier: 'Tech Solutions Ltd',
      price: '₹2,500/unit',
      minOrder: '100 units',
      availability: 'In Stock',
      rating: 4.5,
      image: 'https://example.com/microcontroller.jpg',
      addedOn: '2024-02-15',
      specs: {
        brand: 'TechMicro',
        model: 'TM2024',
        frequency: '120MHz',
        memory: '256KB Flash'
      }
    },
    {
      id: 'WL002',
      product: 'Industrial LCD Panels',
      supplier: 'Display Tech Inc',
      price: '₹15,000/unit',
      minOrder: '50 units',
      availability: 'Pre-order',
      addedOn: '2024-02-18'
    }
  ];

  const rfqs = [
    {
      id: 'RFQ001',
      product: 'Custom PCB Boards',
      quantity: '1000 units',
      deadline: '2024-03-15',
      status: 'pending',
      responses: 3,
      specs: {
        layers: '4-layer',
        material: 'FR4',
        thickness: '1.6mm',
        finish: 'HASL'
      },
      createdOn: '2024-02-10'
    },
    {
      id: 'RFQ002',
      product: 'Power Supply Units',
      quantity: '500 units',
      deadline: '2024-03-20',
      status: 'active',
      responses: 5,
      createdOn: '2024-02-12'
    }
  ];

  useEffect(() => {
    const fetchChats = async () => {
      try {
        // Replace with your actual API endpoint
        const response = await fetch(`/api/chats?buyerId=${currentUser.id}`);
        const data = await response.json();
        setChats(data);
      } catch (error) {
        console.error('Error fetching chats:', error);
      } finally {
        setLoading(false);
      }
    };

    if (currentUser) {
      fetchChats();
    }
  }, [currentUser]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-600';
      case 'active': return 'bg-green-100 text-green-600';
      case 'closed': return 'bg-gray-100 text-gray-600';
      default: return 'bg-blue-100 text-blue-600';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <FaSpinner className="animate-spin text-2xl text-blue-600" />
      </div>
    );
  }

  if (chats.length === 0) {
    return (
      <div className="text-center py-12">
        <FaFileContract className="mx-auto text-4xl text-gray-400 mb-4" />
        <h3 className="text-lg font-medium text-gray-900">No Quote Requests Yet</h3>
        <p className="mt-1 text-sm text-gray-500">
          Your quote requests and negotiations will appear here
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActiveTab('wishlist')}
            className={`px-6 py-3 rounded-xl font-medium transition-all ${
              activeTab === 'wishlist'
                ? 'bg-gradient-to-r from-blue-500/90 to-purple-600/90 text-white shadow-lg'
                : 'bg-white/50 backdrop-blur-sm hover:bg-white/60'
            }`}
          >
            <div className="flex items-center gap-2">
              <FaHeart />
              <span>Wishlist</span>
              <span className="px-2 py-1 bg-white/20 rounded-full text-xs">
                {wishlistItems.length}
              </span>
            </div>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActiveTab('rfq')}
            className={`px-6 py-3 rounded-xl font-medium transition-all ${
              activeTab === 'rfq'
                ? 'bg-gradient-to-r from-blue-500/90 to-purple-600/90 text-white shadow-lg'
                : 'bg-white/50 backdrop-blur-sm hover:bg-white/60'
            }`}
          >
            <div className="flex items-center gap-2">
              <FaFileAlt />
              <span>RFQs</span>
              <span className="px-2 py-1 bg-white/20 rounded-full text-xs">
                {rfqs.length}
              </span>
            </div>
          </motion.button>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder={`Search ${activeTab === 'wishlist' ? 'products' : 'RFQs'}...`}
              className="pl-10 pr-4 py-2 rounded-lg border border-gray-200 bg-white/50 backdrop-blur-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowRfqForm(true)}
            className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg flex items-center gap-2 shadow-lg"
          >
            <FaPlus />
            Create New RFQ
          </motion.button>
        </div>
      </div>

      {/* Content Area */}
      <AnimatePresence mode="wait">
        {activeTab === 'wishlist' ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {wishlistItems.map((item) => (
              <motion.div
                key={item.id}
                whileHover={{ y: -5 }}
                className="bg-white/50 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-gray-200/50 hover:shadow-lg transition-all"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-semibold text-lg">{item.product}</h3>
                    <p className="text-sm text-gray-600">{item.supplier}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-full"
                    >
                      <FaHeart />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2 text-gray-400 hover:bg-gray-100 rounded-full"
                    >
                      <FaEllipsisV />
                    </motion.button>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Price:</span>
                    <span className="font-medium">{item.price}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Min Order:</span>
                    <span className="font-medium">{item.minOrder}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Availability:</span>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      item.availability === 'In Stock'
                        ? 'bg-green-100 text-green-600'
                        : 'bg-yellow-100 text-yellow-600'
                    }`}>
                      {item.availability}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <FaStar className="text-yellow-400" />
                      <span className="font-medium">{item.rating}</span>
                    </div>
                    <span className="text-sm text-gray-500">
                      Added: {item.addedOn}
                    </span>
                  </div>
                </div>

                <div className="mt-6 flex gap-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg flex items-center justify-center gap-2"
                  >
                    <FaShoppingCart />
                    Order Now
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg"
                  >
                    <FaShare />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            {rfqs.map((rfq) => (
              <motion.div
                key={rfq.id}
                whileHover={{ y: -2 }}
                className="bg-white/50 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-gray-200/50 hover:shadow-lg transition-all"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-lg">{rfq.product}</h3>
                    <div className="flex items-center gap-4 mt-2">
                      <span className="text-sm text-gray-600">
                        Quantity: {rfq.quantity}
                      </span>
                      <span className="text-sm text-gray-600">
                        Deadline: {rfq.deadline}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      rfq.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-600'
                        : 'bg-green-100 text-green-600'
                    }`}>
                      {rfq.status.charAt(0).toUpperCase() + rfq.status.slice(1)}
                    </span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm">
                      {rfq.responses} Responses
                    </span>
                  </div>
                </div>

                {/* RFQ Specs Grid */}
                <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                  {rfq.specs && Object.entries(rfq.specs).map(([key, value]) => (
                    <div key={key} className="bg-gray-50 rounded-lg p-3">
                      <span className="text-sm text-gray-600 block">
                        {key.charAt(0).toUpperCase() + key.slice(1)}:
                      </span>
                      <span className="font-medium">{value}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex justify-between items-center">
                  <span className="text-sm text-gray-500">
                    Created: {rfq.createdOn}
                  </span>
                  <div className="flex gap-3">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg flex items-center gap-2"
                    >
                      <FaEdit />
                      Edit
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg flex items-center gap-2"
                    >
                      View Responses
                      <FaArrowRight />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* RFQ Form Modal */}
      {showRfqForm && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center"
          onClick={() => setShowRfqForm(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-xl p-6 max-w-lg w-full mx-4 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-semibold mb-4">Create New RFQ</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Product Name
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter product name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Quantity Required
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter quantity"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Specifications
                </label>
                <textarea
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  rows="4"
                  placeholder="Enter product specifications"
                ></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Deadline
                </label>
                <input
                  type="date"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="flex justify-end gap-4 mt-6">
                <button
                  type="button"
                  onClick={() => setShowRfqForm(false)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                >
                  Cancel
                </button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                >
                  Submit RFQ
                </motion.button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}

      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-4">Your Quote Requests</h2>
        
        <div className="grid gap-6">
          {chats.map((chat) => {
            const latestNegotiation = chat.negotiations[chat.negotiations.length - 1];
            
            return (
              <motion.div
                key={chat._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex gap-4">
                    <img
                      src={chat.productImage || '/placeholder-product.png'}
                      alt={chat.productName}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{chat.productName}</h3>
                      <div className="mt-2 grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-500">Latest Price</p>
                          <p className="font-medium">${latestNegotiation.price.toFixed(2)}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Quantity</p>
                          <p className="font-medium">{latestNegotiation.quantity} units</p>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${
                        chat.status === 'active' 
                          ? 'bg-green-100 text-green-800'
                          : chat.status === 'completed'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {chat.status.charAt(0).toUpperCase() + chat.status.slice(1)}
                      </span>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <p className="text-sm text-gray-500">Requirements</p>
                    <p className="mt-1 text-sm">{latestNegotiation.requirements}</p>
                  </div>

                  <div className="mt-4 flex justify-end gap-3">
                    <button
                      className="px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg"
                      onClick={() => {/* Handle view details */}}
                    >
                      View Details
                    </button>
                    {chat.status === 'active' && (
                      <button
                        className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg"
                        onClick={() => {/* Handle continue chat */}}
                      >
                        Continue Chat
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BuyerWishlist; 