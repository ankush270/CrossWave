import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaTruck, FaWarehouse, FaBoxOpen, FaMapMarkerAlt, 
  FaSearch, FaFilter, FaDownload, FaShippingFast 
} from 'react-icons/fa';
import DashboardBackground from '../common/DashboardBackground';

const SellerLogistics = () => {
  const [activeTab, setActiveTab] = useState('shipments');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const logisticsStats = [
    {
      title: 'Active Shipments',
      value: '24',
      icon: <FaTruck />,
      color: 'blue',
      change: '+5'
    },
    {
      title: 'In Warehouse',
      value: '156',
      icon: <FaWarehouse />,
      color: 'green',
      change: '+12'
    },
    {
      title: 'Pending Orders',
      value: '38',
      icon: <FaBoxOpen />,
      color: 'yellow',
      change: '-3'
    },
    {
      title: 'Delivery Success',
      value: '98%',
      icon: <FaShippingFast />,
      color: 'purple',
      change: '+2%'
    }
  ];

  const shipments = [
    {
      id: 'SHP001',
      product: 'Premium Headphones',
      customer: 'John Doe',
      destination: 'Mumbai, India',
      status: 'in-transit',
      eta: '2024-02-25'
    },
    
    // Add more shipments...
  ];

  return (
    <div className="relative min-h-screen">
      <DashboardBackground />
      
      {/* Main Content */}
      <div className="relative z-10 space-y-6 p-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">Logistics Management</h2>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg flex items-center gap-2"
          >
            <FaDownload />
            Export Report
          </motion.button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {logisticsStats.map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.02, translateY: -5 }}
              className={`bg-white/80 backdrop-blur-lg p-6 rounded-xl shadow-lg border border-${stat.color}-100`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{stat.title}</p>
                  <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
                  <span className={`text-sm ${
                    stat.change.startsWith('+') ? 'text-green-500' : 'text-red-500'
                  }`}>
                    {stat.change}
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

        {/* Shipments Table */}
        <div className="bg-white/80 backdrop-blur-lg rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search shipments..."
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            
            <div className="flex gap-4">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Status</option>
                <option value="in-transit">In Transit</option>
                <option value="delivered">Delivered</option>
                <option value="pending">Pending</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-50/50">
                  <th className="text-left py-3 px-4">Shipment ID</th>
                  <th className="text-left py-3 px-4">Product</th>
                  <th className="text-left py-3 px-4">Customer</th>
                  <th className="text-left py-3 px-4">Destination</th>
                  <th className="text-left py-3 px-4">Status</th>
                  <th className="text-left py-3 px-4">ETA</th>
                  <th className="text-left py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {shipments.map((shipment) => (
                  <motion.tr
                    key={shipment.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    whileHover={{ backgroundColor: 'rgba(59, 130, 246, 0.05)' }}
                    className="border-t"
                  >
                    <td className="py-3 px-4">{shipment.id}</td>
                    <td className="py-3 px-4">{shipment.product}</td>
                    <td className="py-3 px-4">{shipment.customer}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1">
                        <FaMapMarkerAlt className="text-red-500" />
                        {shipment.destination}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-sm ${
                        shipment.status === 'in-transit'
                          ? 'bg-blue-100 text-blue-600'
                          : shipment.status === 'delivered'
                          ? 'bg-green-100 text-green-600'
                          : 'bg-yellow-100 text-yellow-600'
                      }`}>
                        {shipment.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">{shipment.eta}</td>
                    <td className="py-3 px-4">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="text-blue-600 hover:text-blue-700"
                      >
                        Track
                      </motion.button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Map View Placeholder */}
        <div className="bg-white/80 backdrop-blur-lg rounded-xl shadow-lg p-6 border border-gray-100 h-[400px] flex items-center justify-center">
          <p className="text-gray-500">Shipment Tracking Map View</p>
        </div>
      </div>
    </div>
  );
};

export default SellerLogistics; 