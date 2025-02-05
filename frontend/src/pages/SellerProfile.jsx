import React, { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FaUser, FaBell, FaEdit, FaStore, FaBox, FaChartLine,
  FaCog, FaSignOutAlt, FaUpload, FaImage, FaQuestionCircle,
  FaShoppingBag, FaFileInvoice, FaUserCircle, FaCamera,
  FaExchangeAlt, FaShieldAlt, FaHistory, FaHeadset, FaSun, FaMoon
} from 'react-icons/fa'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell
} from 'recharts'

// Dummy data for sales analytics
const salesData = {
  monthly: [
    { month: 'Jan', sales: 12000, orders: 45 },
    { month: 'Feb', sales: 15000, orders: 52 },
    { month: 'Mar', sales: 18000, orders: 61 },
    { month: 'Apr', sales: 16000, orders: 55 },
    { month: 'May', sales: 21000, orders: 68 }
  ],
  products: [
    { name: 'Premium Headphones', sales: 45000, units: 150 },
    { name: 'Wireless Earbuds', sales: 38000, units: 200 },
    { name: 'Smart Watch', sales: 32000, units: 120 }
  ],
  categories: [
    { name: 'Electronics', value: 60 },
    { name: 'Accessories', value: 25 },
    { name: 'Others', value: 15 }
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
        ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/10 dark:text-indigo-400' 
        : 'text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-800'
      }`}
  >
    <Icon className="w-5 h-5" />
    <span className="font-medium">{text}</span>
  </motion.button>
)

// Add NotificationBell component
const NotificationBell = () => {
  const [showNotifications, setShowNotifications] = useState(false)
  const notifications = [] // Replace with your notifications data

  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="p-2 text-white/90 hover:text-white"
        onClick={() => setShowNotifications(!showNotifications)}
      >
        <FaBell className="w-6 h-6" />
        {notifications.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
            {notifications.length}
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
              <h3 className="text-sm font-semibold text-gray-900">Notifications</h3>
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
                    className="px-4 py-3 hover:bg-gray-50 cursor-pointer"
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

const SellerProfile = () => {
  const [activeSection, setActiveSection] = useState('business')
  const [isEditing, setIsEditing] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  
  // Business profile data
  const [businessData, setBusinessData] = useState({
    name: 'Tech Gadgets Store',
    category: 'Electronics',
    email: 'contact@techgadgets.com',
    phone: '+1 234 567 8900',
    address: '456 Tech Avenue, Innovation City, IC 54321',
    taxId: 'TAX123456789',
    description: 'Premium electronics and accessories retailer',
    documents: [],
    completionPercentage: 80
  })

  // Profile image upload handler
  const handleImageUpload = useCallback((event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setBusinessData(prev => ({
          ...prev,
          profileImage: reader.result
        }))
      }
      reader.readAsDataURL(file)
    }
  }, [])

  // Business Information Section
  const BusinessInfo = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Business Information</h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsEditing(!isEditing)}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center gap-2"
        >
          <FaEdit className="w-4 h-4" />
          {isEditing ? 'Save Changes' : 'Edit Profile'}
        </motion.button>
      </div>

      {/* Profile Completion */}
      <div className="bg-indigo-50 rounded-lg p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-indigo-600">Profile Completion</span>
          <span className="text-sm font-medium text-indigo-600">{businessData.completionPercentage}%</span>
        </div>
        <div className="w-full bg-indigo-200 rounded-full h-2.5">
          <div 
            className="bg-indigo-600 h-2.5 rounded-full transition-all duration-500"
            style={{ width: `${businessData.completionPercentage}%` }}
          />
        </div>
        {businessData.completionPercentage < 100 && (
          <p className="text-sm text-indigo-600 mt-2">
            Complete your profile to unlock all features
          </p>
        )}
      </div>

      {/* Business Details Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Business Name</label>
            <input
              type="text"
              value={businessData.name}
              disabled={!isEditing}
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Business Category</label>
            <select
              value={businessData.category}
              disabled={!isEditing}
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="Electronics">Electronics</option>
              <option value="Fashion">Fashion</option>
              <option value="Home">Home & Living</option>
            </select>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Contact Email</label>
            <input
              type="email"
              value={businessData.email}
              disabled={!isEditing}
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Phone Number</label>
            <input
              type="tel"
              value={businessData.phone}
              disabled={!isEditing}
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div className="col-span-full">
          <label className="block text-sm font-medium text-gray-700">Business Address</label>
          <textarea
            value={businessData.address}
            disabled={!isEditing}
            rows={3}
            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div className="col-span-full">
          <label className="block text-sm font-medium text-gray-700">Business Description</label>
          <textarea
            value={businessData.description}
            disabled={!isEditing}
            rows={4}
            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* Document Upload Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Business Documents</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <DocumentUploader title="Business License" />
          <DocumentUploader title="Tax Certificate" />
        </div>
      </div>
    </div>
  )

  // Document Uploader Component
  const DocumentUploader = ({ title }) => (
    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-indigo-500 transition-colors">
      <div className="text-center">
        <FaUpload className="mx-auto h-12 w-12 text-gray-400" />
        <div className="mt-2">
          <p className="text-sm font-medium text-gray-900">{title}</p>
          <p className="text-xs text-gray-500">PDF, JPG, PNG up to 10MB</p>
        </div>
        <button className="mt-2 px-4 py-2 text-sm font-medium text-indigo-600 hover:text-indigo-500">
          Upload Document
        </button>
      </div>
    </div>
  )

  // Enhanced Profile Header
  const ProfileHeader = () => (
    <div className="relative bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="relative">
            <div className="w-24 h-24 rounded-full overflow-hidden bg-white/10">
              {businessData.profileImage ? (
                <img 
                  src={businessData.profileImage} 
                  alt="Business Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <FaStore className="w-full h-full p-4 text-white/50" />
              )}
            </div>
            <label className="absolute bottom-0 right-0 bg-white text-indigo-600 p-2 rounded-full cursor-pointer shadow-lg">
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
            <h1 className="text-3xl font-bold">{businessData.name}</h1>
            <p className="text-indigo-100">{businessData.category} Seller</p>
          </div>

          <div className="flex-grow" />

          <div className="flex items-center gap-4">
            <NotificationBell />
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
          {/* Sidebar */}
          <div className="md:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 space-y-2">
              <SidebarLink
                icon={FaStore}
                text="Business Info"
                active={activeSection === 'business'}
                onClick={() => setActiveSection('business')}
              />
              <SidebarLink
                icon={FaBox}
                text="Products"
                active={activeSection === 'products'}
                onClick={() => setActiveSection('products')}
              />
              <SidebarLink
                icon={FaChartLine}
                text="Sales & Analytics"
                active={activeSection === 'analytics'}
                onClick={() => setActiveSection('analytics')}
              />
              <SidebarLink
                icon={FaCog}
                text="Settings"
                active={activeSection === 'settings'}
                onClick={() => setActiveSection('settings')}
              />
              <SidebarLink
                icon={FaHeadset}
                text="Help Center"
                active={activeSection === 'help'}
                onClick={() => setActiveSection('help')}
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
              {activeSection === 'business' && <BusinessInfo />}
              {/* Add other sections */}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default SellerProfile 