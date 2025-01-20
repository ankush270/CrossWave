import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaSearch, FaFilter, FaEye, FaTruck, FaCheck,
  FaClock, FaBan, FaFileDownload, FaSort, FaBox
} from 'react-icons/fa';

const SellerOrders = () => {
  const [selectedTab, setSelectedTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);

  const orderTabs = [
    { id: 'all', label: 'All Orders', count: 125 },
    { id: 'pending', label: 'Pending', count: 45 },
    { id: 'processing', label: 'Processing', count: 28 },
    { id: 'shipped', label: 'Shipped', count: 32 },
    { id: 'delivered', label: 'Delivered', count: 20 }
  ];

  const orders = [
    {
      id: 'ORD-2024-001',
      customer: 'Tech Solutions Ltd',
      items: [
        { name: 'High-Performance Microcontroller', quantity: 50, price: '₹1,200' },
        { name: 'LED Display Module', quantity: 25, price: '₹800' }
      ],
      total: '₹80,000',
      status: 'pending',
      date: '2024-02-20',
      paymentStatus: 'paid',
      shippingAddress: 'Industrial Area, Phase 2, Bangalore',
      priority: 'high'
    },
    // Add more orders...
  ];

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      processing: 'bg-blue-100 text-blue-800',
      shipped: 'bg-purple-100 text-purple-800',
      delivered: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getStatusIcon = (status) => {
    const icons = {
      pending: <FaClock />,
      processing: <FaBox />,
      shipped: <FaTruck />,
      delivered: <FaCheck />,
      cancelled: <FaBan />
    };
    return icons[status] || <FaClock />;
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Orders Management</h1>
          <p className="text-gray-600">Track and manage your customer orders</p>
        </div>
        <div className="flex gap-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg flex items-center gap-2"
          >
            <FaFileDownload />
            Export Orders
          </motion.button>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white/50 backdrop-blur-lg rounded-xl p-4 border border-gray-200/50">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[200px]">
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search orders..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-4 py-2 bg-white rounded-lg border border-gray-200 flex items-center gap-2 hover:bg-gray-50"
          >
            <FaFilter className="text-gray-600" />
            <span>Filters</span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-4 py-2 bg-white rounded-lg border border-gray-200 flex items-center gap-2 hover:bg-gray-50"
          >
            <FaSort className="text-gray-600" />
            <span>Sort</span>
          </motion.button>
        </div>
      </div>

      {/* Order Tabs */}
      <div className="flex overflow-x-auto gap-2 pb-2">
        {orderTabs.map((tab) => (
          <motion.button
            key={tab.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setSelectedTab(tab.id)}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 whitespace-nowrap ${
              selectedTab === tab.id
                ? 'bg-blue-500 text-white'
                : 'bg-white/50 backdrop-blur-sm hover:bg-white/80'
            }`}
          >
            {tab.label}
            <span className={`px-2 py-0.5 rounded-full text-xs ${
              selectedTab === tab.id
                ? 'bg-white/20'
                : 'bg-blue-100 text-blue-600'
            }`}>
              {tab.count}
            </span>
          </motion.button>
        ))}
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {orders.map((order) => (
          <motion.div
            key={order.id}
            layoutId={order.id}
            onClick={() => setSelectedOrder(order)}
            className="bg-white/50 backdrop-blur-lg rounded-xl p-4 border border-gray-200/50 hover:bg-white/60 cursor-pointer"
          >
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-3">
                  <h3 className="font-semibold">{order.id}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs flex items-center gap-1 ${getStatusColor(order.status)}`}>
                    {getStatusIcon(order.status)}
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                  {order.priority === 'high' && (
                    <span className="px-2 py-0.5 rounded-full text-xs bg-red-100 text-red-600">
                      High Priority
                    </span>
                  )}
                </div>
                <p className="text-gray-600 mt-1">{order.customer}</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="font-semibold">{order.total}</div>
                  <div className="text-sm text-gray-600">{order.date}</div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <FaEye className="text-gray-600" />
                </motion.button>
              </div>
            </div>

            {/* Order Items Preview */}
            <div className="mt-4 space-y-2">
              {order.items.map((item, index) => (
                <div key={index} className="flex items-center justify-between text-sm text-gray-600">
                  <span>{item.name} × {item.quantity}</span>
                  <span>{item.price}</span>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Order Details Modal */}
      <AnimatePresence>
        {selectedOrder && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedOrder(null)}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center"
          >
            {/* Modal content */}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SellerOrders; 