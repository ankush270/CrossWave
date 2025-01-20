import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaSearch, FaFilter, FaSort, FaEye, FaDownload, FaPrint,
  FaShippingFast, FaBox, FaMoneyBillWave, FaExclamationTriangle,
  FaCheckCircle, FaTruck, FaClock
} from 'react-icons/fa';

const BuyerOrders = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [dateRange, setDateRange] = useState('all');

  const stats = [
    {
      title: 'Total Orders',
      value: '156',
      icon: <FaBox />,
      color: 'blue',
      change: '+12%'
    },
    {
      title: 'In Transit',
      value: '23',
      icon: <FaTruck />,
      color: 'green',
      change: '+5%'
    },
    {
      title: 'Pending',
      value: '8',
      icon: <FaClock />,
      color: 'yellow',
      change: '-2%'
    },
    {
      title: 'Total Value',
      value: '₹8.5M',
      icon: <FaMoneyBillWave />,
      color: 'purple',
      change: '+18%'
    }
  ];

  const orders = [
    {
      id: 'ORD001',
      date: '2024-02-20',
      product: 'Semiconductor Chips - X86',
      supplier: 'Tech Components Ltd',
      quantity: '1000 units',
      amount: '₹85,000',
      status: 'Processing',
      tracking: 'TRK123456',
      eta: '2024-03-01'
    },
    {
      id: 'ORD002',
      date: '2024-02-18',
      product: 'LED Display Modules',
      supplier: 'Display Solutions Inc',
      quantity: '500 units',
      amount: '₹1,20,000',
      status: 'Shipped',
      tracking: 'TRK789012',
      eta: '2024-02-25'
    },
    // Add more orders...
  ];

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'processing': return 'bg-yellow-100 text-yellow-600';
      case 'shipped': return 'bg-blue-100 text-blue-600';
      case 'delivered': return 'bg-green-100 text-green-600';
      case 'cancelled': return 'bg-red-100 text-red-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{stat.title}</p>
                <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
                <span className={`text-sm ${
                  stat.change.startsWith('+') ? 'text-green-500' : 'text-red-500'
                }`}>
                  {stat.change} from last month
                </span>
              </div>
              <div className={`p-3 bg-${stat.color}-50 rounded-lg`}>
                <span className={`text-${stat.color}-500 text-xl`}>
                  {stat.icon}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex flex-wrap gap-4 justify-between items-center">
          <div className="flex-1 min-w-[300px]">
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search orders by ID, product, or supplier..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="flex gap-4">
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Time</option>
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="quarter">This Quarter</option>
            </select>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Status</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg flex items-center gap-2"
            >
              <FaDownload />
              Export
            </motion.button>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-3 px-4">Order ID</th>
                <th className="text-left py-3 px-4">Date</th>
                <th className="text-left py-3 px-4">Product</th>
                <th className="text-left py-3 px-4">Supplier</th>
                <th className="text-left py-3 px-4">Quantity</th>
                <th className="text-left py-3 px-4">Amount</th>
                <th className="text-left py-3 px-4">Status</th>
                <th className="text-left py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <motion.tr
                  key={order.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  whileHover={{ backgroundColor: 'rgba(59, 130, 246, 0.05)' }}
                  className="border-t border-gray-100"
                >
                  <td className="py-3 px-4 font-medium">{order.id}</td>
                  <td className="py-3 px-4">{order.date}</td>
                  <td className="py-3 px-4">{order.product}</td>
                  <td className="py-3 px-4">{order.supplier}</td>
                  <td className="py-3 px-4">{order.quantity}</td>
                  <td className="py-3 px-4">{order.amount}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => {
                          setSelectedOrder(order);
                          setShowOrderDetails(true);
                        }}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-full"
                      >
                        <FaEye />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 text-gray-600 hover:bg-gray-50 rounded-full"
                      >
                        <FaPrint />
                      </motion.button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Details Modal */}
      {showOrderDetails && selectedOrder && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center"
          onClick={() => setShowOrderDetails(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-xl p-6 max-w-2xl w-full mx-4 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold">Order Details</h3>
                  <p className="text-sm text-gray-500">Order ID: {selectedOrder.id}</p>
                </div>
                <button
                  onClick={() => setShowOrderDetails(false)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  ×
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Product</p>
                  <p className="font-medium">{selectedOrder.product}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Supplier</p>
                  <p className="font-medium">{selectedOrder.supplier}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Quantity</p>
                  <p className="font-medium">{selectedOrder.quantity}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Amount</p>
                  <p className="font-medium">{selectedOrder.amount}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(selectedOrder.status)}`}>
                    {selectedOrder.status}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-gray-500">ETA</p>
                  <p className="font-medium">{selectedOrder.eta}</p>
                </div>
              </div>

              {selectedOrder.tracking && (
                <div className="mt-4">
                  <p className="text-sm text-gray-500">Tracking Number</p>
                  <p className="font-medium">{selectedOrder.tracking}</p>
                </div>
              )}

              <div className="flex justify-end gap-4 mt-6">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg"
                >
                  Download Invoice
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                >
                  Track Shipment
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default BuyerOrders; 