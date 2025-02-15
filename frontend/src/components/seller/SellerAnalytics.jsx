import React, {useEffect, useState} from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import { FaChartLine, FaChartBar, FaChartPie, FaDownload, FaCalendar, FaTruck, FaFileInvoiceDollar, FaBox } from 'react-icons/fa';
import DashboardBackground from '../common/DashboardBackground';
import {analyticsAPI} from "../../api/api.js";

const SellerAnalytics = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('7days');
  const [activeTab, setActiveTab] = useState('sales');
  const [loading, setLoading] = useState(true);
  const [analytics, setAnalytics] = useState(null);



  useEffect(() => {
    const fetchSellerAnalytics = async () => {
      setLoading(true); // Show loading while fetching new data
      try {
        const { data } = await analyticsAPI.getSellerAnalytics(selectedPeriod);
        setAnalytics(data);
      } catch (e) {
        console.log("An error occurred: ", e);
      } finally {
        setLoading(false);
      }
    };

    fetchSellerAnalytics();
  }, [selectedPeriod]);

  if (loading || !analytics) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  const statsCards = [
    {
      id: 'products',
      title: 'Total Products',
      value: analytics.totalProducts,
      change: '+12%',
      trend: 'up',
      icon: <FaBox />,
      color: 'blue',
      description: 'Active products in your inventory'
    },
    {
      id: 'orders',
      title: 'Total Orders',
      value: analytics.totalOrders,
      change: '+23%',
      trend: 'up',
      icon: <FaFileInvoiceDollar />,
      color: 'green',
      description: 'Orders received this month'
    },
    {
      id: 'revenue',
      title: 'Revenue',
      value: `₹${analytics.totalRevenue}`,
      change: '+18%',
      trend: 'up',
      icon: <FaChartLine />,
      color: 'purple',
      description: 'Total revenue this month'
    },
    {
      id: 'shipments',
      title: 'Active Shipments',
      value: analytics.activeShipments,
      change: '-5%',
      trend: 'down',
      icon: <FaTruck />,
      color: 'orange',
      description: 'Shipments in transit'
    }
  ];

  const salesData = {
    labels: analytics.ordersPerDay.map(order =>
       new Date(order.date).toLocaleDateString('en-US', {
         month: selectedPeriod === '7days' ? undefined : 'short',
         day: 'numeric',
         weekday: selectedPeriod === '7days' ? 'short' : undefined
       })
    ),
    datasets: [{
      label: 'Orders per Day',
      data: analytics.ordersPerDay.map(order => order.count),
      fill: true,
      borderColor: 'rgb(59, 130, 246)',
      backgroundColor: 'rgba(59, 130, 246, 0.1)',
      tension: 0.4
    }]
  };

  const revenueData = {
    labels: analytics.ordersPerDay.map(order =>
       new Date(order.date).toLocaleDateString('en-US', {
         month: 'short',
         day: 'numeric'
       })
    ),
    datasets: [{
      label: 'Revenue',
      data: analytics.ordersPerDay.map(order => order.revenue), // Use actual revenue
      backgroundColor: 'rgba(16, 185, 129, 0.8)',
    }]
  };


  const categoryData = {
    labels: analytics.productCategories.map(category => category._id),
    datasets: [{
      data: analytics.productCategories.map(category => category.count),
      backgroundColor: [
        'rgba(59, 130, 246, 0.8)',
        'rgba(16, 185, 129, 0.8)',
        'rgba(249, 115, 22, 0.8)',
        'rgba(139, 92, 246, 0.8)'
      ]
    }]
  };

  const tabs = [
    { id: 'sales', label: 'Sales Analysis', icon: <FaChartLine /> },
    { id: 'revenue', label: 'Revenue', icon: <FaChartBar /> },
    { id: 'categories', label: 'Categories', icon: <FaChartPie /> }
  ];



  return (
     <div className="relative min-h-screen">
       <DashboardBackground />

       {/* Main Content */}
       <div className="relative z-10 space-y-6 p-6">
         {/* Header */}
         <div className="flex flex-wrap justify-between items-center gap-4">
           <h2 className="text-2xl font-bold text-gray-800">Analytics Dashboard</h2>
           <div className="flex gap-4">
             <div className="flex items-center gap-2 bg-white/80 backdrop-blur-lg p-2 rounded-lg shadow-sm">
               <FaCalendar className="text-gray-500" />
               <select
                  value={selectedPeriod}
                  onChange={(e) => setSelectedPeriod(e.target.value)}
                  className="bg-transparent border-none focus:ring-0"
               >
                 <option value="7days">Last 7 Days</option>
                 <option value="30days">Last 30 Days</option>
                 <option value="90days">Last 90 Days</option>
               </select>
             </div>
             <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg flex items-center gap-2"
             >
               <FaDownload />
               Export Report
             </motion.button>
           </div>
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
                 // onHoverStart={() => setHoveredStat(card.id)}
                 // onHoverEnd={() => setHoveredStat(null)}
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
                  {/* <AnimatePresence>
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
                        </AnimatePresence> */}
                </div>
              </motion.div>
           ))}
         </div>

         {/* Analytics Tabs */}
         <div className="bg-white/80 backdrop-blur-lg rounded-xl shadow-lg p-6 border border-gray-100">
           <div className="flex gap-4 mb-6">
             {tabs.map((tab) => (
                <motion.button
                   key={tab.id}
                   whileHover={{ scale: 1.05 }}
                   whileTap={{ scale: 0.95 }}
                   onClick={() => setActiveTab(tab.id)}
                   className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                      activeTab === tab.id
                         ? 'bg-blue-500 text-white shadow-lg'
                         : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                   }`}
                >
                  {tab.icon}
                  {tab.label}
                </motion.button>
             ))}
           </div>

           {/* <AnimatePresence mode="wait"> */}
           <AnimatePresence mode="popLayout">
             <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
             >
               {activeTab === 'sales' && (
                  <div className="h-[400px]">
                    <Line
                       data={salesData}
                       options={{
                         responsive: true,
                         maintainAspectRatio: false,
                         plugins: {
                           legend: {
                             position: 'bottom'
                           }
                         }
                       }}
                    />
                  </div>
               )}

               {activeTab === 'revenue' && (
                  <div className="h-[400px]">
                    <Bar
                       data={revenueData}
                       options={{
                         responsive: true,
                         maintainAspectRatio: false,
                         plugins: {
                           legend: {
                             position: 'bottom'
                           }
                         }
                       }}
                    />
                  </div>
               )}

               {activeTab === 'categories' && (
                  <div className="h-[400px] flex justify-center">
                    <div className="w-[400px]">
                      <Doughnut
                         data={categoryData}
                         options={{
                           responsive: true,
                           maintainAspectRatio: false,
                           plugins: {
                             legend: {
                               position: 'bottom'
                             }
                           }
                         }}
                      />
                    </div>
                  </div>
               )}
             </motion.div>
           </AnimatePresence>
         </div>

         {/* Key Metrics */}
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
           {[
             { label: 'Average Order Value', value: '₹2,450', change: '+12%' },
             { label: 'Conversion Rate', value: '3.2%', change: '+0.8%' },
             { label: 'Total Customers', value: '1,234', change: '+23%' },
             { label: 'Customer Retention', value: '78%', change: '+5%' }
           ].map((metric, index) => (
              <motion.div
                 key={index}
                 whileHover={{ scale: 1.02, translateY: -5 }}
                 className="bg-white/80 backdrop-blur-lg p-6 rounded-xl shadow-lg border border-gray-100"
              >
                <h3 className="text-gray-600 text-sm">{metric.label}</h3>
                <div className="flex items-end gap-2 mt-2">
                  <span className="text-2xl font-bold">{metric.value}</span>
                  <span className="text-green-500 text-sm">{metric.change}</span>
                </div>
              </motion.div>
           ))}
         </div>
       </div>
     </div>
  );
};

export default SellerAnalytics;