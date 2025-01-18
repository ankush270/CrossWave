import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  FaShoppingBag, 
  FaTruck, 
  FaWallet, 
  FaBell, 
  FaChartLine,
  FaBox,
  FaMapMarkerAlt,
  FaSearch,
  FaFilter,
  FaClock,
  FaArrowRight,
  FaShoppingCart,
  FaStar
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

const Buyer = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('7days')

  // Sample data
  const spendingData = {
    '7days': {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      data: [120, 250, 180, 320, 280, 450, 310]
    },
    '30days': {
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
      data: [1200, 1500, 1300, 1800]
    }
  }

  const shipments = [
    {
      id: 'SHP001',
      product: 'Premium Headphones',
      status: 'In Transit',
      eta: '2 days',
      location: 'New York',
      progress: 65
    },
    {
      id: 'SHP002',
      product: 'Smart Watch',
      status: 'Out for Delivery',
      eta: 'Today',
      location: 'Los Angeles',
      progress: 90
    }
  ]

  const notifications = [
    {
      id: 1,
      type: 'shipment',
      message: 'Your order #SHP001 will be delivered today',
      time: '2 hours ago'
    },
    {
      id: 2,
      type: 'payment',
      message: 'Payment of $450 was successful',
      time: '5 hours ago'
    }
  ]

  const expenseBreakdown = {
    labels: ['Products', 'Shipping', 'Taxes'],
    datasets: [{
      data: [65, 25, 10],
      backgroundColor: [
        'rgba(59, 130, 246, 0.8)',
        'rgba(16, 185, 129, 0.8)',
        'rgba(249, 115, 22, 0.8)'
      ]
    }]
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-20">
        {/* Welcome Banner */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 mb-8 text-white"
        >
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold mb-2">Welcome back, John! 👋</h1>
              <p className="text-blue-100">Track your orders and manage your purchases</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-white text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors"
            >
              Browse Products
            </motion.button>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {[
            {
              title: 'Active Orders',
              value: '5',
              change: '+2 from last week',
              icon: <FaBox className="w-6 h-6" />,
              color: 'blue'
            },
            {
              title: 'Total Spent',
              value: '$2,450',
              change: 'This month',
              icon: <FaWallet className="w-6 h-6" />,
              color: 'green'
            },
            {
              title: 'Pending Deliveries',
              value: '3',
              change: 'Arriving soon',
              icon: <FaTruck className="w-6 h-6" />,
              color: 'orange'
            }
          ].map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl p-6 shadow-sm"
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
            {/* Spending Chart */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-sm p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Spending Overview</h2>
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
                    labels: spendingData[selectedPeriod].labels,
                    datasets: [{
                      data: spendingData[selectedPeriod].data,
                      fill: true,
                      backgroundColor: 'rgba(59, 130, 246, 0.1)',
                      borderColor: 'rgba(59, 130, 246, 0.8)',
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

            {/* Shipment Tracking */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-sm p-6"
            >
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Active Shipments</h2>
              <div className="space-y-4">
                {shipments.map((shipment) => (
                  <div key={shipment.id} className="p-4 border border-gray-100 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-medium text-gray-900">{shipment.product}</h3>
                        <p className="text-sm text-gray-500">ID: {shipment.id}</p>
                      </div>
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                        {shipment.status}
                      </span>
                    </div>
                    <div className="mt-4">
                      <div className="flex justify-between text-sm text-gray-500 mb-1">
                        <span>Progress</span>
                        <span>{shipment.progress}%</span>
                      </div>
                      <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-blue-500 rounded-full"
                          style={{ width: `${shipment.progress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Notifications */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-sm p-6"
            >
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Notifications</h2>
              <div className="space-y-4">
                {notifications.map((notification) => (
                  <div key={notification.id} className="flex items-start gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                    <div className={`p-2 rounded-lg ${
                      notification.type === 'shipment' ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'
                    }`}>
                      {notification.type === 'shipment' ? <FaTruck /> : <FaWallet />}
                    </div>
                    <div>
                      <p className="text-sm text-gray-900">{notification.message}</p>
                      <span className="text-xs text-gray-500">{notification.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Expense Breakdown */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-sm p-6"
            >
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Expense Breakdown</h2>
              <div className="h-48">
                <Doughnut
                  data={expenseBreakdown}
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
          </div>
        </div>
      </div>
    </div>
  )
}

export default Buyer 