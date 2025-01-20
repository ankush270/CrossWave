import React from 'react';
import { motion } from 'framer-motion';
import { Logo, ProfileSection, Navigation, QuickActions, BottomBar } from './sidebar';

const Sidebar = ({ 
  activeSection, 
  setActiveSection, 
  isDarkMode, 
  setIsDarkMode, 
  setIsNotificationsOpen,
  menuItems,
  themeStyles 
}) => {
  const sidebarStyles = isDarkMode 
    ? 'bg-gradient-to-b from-gray-800/90 via-gray-800/80 to-gray-900/90 border-gray-700/50' 
    : 'bg-gradient-to-b from-white/40 via-white/30 to-white/20 border-white/30';

  return (
    <motion.aside 
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      className={`w-72 backdrop-blur-xl ${sidebarStyles} shadow-lg border-r relative z-20`}
    >
      <Logo isDarkMode={isDarkMode} />
      <ProfileSection isDarkMode={isDarkMode} themeStyles={themeStyles} />
      <Navigation 
        menuItems={menuItems}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        isDarkMode={isDarkMode}
      />
      <QuickActions isDarkMode={isDarkMode} themeStyles={themeStyles} />
      <BottomBar 
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        setIsNotificationsOpen={setIsNotificationsOpen}
      />
    </motion.aside>
  );
};

export default Sidebar; 