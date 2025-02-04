import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
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
  FaStar,
  FaHistory,
  FaHeart,
  FaComments,
  FaFileContract,
  FaUserCog,
  FaTachometerAlt,
  FaCog,
  FaSignOutAlt,
  FaGlobe,
  FaBoxOpen,
  FaHandshake,
  FaShieldAlt,
  FaAngleDown,
  FaSun,
  FaMoon
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

// Import buyer components
import BuyerDashboard from '../components/buyer/BuyerDashboard'
import BuyerOrders from '../components/buyer/BuyerOrders'
import BuyerWishlist from '../components/buyer/BuyerWishlist'
import BuyerAnalytics from '../components/buyer/BuyerAnalytics'
import BuyerMessages from '../components/buyer/BuyerMessages'
import BuyerContracts from '../components/buyer/BuyerContracts'
import BuyerProfile from '../components/buyer/BuyerProfile'
import BuyerCompliance from '../components/buyer/BuyerCompliance'

// Add this CSS at the beginning of your component
const scrollbarHiddenStyles = {
  scrollbarWidth: 'none', /* Firefox */
  msOverflowStyle: 'none',  /* IE and Edge */
  '&::-webkit-scrollbar': { 
    display: 'none'  /* Chrome, Safari and Opera */
  }
}

const Buyer = () => {
  const [activeSection, setActiveSection] = useState('dashboard')
  const [searchQuery, setSearchQuery] = useState('')
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)
  const navigate = useNavigate()

  const menuItems = [
    {
      id: 'dashboard',
      title: 'Dashboard',
      icon: <FaTachometerAlt />,
      component: BuyerDashboard,
      badge: null
    },
    {
      id: 'orders',
      title: 'Orders & Tracking',
      icon: <FaShoppingCart />,
      component: BuyerOrders,
      badge: '12'
    },
    {
      id: 'wishlist',
      title: 'Wishlist & RFQs',
      icon: <FaHeart />,
      component: BuyerWishlist,
      badge: '8'
    },
    {
      id: 'analytics',
      title: 'Purchase Analytics',
      icon: <FaChartLine />,
      component: BuyerAnalytics,
      badge: null
    },
    {
      id: 'messages',
      title: 'Supplier Chat',
      icon: <FaComments />,
      component: BuyerMessages,
      badge: '5'
    },
    {
      id: 'contracts',
      title: 'Contracts & Docs',
      icon: <FaFileContract />,
      component: BuyerContracts,
      badge: '3'
    },
    {
      id: 'compliance',
      title: 'Compliance',
      icon: <FaShieldAlt />,
      component: BuyerCompliance,
      badge: '2'
    },
    {
      id: 'profile',
      title: 'Profile & Settings',
      icon: <FaUserCog />,
      component: BuyerProfile,
      badge: null
    }
  ]

  const notifications = [
    {
      id: 1,
      title: 'New Quote Received',
      message: 'Tech Components Ltd sent a quote for your RFQ',
      time: '2 min ago',
      type: 'quote'
    },
    {
      id: 2,
      title: 'Order Status Update',
      message: 'Order #ORD001 has been shipped',
      time: '1 hour ago',
      type: 'order'
    }
  ]

  const handleMenuClick = (sectionId) => {
    setActiveSection(sectionId)
  }

  const getCurrentComponent = () => {
    const menuItem = menuItems.find(item => item.id === activeSection)
    if (!menuItem) return null
    const Component = menuItem.component
    return <Component />
  }

  return (
    <div className={`min-h-screen relative ${isDarkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      {/* Circuit Board Animation Background */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-400/20 blur-3xl" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-400/20 blur-3xl" />
        <div className="absolute top-[40%] left-[60%] w-[30%] h-[30%] rounded-full bg-pink-400/20 blur-3xl" />
      </div>

      {/* Existing Content */}
      <div className="relative z-10 h-screen flex flex-col">
        {/* Header */}
        <motion.header 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className={`h-16 backdrop-blur-xl ${
            isDarkMode 
              ? 'bg-gray-800/80 border-gray-700/50' 
              : 'bg-white/80 border-gray-200/50'
          } shadow-sm border-b flex items-center justify-between px-6 sticky top-0 z-30`}
        >
          <h2 className={`text-xl font-semibold ${
            isDarkMode ? 'text-gray-100' : 'text-gray-800'
          }`}>
            {menuItems.find(item => item.id === activeSection)?.title}
          </h2>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-gray-500">
              <span className="w-2 h-2 bg-green-500 rounded-full" />
              <span className={`text-sm ${
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
              }`}>
                Connected to Global Network
              </span>
            </div>
            <div className={`h-8 w-px ${
              isDarkMode ? 'bg-gray-700' : 'bg-gray-200'
            }`} />
            <div className="text-sm">
              <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>
                Last order:
              </span>
              <span className={`ml-2 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                2 days ago
              </span>
            </div>
          </div>
        </motion.header>

        {/* Main Content Area */}
        <div className="flex-1 flex overflow-hidden">
          {/* Sidebar */}
          <motion.div 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className={`w-72 border-r shrink-0 ${
              isDarkMode 
                ? 'bg-gray-800/50 border-gray-700/50' 
                : 'bg-white/50 border-gray-200/50'
            } backdrop-blur-lg relative`}
            style={scrollbarHiddenStyles}
          >
              <motion.div className="overflow-y-auto custom-scrollbar h-full pb-10"> 
                {/* Logo/Brand Section */}
              <div className={`h-16 flex items-center justify-center border-b ${
                isDarkMode 
                  ? 'border-gray-700/50 bg-gradient-to-r from-gray-800/50 to-gray-900/50' 
                  : 'border-white/30 bg-white/10'
              }`}>
                <motion.h1 
                  className={`text-2xl font-bold ${
                    isDarkMode
                      ? 'bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent'
                      : 'bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent'
                  }`}
                  whileHover={{ scale: 1.05 }}
                >
                  CrossWave
                </motion.h1>
              </div>

            {/* Profile Quick View */}
            <div className={`p-4 border-b ${
              isDarkMode 
                ? 'border-gray-700/50 bg-gradient-to-r from-gray-800/30 to-gray-900/30' 
                : 'border-white/30 bg-white/10'
            }`}>
              <motion.div
                whileHover={{ y: -2 }}
                className="flex items-center space-x-3 cursor-pointer"
                onClick={() => setIsProfileOpen(!isProfileOpen)}
              >
                <div className="relative">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-semibold">
                    J
                  </div>
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                </div>
                <div>
                  <h3 className="font-medium">John's Electronics</h3>
                  <div className="flex items-center gap-2">
                    <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      Premium Buyer
                    </span>
                    <FaAngleDown className={isDarkMode ? 'text-gray-400' : 'text-gray-500'} />
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Navigation Menu */}
            <nav className="p-4 space-y-2">
              {menuItems.map((item) => (
                <motion.div
                  key={item.id}
                  onClick={() => handleMenuClick(item.id)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all group cursor-pointer
                    ${activeSection === item.id 
                      ? isDarkMode
                        ? 'bg-gradient-to-r from-blue-600/90 to-purple-700/90 text-white shadow-lg backdrop-blur-xl'
                        : 'bg-gradient-to-r from-blue-500/90 to-purple-600/90 text-white shadow-lg backdrop-blur-xl'
                      : isDarkMode 
                        ? 'text-gray-300 hover:bg-gray-700/30'
                        : 'text-gray-700 hover:bg-white/40'
                  }`}
                  whileHover={{ x: 5, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center gap-3">
                    <span className={`text-xl ${
                      activeSection === item.id 
                        ? 'text-white' 
                        : isDarkMode
                          ? 'text-gray-400 group-hover:text-purple-400'
                          : 'text-gray-500 group-hover:text-blue-500'
                    }`}>
                      {item.icon}
                    </span>
                    <span className="font-medium">{item.title}</span>
                  </div>
                  {item.badge && (
                    <motion.span 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className={`px-2 py-1 rounded-full text-xs ${
                        activeSection === item.id
                          ? 'bg-white text-blue-600'
                          : 'bg-blue-100 text-blue-600'
                      }`}
                    >
                      {item.badge}
                    </motion.span>
                  )}
                </motion.div>
              ))}
            </nav>

            {/* Quick Actions */}
            <div className={`-mt-2 p-4 border-t ${
              isDarkMode 
                ? 'border-gray-700/50 bg-gradient-to-b from-gray-800/30 to-gray-900/30' 
                : 'border-white/30 bg-white/10'
            } mt-4`}>
              <h4 className={`text-sm font-semibold ${
                isDarkMode ? 'text-gray-400' : 'text-gray-700'
              } mb-3`}>
                Quick Actions
              </h4>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { icon: FaBoxOpen, label: 'New RFQ', color: 'blue' },
                  { icon: FaTruck, label: 'Track Order', color: 'green' },
                  { icon: FaGlobe, label: 'Browse', color: 'purple' },
                  { icon: FaHandshake, label: 'Support', color: 'orange' }
                ].map((action, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className={`p-3 ${
                      isDarkMode 
                        ? 'bg-gray-700/50 hover:bg-gray-600/50' 
                        : 'bg-white/50 hover:bg-white/60'
                    } backdrop-blur-sm rounded-lg text-center transition-all duration-200`}
                  >
                    <action.icon className={`text-${action.color}-500 mx-auto mb-1 text-xl`} />
                    <span className={`text-xs ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      {action.label}
                    </span>
                  </motion.button>
                ))}
              </div>
            </div>
              </motion.div>

            {/* Bottom Actions */}
            <div className={`fixed bottom-0 w-[21vw] border-t ${
              isDarkMode 
                ? 'border-gray-700/50 bg-gradient-to-t from-gray-900/90 to-gray-800/80' 
                : 'border-white/30 bg-gradient-to-b from-white/30 to-white/20'
            } backdrop-blur-sm p-4`}>
              <div className="flex justify-between items-center">
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 180 }}
                  whileTap={{ scale: 0.9 }}
                  className={`p-2 ${
                    isDarkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-400 hover:text-gray-600'
                  }`}
                  onClick={() => setIsDarkMode(!isDarkMode)}
                >
                  {isDarkMode ? <FaSun /> : <FaMoon />}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className={`p-2 ${
                    isDarkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-400 hover:text-gray-600'
                  } relative`}
                  onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                >
                  <FaBell />
                  <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 text-gray-400 hover:text-red-600"
                >
                  <FaSignOutAlt />
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Main Content with margin */}
          <main className="flex-1 overflow-y-auto custom-scrollbar p-6 md:p-8">
            <div className="max-w-7xl mx-auto">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSection}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="h-full"
                >
                  {React.createElement(menuItems.find(item => item.id === activeSection)?.component || (() => null))}
                </motion.div>
              </AnimatePresence>
            </div>
          </main>
        </div>
      </div>

      {/* Notifications Panel */}
      <AnimatePresence>
        {isNotificationsOpen && (
          <motion.div
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            className={`fixed right-0 top-0 h-full w-80 backdrop-blur-xl ${
              isDarkMode 
                ? 'bg-gray-800/90' 
                : 'bg-white/90'
            } shadow-2xl z-50 p-6`}
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold">Notifications</h3>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsNotificationsOpen(false)}
                className="p-2 rounded-full hover:bg-gray-100"
              >
                ×
              </motion.button>
            </div>
            <div className="space-y-4">
              {notifications.map((notification) => (
                <motion.div
                  key={notification.id}
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  className={`p-4 rounded-lg ${
                    isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
                  }`}
                >
                  <h4 className="font-medium">{notification.title}</h4>
                  <p className={`text-sm ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {notification.message}
                  </p>
                  <span className={`text-xs ${
                    isDarkMode ? 'text-gray-500' : 'text-gray-400'
                  }`}>
                    {notification.time}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Quick Action Tooltips */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-40">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className={`p-4 rounded-full backdrop-blur-xl shadow-lg ${
            isDarkMode 
              ? 'bg-blue-500/80 text-white' 
              : 'bg-white/80 text-blue-500'
          }`}
        >
          <FaBoxOpen className="text-xl" />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className={`p-4 rounded-full backdrop-blur-xl shadow-lg ${
            isDarkMode 
              ? 'bg-purple-500/80 text-white' 
              : 'bg-white/80 text-purple-500'
          }`}
        >
          <FaHandshake className="text-xl" />
        </motion.button>
      </div>
    </div>
  )
}

export default Buyer