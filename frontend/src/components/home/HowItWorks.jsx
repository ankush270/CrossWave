import React from 'react'
import { motion } from 'framer-motion'

const HowItWorks = ({ isVisible }) => {
  const steps = [
    {
      number: "1",
      title: "Create Profile",
      description: "Set up your account and customize your preferences"
    },
    {
      number: "2",
      title: "Choose Role",
      description: "Select between buyer or seller interface"
    },
    {
      number: "3",
      title: "Handle Operations",
      description: "Manage payments and logistics seamlessly"
    },
    {
      number: "4",
      title: "Track Orders",
      description: "Monitor your transactions 24/7"
    }
  ]

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-block px-4 py-1 rounded-full bg-indigo-100 text-indigo-600 
              text-sm font-semibold mb-4"
          >
            <span className="relative">How It Works</span>
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
          >
            Start Trading in{" "}
            <motion.span 
              className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-600"
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              Four Simple Steps
            </motion.span>
          </motion.h2>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="relative"
            >
              {/* Connecting Lines */}
              {index < steps.length - 1 && (
                <motion.div
                  className="hidden lg:block absolute top-1/2 left-full w-full h-0.5 bg-gradient-to-r 
                    from-blue-500 to-indigo-500 transform -translate-y-1/2 z-0"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.3 }}
                />
              )}

              {/* Step Card */}
              <motion.div
                className="relative z-10 bg-white rounded-xl p-6 shadow-lg border border-gray-100
                  hover:shadow-xl transition-all duration-300"
                whileHover={{ y: -5, scale: 1.02 }}
              >
                {/* Step Number */}
                <motion.div
                  className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 
                    flex items-center justify-center text-white text-xl font-bold mb-4"
                  animate={{
                    scale: [1, 1.1, 1],
                    boxShadow: [
                      "0 0 0 0 rgba(59, 130, 246, 0.4)",
                      "0 0 0 10px rgba(59, 130, 246, 0)",
                      "0 0 0 0 rgba(59, 130, 246, 0)"
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {step.number}
                </motion.div>

                {/* Content */}
                <motion.h3
                  className="text-xl font-semibold mb-2 text-gray-900"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                >
                  {step.title}
                </motion.h3>

                <motion.p
                  className="text-gray-600"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                >
                  {step.description}
                </motion.p>

                {/* Decorative Elements */}
                <motion.div
                  className="absolute -right-2 -bottom-2 w-20 h-20 opacity-10"
                  animate={{
                    rotate: [0, 360],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{ duration: 8, repeat: Infinity }}
                >
                  <div className="w-full h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg" />
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HowItWorks 