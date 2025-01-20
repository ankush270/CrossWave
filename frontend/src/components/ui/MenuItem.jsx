import React from 'react';
import { motion } from 'framer-motion';

const MenuItem = ({ item, isActive, isDarkMode, onClick }) => {
  return (
    <motion.div
      onClick={onClick}
      className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all group cursor-pointer
        ${isActive 
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
        {item.icon}
        <span>{item.title}</span>
      </div>
      {item.badge && (
        <span className={`px-2 py-1 rounded-full text-xs ${
          isActive ? 'bg-white/20' : 'bg-blue-100 text-blue-600'
        }`}>
          {item.badge}
        </span>
      )}
    </motion.div>
  );
};

export default MenuItem; 