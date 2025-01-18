import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  FaBox, 
  FaChartLine, 
  FaDollarSign, 
  FaUsers,
  FaPlus,
  FaFileAlt,
  FaComments,
  FaCog,
  FaTruck,
  FaSearch,
  FaBell,
  FaEllipsisV,
  FaStore,
  FaShoppingCart
} from 'react-icons/fa'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ArcElement
} from 'chart.js'
import { Line, Doughnut } from 'react-chartjs-2'

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ArcElement
)

const Seller = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('7days')
  const [selectedTab, setSelectedTab] = useState('overview')

  // Sample data
  const salesData = {
    '7days': {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      data: [3200, 4100, 3800, 5200, 4800, 6100, 5400]
    },
    '30days': {
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
      data: [18500, 22400, 19800, 24600]
    }
  }

  const recentOrders = [
    {
      id: 'ORD001',
      product: 'Premium Headphones',
      buyer: 'John Doe',
      status: 'Pending',
      amount: 129.99,
      date: '2024-02-20'
    },
    {
      id: 'ORD002',
      product: 'Wireless Keyboard',
      buyer: 'Jane Smith',
      status: 'Shipped',
      amount: 89.99,
      date: '2024-02-19'
    }
  ]

  const productPerformance = {
    labels: ['Electronics', 'Accessories', 'Gadgets'],
    datasets: [{
      data: [45, 30, 25],
      backgroundColor: [
        'rgba(59, 130, 246, 0.8)',
        'rgba(16, 185, 129, 0.8)',
        'rgba(249, 115, 22, 0.8)'
      ]
    }]
  }

  const notifications = [
    {
      id: 1,
      type: 'order',
      message: 'New order #ORD001 received',
      time: '10 minutes ago'
    },
    {
      id: 2,
      type: 'inquiry',
      message: 'New product inquiry from buyer',
      time: '1 hour ago'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-20">
        {/* Welcome Banner */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-indigo-600 to-indigo-800 rounded-2xl p-8 mb-8 text-white"
        >
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold mb-2">Welcome to Seller Central</h1>
              <p className="text-indigo-100">Your business performance at a glance</p>
              <div className="mt-4 flex items-center gap-2">
                <span className="text-2xl font-bold">$85,420</span>
                <span className="px-2 py-1 bg-green-500 text-white text-sm rounded-full">
                  +12.5%
                </span>
              </div>
            </div>
            <div className="flex gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-white/10 backdrop-blur-sm text-white rounded-lg font-medium hover:bg-white/20 transition-colors"
              >
                <FaPlus className="inline-block mr-2" />
                Add Product
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-white text-indigo-600 rounded-lg font-medium hover:bg-indigo-50 transition-colors"
              >
                View Analytics
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            {
              title: 'Total Orders',
              value: '156',
              change: '+12 this week',
              icon: <FaShoppingCart className="w-6 h-6" />,
              color: 'blue'
            },
            {
              title: 'Active Products',
              value: '45',
              change: '5 out of stock',
              icon: <FaStore className="w-6 h-6" />,
              color: 'green'
            },
            {
              title: 'Pending Shipments',
              value: '8',
              change: '3 urgent',
              icon: <FaTruck className="w-6 h-6" />,
              color: 'yellow'
            },
            {
              title: 'Customer Inquiries',
              value: '12',
              change: '4 unread',
              icon: <FaComments className="w-6 h-6" />,
              color: 'purple'
            }
          ].map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className={`w-12 h-12 rounded-lg bg-${stat.color}-100 flex items-center justify-center mb-4`}>
                <div className={`text-${stat.color}-600`}>{stat.icon}</div>
              </div>
              <h3 className="text-gray-500 text-sm font-medium">{stat.title}</h3>
              <div className="mt-2 flex items-baseline">
                <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                <p className="ml-2 text-sm text-gray-500">{stat.change}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Charts */}
          <div className="lg:col-span-2 space-y-8">
            {/* Sales Chart */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-sm p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Sales Overview</h2>
                <select 
                  className="border border-gray-200 rounded-lg px-3 py-1 text-sm"
                  value={selectedPeriod}
                  onChange={(e) => setSelectedPeriod(e.target.value)}
                >
                  <option value="7days">Last 7 days</option>
                  <option value="30days">Last 30 days</option>
                </select>
              </div>
              <div className="h-64">
                <Line
                  data={{
                    labels: salesData[selectedPeriod].labels,
                    datasets: [{
                      data: salesData[selectedPeriod].data,
                      fill: true,
                      backgroundColor: 'rgba(79, 70, 229, 0.1)',
                      borderColor: 'rgba(79, 70, 229, 0.8)',
                      tension: 0.4
                    }]
                  }}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: { display: false }
                    }
                  }}
                />
              </div>
            </motion.div>

            {/* Recent Orders */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-sm overflow-hidden"
            >
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900">Recent Orders</h2>
                  <button className="text-indigo-600 hover:text-indigo-700 text-sm font-medium">
                    View All
                  </button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      {['Order ID', 'Product', 'Customer', 'Status', 'Amount'].map((header) => (
                        <th
                          key={header}
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {recentOrders.map((order) => (
                      <tr key={order.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          #{order.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {order.product}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {order.buyer}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            order.status === 'Pending'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-green-100 text-green-800'
                          }`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          ${order.amount}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Product Performance */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-sm p-6"
            >
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Product Performance</h2>
              <div className="h-64">
                <Doughnut
                  data={productPerformance}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    cutout: '70%',
                    plugins: {
                      legend: {
                        position: 'bottom',
                        labels: {
                          padding: 20
                        }
                      }
                    }
                  }}
                />
              </div>
            </motion.div>

            {/* Notifications */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-sm p-6"
            >
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Recent Updates</h2>
              <div className="space-y-4">
                {notifications.map((notification) => (
                  <div key={notification.id} className="flex items-start gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                    <div className={`p-2 rounded-lg ${
                      notification.type === 'order' ? 'bg-indigo-100 text-indigo-600' : 'bg-green-100 text-green-600'
                    }`}>
                      {notification.type === 'order' ? <FaShoppingCart /> : <FaComments />}
                    </div>
                    <div>
                      <p className="text-sm text-gray-900">{notification.message}</p>
                      <span className="text-xs text-gray-500">{notification.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Seller 