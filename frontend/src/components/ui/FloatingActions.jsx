import React from 'react';
import { motion } from 'framer-motion';
import { FaPlus, FaHandshake } from 'react-icons/fa';

const FloatingActions = ({ isDarkMode }) => {
  return (
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
        <FaPlus className="text-xl" />
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
  );
};

export default FloatingActions; 