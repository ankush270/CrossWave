import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CategorySidebar = ({ categories, selectedCategory, setSelectedCategory }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <motion.div 
      className="hidden lg:block w-64 bg-white rounded-2xl shadow-lg p-6 h-fit sticky top-24"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.2 }}
    >
      <h3 className="text-xl font-bold mb-6">Categories</h3>
      <motion.div 
        className="space-y-2"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {Object.entries(categories).map(([key, category]) => {
          const Icon = category.icon;
          return (
            <motion.div key={key} variants={itemVariants}>
              <button
                className={`w-full text-left px-4 py-3 rounded-xl flex items-center gap-3 transition-all duration-300 ${
                  selectedCategory === key 
                    ? 'bg-blue-50 text-blue-600 shadow-md' 
                    : 'hover:bg-gray-50'
                }`}
                onClick={() => setSelectedCategory(key)}
              >
                <Icon className="text-lg" />
                <span className="font-medium">{category.name}</span>
              </button>
              
              <AnimatePresence>
                {category.subcategories.length > 0 && selectedCategory === key && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="ml-6 mt-2 space-y-1"
                  >
                    {category.subcategories.map((sub) => (
                      <motion.button
                        key={sub}
                        className="w-full text-left px-4 py-2 text-sm text-gray-600 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition-all duration-300"
                        whileHover={{ x: 5 }}
                        onClick={() => setSelectedCategory(sub)}
                      >
                        {sub}
                      </motion.button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Mobile Category Menu */}
      <div className="lg:hidden">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Categories</option>
          {Object.entries(categories).map(([key, category]) => (
            <React.Fragment key={key}>
              <option value={key}>{category.name}</option>
              {category.subcategories.map((sub) => (
                <option key={sub} value={sub}>
                  — {sub}
                </option>
              ))}
            </React.Fragment>
          ))}
        </select>
      </div>
    </motion.div>
  );
};

export default CategorySidebar; 