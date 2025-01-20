import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FaSearch, FaBook, FaHeadset, FaQuestionCircle } from 'react-icons/fa'
import img from '../assets/rb_450.png'

const NotFound = () => {
  return (
    <div className="min-h-screen relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Circuit Board Pattern Background */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Animated Circuit Lines */}
        <div className="absolute inset-0">
          <svg className="w-full h-full opacity-[0.03]">
            <pattern
              id="circuit-pattern"
              x="0"
              y="0"
              width="100"
              height="100"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M10 10h80v80h-80z M30 30h40v40h-40z"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                className="text-blue-400"
              />
              <path
                d="M20 10v80 M40 10v80 M60 10v80 M80 10v80"
                stroke="currentColor"
                strokeWidth="0.5"
                className="text-blue-400"
              />
            </pattern>
            <rect x="0" y="0" width="100%" height="100%" fill="url(#circuit-pattern)" />
          </svg>
        </div>

        {/* Gradient Orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(37,99,235,0.1) 0%, rgba(37,99,235,0) 70%)'
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(139,92,246,0.1) 0%, rgba(139,92,246,0) 70%)'
          }}
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 py-12">
        <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* 404 Text */}
          <motion.h1
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-8xl font-bold text-blue-500 mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500"
          >
            404
          </motion.h1>

          {/* Robot Illustration */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <img
              src={img}
              alt="404 Robot"
              className="w-64 h-48 mx-auto"
            />
          </motion.div>

          {/* Error Message */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-bold text-white mb-2">
              Oops! Page Not Found
            </h2>
            <p className="text-gray-300">
              Looks like this page got lost in the digital world
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mb-8"
          >
            <div className="relative max-w-md mx-auto">
              <input
                type="text"
                placeholder="Search our site..."
                className="w-full px-4 py-2 rounded-lg bg-gray-800/50 border border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white placeholder-gray-400 backdrop-blur-xl"
              />
              <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="grid grid-cols-3 gap-4"
          >
            <Link
              to="/"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Go Back Home
            </Link>
            <button
              onClick={() => window.history.back()}
              className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Try Again
            </button>
            <Link to="/docs" className="text-center group">
              <div className="w-12 h-12 mx-auto mb-2 flex items-center justify-center bg-gray-800/50 rounded-lg group-hover:bg-gray-700/50 transition-colors backdrop-blur-xl border border-gray-700/50">
                <FaBook className="w-6 h-6 text-blue-400" />
              </div>
              <span className="text-sm text-gray-300">Documentation</span>
              <span className="block text-xs text-gray-500">Browse our guides</span>
            </Link>
          </motion.div>

          {/* Help Links */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-12 grid grid-cols-3 gap-4"
          >
            <Link to="/help" className="text-center group">
              <div className="w-12 h-12 mx-auto mb-2 flex items-center justify-center bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                <FaBook className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-sm text-gray-600">Documentation</span>
              <span className="block text-xs text-gray-500">Browse our guides</span>
            </Link>
            <Link to="/help" className="text-center group">
              <div className="w-12 h-12 mx-auto mb-2 flex items-center justify-center bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                <FaHeadset className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-sm text-gray-600">Support</span>
              <span className="block text-xs text-gray-500">Get help from our team</span>
            </Link>
            <Link to="/help" className="text-center group">
              <div className="w-12 h-12 mx-auto mb-2 flex items-center justify-center bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                <FaQuestionCircle className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-sm text-gray-600">FAQs</span>
              <span className="block text-xs text-gray-500">Find quick answers</span>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default NotFound 