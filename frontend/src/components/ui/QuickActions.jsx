import React from 'react';
import { motion } from 'framer-motion';

const QuickActions = ({ actions, isDarkMode, themeStyles }) => {
  return (
    <div className={`p-4 border-t ${themeStyles.border} mt-4`}>
      <h4 className={`text-sm font-semibold ${
        isDarkMode ? 'text-gray-400' : 'text-gray-700'
      } mb-3`}>
        Quick Actions
      </h4>
      <div className="grid grid-cols-2 gap-2">
        {actions.map((action, index) => (
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
  );
};

export default QuickActions; 