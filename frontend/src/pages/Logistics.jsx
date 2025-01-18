import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FaTruck, 
  FaMapMarkerAlt, 
  FaSearch, 
  FaBox,
  FaClock,
  FaCheckCircle,
  FaExclamationTriangle,
  FaArrowRight,
  FaComments,
  FaFilter,
  FaInfoCircle,
  FaTimes
} from 'react-icons/fa'
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

// Custom marker icons
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
})

const Logistics = () => {
  const [selectedShipment, setSelectedShipment] = useState(null)
  const [activeFilter, setActiveFilter] = useState('all')
  const [showDetailedTimeline, setShowDetailedTimeline] = useState(false)
  const [selectedMarker, setSelectedMarker] = useState(null)

  // Sample shipment data
  const shipments = [
    {
      id: 'SHP001',
      orderId: 'ORD123',
      product: 'Premium Headphones',
      status: 'in_transit',
      eta: '2 days',
      progress: 65,
      origin: [40.7128, -74.0060], // New York
      destination: [34.0522, -118.2437], // Los Angeles
      currentLocation: [39.8283, -98.5795], // Somewhere in between
      timeline: [
        { status: 'Order Placed', time: '2024-02-18 10:00', completed: true },
        { status: 'Picked Up', time: '2024-02-19 14:30', completed: true },
        { status: 'In Transit', time: '2024-02-20 09:15', completed: true },
        { status: 'Out for Delivery', time: '2024-02-21', completed: false },
        { status: 'Delivered', time: '2024-02-21', completed: false }
      ]
    },
    // Add more shipments...
  ]

  // Custom truck icon for current location
  const truckIcon = new L.Icon({
    iconUrl: '/truck-icon.png', // Add this icon to your public folder
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -16]
  })

  // Function to draw route line
  const getRouteCoordinates = (shipment) => {
    return [
      shipment.origin,
      shipment.currentLocation,
      shipment.destination
    ]
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-blue-300 mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-purple-300 mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-20 relative z-10">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <FaTruck className="text-indigo-600" />
            Track Your Shipments
          </h1>
          <p className="text-gray-500 mt-1">Monitor your packages in real-time</p>
        </motion.div>

        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex-1 min-w-[300px]">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Enter tracking number or order ID..."
                  className="w-full pl-10 pr-4 py-2 bg-white/80 backdrop-blur-lg border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
                <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>
            </div>
            <div className="flex gap-2">
              {['all', 'in_transit', 'delivered', 'pending'].map((filter) => (
                <motion.button
                  key={filter}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-4 py-2 rounded-lg font-medium ${
                    activeFilter === filter
                      ? 'bg-indigo-600 text-white'
                      : 'bg-white/80 backdrop-blur-lg text-gray-600 hover:bg-indigo-50'
                  } transition-all duration-200`}
                >
                  {filter.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                </motion.button>
              ))}
            </div>
          </div>
        </div>

        {/* Shipments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
          {shipments.map((shipment) => (
            <motion.div
              key={shipment.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02, translateY: -5 }}
              className="bg-white/80 backdrop-blur-lg rounded-xl p-6 shadow-lg shadow-indigo-500/10 border border-white/50"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-medium text-gray-900">{shipment.product}</h3>
                  <p className="text-sm text-gray-500">Order #{shipment.orderId}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  shipment.status === 'in_transit'
                    ? 'bg-blue-100 text-blue-800'
                    : shipment.status === 'delivered'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {shipment.status.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                </span>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-500 mb-1">
                  <span>Progress</span>
                  <span>{shipment.progress}%</span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${shipment.progress}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="h-full bg-indigo-600 rounded-full"
                  />
                </div>
              </div>

              {/* Enhanced Timeline Preview with Animation */}
              <AnimatePresence>
                {showDetailedTimeline && selectedShipment?.id === shipment.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="mt-4 overflow-hidden"
                  >
                    <div className="space-y-4">
                      {shipment.timeline.map((event, index) => (
                        <motion.div
                          key={index}
                          initial={{ x: -20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-center gap-3"
                        >
                          <div className="relative">
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                              event.completed
                                ? 'bg-green-100 text-green-600'
                                : 'bg-gray-100 text-gray-400'
                            }`}>
                              {event.completed ? <FaCheckCircle /> : <FaClock />}
                            </div>
                            {index < shipment.timeline.length - 1 && (
                              <div className="absolute top-6 left-1/2 w-0.5 h-full bg-gray-200" />
                            )}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">{event.status}</p>
                            <p className="text-xs text-gray-500">{event.time}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Enhanced Action Buttons */}
              <div className="mt-6 flex flex-wrap justify-end gap-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setSelectedShipment(shipment)
                    setShowDetailedTimeline(!showDetailedTimeline)
                  }}
                  className="px-4 py-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors flex items-center gap-2"
                >
                  <FaClock className="w-4 h-4" />
                  {showDetailedTimeline && selectedShipment?.id === shipment.id ? 'Hide Timeline' : 'View Timeline'}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setSelectedShipment(shipment)
                    setSelectedMarker(shipment.currentLocation)
                  }}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2"
                >
                  <FaMapMarkerAlt className="w-4 h-4" />
                  Track Live
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Enhanced Map Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 backdrop-blur-lg rounded-xl shadow-lg shadow-indigo-500/10 border border-white/50 overflow-hidden"
        >
          <div className="h-[500px] md:h-[600px]">
            <MapContainer
              center={selectedMarker || [39.8283, -98.5795]}
              zoom={selectedMarker ? 6 : 4}
              style={{ height: '100%', width: '100%' }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              
              {selectedShipment && (
                <>
                  {/* Origin Marker */}
                  <Marker position={selectedShipment.origin}>
                    <Popup>Origin: New York</Popup>
                  </Marker>

                  {/* Destination Marker */}
                  <Marker position={selectedShipment.destination}>
                    <Popup>Destination: Los Angeles</Popup>
                  </Marker>

                  {/* Current Location Marker with Truck Icon */}
                  <Marker position={selectedShipment.currentLocation} icon={truckIcon}>
                    <Popup>
                      <div className="p-2">
                        <h3 className="font-medium">Current Location</h3>
                        <p className="text-sm text-gray-500">ETA: {selectedShipment.eta}</p>
                      </div>
                    </Popup>
                  </Marker>

                  {/* Route Line */}
                  <Polyline
                    positions={getRouteCoordinates(selectedShipment)}
                    color="#4F46E5"
                    weight={3}
                    opacity={0.6}
                    dashArray="10, 10"
                  />
                </>
              )}
            </MapContainer>
          </div>
        </motion.div>

        {/* Mobile Optimization - Bottom Sheet for Timeline on Mobile */}
        <AnimatePresence>
          {showDetailedTimeline && selectedShipment && (
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              className="fixed inset-x-0 bottom-0 bg-white rounded-t-2xl shadow-2xl p-6 z-50 md:hidden"
            >
              <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-4">Shipment Timeline</h3>
              {/* ... Timeline content ... */}
              <button
                onClick={() => setShowDetailedTimeline(false)}
                className="absolute top-4 right-4 text-gray-500"
              >
                <FaTimes />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default Logistics 