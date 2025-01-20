import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FaTruck, FaWarehouse, FaSearch, FaPlus, FaFilter,
  FaBoxOpen, FaShippingFast, FaMapMarkerAlt, FaChartLine,
  FaFileInvoice, FaPrint, FaBell, FaExclamationTriangle,
  FaCheckCircle, FaClock, FaDownload, FaComments,
  FaMedal, FaTrophy, FaChartBar, FaGlobe, FaTimes
} from 'react-icons/fa'
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  Line,
  ZoomableGroup
} from "react-simple-maps"
import { LineChart, Line as RechartsLine, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

// Lazy load recharts components
const Charts = React.lazy(() => import('./components/Charts'))

// Dummy data for performance metrics
const performanceData = [
  { month: 'Jan', onTime: 95, delayed: 5, revenue: 15000 },
  { month: 'Feb', onTime: 92, delayed: 8, revenue: 17000 },
  { month: 'Mar', onTime: 97, delayed: 3, revenue: 19000 },
  { month: 'Apr', onTime: 94, delayed: 6, revenue: 16000 },
  { month: 'May', onTime: 96, delayed: 4, revenue: 21000 },
  { month: 'Jun', onTime: 98, delayed: 2, revenue: 23000 }
]

// Dummy shipment data
const shipments = [
  {
    id: 'SHP001',
    buyerName: 'John Doe',
    orderId: 'ORD123',
    status: 'in_transit',
    eta: '2 days',
    products: [
      { name: 'Premium Headphones', quantity: 2, image: 'headphones.jpg' }
    ],
    location: 'Chicago Hub',
    dispatchDate: '2024-02-18',
    deliveryDate: '2024-02-21',
    value: 1299.99,
    carrier: 'Express Logistics',
    coordinates: [-87.6298, 41.8781]
  },
  // Add more shipments...
]

const SellerLogistics = () => {
  const [selectedView, setSelectedView] = useState('grid')
  const [selectedShipment, setSelectedShipment] = useState(null)
  const [activeFilter, setActiveFilter] = useState('all')
  const [showAnalytics, setShowAnalytics] = useState(false)
  const [selectedShipments, setSelectedShipments] = useState([])
  const [showNewShipmentModal, setShowNewShipmentModal] = useState(false)

  // Performance Metrics Component
  const PerformanceMetrics = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <MetricCard
        title="On-Time Delivery"
        value="96%"
        trend="+2.5%"
        icon={FaTruck}
        color="green"
      />
      <MetricCard
        title="Active Shipments"
        value="124"
        trend="+15"
        icon={FaShippingFast}
        color="blue"
      />
      <MetricCard
        title="Monthly Revenue"
        value="$23,450"
        trend="+8.3%"
        icon={FaChartLine}
        color="purple"
      />
    </div>
  )

  // Metric Card Component
  const MetricCard = ({ title, value, trend, icon: Icon, color }) => (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white/80 backdrop-blur-lg rounded-xl p-6 shadow-lg"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-gray-500 text-sm">{title}</p>
          <h3 className="text-2xl font-bold mt-1">{value}</h3>
          <span className={`text-sm ${trend.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
            {trend}
          </span>
        </div>
        <div className={`p-3 rounded-lg bg-${color}-100`}>
          <Icon className={`w-6 h-6 text-${color}-600`} />
        </div>
      </div>
    </motion.div>
  )

  // Shipment Card Component
  const ShipmentCard = ({ shipment, isSelected }) => (
    <motion.div
      layout
      whileHover={{ scale: 1.02 }}
      className={`bg-white/80 backdrop-blur-lg rounded-xl p-6 shadow-lg border-2 
        ${isSelected ? 'border-indigo-500' : 'border-transparent'}`}
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-medium text-gray-900">{shipment.buyerName}</h3>
          <p className="text-sm text-gray-500">Order #{shipment.orderId}</p>
        </div>
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => handleShipmentSelection(shipment.id)}
          className="w-5 h-5 text-indigo-600 rounded border-gray-300"
        />
      </div>

      {/* Shipment Status */}
      <div className="flex items-center gap-2 mb-4">
        <StatusBadge status={shipment.status} />
        <span className="text-sm text-gray-500">ETA: {shipment.eta}</span>
      </div>

      {/* Products */}
      <div className="border-t border-gray-100 pt-4">
        <h4 className="text-sm font-medium text-gray-700 mb-2">Products</h4>
        {shipment.products.map((product, index) => (
          <div key={index} className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-100 rounded-lg" />
            <div>
              <p className="text-sm font-medium">{product.name}</p>
              <p className="text-xs text-gray-500">Qty: {product.quantity}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-2 mt-4">
        <ActionButton
          icon={FaDownload}
          label="Documents"
          onClick={() => handleDownloadDocuments(shipment.id)}
        />
        <ActionButton
          icon={FaMapMarkerAlt}
          label="Track"
          primary
          onClick={() => setSelectedShipment(shipment)}
        />
      </div>
    </motion.div>
  )

  // Status Badge Component
  const StatusBadge = ({ status }) => {
    const statusConfig = {
      in_transit: { color: 'blue', icon: FaTruck },
      delivered: { color: 'green', icon: FaCheckCircle },
      pending: { color: 'yellow', icon: FaClock },
      delayed: { color: 'red', icon: FaExclamationTriangle }
    }

    const config = statusConfig[status]
    return (
      <span className={`px-3 py-1 rounded-full text-sm font-medium inline-flex items-center gap-1
        bg-${config.color}-100 text-${config.color}-800`}>
        <config.icon className="w-4 h-4" />
        {status.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
      </span>
    )
  }

  // Action Button Component
  const ActionButton = ({ icon: Icon, label, primary, onClick }) => (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 ${
        primary
          ? 'bg-indigo-600 text-white hover:bg-indigo-700'
          : 'text-indigo-600 hover:bg-indigo-50'
      }`}
    >
      <Icon className="w-4 h-4" />
      {label}
    </motion.button>
  )

  // Bulk Actions Component
  const BulkActions = () => (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-white rounded-lg shadow-lg p-4 flex items-center gap-4">
      <span className="text-sm font-medium">{selectedShipments.length} selected</span>
      <div className="flex gap-2">
        <ActionButton icon={FaFileInvoice} label="Generate Invoice" />
        <ActionButton icon={FaPrint} label="Print Labels" />
        <ActionButton icon={FaTruck} label="Update Status" primary />
      </div>
    </div>
  )

  // Performance Chart Component
  const PerformanceChart = ({ data }) => (
    <React.Suspense fallback={
      <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
        <div className="text-center">
          <FaChartLine className="w-8 h-8 text-gray-400 mx-auto mb-2" />
          <p className="text-gray-500">Loading chart...</p>
        </div>
      </div>
    }>
      <Charts data={data} />
    </React.Suspense>
  )

  // Analytics Modal Component
  const AnalyticsModal = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="bg-white rounded-xl p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Shipment Analytics</h2>
          <button onClick={() => setShowAnalytics(false)}>
            <FaTimes className="text-gray-500" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Delivery Performance Chart */}
          <div className="bg-white rounded-lg p-4 shadow-lg">
            <h3 className="text-sm font-medium text-gray-700 mb-4">Delivery Performance</h3>
            <PerformanceChart data={performanceData} />
          </div>

          {/* Revenue Chart */}
          <div className="bg-white rounded-lg p-4 shadow-lg">
            <h3 className="text-sm font-medium text-gray-700 mb-4">Revenue Trend</h3>
            <PerformanceChart data={performanceData} />
          </div>

          {/* Additional Analytics */}
          <div className="bg-white rounded-lg p-4 shadow-lg">
            <h3 className="text-sm font-medium text-gray-700 mb-4">Regional Distribution</h3>
            {/* Add regional distribution chart here */}
          </div>

          {/* Carrier Performance */}
          <div className="bg-white rounded-lg p-4 shadow-lg">
            <h3 className="text-sm font-medium text-gray-700 mb-4">Carrier Performance</h3>
            {/* Add carrier performance metrics here */}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      {/* Header */}
      <header className="sticky top-0 bg-white/80 backdrop-blur-lg shadow-sm z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <FaWarehouse className="text-indigo-600" />
                Shipment Management
              </h1>
              <p className="text-gray-500 mt-1">Manage and track all your shipments</p>
            </div>
            <div className="flex items-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowNewShipmentModal(true)}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center gap-2"
              >
                <FaPlus className="w-4 h-4" />
                New Shipment
              </motion.button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <PerformanceMetrics />

        {/* Filters and Search */}
        <div className="mb-8">
          {/* ... Add your filter and search components ... */}
        </div>

        {/* Shipments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {shipments.map((shipment) => (
            <ShipmentCard
              key={shipment.id}
              shipment={shipment}
              isSelected={selectedShipments.includes(shipment.id)}
            />
          ))}
        </div>

        {/* Bulk Actions */}
        {selectedShipments.length > 0 && <BulkActions />}
      </main>

      {/* Modals */}
      <AnimatePresence>
        {/* Add your modals here */}
      </AnimatePresence>
    </div>
  )
}

export default SellerLogistics 