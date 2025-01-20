import React from 'react';
import { motion } from 'framer-motion';

const Header = ({ title, isDarkMode, themeStyles }) => {
  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`h-16 backdrop-blur-xl ${
        isDarkMode 
          ? 'bg-gray-800/80 shadow-lg border-b border-gray-700/50' 
          : 'bg-white/80 shadow-sm border-b border-gray-200/50'
      } px-8 flex items-center justify-between sticky top-0 z-30`}
    >
      <h2 className={`text-xl font-semibold ${themeStyles.text}`}>
        {title}
      </h2>
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 text-gray-500">
          <span className="w-2 h-2 bg-green-500 rounded-full" />
          <span className={`text-sm ${
            isDarkMode ? 'text-gray-400' : 'text-gray-500'
          }`}>
            Store Online
          </span>
        </div>
      </div>
    </motion.header>
  );
};

export default Header; 