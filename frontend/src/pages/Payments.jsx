import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  FaWallet, 
  FaMoneyBillWave, 
  FaChartLine, 
  FaBell,
  FaDownload,
  FaPaperPlane,
  FaSearch,
  FaFilter,
  FaExclamationCircle,
  FaCheckCircle,
  FaClock,
  FaUserCircle,
  FaEllipsisV
} from 'react-icons/fa'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js'
import { Bar, Doughnut } from 'react-chartjs-2'

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
)

const Payments = () => {
  const [activeTab, setActiveTab] = useState('received')
  const [selectedPeriod, setSelectedPeriod] = useState('7days')
  const [showWithdrawModal, setShowWithdrawModal] = useState(false)

  // Sample data
  const payments = [
    {
      id: 'PAY001',
      buyer: 'John Doe',
      amount: 1299.99,
      status: 'Settled',
      date: '2024-02-20',
      product: 'Premium Headphones'
    },
    {
      id: 'PAY002',
      buyer: 'Jane Smith',
      amount: 899.99,
      status: 'Pending',
      date: '2024-02-19',
      product: 'Wireless Keyboard'
    }
  ]

  const revenueData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      label: 'Monthly Revenue',
      data: [4500, 5200, 4800, 6100, 5800, 7200],
      backgroundColor: 'rgba(79, 70, 229, 0.8)'
    }]
  }

  const sourceData = {
    labels: ['Electronics', 'Accessories', 'Gadgets'],
    datasets: [{
      data: [45, 30, 25],
      backgroundColor: [
        'rgba(79, 70, 229, 0.8)',
        'rgba(16, 185, 129, 0.8)',
        'rgba(249, 115, 22, 0.8)'
      ]
    }]
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-purple-300 mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-indigo-300 mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />
        <div className="absolute top-40 left-40 w-80 h-80 rounded-full bg-pink-300 mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000" />
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-20 relative z-10">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-center mb-8"
        >
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Payments</h1>
            <p className="text-gray-500">Manage your earnings and withdrawals</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowWithdrawModal(true)}
            className="px-6 py-3 bg-white/80 backdrop-blur-lg border border-indigo-100 text-indigo-600 rounded-lg font-medium hover:bg-indigo-600 hover:text-white transition-all duration-300 shadow-lg shadow-indigo-500/20"
          >
            <FaMoneyBillWave className="inline-block mr-2" />
            Withdraw Funds
          </motion.button>
        </motion.div>

        {/* Wallet Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {[
            {
              title: 'Available Balance',
              value: '$8,540.50',
              change: 'Ready to withdraw',
              icon: <FaWallet className="w-6 h-6" />,
              color: 'green'
            },
            {
              title: 'Pending Payments',
              value: '$2,150.75',
              change: '3 payments pending',
              icon: <FaClock className="w-6 h-6" />,
              color: 'yellow'
            },
            {
              title: 'Total Earnings',
              value: '$85,420.25',
              change: 'All time earnings',
              icon: <FaChartLine className="w-6 h-6" />,
              color: 'blue'
            }
          ].map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02, translateY: -5 }}
              className="bg-white/70 backdrop-blur-lg rounded-xl p-6 shadow-lg shadow-indigo-500/10 border border-white/50 hover:bg-white/80 transition-all duration-300"
            >
              <div className={`w-12 h-12 rounded-lg bg-${stat.color}-100/80 backdrop-blur-sm flex items-center justify-center mb-4`}>
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

        {/* Tabs Navigation */}
        <div className="border-b border-gray-200/50 backdrop-blur-sm mb-8">
          <nav className="-mb-px flex space-x-8">
            {[
              { id: 'received', name: 'Received Payments' },
              { id: 'pending', name: 'Pending Withdrawals' },
              { id: 'insights', name: 'Revenue Insights' }
            ].map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`
                  py-4 px-1 border-b-2 font-medium text-sm relative
                  ${activeTab === tab.id
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
                `}
              >
                {tab.name}
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-indigo-50/50 rounded-lg -z-10"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </motion.button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="space-y-8">
          {activeTab === 'received' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white/80 backdrop-blur-lg rounded-xl shadow-lg shadow-indigo-500/10 overflow-hidden border border-white/50"
            >
              {/* Search and Filter */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="relative flex-1 max-w-lg">
                    <input
                      type="text"
                      placeholder="Search payments..."
                      className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  </div>
                  <div className="flex items-center gap-4">
                    <select 
                      className="border border-gray-200 rounded-lg px-3 py-2 text-sm"
                      value={selectedPeriod}
                      onChange={(e) => setSelectedPeriod(e.target.value)}
                    >
                      <option value="7days">Last 7 days</option>
                      <option value="30days">Last 30 days</option>
                      <option value="90days">Last 90 days</option>
                    </select>
                    <button className="p-2 text-gray-400 hover:text-gray-500">
                      <FaFilter className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Payments List */}
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      {['Payment ID', 'Buyer', 'Product', 'Amount', 'Status', 'Date', 'Actions'].map((header) => (
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
                    {payments.map((payment) => (
                      <tr key={payment.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          #{payment.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {payment.buyer}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {payment.product}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          ${payment.amount}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            payment.status === 'Settled'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {payment.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {payment.date}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <button className="text-indigo-600 hover:text-indigo-900">
                            View Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {activeTab === 'insights' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Revenue Chart */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/80 backdrop-blur-lg rounded-xl shadow-lg shadow-indigo-500/10 p-6 border border-white/50"
              >
                <h2 className="text-lg font-semibold text-gray-900 mb-6">Revenue Trends</h2>
                <div className="h-64">
                  <Bar
                    data={revenueData}
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

              {/* Revenue Sources */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/80 backdrop-blur-lg rounded-xl shadow-lg shadow-indigo-500/10 p-6 border border-white/50"
              >
                <h2 className="text-lg font-semibold text-gray-900 mb-6">Revenue Sources</h2>
                <div className="h-64">
                  <Doughnut
                    data={sourceData}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      cutout: '70%'
                    }}
                  />
                </div>
              </motion.div>
            </div>
          )}
        </div>
      </div>

      {/* Withdraw Modal */}
      {showWithdrawModal && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="bg-white/90 backdrop-blur-lg rounded-xl p-6 max-w-md w-full mx-4 shadow-2xl border border-white/50"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Withdraw Funds</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Amount to Withdraw
                </label>
                <input
                  type="number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter amount"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Select Bank Account
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                  <option>Main Account (****1234)</option>
                  <option>Secondary Account (****5678)</option>
                </select>
              </div>
              <div className="flex justify-end gap-4 mt-6">
                <button
                  onClick={() => setShowWithdrawModal(false)}
                  className="px-4 py-2 text-gray-700 hover:text-gray-900"
                >
                  Cancel
                </button>
                <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                  Confirm Withdrawal
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}

export default Payments 