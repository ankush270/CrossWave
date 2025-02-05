import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaBox, FaChartLine, FaFileInvoiceDollar, FaTruck, 
  FaArrowUp, FaArrowDown, FaEllipsisH, FaGlobe,
  FaShip, FaPlane, FaIndustry, FaComments
} from 'react-icons/fa';
import { Line, Doughnut } from 'react-chartjs-2';
import { useAuth } from '../../contexts/AuthContext';
import axios from 'axios';

const SellerDashboard = () => {
  const { user } = useAuth();
  const [selectedPeriod, setSelectedPeriod] = useState('7days');
  const [activeCard, setActiveCard] = useState(null);
  const [hoveredStat, setHoveredStat] = useState(null);
  const [activeRfqs, setActiveRfqs] = useState(0);

  // Enhanced sample data
  const salesData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [{
      label: 'Sales',
      data: [30, 45, 35, 50, 40, 60, 55],
      fill: true,
      borderColor: 'rgb(59, 130, 246)',
      backgroundColor: 'rgba(59, 130, 246, 0.1)',
      tension: 0.4
    }]
  };

  const productPerformance = {
    labels: ['Electronics', 'Components', 'Gadgets', 'Accessories'],
    datasets: [{
      data: [45, 25, 20, 10],
      backgroundColor: [
        'rgba(59, 130, 246, 0.8)',
        'rgba(16, 185, 129, 0.8)',
        'rgba(249, 115, 22, 0.8)',
        'rgba(139, 92, 246, 0.8)'
      ]
    }]
  };

  const statsCards = [
    {
      id: 'products',
      title: 'Total Products',
      value: '156',
      change: '+12%',
      trend: 'up',
      icon: <FaBox />,
      color: 'blue',
      description: 'Active products in your inventory'
    },
    {
      id: 'orders',
      title: 'Total Orders',
      value: '1,234',
      change: '+23%',
      trend: 'up',
      icon: <FaFileInvoiceDollar />,
      color: 'green',
      description: 'Orders received this month'
    },
    {
      id: 'revenue',
      title: 'Revenue',
      value: '₹12.4M',
      change: '+18%',
      trend: 'up',
      icon: <FaChartLine />,
      color: 'purple',
      description: 'Total revenue this month'
    },
    {
      id: 'shipments',
      title: 'Active Shipments',
      value: '89',
      change: '-5%',
      trend: 'down',
      icon: <FaTruck />,
      color: 'orange',
      description: 'Shipments in transit'
    },
    {
      title: 'Active RFQs',
      value: activeRfqs.toString(),
      change: 'Current',
      icon: <FaComments />,
      color: 'green'
    }
  ];

  useEffect(() => {
    const fetchRfqCount = async () => {
      try {
        if (!user?.id) return;
        
        const response = await axios.get(`http://localhost:5003/api/chats/seller/${user.id}/stats`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        
        setActiveRfqs(response.data.active);
      } catch (err) {
        console.error('Error fetching RFQ count:', err);
      }
    };

    fetchRfqCount();
  }, [user]);

  return (
    <div className="relative min-h-screen">
      {/* Background Design */}
      <div className="fixed inset-0 z-0">
        {/* Primary Background */}
        <div 
          className="absolute inset-0 bg-gradient-to-br from-gray-50 to-blue-50"
          style={{
            backgroundImage: `
              radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.1) 0%, transparent 25%),
              radial-gradient(circle at 80% 80%, rgba(16, 185, 129, 0.1) 0%, transparent 25%),
              radial-gradient(circle at 50% 50%, rgba(249, 115, 22, 0.05) 0%, transparent 50%)
            `
          }}
        />

        {/* Circuit Board Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M54.627 0l.83.828-1.415 1.415L51.8 0h2.827zM5.373 0l-.83.828L5.96 2.243 8.2 0H5.374zM48.97 0l3.657 3.657-1.414 1.414L46.143 0h2.828zM11.03 0L7.372 3.657 8.787 5.07 13.857 0H11.03zm32.284 0L49.8 6.485 48.384 7.9l-7.9-7.9h2.83zM16.686 0L10.2 6.485 11.616 7.9l7.9-7.9h-2.83zM22.344 0L13.858 8.485 15.272 9.9l7.9-7.9h-.828zm13.312 0L44.143 8.485 42.728 9.9l-7.9-7.9h.828zm-9.9 0L23.344 2.828 21.93 1.414 19.1 0h6.657zm6.142 0L33.313 2.828 34.727 1.414 37.557 0h-5.657z' fill='%23000000' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
            backgroundSize: '30px 30px'
          }}
        />

        {/* Animated Gradient Orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-green-400 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-2000" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-4000" />
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 space-y-6 p-6">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-2 tracking-tight">
            Welcome to Your Export Dashboard
          </h1>
          <p className="text-gray-600 text-lg">
            Manage your international electronics trade efficiently
          </p>
        </motion.div>

        {/* Global Trade Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {[
            { icon: <FaGlobe />, label: 'Global Markets', value: '12 Countries' },
            { icon: <FaShip />, label: 'Shipping Routes', value: '8 Active' },
            { icon: <FaIndustry />, label: 'Manufacturing', value: '3 Facilities' }
          ].map((indicator, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gradient-to-br from-blue-500 to-blue-600 p-4 rounded-xl text-white flex items-center gap-4"
            >
              <div className="text-3xl">{indicator.icon}</div>
              <div>
                <p className="text-sm opacity-80">{indicator.label}</p>
                <p className="text-xl font-bold">{indicator.value}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statsCards.map((card, index) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ 
                scale: 1.02,
                transition: { duration: 0.2 }
              }}
              onHoverStart={() => setHoveredStat(card.id)}
              onHoverEnd={() => setHoveredStat(null)}
              className="relative bg-white/80 backdrop-blur-lg p-6 rounded-xl shadow-lg border border-gray-100 overflow-hidden"
            >
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0 bg-gradient-to-br from-black to-transparent" />
                <div className="w-24 h-24 absolute -right-6 -bottom-6 text-black transform rotate-12">
                  {card.icon}
                </div>
              </div>

              <div className="relative">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-gray-600">{card.title}</p>
                    <h3 className="text-2xl font-bold mt-1">{card.value}</h3>
                    <span className={`text-sm ${
                      card.trend === 'up' ? 'text-green-500' : 'text-red-500'
                    }`}>
                      {card.change}
                    </span>
                  </div>
                  <div className={`p-3 bg-${card.color}-50 rounded-lg`}>
                    <span className={`text-${card.color}-500 text-xl`}>
                      {card.icon}
                    </span>
                  </div>
                </div>

                {/* Hover Description */}
                <AnimatePresence>
                  {hoveredStat === card.id && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute inset-0 bg-gradient-to-b from-white/95 to-white/95 backdrop-blur-sm flex items-center justify-center p-4 text-center"
                    >
                      <p className="text-gray-600">{card.description}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/80 backdrop-blur-lg p-6 rounded-xl shadow-lg border border-gray-100"
          >
            <h3 className="text-lg font-semibold mb-4">Sales Overview</h3>
            <Line data={salesData} options={{
              responsive: true,
              plugins: {
                legend: {
                  position: 'bottom'
                }
              },
              scales: {
                y: {
                  beginAtZero: true
                }
              }
            }} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/80 backdrop-blur-lg p-6 rounded-xl shadow-lg border border-gray-100"
          >
            <h3 className="text-lg font-semibold mb-4">Product Categories</h3>
            <div className="h-[300px] flex items-center justify-center">
              <Doughnut data={productPerformance} options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'bottom'
                  }
                }
              }} />
            </div>
          </motion.div>
        </div>

        {/* Recent Activity Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 backdrop-blur-lg p-6 rounded-xl shadow-lg border border-gray-100 mt-8"
        >
          <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {[
              { time: '2 hours ago', event: 'New order received from Japan', type: 'order' },
              { time: '5 hours ago', event: 'Shipment delivered to Singapore', type: 'delivery' },
              { time: '1 day ago', event: 'New product listing approved', type: 'product' }
            ].map((activity, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-4 p-3 rounded-lg hover:bg-blue-50 transition-colors"
              >
                <div className="w-2 h-2 rounded-full bg-blue-500" />
                <div>
                  <p className="text-sm text-gray-600">{activity.time}</p>
                  <p className="font-medium">{activity.event}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SellerDashboard; 