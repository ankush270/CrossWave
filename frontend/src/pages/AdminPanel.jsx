import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FaUsers, FaExchangeAlt, FaChartLine, FaCog,
  FaSearch, FaBell, FaMoon, FaSun, FaSignOutAlt,
  FaUserPlus, FaMoneyBillWave, FaExclamationTriangle,
  FaCheckCircle, FaTimesCircle, FaEdit, FaBan,
  FaEye, FaDownload, FaFilter
} from 'react-icons/fa'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar
} from 'recharts'

// Dummy data for analytics
const analyticsData = {
  users: {
    total: 1250,
    active: 980,
    pending: 150,
    banned: 120,
    growth: [
      { month: 'Jan', users: 800 },
      { month: 'Feb', users: 950 },
      { month: 'Mar', users: 1100 },
      { month: 'Apr', users: 1250 }
    ]
  },
  transactions: {
    total: 3500,
    completed: 2800,
    pending: 500,
    failed: 200,
    volume: [
      { month: 'Jan', amount: 25000 },
      { month: 'Feb', amount: 35000 },
      { month: 'Mar', amount: 45000 },
      { month: 'Apr', amount: 55000 }
    ]
  }
}

// Dummy data for users
const usersData = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    role: 'buyer',
    status: 'active',
    joinDate: '2024-01-15'
  },
  // Add more users...
]

const AdminPanel = () => {
  // State management
  const [activeSection, setActiveSection] = useState('dashboard')
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedUsers, setSelectedUsers] = useState([])
  const [showUserModal, setShowUserModal] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)

  // Navigation items
  const navItems = [
    { id: 'dashboard', icon: FaChartLine, label: 'Dashboard' },
    { id: 'users', icon: FaUsers, label: 'User Management' },
    { id: 'transactions', icon: FaExchangeAlt, label: 'Transactions' },
    { id: 'content', icon: FaEdit, label: 'Content Management' },
    { id: 'settings', icon: FaCog, label: 'Settings' }
  ]

  // Dashboard Section
  const Dashboard = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Dashboard Overview</h2>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Users"
          value={analyticsData.users.total}
          change="+12%"
          icon={FaUsers}
          color="blue"
        />
        <StatsCard
          title="Active Users"
          value={analyticsData.users.active}
          change="+8%"
          icon={FaCheckCircle}
          color="green"
        />
        <StatsCard
          title="Pending Approvals"
          value={analyticsData.users.pending}
          change="+3%"
          icon={FaExclamationTriangle}
          color="yellow"
        />
        <StatsCard
          title="Total Transactions"
          value={analyticsData.transactions.total}
          change="+15%"
          icon={FaMoneyBillWave}
          color="indigo"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Growth Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4">User Growth</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={analyticsData.users.growth}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="users"
                  stroke="#4F46E5"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Transaction Volume Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4">Transaction Volume</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={analyticsData.transactions.volume}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="amount" fill="#4F46E5" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  )

  // Stats Card Component
  const StatsCard = ({ title, value, change, icon: Icon, color }) => (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600 dark:text-gray-400">{title}</p>
          <h3 className="text-2xl font-bold mt-1">{value.toLocaleString()}</h3>
          <p className={`text-sm mt-1 ${
            change.startsWith('+') ? 'text-green-600' : 'text-red-600'
          }`}>
            {change} from last month
          </p>
        </div>
        <div className={`w-12 h-12 rounded-lg bg-${color}-100 flex items-center justify-center`}>
          <Icon className={`w-6 h-6 text-${color}-600`} />
        </div>
      </div>
    </div>
  )

  // Sidebar Link Component
  const SidebarLink = ({ icon: Icon, text, active, onClick }) => (
    <motion.button
      whileHover={{ x: 5 }}
      onClick={onClick}
      className={`w-full px-4 py-3 rounded-lg flex items-center gap-3 transition-colors
        ${active 
          ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/10 dark:text-blue-400' 
          : 'text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-800'
        }`}
    >
      <Icon className="w-5 h-5" />
      {!isSidebarCollapsed && <span className="font-medium">{text}</span>}
    </motion.button>
  )

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      <div className="flex">
        {/* Sidebar */}
        <motion.div
          animate={{ width: isSidebarCollapsed ? '5rem' : '16rem' }}
          className="fixed inset-y-0 left-0 bg-white dark:bg-gray-800 shadow-sm z-20"
        >
          {/* Sidebar Header */}
          <div className="p-4 border-b dark:border-gray-700">
            <button
              onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {/* Add collapse icon */}
            </button>
          </div>

          {/* Navigation */}
          <nav className="p-4 space-y-2">
            {navItems.map((item) => (
              <SidebarLink
                key={item.id}
                icon={item.icon}
                text={item.label}
                active={activeSection === item.id}
                onClick={() => setActiveSection(item.id)}
              />
            ))}
          </nav>
        </motion.div>

        {/* Main Content */}
        <div className={`flex-1 ${isSidebarCollapsed ? 'ml-20' : 'ml-64'}`}>
          {/* Header */}
          <header className="bg-white dark:bg-gray-800 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <div className="flex items-center justify-between">
                {/* Search */}
                <div className="relative w-64">
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>

                {/* Actions */}
                <div className="flex items-center gap-4">
                  <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg dark:text-gray-400 dark:hover:bg-gray-700">
                    <FaBell className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setIsDarkMode(!isDarkMode)}
                    className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg dark:text-gray-400 dark:hover:bg-gray-700"
                  >
                    {isDarkMode ? (
                      <FaSun className="w-5 h-5" />
                    ) : (
                      <FaMoon className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </header>

          {/* Page Content */}
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {activeSection === 'dashboard' && <Dashboard />}
            {/* Add other sections */}
          </main>
        </div>
      </div>
    </div>
  )
}

export default AdminPanel 