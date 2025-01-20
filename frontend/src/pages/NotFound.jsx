import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FaSearch, FaBook, FaHeadset, FaQuestionCircle } from 'react-icons/fa'

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* 404 Text */}
        <motion.h1
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-8xl font-bold text-blue-600 mb-8"
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
            src="/robot-illustration.svg"
            alt="404 Robot"
            className="w-48 h-48 mx-auto"
          />
        </motion.div>

        {/* Error Message */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Oops! Page Not Found
          </h2>
          <p className="text-gray-600">
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
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex flex-wrap justify-center gap-4"
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
  )
}

export default NotFound 