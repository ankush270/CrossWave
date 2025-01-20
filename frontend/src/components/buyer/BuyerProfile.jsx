import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaUser, FaBuilding, FaEnvelope, FaPhone, FaMapMarkerAlt,
  FaGlobe, FaLock, FaCreditCard, FaBell, FaShieldAlt,
  FaEdit, FaSave, FaCamera
} from 'react-icons/fa';

const BuyerProfile = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);

  const [profile, setProfile] = useState({
    companyName: "John's Electronics",
    contactPerson: "John Doe",
    email: "john@electronics.com",
    phone: "+91 98765 43210",
    address: "123 Tech Park, Mumbai, India",
    website: "www.johnselectronics.com",
    businessType: "Electronics Manufacturing",
    gstNumber: "29ABCDE1234F1Z5",
    yearEstablished: "2015",
    annualPurchaseVolume: "₹50M - ₹100M"
  });

  const [notifications, setNotifications] = useState({
    orderUpdates: true,
    priceAlerts: true,
    newSuppliers: false,
    marketingEmails: true,
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
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center gap-6">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-3xl font-semibold">
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
                Premium Buyer
              </span>
              <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm">
                Verified
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
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
                  <div className="relative">
                    <FaBuilding className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      disabled={!isEditing}
                      value={profile.companyName}
                      onChange={(e) => setProfile({ ...profile, companyName: e.target.value })}
                      className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Contact Person
                  </label>
                  <div className="relative">
                    <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      disabled={!isEditing}
                      value={profile.contactPerson}
                      onChange={(e) => setProfile({ ...profile, contactPerson: e.target.value })}
                      className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="email"
                      disabled={!isEditing}
                      value={profile.email}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                      className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <div className="relative">
                    <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="tel"
                      disabled={!isEditing}
                      value={profile.phone}
                      onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                      className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
                    />
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Business Address
                  </label>
                  <div className="relative">
                    <FaMapMarkerAlt className="absolute left-3 top-3 text-gray-400" />
                    <textarea
                      disabled={!isEditing}
                      value={profile.address}
                      onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                      rows="2"
                      className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Website
                  </label>
                  <div className="relative">
                    <FaGlobe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="url"
                      disabled={!isEditing}
                      value={profile.website}
                      onChange={(e) => setProfile({ ...profile, website: e.target.value })}
                      className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    GST Number
                  </label>
                  <div className="relative">
                    <FaShieldAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      disabled={!isEditing}
                      value={profile.gstNumber}
                      onChange={(e) => setProfile({ ...profile, gstNumber: e.target.value })}
                      className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-4 mt-6">
                {isEditing ? (
                  <>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
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
                    <FaAngleRight className="text-gray-400" />
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    className="w-full p-4 bg-gray-50 rounded-lg flex items-center justify-between hover:bg-gray-100"
                  >
                    <div className="flex items-center gap-3">
                      <FaCreditCard className="text-gray-400" />
                      <div>
                        <p className="font-medium">Payment Methods</p>
                        <p className="text-sm text-gray-500">Manage your payment options</p>
                      </div>
                    </div>
                    <FaAngleRight className="text-gray-400" />
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
                    <FaAngleRight className="text-gray-400" />
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

export default BuyerProfile; 