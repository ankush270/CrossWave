import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaUser, FaBuilding, FaEnvelope, FaPhone, FaMapMarkerAlt,
  FaGlobe, FaLock, FaCreditCard, FaBell, FaShieldAlt,
  FaEdit, FaSave, FaCamera, FaStore, FaTruck, FaBox
} from 'react-icons/fa';

const SellerProfile = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);

  const [profile, setProfile] = useState({
    companyName: "Tech Solutions Ltd",
    contactPerson: "Sarah Johnson",
    email: "sarah@techsolutions.com",
    phone: "+91 98765 43210",
    address: "456 Tech Park, Bangalore, India",
    website: "www.techsolutions.com",
    businessType: "Electronics Manufacturing",
    gstNumber: "29ABCDE1234F1Z5",
    yearEstablished: "2010",
    annualRevenue: "₹100M - ₹500M",
    storeRating: 4.8,
    totalProducts: 156,
    totalOrders: 1234,
    shippingPartners: ['FedEx', 'DHL', 'BlueDart']
  });

  const [notifications, setNotifications] = useState({
    orderAlerts: true,
    stockAlerts: true,
    paymentAlerts: true,
    marketingEmails: false,
    securityAlerts: true
  });

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    setIsEditing(false);
    // Handle profile update logic
  };

  const handleNotificationToggle = (key) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="bg-white/50 backdrop-blur-xl rounded-xl shadow-sm border border-gray-200/50 p-6">
        <div className="flex items-center gap-6">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center text-white text-3xl font-semibold">
              {profile.companyName.charAt(0)}
            </div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="absolute bottom-0 right-0 p-2 bg-white rounded-full shadow-lg border border-gray-200"
            >
              <FaCamera className="text-gray-600" />
            </motion.button>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">{profile.companyName}</h2>
            <p className="text-gray-600">{profile.businessType}</p>
            <div className="flex items-center gap-2 mt-2">
              <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm">
                Verified Seller
              </span>
              <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm">
                Premium Account
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Store Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          whileHover={{ y: -2 }}
          className="bg-white/50 backdrop-blur-xl rounded-xl p-6 border border-gray-200/50"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <FaStore className="text-blue-600 text-xl" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">{profile.storeRating}</h3>
              <p className="text-gray-600">Store Rating</p>
            </div>
          </div>
        </motion.div>
        <motion.div
          whileHover={{ y: -2 }}
          className="bg-white/50 backdrop-blur-xl rounded-xl p-6 border border-gray-200/50"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-100 rounded-lg">
              <FaBox className="text-purple-600 text-xl" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">{profile.totalProducts}</h3>
              <p className="text-gray-600">Total Products</p>
            </div>
          </div>
        </motion.div>
        <motion.div
          whileHover={{ y: -2 }}
          className="bg-white/50 backdrop-blur-xl rounded-xl p-6 border border-gray-200/50"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <FaTruck className="text-green-600 text-xl" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">{profile.totalOrders}</h3>
              <p className="text-gray-600">Orders Fulfilled</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Tabs */}
      <div className="bg-white/50 backdrop-blur-xl rounded-xl shadow-sm border border-gray-200/50 overflow-hidden">
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex-1 px-6 py-3 text-sm font-medium ${
              activeTab === 'profile'
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Company Profile
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`flex-1 px-6 py-3 text-sm font-medium ${
              activeTab === 'settings'
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Settings & Preferences
          </button>
        </div>

        <div className="p-6">
          {activeTab === 'profile' ? (
            <form onSubmit={handleProfileUpdate}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Company Name
                  </label>
                  <input
                    type="text"
                    value={profile.companyName}
                    disabled={!isEditing}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50"
                  />
                </div>
                {/* Add more form fields */}
              </div>

              <div className="mt-6 flex justify-end">
                {isEditing ? (
                  <>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg mr-4"
                    >
                      Cancel
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      type="submit"
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg flex items-center gap-2"
                    >
                      <FaSave />
                      Save Changes
                    </motion.button>
                  </>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="button"
                    onClick={() => setIsEditing(true)}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg flex items-center gap-2"
                  >
                    <FaEdit />
                    Edit Profile
                  </motion.button>
                )}
              </div>
            </form>
          ) : (
            <div className="space-y-6">
              {/* Notification Preferences */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Notification Preferences</h3>
                <div className="space-y-4">
                  {Object.entries(notifications).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</p>
                        <p className="text-sm text-gray-500">Receive notifications about {key.toLowerCase()}</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={value}
                          onChange={() => handleNotificationToggle(key)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Security Settings */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Security Settings</h3>
                <div className="space-y-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    className="w-full p-4 bg-gray-50 rounded-lg flex items-center justify-between hover:bg-gray-100"
                  >
                    <div className="flex items-center gap-3">
                      <FaLock className="text-gray-400" />
                      <div>
                        <p className="font-medium">Change Password</p>
                        <p className="text-sm text-gray-500">Update your account password</p>
                      </div>
                    </div>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    className="w-full p-4 bg-gray-50 rounded-lg flex items-center justify-between hover:bg-gray-100"
                  >
                    <div className="flex items-center gap-3">
                      <FaCreditCard className="text-gray-400" />
                      <div>
                        <p className="font-medium">Payment Settings</p>
                        <p className="text-sm text-gray-500">Manage your payment methods</p>
                      </div>
                    </div>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    className="w-full p-4 bg-gray-50 rounded-lg flex items-center justify-between hover:bg-gray-100"
                  >
                    <div className="flex items-center gap-3">
                      <FaShieldAlt className="text-gray-400" />
                      <div>
                        <p className="font-medium">Two-Factor Authentication</p>
                        <p className="text-sm text-gray-500">Add an extra layer of security</p>
                      </div>
                    </div>
                  </motion.button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SellerProfile; 