import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FaSearch, FaQuestionCircle, FaBook, FaHeadset,
  FaChevronDown, FaChevronUp, FaStar, FaPhone,
  FaEnvelope, FaComments, FaPlayCircle, FaTimes,
  FaSmile, FaMeh, FaFrown
} from 'react-icons/fa'

// Dummy data for FAQs
const faqData = {
  buyer: [
    {
      id: 1,
      question: "How do I track my order?",
      answer: "You can track your order by going to 'My Orders' in your dashboard and clicking on the specific order. You'll see real-time updates on your order status."
    },
    // Add more buyer FAQs...
  ],
  seller: [
    {
      id: 1,
      question: "How do I list a new product?",
      answer: "To list a new product, go to your Seller Dashboard, click on 'Products', then 'Add New Product'. Fill in the required details and click 'Publish'."
    },
    // Add more seller FAQs...
  ],
  general: [
    {
      id: 1,
      question: "How do I reset my password?",
      answer: "Click on 'Forgot Password' on the login page, enter your email address, and follow the instructions sent to your email to reset your password."
    },
    // Add more general FAQs...
  ]
}

// Dummy data for guides
const guidesData = [
  {
    id: 1,
    title: "Getting Started Guide",
    description: "Learn the basics of using our platform",
    type: "video",
    duration: "5 min",
    category: "beginner"
  },
  // Add more guides...
]

const HelpCenter = () => {
  // State management
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTab, setActiveTab] = useState('buyer')
  const [expandedFaq, setExpandedFaq] = useState(null)
  const [showChat, setShowChat] = useState(false)
  const [feedbackRating, setFeedbackRating] = useState(0)
  const [hoveredStar, setHoveredStar] = useState(0)

  // Search suggestions as user types
  const getSearchSuggestions = (query) => {
    // Implement search logic here
    return []
  }

  // Hero Section with Search
  const HeroSection = () => (
    <div className="relative bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl font-bold mb-4">How can we help you today?</h1>
        <p className="text-xl mb-8">Search our help center or browse categories below</p>
        
        {/* Search Bar */}
        <div className="relative max-w-2xl mx-auto">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for help..."
            className="w-full px-6 py-4 rounded-full text-gray-900 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <FaSearch className="absolute right-6 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        </div>

        {/* Quick Links */}
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          {['Getting Started', 'Payments', 'Account', 'Products'].map((topic) => (
            <motion.button
              key={topic}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
            >
              {topic}
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  )

  // FAQ Section
  const FaqSection = () => (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 className="text-2xl font-bold mb-8">Frequently Asked Questions</h2>
      
      {/* FAQ Tabs */}
      <div className="flex space-x-4 mb-6">
        {['buyer', 'seller', 'general'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg font-medium ${
              activeTab === tab
                ? 'bg-blue-100 text-blue-700'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)} FAQs
          </button>
        ))}
      </div>

      {/* FAQ Accordions */}
      <div className="space-y-4">
        {faqData[activeTab].map((faq) => (
          <motion.div
            key={faq.id}
            initial={false}
            className="border rounded-lg overflow-hidden"
          >
            <button
              onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
              className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50"
            >
              <span className="font-medium">{faq.question}</span>
              {expandedFaq === faq.id ? (
                <FaChevronUp className="w-4 h-4 text-gray-400" />
              ) : (
                <FaChevronDown className="w-4 h-4 text-gray-400" />
              )}
            </button>
            <AnimatePresence>
              {expandedFaq === faq.id && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: 'auto' }}
                  exit={{ height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="px-6 py-4 bg-gray-50">
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  )

  // Contact Section
  const ContactSection = () => (
    <div className="bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold mb-8">Contact Support</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Live Chat */}
          <div className="bg-white rounded-xl p-6 text-center">
            <FaComments className="w-8 h-8 text-blue-500 mx-auto mb-4" />
            <h3 className="font-medium mb-2">Live Chat</h3>
            <p className="text-sm text-gray-500 mb-4">Get instant help from our team</p>
            <button
              onClick={() => setShowChat(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Start Chat
            </button>
          </div>

          {/* Email Support */}
          <div className="bg-white rounded-xl p-6 text-center">
            <FaEnvelope className="w-8 h-8 text-blue-500 mx-auto mb-4" />
            <h3 className="font-medium mb-2">Email Support</h3>
            <p className="text-sm text-gray-500 mb-4">We'll respond within 24 hours</p>
            <a
              href="mailto:support@example.com"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 inline-block"
            >
              Send Email
            </a>
          </div>

          {/* Phone Support */}
          <div className="bg-white rounded-xl p-6 text-center">
            <FaPhone className="w-8 h-8 text-blue-500 mx-auto mb-4" />
            <h3 className="font-medium mb-2">Phone Support</h3>
            <p className="text-sm text-gray-500 mb-4">Available 9 AM - 5 PM EST</p>
            <a
              href="tel:+1234567890"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 inline-block"
            >
              Call Us
            </a>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-white">
      <HeroSection />
      <FaqSection />
      <ContactSection />
      
      {/* Live Chat Widget */}
      <AnimatePresence>
        {showChat && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-4 right-4 w-96 h-[500px] bg-white rounded-xl shadow-lg overflow-hidden"
          >
            {/* Chat UI here */}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default HelpCenter 