import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FaUser, FaBell, FaLock, FaMoon, FaSun,
  FaCheck,  FaCamera, FaEye, FaEyeSlash,
  FaExchangeAlt
} from 'react-icons/fa'

const Settings = () => {
  // State management
  const [activeSection, setActiveSection] = useState('general')
  const [isDarkMode, setIsDarkMode] = useState(false)
  
  const [userData, setUserData] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1 234 567 8900',
    language: 'English',
    timezone: 'UTC-5',
    notifications: {
      orderUpdates: true,
      payments: true,
      marketing: false,
      security: true
    },
    role: 'buyer'
  })

  // Sidebar navigation items
  const navItems = [
    { id: 'general', icon: FaUser, label: 'General Settings' },
    { id: 'role', icon: FaExchangeAlt, label: 'Role Management' },
    { id: 'notifications', icon: FaBell, label: 'Notifications' },
    { id: 'security', icon: FaLock, label: 'Security' }
  ]

  // Section components
  const GeneralSettings = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold flex items-center gap-2">
        <FaUser className="w-5 h-5" />
        General Settings
      </h2>

      {/* Profile Picture */}
      <div className="flex items-center gap-6">
        <div className="relative">
          <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-100">
            {userData.profileImage ? (
              <img 
                src={userData.profileImage} 
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <FaUser className="w-full h-full p-6 text-gray-400" />
            )}
          </div>
          <label className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full cursor-pointer shadow-lg">
            <FaCamera className="w-4 h-4" />
            <input 
              type="file" 
              className="hidden" 
              accept="image/*"
              onChange={handleImageUpload}
            />
          </label>
        </div>
        <div>
          <h3 className="font-medium">Profile Picture</h3>
          <p className="text-sm text-gray-500">Upload a profile picture or business logo</p>
        </div>
      </div>

      {/* Personal Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FloatingInput
          label="Full Name"
          value={userData.name}
          onChange={(e) => handleInputChange('name', e.target.value)}
        />
        <FloatingInput
          label="Email Address"
          type="email"
          value={userData.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
        />
        <FloatingInput
          label="Phone Number"
          type="tel"
          value={userData.phone}
          onChange={(e) => handleInputChange('phone', e.target.value)}
        />
        <div>
          <label className="block text-sm font-medium text-gray-700">Language</label>
          <select
            value={userData.language}
            onChange={(e) => handleInputChange('language', e.target.value)}
            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="English">English</option>
            <option value="Spanish">Español</option>
            <option value="French">Français</option>
          </select>
        </div>
      </div>

      {/* Theme Toggle */}
      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
        <div>
          <h3 className="font-medium">Theme Preference</h3>
          <p className="text-sm text-gray-500">Choose between light and dark mode</p>
        </div>
        <ThemeToggle isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      </div>
    </div>
  )

  // Floating Input Component
  const FloatingInput = ({ label, type = 'text', value, onChange }) => (
    <div className="relative">
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder=" "
        className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 pt-4 pb-1 px-3"
      />
      <label className="absolute text-gray-500 text-sm duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] left-3">
        {label}
      </label>
    </div>
  )

  // Theme Toggle Component
  const ThemeToggle = ({ isDarkMode, setIsDarkMode }) => (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => setIsDarkMode(!isDarkMode)}
      className={`p-2 rounded-full ${
        isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
      }`}
    >
      {/* <AnimatePresence mode="wait"> */}
      <AnimatePresence mode="popLayout">
        {isDarkMode ? (
          <motion.div
            key="moon"
            initial={{ rotate: 90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: -90, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <FaMoon className="w-6 h-6" />
          </motion.div>
        ) : (
          <motion.div
            key="sun"
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <FaSun className="w-6 h-6" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  )

  // Add SidebarLink component
  const SidebarLink = ({ icon: Icon, text, active, onClick }) => (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`w-full px-4 py-3 rounded-lg flex items-center gap-3 transition-colors
        ${active 
          ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/10 dark:text-blue-400' 
          : 'text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-800'
        }`}
    >
      <Icon className="w-5 h-5" />
      <span className="font-medium">{text}</span>
    </motion.button>
  )

  // Add handleImageUpload function
  const handleImageUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setUserData(prev => ({
          ...prev,
          profileImage: reader.result
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  // Add handleInputChange function
  const handleInputChange = (field, value) => {
    setUserData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  // Role Management Section
  const RoleManagement = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold flex items-center gap-2">
        <FaExchangeAlt className="w-5 h-5" />
        Role Management
      </h2>

      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium">Current Role: {userData.role === 'buyer' ? 'Buyer' : 'Seller'}</h3>
            <p className="text-sm text-gray-600 mt-1">Switch between buyer and seller roles</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              const newRole = userData.role === 'buyer' ? 'seller' : 'buyer'
              setUserData(prev => ({ ...prev, role: newRole }))
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
          >
            <FaExchangeAlt className="w-4 h-4" />
            Switch to {userData.role === 'buyer' ? 'Seller' : 'Buyer'}
          </motion.button>
        </div>

        {/* Role Preview */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className={`p-4 rounded-lg border-2 ${userData.role === 'buyer' ? 'border-blue-500 bg-white' : 'border-gray-200'}`}>
            <h4 className="font-medium">Buyer Features</h4>
            <ul className="mt-2 space-y-2 text-sm text-gray-600">
              <li className="flex items-center gap-2">
                <FaCheck className="w-4 h-4 text-green-500" />
                Browse and purchase products
              </li>
              <li className="flex items-center gap-2">
                <FaCheck className="w-4 h-4 text-green-500" />
                Track orders and payments
              </li>
            </ul>
          </div>
          <div className={`p-4 rounded-lg border-2 ${userData.role === 'seller' ? 'border-blue-500 bg-white' : 'border-gray-200'}`}>
            <h4 className="font-medium">Seller Features</h4>
            <ul className="mt-2 space-y-2 text-sm text-gray-600">
              <li className="flex items-center gap-2">
                <FaCheck className="w-4 h-4 text-green-500" />
                List and manage products
              </li>
              <li className="flex items-center gap-2">
                <FaCheck className="w-4 h-4 text-green-500" />
                Process orders and track sales
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )

  // Notifications Section
  const NotificationSettings = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold flex items-center gap-2">
        <FaBell className="w-5 h-5" />
        Notification Settings
      </h2>

      <div className="space-y-4">
        {Object.entries({
          orderUpdates: 'Order Updates',
          payments: 'Payment Notifications',
          marketing: 'Marketing & Promotions',
          security: 'Security Alerts'
        }).map(([key, label]) => (
          <div key={key} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <h3 className="font-medium">{label}</h3>
              <p className="text-sm text-gray-500">
                Receive notifications about {label.toLowerCase()}
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={userData.notifications[key]}
                onChange={(e) => {
                  setUserData(prev => ({
                    ...prev,
                    notifications: {
                      ...prev.notifications,
                      [key]: e.target.checked
                    }
                  }))
                }}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        ))}
      </div>
    </div>
  )

  // Security Section
  const SecuritySettings = () => {
    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [showCurrentPassword, setShowCurrentPassword] = useState(false)
    const [showNewPassword, setShowNewPassword] = useState(false)

    const getPasswordStrength = (password) => {
      if (!password) return 0
      let strength = 0
      if (password.length >= 8) strength += 25
      if (password.match(/[A-Z]/)) strength += 25
      if (password.match(/[0-9]/)) strength += 25
      if (password.match(/[^A-Za-z0-9]/)) strength += 25
      return strength
    }

    return (
      <div className="space-y-6">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <FaLock className="w-5 h-5" />
          Security Settings
        </h2>

        {/* Password Change */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-medium mb-4">Change Password</h3>
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="block text-sm font-medium text-gray-700">Current Password</label>
              <div className="mt-1 relative">
                <input
                  type={showCurrentPassword ? 'text' : 'password'}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showCurrentPassword ? (
                    <FaEyeSlash className="w-4 h-4 text-gray-400" />
                  ) : (
                    <FaEye className="w-4 h-4 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">New Password</label>
              <div className="mt-1 relative">
                <input
                  type={showNewPassword ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showNewPassword ? (
                    <FaEyeSlash className="w-4 h-4 text-gray-400" />
                  ) : (
                    <FaEye className="w-4 h-4 text-gray-400" />
                  )}
                </button>
              </div>
              {/* Password Strength Indicator */}
              {newPassword && (
                <div className="mt-2">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="h-2 rounded-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500"
                      style={{ width: `${getPasswordStrength(newPassword)}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Password strength: {getPasswordStrength(newPassword)}%
                  </p>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Confirm New Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Update Password
            </motion.button>
          </form>
        </div>

        {/* Two-Factor Authentication */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium">Two-Factor Authentication</h3>
              <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
            </div>
            <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
              Enable 2FA
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Update the return statement to include new sections
  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <nav className="space-y-2">
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
          </div>

          {/* Main Content */}
          <div className="md:col-span-3">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
              {activeSection === 'general' && <GeneralSettings />}
              {activeSection === 'role' && <RoleManagement />}
              {activeSection === 'notifications' && <NotificationSettings />}
              {activeSection === 'security' && <SecuritySettings />}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings 