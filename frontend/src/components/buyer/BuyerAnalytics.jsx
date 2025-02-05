import React, {useEffect, useState} from 'react';
import { motion } from 'framer-motion';
import { 
  FaDownload,
  FaDollarSign, FaBox, FaTruck, FaIndustry
} from 'react-icons/fa';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  PointElement
} from 'chart.js';
import {analyticsAPI} from "../../api/api.js";

// ✅ Register required components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  PointElement
);


const BuyerAnalytics = () => {
  const [timeRange, setTimeRange] = useState('month');
  const [category, setCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [analytics, setAnalytics] = useState(null);



  // Sample data for charts
  const purchaseData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Purchase Volume',
        data: [650000, 590000, 800000, 810000, 560000, 950000],
        fill: true,
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4
      }
    ]
  };

  const categoryData = {
    labels: ['Semiconductors', 'PCB Components', 'Display Units', 'Power Supplies', 'Others'],
    datasets: [
      {
        data: [35, 25, 20, 15, 5],
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)',
          'rgba(34, 197, 94, 0.8)',
          'rgba(168, 85, 247, 0.8)',
          'rgba(249, 115, 22, 0.8)',
          'rgba(107, 114, 128, 0.8)'
        ]
      }
    ]
  };

  const supplierData = {
    labels: ['Tech Solutions', 'Global Electronics', 'Circuit Pro', 'Display Tech', 'Power Systems'],
    datasets: [
      {
        label: 'Purchase Amount (₹)',
        data: [450000, 380000, 320000, 280000, 220000],
        backgroundColor: 'rgba(59, 130, 246, 0.8)',
      }
    ]
  };

  const stats = [
    {
      title: 'Total Spent',
      value: '₹4.2M',
      change: '+15%',
      icon: <FaDollarSign />,
      color: 'blue'
    },
    {
      title: 'Orders',
      value: '156',
      change: '+8%',
      icon: <FaBox />,
      color: 'green'
    },
    {
      title: 'Suppliers',
      value: '12',
      change: '+2',
      icon: <FaIndustry />,
      color: 'purple'
    },
    {
      title: 'Avg Delivery',
      value: '4.2 days',
      change: '-0.5 days',
      icon: <FaTruck />,
      color: 'orange'
    }
  ];

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

      {/* Filters */}
      <div className="flex flex-wrap gap-4 justify-between items-center">
        <div className="flex gap-4">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
            <option value="year">This Year</option>
          </select>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All Categories</option>
            <option value="semiconductors">Semiconductors</option>
            <option value="pcb">PCB Components</option>
            <option value="display">Display Units</option>
            <option value="power">Power Supplies</option>
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

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Purchase Trends */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
        >
          <h3 className="text-lg font-semibold mb-4">Purchase Trends</h3>
          <Line data={purchaseData} options={{ responsive: true }} />
        </motion.div>

        {/* Category Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
        >
          <h3 className="text-lg font-semibold mb-4">Category Distribution</h3>
          <Doughnut data={categoryData} options={{ responsive: true }} />
        </motion.div>

        {/* Top Suppliers */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 lg:col-span-2"
        >
          <h3 className="text-lg font-semibold mb-4">Top Suppliers by Purchase Volume</h3>
          <Bar data={supplierData} options={{ responsive: true }} />
        </motion.div>
      </div>

      {/* Key Metrics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
      >
        <h3 className="text-lg font-semibold mb-4">Key Performance Metrics</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">Average Order Value</p>
            <h4 className="text-xl font-bold mt-1">₹27,000</h4>
            <span className="text-sm text-green-500">+5% from last month</span>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">Order Success Rate</p>
            <h4 className="text-xl font-bold mt-1">98.5%</h4>
            <span className="text-sm text-green-500">+0.5% from last month</span>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">Supplier Response Time</p>
            <h4 className="text-xl font-bold mt-1">4.2 hours</h4>
            <span className="text-sm text-green-500">-0.3 hours from last month</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default BuyerAnalytics; 