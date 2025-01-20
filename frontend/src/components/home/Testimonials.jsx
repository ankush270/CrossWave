import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FaStar, FaQuoteLeft, FaArrowRight } from 'react-icons/fa'

const Testimonials = ({ testimonials }) => {
  return (
    <section id="testimonials" className="py-20 bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
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
            Client Success Stories
          </motion.span>
          
          <motion.h2 
            className="text-3xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            What Our Users Say
          </motion.h2>

          {/* Rating */}
          <motion.div 
            className="inline-flex items-center bg-white rounded-full px-4 py-2 shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            whileHover={{ scale: 1.05 }}
          >
            <motion.div 
              className="flex text-yellow-400"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, rotate: -30 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <FaStar className="w-4 h-4" />
                </motion.div>
              ))}
            </motion.div>
            <span className="ml-2 text-sm text-gray-600">4.9/5 from 2500+ reviews</span>
          </motion.div>
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{
                y: -10,
                scale: 1.02,
                transition: { duration: 0.2 }
              }}
              className="bg-white rounded-lg p-6 shadow-md hover:shadow-xl transition-all relative"
            >
              {/* Quote Icon */}
              <motion.div 
                className="mb-4"
                initial={{ opacity: 0, rotate: -30 }}
                whileInView={{ opacity: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <FaQuoteLeft className="w-5 h-5 text-blue-500" />
              </motion.div>

              <motion.p 
                className="text-gray-600 text-sm mb-4"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              >
                "{testimonial.quote}"
              </motion.p>

              {/* User Info */}
              <motion.div 
                className="flex items-center"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              >
                <motion.img 
                  src={testimonial.image} 
                  alt={testimonial.name}
                  className="w-10 h-10 rounded-full object-cover"
                  whileHover={{ scale: 1.1 }}
                />
                <div className="ml-3">
                  <h4 className="font-medium text-gray-900">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
                <motion.img 
                  src={testimonial.companyLogo}
                  alt="Company"
                  className="h-6 ml-auto"
                  initial={{ opacity: 0.5 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div 
          className="text-center mt-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Link
            to="/testimonials"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 group"
          >
            <span className="group-hover:underline">View More Success Stories</span>
            <motion.div
              className="ml-2"
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <FaArrowRight className="w-4 h-4" />
            </motion.div>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  }
}

export default Testimonials 