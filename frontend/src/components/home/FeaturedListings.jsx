import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { 
  FaMicrochip, FaMobile, FaServer, FaHdd,
  FaChartLine, FaCheckCircle, FaWarehouse, FaClock,
  FaArrowRight 
} from 'react-icons/fa'

const FeaturedListings = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.span 
            className="inline-block px-4 py-1 rounded-full bg-blue-100 text-blue-600 text-sm font-semibold mb-4"
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Electronics Marketplace
          </motion.span>
          <motion.h2 
            className="text-3xl font-bold"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Featured Electronics Trading
          </motion.h2>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Buyers Section */}
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.div 
              className="flex justify-between items-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-semibold">For Buyers</h3>
              <motion.div
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Link to="/marketplace" className="text-blue-600 hover:text-blue-700 flex items-center gap-2">
                  View All 
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <FaArrowRight className="w-4 h-4" />
                  </motion.div>
                </Link>
              </motion.div>
            </motion.div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: <FaMicrochip style={{ color: '#000000' }} />, name: "Semiconductors", count: "2000+" },
                { icon: <FaMobile style={{ color: '#ff5c33' }} />, name: "Mobile Devices", count: "1500+" },
                { icon: <FaServer style={{ color: '#0000ff' }} />, name: "Computer Parts", count: "1000+" },
                { icon: <FaHdd style={{ color: '#00ff00' }} />, name: "Electronic Components", count: "3000+" }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ 
                    scale: 1.02,
                    y: -5,
                    transition: { duration: 0.2 }
                  }}
                  className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-all"
                >
                  <motion.div 
                    className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mb-3"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    {item.icon}
                  </motion.div>
                  <motion.h4 
                    className="font-medium"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    {item.name}
                  </motion.h4>
                  <motion.p 
                    className="text-sm text-gray-600"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    {item.count} listings
                  </motion.p>
                </motion.div>
              ))}
            </div>

            <motion.button 
              className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Browse Electronics
            </motion.button>
          </motion.div>

          {/* Suppliers Section */}
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.div 
              className="flex justify-between items-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-semibold">For Electronics Suppliers</h3>
              <motion.div
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Link to="/supplier-hub" className="text-blue-600 hover:text-blue-700 flex items-center gap-2">
                  Supplier Hub 
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <FaArrowRight className="w-4 h-4" />
                  </motion.div>
                </Link>
              </motion.div>
            </motion.div>

            <div className="space-y-4">
              {[
                {
                  title: "Market Analysis",
                  description: "Real-time electronics market trends",
                  icon: <FaChartLine style={{ color: '#ff33cc' }}/>,
                  stats: "Updated hourly"
                },
                {
                  title: "Quality Control",
                  description: "Component verification system",
                  icon: <FaCheckCircle style={{ color: '#000099' }}/>,
                  stats: "ISO Certified"
                },
                {
                  title: "Inventory",
                  description: "Real-time stock tracking",
                  icon: <FaWarehouse style={{ color: '#996600' }}/>,
                  stats: "Smart Storage"
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ 
                    scale: 1.01,
                    x: 5,
                    transition: { duration: 0.2 }
                  }}
                  className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-all"
                >
                  <div className="flex gap-4">
                    <motion.div 
                      className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      {feature.icon}
                    </motion.div>
                    <div>
                      <motion.h4 
                        className="font-medium"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        {feature.title}
                      </motion.h4>
                      <motion.p 
                        className="text-sm text-gray-600"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        {feature.description}
                      </motion.p>
                      <motion.div 
                        className="text-sm text-gray-500 mt-1 flex items-center"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                      >
                        <FaClock className="w-3 h-3 mr-1" />
                        {feature.stats}
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.button 
              className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Start Selling Electronics
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default FeaturedListings 