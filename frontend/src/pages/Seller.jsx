import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
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
  FaShoppingCart,
  FaFileInvoiceDollar,
  FaShieldAlt,
  FaUser,
  FaSignOutAlt,
  FaTachometerAlt,
  FaAngleDown,
  FaSun,
  FaMoon,
  FaWarehouse,
  FaClipboardList,
  FaBoxOpen,
  FaUserCog,
  FaGlobe,
  FaHandshake,
  FaQuestionCircle
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
import SellerDashboard from '../components/seller/SellerDashboard'
import SellerProducts from '../components/seller/SellerProducts'
import SellerOrders from '../components/seller/SellerOrders'
import SellerAnalytics from '../components/seller/SellerAnalytics'
import SellerLogistics from '../components/seller/SellerLogistics'
import SellerCompliance from '../components/seller/SellerCompliance'
import SellerMessages from '../components/seller/SellerMessages'
import SellerProfile from '../components/seller/SellerProfile'
import MenuItem from '../components/ui/MenuItem'
import QuickActions from '../components/ui/QuickActions'
import Header from '../components/ui/Header'
import NotificationsPanel from '../components/ui/NotificationsPanel'
import FloatingActions from '../components/ui/FloatingActions'

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

// Add this CSS at the beginning of your component
const scrollbarHiddenStyles = {
  scrollbarWidth: "none" /* Firefox */,
  msOverflowStyle: "none" /* IE and Edge */,
  "&::-webkit-scrollbar": {
    display: "none" /* Chrome, Safari and Opera */,
  },
};

const Seller = () => {
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
      component: SellerDashboard
    },
    {
      id: 'products',
      title: 'Products',
      icon: <FaBox />,
      component: SellerProducts,
      badge: '24'
    },
    {
      id: 'orders',
      title: 'Orders',
      icon: <FaClipboardList />,
      component: SellerOrders,
      badge: '8'
    },
    {
      id: 'logistics',
      title: 'Logistics',
      icon: <FaTruck />,
      component: SellerLogistics,
      badge: '3'
    },
    {
      id: 'analytics',
      title: 'Analytics',
      icon: <FaChartLine />,
      component: SellerAnalytics
    },
    {
      id: 'messages',
      title: 'Messages',
      icon: <FaComments />,
      component: SellerMessages,
      badge: '5'
    },
    {
      id: 'compliance',
      title: 'Compliance',
      icon: <FaShieldAlt />,
      component: SellerCompliance,
      badge: '2'
    },
    {
      id: 'profile',
      title: 'Profile',
      icon: <FaUserCog />,
      component: SellerProfile
    }
  ]

  const handleMenuClick = (sectionId) => {
    setActiveSection(sectionId)
  }

  // Get current component to render
  const getCurrentComponent = () => {
    const menuItem = menuItems.find(item => item.id === activeSection)
    return menuItem ? <menuItem.component /> : null
  }

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
      title: 'New Order Received',
      message: 'Order #ORD123 received from Tech Solutions',
      time: '2 min ago',
      type: 'order'
    },
    {
      id: 2,
      title: 'Stock Alert',
      message: 'Low stock warning for Order SKU-456',
      time: '1 hour ago',
      type: 'inventory'
    }
  ]

  const dashboardCards = [
    {
      title: 'Total Products',
      value: '156',
      change: '+12%',
      icon: <FaBox className="text-blue-500" />,
      link: '/seller/products'
    },
    {
      title: 'Total Orders',
      value: '1,234',
      change: '+23%',
      icon: <FaFileInvoiceDollar className="text-green-500" />,
      link: '/seller/payments'
    },
    {
      title: 'Revenue',
      value: '₹12.4M',
      change: '+18%',
      icon: <FaChartLine className="text-purple-500" />,
      link: '/seller/analytics'
    },
    {
      title: 'Shipments',
      value: '89',
      change: '+5%',
      icon: <FaTruck className="text-orange-500" />,
      link: '/seller/logistics'
    }
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'order',
      message: 'New order received for Electronics Component',
      time: '2 minutes ago'
    },
    {
      id: 2,
      type: 'payment',
      message: 'Payment received for order #12345',
      time: '1 hour ago'
    },
    // Add more activities...
  ];

  // Quick actions configuration
  const quickActions = [
    { icon: FaPlus, label: 'Add Order', color: 'blue' },
    { icon: FaWarehouse, label: 'Inventory', color: 'green' },
    { icon: FaGlobe, label: 'Store', color: 'purple' },
    { icon: FaHandshake, label: 'Support', color: 'orange' }
  ];

  // Styles based on theme
  const themeStyles = {
    background: isDarkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-50 via-white to-purple-50',
    sidebar: isDarkMode 
      ? 'bg-gradient-to-b from-gray-800/90 via-gray-800/80 to-gray-900/90 border-gray-700/50' 
      : 'bg-gradient-to-b from-white/40 via-white/30 to-white/20 border-white/30',
    text: isDarkMode ? 'text-gray-100' : 'text-gray-800',
    border: isDarkMode ? 'border-gray-700/50' : 'border-white/30'
  };

  return (
    <div className={`flex min-h-screen ${themeStyles.background}`}>
      {/* Background Gradients */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute w-[70%] h-[50%] top-0 left-0 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full filter blur-3xl opacity-50 transform -translate-y-1/2 -translate-x-1/4" />
        <div className="absolute w-[70%] h-[50%] bottom-0 right-0 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full filter blur-3xl opacity-50 transform translate-y-1/2 translate-x-1/4" />
      </div>

      {/* Main Layout */}
      <div className="flex w-full relative">
        {/* Sidebar */}
        <motion.div 
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className={`w-72 h-screen fixed left-0 ${themeStyles.sidebar} border-r border-r-gray-200/20 shadow-xl z-30`}
        >
          <motion.div
                        className="overflow-y-auto h-full pb-10"
                        style={scrollbarHiddenStyles}
                      >
                        {/* Logo/Brand Section */}
                        <div
                          className={`h-16 flex items-center justify-center border-b ${
                            isDarkMode
                              ? "border-gray-700/50 bg-gradient-to-r from-gray-800/50 to-gray-900/50"
                              : "border-white/30 bg-white/10"
                          }`}
                        >
                          <motion.h1
                            className={`text-2xl font-bold ${
                              isDarkMode
                                ? "bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
                                : "bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent"
                            }`}
                            whileHover={{ scale: 1.05 }}
                          >
                            CrossWave
                          </motion.h1>
                        </div>
          
                        {/* Profile Quick View */}
                        <div
                          className={`p-4 border-b ${
                            isDarkMode
                              ? "border-gray-700/50 bg-gradient-to-r from-gray-800/30 to-gray-900/30"
                              : "border-white/30 bg-white/10"
                          }`}
                        >
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
                                <span
                                  className={`text-sm ${
                                    isDarkMode ? "text-gray-400" : "text-gray-500"
                                  }`}
                                >
                                  Premium Buyer
                                </span>
                                <FaAngleDown
                                  className={
                                    isDarkMode ? "text-gray-400" : "text-gray-500"
                                  }
                                />
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
                              ${
                                activeSection === item.id
                                  ? isDarkMode
                                    ? "bg-gradient-to-r from-blue-600/90 to-purple-700/90 text-white shadow-lg backdrop-blur-xl"
                                    : "bg-gradient-to-r from-blue-500/90 to-purple-600/90 text-white shadow-lg backdrop-blur-xl"
                                  : isDarkMode
                                  ? "text-gray-300 hover:bg-gray-700/30"
                                  : "text-gray-700 hover:bg-white/40"
                              }`}
                              whileHover={{ x: 5, scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <div className="flex items-center gap-3">
                                <span
                                  className={`text-xl ${
                                    activeSection === item.id
                                      ? "text-white"
                                      : isDarkMode
                                      ? "text-gray-400 group-hover:text-purple-400"
                                      : "text-gray-500 group-hover:text-blue-500"
                                  }`}
                                >
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
                                      ? "bg-white text-blue-600"
                                      : "bg-blue-100 text-blue-600"
                                  }`}
                                >
                                  {item.badge}
                                </motion.span>
                              )}
                            </motion.div>
                          ))}
                        </nav>
          
                        {/* Quick Actions */}
                        <div
                          className={`-mt-2 p-4 border-t ${
                            isDarkMode
                              ? "border-gray-700/50 bg-gradient-to-b from-gray-800/30 to-gray-900/30"
                              : "border-white/30 bg-white/10"
                          } mt-4`}
                        >
                          <h4
                            className={`text-sm font-semibold ${
                              isDarkMode ? "text-gray-400" : "text-gray-700"
                            } mb-3`}
                          >
                            Quick Actions
                          </h4>
                          <div className="grid grid-cols-2 gap-2">
                            {[
                              { icon: FaBoxOpen, label: "New RFQ", color: "blue" },
                              { icon: FaTruck, label: "Track Order", color: "green" },
                              { icon: FaGlobe, label: "Browse", color: "purple" },
                              { icon: FaHandshake, label: "Support", color: "orange" },
                            ].map((action, index) => (
                              <motion.button
                                key={index}
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                className={`p-3 ${
                                  isDarkMode
                                    ? "bg-gray-700/50 hover:bg-gray-600/50"
                                    : "bg-white/50 hover:bg-white/60"
                                } backdrop-blur-sm rounded-lg text-center transition-all duration-200`}
                              >
                                <action.icon
                                  className={`text-${action.color}-500 mx-auto mb-1 text-xl`}
                                />
                                <span
                                  className={`text-xs ${
                                    isDarkMode ? "text-gray-300" : "text-gray-700"
                                  }`}
                                >
                                  {action.label}
                                </span>
                              </motion.button>
                            ))}
                          </div>
                        </div>
                      </motion.div>

          {/* Bottom Actions */}
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200/20 backdrop-blur-sm">
            <div className="flex justify-between items-center">
              <ThemeToggle isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
              <NotificationButton onClick={() => setIsNotificationsOpen(true)} />
              <LogoutButton />
            </div>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="flex-1 ml-72">
          {/* Page Content */}
          <main className="p-8">
            <AnimatePresence mode="popLayout">
              <motion.div
                key={activeSection}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="relative"
              >
                {getCurrentComponent()}
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </div>

      {/* Overlays */}
      <NotificationsPanel 
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        isDarkMode={isDarkMode}
      />
      <FloatingActions isDarkMode={isDarkMode} />
    </div>
  );
};

// Header Components
const PageTitle = ({ title }) => (
  <div className="flex items-center gap-4">
    <h1 className="text-xl font-semibold">{title}</h1>
    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 text-green-500 text-sm">
      <span className="w-2 h-2 rounded-full bg-green-500" />
      Store Online
    </div>
  </div>
);

const HeaderActions = ({ isDarkMode, onNotificationClick }) => (
  <div className="flex items-center gap-6">
    <SearchBar isDarkMode={isDarkMode} />
    <QuickHeaderActions isDarkMode={isDarkMode} onNotificationClick={onNotificationClick} />
  </div>
);

const ThemeToggle = ({ isDarkMode, setIsDarkMode }) => (
  <motion.button
    whileHover={{ scale: 1.1, rotate: 180 }}
    whileTap={{ scale: 0.9 }}
    onClick={() => setIsDarkMode(!isDarkMode)}
    className={`p-2 rounded-lg ${
      isDarkMode 
        ? 'text-gray-400 hover:text-gray-300 hover:bg-gray-800' 
        : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
    }`}
  >
    {isDarkMode ? <FaSun className="text-xl" /> : <FaMoon className="text-xl" />}
  </motion.button>
);

const NotificationButton = ({ onClick }) => (
  <motion.button
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
    onClick={onClick}
    className="p-2 rounded-lg text-gray-400 hover:text-gray-300 hover:bg-gray-800 relative"
  >
    <FaBell className="text-xl" />
    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
  </motion.button>
);

const LogoutButton = () => (
  <motion.button
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
    className="p-2 rounded-lg text-gray-400 hover:text-red-500 hover:bg-gray-800"
  >
    <FaSignOutAlt className="text-xl" />
  </motion.button>
);

const SearchBar = ({ isDarkMode }) => (
  <div className="relative hidden md:block">
    <FaSearch className={`absolute left-3 top-1/2 -translate-y-1/2 ${
      isDarkMode ? 'text-gray-400' : 'text-gray-500'
    }`} />
    <input
      type="text"
      placeholder="Search..."
      className={`w-64 pl-10 pr-4 py-2 rounded-lg ${
        isDarkMode 
          ? 'bg-gray-800/50 border-gray-700 text-gray-200 placeholder-gray-500'
          : 'bg-gray-100/50 border-gray-200 text-gray-700 placeholder-gray-400'
      } border focus:outline-none focus:ring-2 focus:ring-blue-500`}
    />
  </div>
);

const QuickHeaderActions = ({ isDarkMode, onNotificationClick }) => (
  <div className="flex items-center gap-3">
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`p-2 rounded-lg ${
        isDarkMode 
          ? 'hover:bg-gray-800' 
          : 'hover:bg-gray-100'
      }`}
    >
      <FaQuestionCircle className={
        isDarkMode ? 'text-gray-400' : 'text-gray-500'
      } />
    </motion.button>

    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onNotificationClick}
      className={`p-2 rounded-lg relative ${
        isDarkMode 
          ? 'hover:bg-gray-800' 
          : 'hover:bg-gray-100'
      }`}
    >
      <FaBell className={isDarkMode ? 'text-gray-400' : 'text-gray-500'} />
      <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
    </motion.button>

    <motion.div
      whileHover={{ scale: 1.05 }}
      className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer ${
        isDarkMode 
          ? 'hover:bg-gray-800' 
          : 'hover:bg-gray-100'
      }`}
    >
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-medium">
        T
      </div>
      <div className="hidden md:block">
        <div className={isDarkMode ? 'text-gray-200' : 'text-gray-700'}>
          Tech Solutions
        </div>
        <div className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>
          Seller Account
        </div>
      </div>
      <FaAngleDown className={isDarkMode ? 'text-gray-400' : 'text-gray-500'} />
    </motion.div>
  </div>
);

export default Seller 