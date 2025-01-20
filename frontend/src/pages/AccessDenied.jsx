import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FaLock, FaSignInAlt, FaHeadset } from 'react-icons/fa'

const AccessDenied = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Lock Icon */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="mb-8"
        >
          <div className="w-24 h-24 mx-auto bg-red-100 rounded-full flex items-center justify-center">
            <FaLock className="w-12 h-12 text-red-600" />
          </div>
        </motion.div>

        {/* Error Message */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Access Denied
          </h1>
          <p className="text-gray-600">
            You don't have permission to view this page
          </p>
        </motion.div>

        {/* Error Details */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-8 text-sm text-red-600"
        >
          Please ensure you are logged in with the correct permissions, or contact support for assistance.
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex flex-wrap justify-center gap-4"
        >
          <Link
            to="/login"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <FaSignInAlt className="w-4 h-4" />
            Login
          </Link>
          <Link
            to="/help"
            className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
          >
            <FaHeadset className="w-4 h-4" />
            Contact Support
          </Link>
          <Link
            to="/"
            className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Back to Home
          </Link>
        </motion.div>
      </div>
    </div>
  )
}

export default AccessDenied 