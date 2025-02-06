import React, {useEffect, useState} from 'react';
import { motion } from 'framer-motion';
import { 
  FaShoppingCart, FaBoxOpen, FaTruck, FaChartLine,
  FaCalendarAlt, FaGlobe, FaArrowUp, FaArrowDown
} from 'react-icons/fa';
import { Line, Doughnut } from 'react-chartjs-2';
import {analyticsAPI} from "../../api/api.js";

const BuyerDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    const fetchBuyerAnalytics = async () => {
      setLoading(true); // Show loading while fetching new data
      try {
        const { data } = await analyticsAPI.getBuyerAnalytics();
        console.log(data);
        setAnalytics(data);
      } catch (e) {
        console.log("An error occurred: ", e);
      } finally {
        setLoading(false);
      }
    };

    fetchBuyerAnalytics();
  }, []);

  if (loading || !analytics) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }
  // Sample data for charts
  const sortedPurchaseVolume = [...analytics.purchaseVolume].sort((a, b) => {
    const [monthA, yearA] = a.month.split("-").map(Number);
    const [monthB, yearB] = b.month.split("-").map(Number);

    return yearA !== yearB ? yearA - yearB : monthA - monthB;
  });

  const purchaseData = {
    labels: sortedPurchaseVolume.map((entry) => entry.month),
    datasets: [
      {
        label: "Purchase Volume",
        data: sortedPurchaseVolume.map((entry) => entry.quantity),
        borderColor: "rgb(59, 130, 246)",
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        fill: true,
        tension: 0.4,
      },
    ],
  };


  const categoryData = {
    labels: analytics.productCategories.map((entry) => entry.category),
    datasets: [
      {
        data: analytics.productCategories.map((entry) => entry.count),
        backgroundColor: [
          "rgba(59, 130, 246, 0.8)",
          "rgba(34, 197, 94, 0.8)",
          "rgba(168, 85, 247, 0.8)",
          "rgba(249, 115, 22, 0.8)",
          "rgba(107, 114, 128, 0.8)"
        ],
      },
    ],
  };

  const stats = [
    {
      title: 'Active Orders',
      value: analytics.activeOrders,
      change: '+8%',
      icon: <FaShoppingCart />,
      color: 'blue'
    },
    {
      title: 'Pending RFQs',
      value: analytics.pendingRFCs,
      change: '+12%',
      icon: <FaBoxOpen />,
      color: 'green'
    },
    {
      title: 'In Transit',
      value: analytics.inTransitOrders,
      change: '-3%',
      icon: <FaTruck />,
      color: 'purple'
    },
    {
      title: 'Total Spent',
      value: `₹${analytics.totalSpend}`,
      change: '+15%',
      icon: <FaChartLine />,
      color: 'orange'
    }
  ];

  const recentOrders = [
    {
      id: 'ORD001',
      product: 'Semiconductor Chips',
      supplier: 'Tech Components Ltd',
      amount: '₹85,000',
      status: 'Processing'
    },
    {
      id: 'ORD002',
      product: 'LED Display Modules',
      supplier: 'Display Solutions Inc',
      amount: '₹1,20,000',
      status: 'Shipped'
    },
    // Add more orders...
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
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

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
        >
          <h3 className="text-lg font-semibold mb-4">Purchase Trends</h3>
          <Line data={purchaseData} options={{ responsive: true }} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
        >
          <h3 className="text-lg font-semibold mb-4">Category Distribution</h3>
          <Doughnut data={categoryData} options={{ responsive: true }} />
        </motion.div>
      </div>

      {/* Recent Orders */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
      >
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-semibold">Recent Orders</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-3 px-4">Order ID</th>
                <th className="text-left py-3 px-4">Product</th>
                <th className="text-left py-3 px-4">Supplier</th>
                <th className="text-left py-3 px-4">Amount</th>
                <th className="text-left py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr key={order.id} className="border-t border-gray-100">
                  <td className="py-3 px-4">{order.id}</td>
                  <td className="py-3 px-4">{order.product}</td>
                  <td className="py-3 px-4">{order.supplier}</td>
                  <td className="py-3 px-4">{order.amount}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      order.status === 'Shipped' 
                        ? 'bg-green-100 text-green-600'
                        : 'bg-yellow-100 text-yellow-600'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default BuyerDashboard; 