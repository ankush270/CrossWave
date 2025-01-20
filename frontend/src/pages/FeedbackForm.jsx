import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FaStar } from 'react-icons/fa'

const FeedbackForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    feedbackType: '',
    rating: 0,
    comments: '',
    contactMe: false
  })

  const [hoveredStar, setHoveredStar] = useState(0)

  const feedbackTypes = [
    { id: 'general', label: 'General Experience' },
    { id: 'products', label: 'Product Listings' },
    { id: 'payment', label: 'Payment Process' },
    { id: 'interface', label: 'User Interface' },
    { id: 'support', label: 'Customer Support' },
    { id: 'other', label: 'Other' }
  ]

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Feedback submitted:', formData)
    // Add your submission logic here
  }

  const StarRating = () => (
    <div className="flex gap-2">
      {[1, 2, 3, 4, 5].map((star) => (
        <motion.button
          key={star}
          type="button"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setFormData({ ...formData, rating: star })}
          onMouseEnter={() => setHoveredStar(star)}
          onMouseLeave={() => setHoveredStar(0)}
          className="focus:outline-none"
        >
          <FaStar
            className={`w-8 h-8 ${
              star <= (hoveredStar || formData.rating)
                ? 'text-yellow-400'
                : 'text-gray-300'
            }`}
          />
        </motion.button>
      ))}
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900">We Value Your Feedback</h1>
          <p className="mt-2 text-lg text-gray-600">Help us improve your Buyer experience!</p>
        </div>

        {/* Illustration */}
        <div className="flex justify-center mb-12">
          <img 
            src="/feedback-illustration.svg" 
            alt="Feedback"
            className="w-64 h-64"
          />
        </div>

        {/* Feedback Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg p-6 md:p-8"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name & Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            {/* Feedback Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                What would you like to give feedback about?
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {feedbackTypes.map((type) => (
                  <motion.button
                    key={type.id}
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setFormData({ ...formData, feedbackType: type.id })}
                    className={`p-3 rounded-lg text-sm font-medium text-center transition-colors
                      ${formData.feedbackType === type.id
                        ? 'bg-blue-100 text-blue-700 border-2 border-blue-500'
                        : 'bg-gray-50 text-gray-700 border-2 border-transparent hover:bg-gray-100'
                      }`}
                  >
                    {type.label}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Rating */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                How would you rate your experience?
              </label>
              <StarRating />
            </div>

            {/* Comments */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tell us more about your experience
              </label>
              <textarea
                value={formData.comments}
                onChange={(e) => setFormData({ ...formData, comments: e.target.value })}
                rows={4}
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Share your thoughts and suggestions..."
              />
            </div>

            {/* Contact Checkbox */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="contactMe"
                checked={formData.contactMe}
                onChange={(e) => setFormData({ ...formData, contactMe: e.target.checked })}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="contactMe" className="ml-2 block text-sm text-gray-700">
                I'd like to be contacted about my feedback
              </label>
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-sm"
            >
              Submit Feedback
            </motion.button>
          </form>
        </motion.div>

        {/* Popular Suggestions */}
        <div className="mt-12">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Popular Suggestions</h2>
          <div className="space-y-4">
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Add dark mode support</h3>
                  <p className="text-sm text-gray-500">It would be great to have a dark mode option for better visibility at night.</p>
                </div>
                <span className="text-sm font-medium text-gray-500">24 votes</span>
              </div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Improve search filters</h3>
                  <p className="text-sm text-gray-500">More detailed search filters would help find products faster.</p>
                </div>
                <span className="text-sm font-medium text-gray-500">16 votes</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FeedbackForm 