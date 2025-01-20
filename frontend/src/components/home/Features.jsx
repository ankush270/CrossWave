import React from 'react'
import { motion } from 'framer-motion'
import { FaRocket, FaShieldAlt, FaGlobe, FaChartLine } from 'react-icons/fa'

const Features = ({ isVisible }) => {
  const features = [
    {
      icon: <FaGlobe className="w-8 h-8" />,
      title: "Global Trade Network",
      description: "Access verified suppliers and buyers across 150+ countries",
      color: "blue",
      stats: "10K+ Active Partners"
    },
    {
      icon: <FaShieldAlt className="w-8 h-8" />,
      title: "Trade Documentation",
      description: "Automated customs, shipping & compliance documents",
      color: "indigo",
      stats: "99% Compliance Rate"
    },
    {
      icon: <FaRocket className="w-8 h-8" />,
      title: "Secure Payments",
      description: "Letter of Credit, Bank Transfers & Trade Finance",
      color: "green",
      stats: "$500M+ Processed"
    },
    {
      icon: <FaChartLine className="w-8 h-8" />,
      title: "Logistics Management",
      description: "End-to-end shipping & freight management",
      color: "purple",
      stats: "5M+ Shipments"
    }
  ]

  const getGradient = (color) => {
    const gradients = {
      blue: "from-blue-500 to-blue-600",
      indigo: "from-indigo-500 to-indigo-600",
      green: "from-green-500 to-green-600",
      purple: "from-purple-500 to-purple-600"
    }
    return gradients[color]
  }

  return (
    <section id="features" className="py-20 bg-gradient-to-b from-white to-blue-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16"
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
            Platform Features
          </motion.span>
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Everything You Need to
            <span className="block text-blue-600">Trade Globally</span>
          </motion.h2>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all"
            >
              {/* Icon */}
              <motion.div 
                className={`w-14 h-14 rounded-lg bg-gradient-to-r ${getGradient(feature.color)} 
                  flex items-center justify-center text-white mb-6`}
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                {feature.icon}
              </motion.div>

              {/* Content */}
              <motion.h3 
                className="text-xl font-semibold mb-2"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {feature.title}
              </motion.h3>
              
              <motion.p 
                className="text-gray-600 mb-4"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {feature.description}
              </motion.p>

              {/* Stats */}
              <motion.div 
                className="text-sm font-semibold text-blue-600"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                {feature.stats}
              </motion.div>

              {/* Decorative Element */}
              <motion.div
                className="absolute -right-2 -bottom-2 w-24 h-24 opacity-5"
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.1, 1],
                }}
                transition={{ duration: 10, repeat: Infinity }}
              >
                <div className={`w-full h-full bg-gradient-to-r ${getGradient(feature.color)} rounded-lg`} />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features 