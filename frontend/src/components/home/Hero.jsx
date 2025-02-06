import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { 
  FaArrowRight, FaPlay, FaShieldAlt, FaGlobe, FaChartLine,
  FaRocket, FaUsers, FaHandshake, FaLightbulb, FaCubes,
  FaRegCheckCircle
} from 'react-icons/fa'
import importExport from '../../assets/import-export.jpg'

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <section className="relative min-h-screen flex items-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
      {/* Enhanced Animated Background Elements */}
      <div className="absolute inset-0 z-0">
        <motion.div 
          className="absolute w-96 h-96 -top-48 -left-48 bg-blue-500/30 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute w-96 h-96 -bottom-48 -right-48 bg-purple-500/30 rounded-full blur-3xl"
          animate={{ 
            scale: [1.2, 1, 1.2],
            rotate: [90, 0, 90]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute w-96 h-96 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-green-500/20 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.3, 0.2]
          }}
          transition={{ 
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div 
          className="grid lg:grid-cols-2 gap-12 items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Left Content */}
          <div className="space-y-8">
            {/* Enhanced Badge */}
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/20"
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <FaRocket className="text-blue-400" />
              </motion.div>
              <span className="text-sm font-medium text-blue-300">Global Trade Platform</span>
            </motion.div>

            {/* Enhanced Heading */}
            <motion.h1
              variants={itemVariants}
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
            >
              Revolutionize Your 
              <motion.span 
                className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 inline-block"
                animate={{ 
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{ 
                  duration: 5,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                {" International Trade "}
              </motion.span>
              Experience
            </motion.h1>

            {/* Enhanced Trust Quote Section - Moved up and redesigned */}
            <motion.div
              variants={itemVariants}
              className="my-8 p-6 bg-gradient-to-r from-blue-900/40 to-purple-900/40 rounded-xl border border-blue-500/20 backdrop-blur-sm"
            >
              <div className="flex items-center gap-3 mb-3">
                <FaShieldAlt className="text-2xl text-blue-400" />
                <h3 className="text-xl font-bold text-blue-300">Our Promise</h3>
              </div>
              <p className="text-lg italic text-gray-200">
                "What sets us apart is our unwavering commitment to transparency and trust. 
                Every partnership we forge, every transaction we facilitate, and every piece of data 
                we handle is backed by our dedication to absolute integrity and security."
              </p>
              <div className="mt-3 flex items-center justify-between">
                <p className="text-sm font-semibold text-blue-300">
                  - The CrossWave Promise
                </p>
                <div className="flex items-center gap-2">
                  <FaRegCheckCircle className="text-green-400" />
                  <span className="text-sm text-green-400">Verified Commitment</span>
                </div>
              </div>
            </motion.div>

            {/* Enhanced Features List */}
            <motion.div
              variants={itemVariants}
              className="space-y-3 flex gap-5 "
            >
              {[
                { icon: <FaRegCheckCircle />, text: "Verified Global Partners" },
                { icon: <FaHandshake />, text: "Secure Transactions" },
                { icon: <FaCubes />, text: "Smart Logistics" }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  className="flex items-center gap-2 text-gray-300"
                  whileHover={{ x: 5 }}
                >
                  <motion.span
                    animate={{ rotate: [0, 15, -15, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="text-blue-400"
                  >
                    {feature.icon}
                  </motion.span>
                  {feature.text}
                </motion.div>
              ))}
            </motion.div>

            {/* Enhanced CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-4"
            >
              <Link to="/signup">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(59, 130, 246, 0.5)" }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl font-semibold flex items-center gap-2 group"
                >
                  Get Started
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <FaArrowRight />
                  </motion.span>
                </motion.button>
              </Link>
              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.2)" }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white/10 rounded-xl font-semibold flex items-center gap-2 backdrop-blur-sm"
              >
                <motion.span
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <FaPlay />
                </motion.span>
                Watch Demo
              </motion.button>
            </motion.div>

            {/* Enhanced Stats */}
            {/* <motion.div
              variants={itemVariants}
              className="grid grid-cols-3 gap-8 pt-8 border-t border-gray-700"
            >
              {[
                { icon: <FaGlobe />, value: '150+', label: 'Countries' },
                { icon: <FaShieldAlt />, value: '99.9%', label: 'Secure Transactions' },
                { icon: <FaChartLine />, value: '$500M+', label: 'Trade Volume' }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  whileHover={{ y: -5 }}
                >
                  <motion.div
                    className="text-blue-400 text-2xl mb-2"
                    animate={{ rotateY: 360, x:70 }}
                    transition={{ duration: 2 , }}
                  >
                    {stat.icon}
                  </motion.div>
                  <motion.div
                    className="text-2xl font-bold"
                    whileHover={{ scale: 1.1 }}
                  >
                    {stat.value}
                  </motion.div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div> */}
          </div>

          {/* Enhanced Right Content - Image */}
          <motion.div
            variants={itemVariants}
            className="relative"
          >
            <motion.div 
              className="relative rounded-2xl overflow-hidden shadow-2xl"
              whileHover={{ scale: 1.02 }}
            >
              <motion.img
                src={importExport}
                alt="International Trade"
                className="w-full h-auto rounded-2xl"
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.5 }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            </motion.div>

            {/* Enhanced Floating Elements */}
            <motion.div
              variants={itemVariants}
              className="absolute -right-4 -bottom-4 bg-white/10 backdrop-blur-xl px-6 py-4 rounded-xl shadow-xl"
              whileHover={{ scale: 1.05 }}
            >
              <div className="flex items-center gap-3">
                <motion.div
                  className="w-3 h-3 bg-green-500 rounded-full"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span className="text-sm font-medium">Live Trading Platform</span>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero 