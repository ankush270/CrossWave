import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaBell, FaBox, FaExclamationCircle } from 'react-icons/fa';

const NotificationsPanel = ({ isOpen, onClose, isDarkMode }) => {
  const notifications = [
    {
      id: 1,
      title: 'New Order Received',
      message: 'Order #ORD123 received from Tech Solutions',
      time: '2 min ago',
      type: 'order',
      icon: <FaBox className="text-blue-500" />
    },
    {
      id: 2,
      title: 'Stock Alert',
      message: 'Low stock warning for Order SKU-456',
      time: '1 hour ago',
      type: 'inventory',
      icon: <FaExclamationCircle className="text-orange-500" />
    }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
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
            <div className="flex items-center gap-2">
              <FaBell className={isDarkMode ? 'text-gray-400' : 'text-gray-600'} />
              <h3 className={`text-lg font-semibold ${
                isDarkMode ? 'text-gray-200' : 'text-gray-800'
              }`}>
                Notifications
              </h3>
            </div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className={`p-2 rounded-full ${
                isDarkMode 
                  ? 'hover:bg-gray-700' 
                  : 'hover:bg-gray-100'
              }`}
            >
              <FaTimes className={isDarkMode ? 'text-gray-400' : 'text-gray-600'} />
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
                <div className="flex gap-3">
                  <div className={`p-2 rounded-lg ${
                    isDarkMode ? 'bg-gray-600' : 'bg-white'
                  }`}>
                    {notification.icon}
                  </div>
                  <div>
                    <h4 className={`font-medium ${
                      isDarkMode ? 'text-gray-200' : 'text-gray-800'
                    }`}>
                      {notification.title}
                    </h4>
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
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NotificationsPanel; 