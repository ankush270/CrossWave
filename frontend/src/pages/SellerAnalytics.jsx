import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FaChartLine, FaDownload, FaCalendarAlt, FaGlobe, 
  FaFilter, FaInfoCircle, FaBoxes, FaShoppingCart,
  FaUsers, FaChartPie, FaWarehouse, FaBell, FaRobot,
  FaCog, FaSearch, FaArrowUp, FaArrowDown
} from 'react-icons/fa'
import Charts from './components/Charts'

// Dummy data
const salesData = [
  { date: '2024-01', electronics: 25000, fashion: 18000, home: 12000 },
  { date: '2024-02', electronics: 28000, fashion: 20000, home: 15000 },
  // ... more data
]

const topProducts = [
  { name: 'Wireless Earbuds', revenue: 45000, category: 'electronics', growth: 15 },
  { name: 'Smart Watch', revenue: 38000, category: 'electronics', growth: 8 },
  { name: 'Designer Bag', revenue: 32000, category: 'fashion', growth: -5 },
  // ... more products
]

const regionData = [
  { region: 'Asia', revenue: 150000, inquiries: 500, orders: 200 },
  { region: 'Europe', revenue: 120000, inquiries: 400, orders: 150 },
  // ... more regions
]

// Filter Components
const DateRangeSelector = () => (
  <div className="relative">
    <select 
      className="pl-10 pr-4 py-2 bg-white rounded-lg border border-gray-200 focus:ring-2 focus:ring-green-500"
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

const CategorySelector = () => (
  <div className="relative">
    <select 
      className="pl-10 pr-4 py-2 bg-white rounded-lg border border-gray-200 focus:ring-2 focus:ring-green-500"
      defaultValue="all"
    >
      <option value="all">All Categories</option>
      <option value="electronics">Electronics</option>
      <option value="fashion">Fashion</option>
      <option value="home">Home & Living</option>
    </select>
    <FaBoxes className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
  </div>
)

const RegionSelector = () => (
  <div className="relative">
    <select 
      className="pl-10 pr-4 py-2 bg-white rounded-lg border border-gray-200 focus:ring-2 focus:ring-green-500"
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

const SellerAnalytics = () => {
  const [dateRange, setDateRange] = useState('7d')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedRegion, setSelectedRegion] = useState('all')
  const [showCustomize, setShowCustomize] = useState(false)

  // Widget visibility state
  const [visibleWidgets, setVisibleWidgets] = useState({
    salesTrends: true,
    topProducts: true,
    buyerActivity: true,
    revenueFunnel: true,
    regionalSales: true,
    inventory: true,
    aiInsights: true
  })

  // Sales Trends Widget
  const SalesTrendsWidget = () => (
    <motion.div
      layout
      className="bg-white rounded-xl shadow-lg p-6"
    >
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Sales Performance</h3>
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
        <Charts.SalesTrends data={salesData} />
      </div>
      <div className="mt-4 p-4 bg-green-50 rounded-lg">
        <p className="text-sm text-green-800">
          <FaInfoCircle className="inline mr-2" />
          Sales in Asia have increased by 15% this quarter. Consider expanding inventory for this region.
        </p>
      </div>
    </motion.div>
  )

  // Top Products Widget
  const TopProductsWidget = () => (
    <motion.div
      layout
      className="bg-white rounded-xl shadow-lg p-6"
    >
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Top-Selling Products</h3>
        <button className="p-2 hover:bg-gray-100 rounded-lg">
          <FaFilter className="text-gray-500" />
        </button>
      </div>
      <div className="space-y-4">
        {topProducts.map((product) => (
          <div 
            key={product.name}
            className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-900">{product.name}</h4>
                <p className="text-sm text-gray-500">{product.category}</p>
              </div>
              <div className="text-right">
                <p className="font-medium text-gray-900">${product.revenue.toLocaleString()}</p>
                <p className={`text-sm flex items-center gap-1 ${
                  product.growth > 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {product.growth > 0 ? <FaArrowUp /> : <FaArrowDown />}
                  {Math.abs(product.growth)}%
                </p>
              </div>
            </div>
          </div>
        ))}
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
              <FaChartLine className="text-green-600" />
              Seller Insights & Analytics
            </h1>
            <p className="text-gray-500 mt-1">Track and optimize your sales performance</p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <DateRangeSelector />
            <CategorySelector />
            <RegionSelector />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {/* Handle export */}}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2"
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
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {visibleWidgets.salesTrends && <SalesTrendsWidget />}
          {visibleWidgets.topProducts && <TopProductsWidget />}
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

export default SellerAnalytics 