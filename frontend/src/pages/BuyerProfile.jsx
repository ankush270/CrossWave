import React, { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FaUser, FaBell, FaEdit, FaCheck, FaExchangeAlt,
  FaShoppingBag, FaCog, FaChartLine, FaDownload,
  FaExclamationCircle, FaMoon, FaSun, FaLock,
  FaMapMarkerAlt, FaPhone, FaEnvelope, FaCamera,
  FaUserCircle, FaShieldAlt, FaHistory, FaSignOutAlt
} from 'react-icons/fa'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts'
import { useAuth } from "../contexts/AuthContext";
import { profileAPI } from "../api/api";

// Enhanced dummy data
const transactions = [
  {
    id: 'TRX001',
    date: '2024-02-15',
    amount: 1299.99,
    status: 'completed',
    product: 'Premium Headphones',
    seller: 'Audio Electronics Ltd',
    paymentMethod: 'Credit Card',
    orderDetails: {
      items: [
        { name: 'Premium Headphones', quantity: 1, price: 1299.99 }
      ],
      shipping: 'Express Delivery',
      address: '123 Business Street, Tech City'
    }
  },
  // Add more transactions...
]

// Analytics data
const analyticsData = {
  spending: [
    { month: 'Jan', amount: 1200, orders: 5 },
    { month: 'Feb', amount: 1800, orders: 7 },
    { month: 'Mar', amount: 1500, orders: 6 },
    { month: 'Apr', amount: 2200, orders: 9 },
    { month: 'May', amount: 1900, orders: 8 }
  ],
  categories: [
    { name: 'Electronics', value: 45 },
    { name: 'Fashion', value: 25 },
    { name: 'Home', value: 20 },
    { name: 'Others', value: 10 }
  ]
}

const COLORS = ['#4F46E5', '#10B981', '#F59E0B', '#EF4444']

// Add SidebarLink component
const SidebarLink = ({ icon: Icon, text, active, onClick }) => (
  <motion.button
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className={`w-full px-4 py-3 rounded-lg flex items-center gap-3 transition-colors
      ${active 
        ? 'bg-blue-50 text-blue-600' 
        : 'text-gray-600 hover:bg-gray-50'
      }`}
  >
    <Icon className="w-5 h-5" />
    <span className="font-medium">{text}</span>
  </motion.button>
)

// Add Settings component
const Settings = () => (
  <div className="space-y-6">
    <h2 className="text-xl font-semibold">Settings</h2>
    
    {/* Notification Settings */}
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Notifications</h3>
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Order Updates</p>
            <p className="text-sm text-gray-500">Get notified about your order status</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" defaultChecked />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Promotional Emails</p>
            <p className="text-sm text-gray-500">Receive special offers and updates</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
      </div>
    </div>

    {/* Security Settings */}
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Security</h3>
      <div className="space-y-4">
        <button
          className="w-full px-4 py-3 text-left bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          onClick={() => {/* Handle password change */}}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Change Password</p>
              <p className="text-sm text-gray-500">Update your password regularly</p>
            </div>
            <FaLock className="w-5 h-5 text-gray-400" />
          </div>
        </button>
        <button
          className="w-full px-4 py-3 text-left bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          onClick={() => {/* Handle 2FA setup */}}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Two-Factor Authentication</p>
              <p className="text-sm text-gray-500">Add an extra layer of security</p>
            </div>
            <FaLock className="w-5 h-5 text-gray-400" />
          </div>
        </button>
      </div>
    </div>
  </div>
)

// Add TransactionStatus component
const TransactionStatus = ({ status }) => {
  const statusConfig = {
    completed: {
      color: 'green',
      text: 'Completed'
    },
    pending: {
      color: 'yellow',
      text: 'Pending'
    },
    failed: {
      color: 'red',
      text: 'Failed'
    }
  }

  const config = statusConfig[status]
  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium
      bg-${config.color}-100 text-${config.color}-800`}>
      {config.text}
    </span>
  )
}

// Add TransactionActions component
const TransactionActions = ({ transaction }) => (
  <div className="flex items-center gap-2">
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="p-1 hover:bg-gray-100 rounded-full"
      onClick={() => {/* Handle download */}}
      title="Download Invoice"
    >
      <FaDownload className="w-4 h-4 text-gray-600" />
    </motion.button>
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="p-1 hover:bg-gray-100 rounded-full"
      onClick={() => {/* Handle issue */}}
      title="Report Issue"
    >
      <FaExclamationCircle className="w-4 h-4 text-red-600" />
    </motion.button>
  </div>
)

// Add NotificationBell component
const NotificationBell = ({ notifications }) => {
  const [showNotifications, setShowNotifications] = useState(false)
  const unreadCount = notifications.filter(n => !n.read).length

  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="p-2 text-white/90 hover:text-white relative"
        onClick={() => setShowNotifications(!showNotifications)}
      >
        <FaBell className="w-6 h-6" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
            {unreadCount}
          </span>
        )}
      </motion.button>

      <AnimatePresence>
        {showNotifications && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg py-2 z-50"
          >
            <div className="px-4 py-2 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-gray-900">Notifications</h3>
                {unreadCount > 0 && (
                  <button 
                    className="text-xs text-blue-600 hover:text-blue-700"
                    onClick={() => {/* Handle mark all as read */}}
                  >
                    Mark all as read
                  </button>
                )}
              </div>
            </div>
            <div className="max-h-96 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="px-4 py-8 text-center text-gray-500">
                  No notifications
                </div>
              ) : (
                notifications.map(notification => (
                  <div
                    key={notification.id}
                    className={`px-4 py-3 hover:bg-gray-50 cursor-pointer
                      ${notification.read ? 'opacity-60' : ''}`}
                  >
                    <p className="text-sm text-gray-900">{notification.message}</p>
                    <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// Add ThemeToggle component
const ThemeToggle = ({ isDarkMode, setIsDarkMode }) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className="p-2 text-white/90 hover:text-white"
    onClick={() => setIsDarkMode(!isDarkMode)}
    title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
  >
    <AnimatePresence mode="popLayout">
      {isDarkMode ? (
        <motion.div
          key="sun"
          initial={{ rotate: -90, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          exit={{ rotate: 90, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <FaSun className="w-6 h-6" />
        </motion.div>
      ) : (
        <motion.div
          key="moon"
          initial={{ rotate: 90, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          exit={{ rotate: -90, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <FaMoon className="w-6 h-6" />
        </motion.div>
      )}
    </AnimatePresence>
  </motion.button>
)

const BuyerProfile = () => {
  const { user } = useAuth();
  const [activeSection, setActiveSection] = useState('personal')
  const [isEditing, setIsEditing] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [profileData, setProfileData] = useState(user)
  const [showAnalytics, setShowAnalytics] = useState(false)
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'order',
      message: 'Your order #TRX001 has been delivered',
      time: '2 hours ago',
      read: false
    },
    // Add more notifications...
  ])

  // Profile image upload handler
  const handleImageUpload = useCallback((event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setProfileData(prev => ({
          ...prev,
          profileImage: reader.result
        }))
      }
      reader.readAsDataURL(file)
    }
  }, [])

  // Update the profile update handler
  const handleProfileUpdate = async () => {
    if (isEditing) {
      try {
        console.log(profileData);
        const response = await profileAPI.updateProfile(profileData);
        if (response.data) {
          console.log('Profile updated successfully');
          setIsEditing(false);
        }
      } catch (error) {
        console.error('Failed to update profile:', error);
      }
    } else {
      setIsEditing(true);
    }
  };

  // Personal Information Section
  const PersonalInfo = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Personal Information</h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleProfileUpdate}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <FaEdit className="w-4 h-4" />
          {isEditing ? 'Save Changes' : 'Edit Profile'}
        </motion.button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              value={profileData.name}
              disabled={!isEditing}
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <div className="mt-1 flex items-center gap-2">
              <input
                type="email"
                value={profileData.email}
                disabled={!isEditing}
                className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              {profileData.isEmailVerified && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  <FaCheck className="w-3 h-3 mr-1" />
                  Verified
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Phone Number</label>
            <input
              type="tel"
              value={profileData.phone}
              disabled={!isEditing}
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Address</label>
            <textarea
              value={profileData.address}
              disabled={!isEditing}
              rows={3}
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>
    </div>
  )

  // Transaction History Section
  const TransactionHistory = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Transaction History</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Transaction ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {transactions.map((transaction) => (
              <tr key={transaction.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {transaction.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {transaction.date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  ${transaction.amount.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <TransactionStatus status={transaction.status} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <TransactionActions transaction={transaction} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )

  // Analytics Section
  const Analytics = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Spending Analytics</h2>
        <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
          <option value="6months">Last 6 Months</option>
          <option value="1year">Last Year</option>
          <option value="all">All Time</option>
        </select>
      </div>

      {/* Spending Trend Chart */}
      <div className="bg-white rounded-xl shadow-sm p-4 h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={analyticsData.spending}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line 
              type="monotone" 
              dataKey="amount" 
              stroke="#4F46E5" 
              strokeWidth={2}
              dot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Category Distribution */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-4">
          <h3 className="text-lg font-medium mb-4">Spending by Category</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={analyticsData.categories}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {analyticsData.categories.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-4">
          <h3 className="text-lg font-medium mb-4">Quick Stats</h3>
          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-blue-600">Total Spent</p>
              <p className="text-2xl font-bold text-blue-700">
                ${analyticsData.spending.reduce((acc, curr) => acc + curr.amount, 0).toLocaleString()}
              </p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-sm text-green-600">Total Orders</p>
              <p className="text-2xl font-bold text-green-700">
                {analyticsData.spending.reduce((acc, curr) => acc + curr.orders, 0)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  // Enhanced Profile Header
  const ProfileHeader = () => (
    <div className="relative bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="relative">
            <div className="w-24 h-24 rounded-full overflow-hidden bg-white/10 relative">
              {profileData.profileImage ? (
                <img 
                  src={profileData.profileImage} 
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <FaUserCircle className="w-full h-full text-white/50" />
              )}
            </div>
            <label className="absolute bottom-0 right-0 bg-white text-blue-600 p-2 rounded-full cursor-pointer shadow-lg">
              <FaCamera className="w-4 h-4" />
              <input 
                type="file" 
                className="hidden" 
                accept="image/*"
                onChange={handleImageUpload}
              />
            </label>
          </div>
          
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-bold">{profileData.name}</h1>
            <p className="text-blue-100">Buyer Account</p>
          </div>

          <div className="flex-grow" />

          <div className="flex items-center gap-4">
            <NotificationBell notifications={notifications} />
            <ThemeToggle isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      <ProfileHeader />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 -mt-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Enhanced Sidebar */}
          <div className="md:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 space-y-2">
              <SidebarLink
                icon={FaUser}
                text="Personal Info"
                active={activeSection === 'personal'}
                onClick={() => setActiveSection('personal')}
              />
              <SidebarLink
                icon={FaShoppingBag}
                text="Transactions"
                active={activeSection === 'transactions'}
                onClick={() => setActiveSection('transactions')}
              />
              <SidebarLink
                icon={FaChartLine}
                text="Analytics"
                active={activeSection === 'analytics'}
                onClick={() => setActiveSection('analytics')}
              />
              <SidebarLink
                icon={FaCog}
                text="Settings"
                active={activeSection === 'settings'}
                onClick={() => setActiveSection('settings')}
              />
              <hr className="my-4 border-gray-200 dark:border-gray-700" />
              <SidebarLink
                icon={FaSignOutAlt}
                text="Sign Out"
                onClick={() => {/* Handle sign out */}}
              />
            </div>
          </div>

          {/* Content Area */}
          <div className="md:col-span-3">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
              {activeSection === 'personal' && <PersonalInfo />}
              {activeSection === 'transactions' && <TransactionHistory />}
              {activeSection === 'analytics' && <Analytics />}
              {activeSection === 'settings' && <Settings />}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default BuyerProfile 