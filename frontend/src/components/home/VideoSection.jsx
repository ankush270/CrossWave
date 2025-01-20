import React from 'react'
import { motion } from 'framer-motion'
import { FaPlay, FaBook, FaCheckCircle } from 'react-icons/fa'
import importExport from '../../assets/import-export.jpg'

const VideoSection = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
      {/* Background Overlay */}
      <motion.div 
        className="absolute inset-0 bg-blue-500/10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content Section */}
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.span 
              className="inline-block px-4 py-1 rounded-full bg-blue-500/20 text-blue-300 text-sm font-semibold"
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              Watch & Learn
            </motion.span>

            <motion.h2 
              className="text-4xl md:text-5xl font-bold leading-tight"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              See How CrossWave
              <motion.span 
                className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600"
                animate={{ 
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{ duration: 5, repeat: Infinity }}
              >
                Transforms Your Trading
              </motion.span>
            </motion.h2>

            <motion.p 
              className="text-lg text-gray-300"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              Experience how our platform streamlines international trade, from sourcing to delivery. Watch our comprehensive guide to get started.
            </motion.p>

            <motion.div 
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <motion.button
                className="px-6 py-3 bg-blue-600 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaPlay className="w-4 h-4" />
                Watch Demo
              </motion.button>
              <motion.button
                className="px-6 py-3 border border-blue-400/30 rounded-lg flex items-center gap-2 hover:bg-blue-600/10 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaBook className="w-4 h-4" />
                Read Guide
              </motion.button>
            </motion.div>

            {/* Video Stats */}
            <motion.div 
              className="grid grid-cols-3 gap-4 pt-8 border-t border-gray-700"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              {[
                { label: 'Watch Time', value: '4.5 mins' },
                { label: 'Success Rate', value: '98%' },
                { label: 'User Rating', value: '4.9/5' }
              ].map((stat, index) => (
                <motion.div 
                  key={index}
                  className="text-center"
                  whileHover={{ y: -5 }}
                >
                  <motion.div 
                    className="text-2xl font-bold text-blue-400"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                  >
                    {stat.value}
                  </motion.div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Video Preview Section */}
          <motion.div 
            className="relative group"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.div 
              className="relative rounded-2xl overflow-hidden shadow-2xl"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <img 
                src={importExport} 
                alt="Platform Demo" 
                className="w-full rounded-2xl"
              />
              <motion.div 
                className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent flex items-center justify-center"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <motion.button
                  className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center shadow-lg"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FaPlay className="w-8 h-8 text-white ml-2" />
                </motion.button>
              </motion.div>
            </motion.div>

            {/* Video Features */}
            <motion.div 
              className="absolute -right-4 -bottom-4 bg-blue-600 px-6 py-4 rounded-lg shadow-xl"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="flex items-center gap-3">
                <FaCheckCircle className="w-5 h-5 text-blue-200" />
                <span className="text-sm">HD Quality Tutorial</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default VideoSection 