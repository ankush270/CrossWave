import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FaChartLine, FaDownload, FaCalendarAlt, FaGlobe, 
  FaFilter, FaInfoCircle, FaExchangeAlt, FaBoxes,
  FaTruck, FaMoneyBillWave, FaSearch, FaCog
} from 'react-icons/fa'
import Charts from './components/Charts'

// Dummy data
const spendingData = [
  { date: '2024-01', logistics: 5000, customs: 2000, products: 15000, currency: 1000 },
  { date: '2024-02', logistics: 5500, customs: 2200, products: 16000, currency: 1100 },
  // ... more data
]

const supplierData = [
  { name: 'Supplier A', spend: 25000, region: 'Asia' },
  { name: 'Supplier B', spend: 18000, region: 'Europe' },
  // ... more data
]

const recommendations = [
  {
    id: 1,
    title: 'Consolidate Shipments',
    description: 'Switch to consolidated shipments to save $200/month',
    savings: 200,
    category: 'logistics'
  },
  // ... more recommendations
]

// Filter Components
const DateRangeSelector = () => (
  <div className="relative">
    <select 
      className="pl-10 pr-4 py-2 bg-white rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500"
      defaultValue="7d"
    >
      <option value="7d">Last 7 Days</option>
      <option value="1m">Last Month</option>
      <option value="3m">Last Quarter</option>
      <option value="custom">Custom Range</option>
    </select>
    <FaCalendarAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
  </div>
)

const CategoryFilter = () => (
  <div className="relative">
    <select 
      className="pl-10 pr-4 py-2 bg-white rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500"
      defaultValue="all"
    >
      <option value="all">All Categories</option>
      <option value="logistics">Logistics</option>
      <option value="customs">Customs</option>
      <option value="products">Products</option>
    </select>
    <FaFilter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
  </div>
)

const RegionSelector = () => (
  <div className="relative">
    <select 
      className="pl-10 pr-4 py-2 bg-white rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500"
      defaultValue="all"
    >
      <option value="all">All Regions</option>
      <option value="asia">Asia</option>
      <option value="europe">Europe</option>
      <option value="americas">Americas</option>
    </select>
    <FaGlobe className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
  </div>
)

// Customize Dashboard Modal
const CustomizeDashboardModal = ({ visible, onUpdate, onClose }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
  >
    <motion.div
      initial={{ scale: 0.9, y: 20 }}
      animate={{ scale: 1, y: 0 }}
      className="bg-white rounded-xl p-6 max-w-md w-full mx-4"
    >
      <h2 className="text-xl font-semibold mb-4">Customize Dashboard</h2>
      <div className="space-y-4">
        {Object.entries(visible).map(([key, value]) => (
          <label key={key} className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={value}
              onChange={(e) => onUpdate({ ...visible, [key]: e.target.checked })}
              className="w-4 h-4 text-blue-600 rounded"
            />
            <span className="text-gray-700">
              {key.split(/(?=[A-Z])/).join(' ')}
            </span>
          </label>
        ))}
      </div>
      <div className="mt-6 flex justify-end">
        <button
          onClick={onClose}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Done
        </button>
      </div>
    </motion.div>
  </motion.div>
)

const BuyerAnalytics = () => {
  const [dateRange, setDateRange] = useState('7d')
  const [selectedCategories, setSelectedCategories] = useState(['all'])
  const [selectedRegion, setSelectedRegion] = useState('all')
  const [showCustomize, setShowCustomize] = useState(false)

  // Widget visibility state
  const [visibleWidgets, setVisibleWidgets] = useState({
    spendingTrends: true,
    costBreakdown: true,
    supplierComparison: true,
    recommendations: true,
    regionHeatmap: true,
    recentTransactions: true
  })

  // Spending Trends Chart
  const SpendingTrendsWidget = () => (
    <motion.div
      layout
      className="bg-white rounded-xl shadow-lg p-6"
    >
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Spending Trends</h3>
        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <FaFilter className="text-gray-500" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <FaDownload className="text-gray-500" />
          </button>
        </div>
      </div>
      <div className="h-64">
        <Charts.SpendingTrends data={spendingData} />
      </div>
      <div className="mt-4 p-4 bg-blue-50 rounded-lg">
        <p className="text-sm text-blue-800">
          <FaInfoCircle className="inline mr-2" />
          Logistics costs have increased by 12% this month. Consider comparing providers for better rates.
        </p>
      </div>
    </motion.div>
  )

  // Cost Breakdown Widget
  const CostBreakdownWidget = () => (
    <motion.div
      layout
      className="bg-white rounded-xl shadow-lg p-6"
    >
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Cost Breakdown</h3>
        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <FaFilter className="text-gray-500" />
          </button>
        </div>
      </div>
      <div className="h-64">
        <Charts.CostBreakdown data={spendingData} />
      </div>
      <div className="mt-4 p-4 bg-green-50 rounded-lg">
        <p className="text-sm text-green-800">
          <FaInfoCircle className="inline mr-2" />
          Currency conversion accounts for 18% of your spending. Try locking exchange rates to save more.
        </p>
      </div>
    </motion.div>
  )

  // Header Section
  const Header = () => (
    <div className="sticky top-0 bg-white/80 backdrop-blur-lg shadow-sm z-30 mb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <FaChartLine className="text-blue-600" />
              Buyer Insights & Analytics
            </h1>
            <p className="text-gray-500 mt-1">Track and optimize your spending</p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <DateRangeSelector />
            <CategoryFilter />
            <RegionSelector />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {/* Handle export */}}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
            >
              <FaDownload className="w-4 h-4" />
              Export Report
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {visibleWidgets.spendingTrends && <SpendingTrendsWidget />}
          {visibleWidgets.costBreakdown && <CostBreakdownWidget />}
          {/* Add other widgets */}
        </div>
      </main>

      {/* Customize Dashboard Modal */}
      <AnimatePresence>
        {showCustomize && (
          <CustomizeDashboardModal 
            visible={visibleWidgets}
            onUpdate={setVisibleWidgets}
            onClose={() => setShowCustomize(false)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

export default BuyerAnalytics 