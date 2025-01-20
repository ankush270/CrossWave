import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence, useAnimation } from 'framer-motion'
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
  FaTimes,
  FaMapPin,
  FaBoxOpen,
  FaClipboardList,
  FaBell,
  FaTemperatureHigh,
  FaCalendarAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaCamera,
  FaBarcode,
  FaQrcode,
  FaChartBar,
  FaChartPie,
  FaChartLine,
  FaCommentDots,
  FaRobot,
  FaPaperPlane,
  FaImage,
  FaFileAlt,
  FaPlus,
  FaMinus,
  FaExpand
} from 'react-icons/fa'
import { 
  ComposableMap, 
  Geographies, 
  Geography, 
  Line, 
  Marker, 
  ZoomableGroup 
} from "react-simple-maps"

const DUMMY_ROUTE_DATA = {
  origin: {
    name: "New York Warehouse",
    coordinates: [-74.006, 40.7128],
    address: "123 Shipping Ave, NY",
    timestamp: "2024-02-18 08:00",
    status: "completed",
    weather: "Cloudy, 18°C",
    details: "Package picked up"
  },
  stops: [
    {
      name: "Chicago Hub",
      coordinates: [-87.6298, 41.8781],
      address: "456 Transit Blvd, IL",
      timestamp: "2024-02-19 15:30",
      status: "current",
      weather: "Rainy, 15°C",
      details: "Package in transit",
      estimatedDelay: "30 mins"
    },
    {
      name: "Denver Distribution",
      coordinates: [-104.9903, 39.7392],
      address: "789 Logistics Way, CO",
      timestamp: "Est. 2024-02-20 12:00",
      status: "pending",
      weather: "Sunny, 20°C",
      details: "Scheduled stop"
    }
  ],
  destination: {
    name: "Los Angeles Center",
    coordinates: [-118.2437, 34.0522],
    address: "321 Delivery Road, CA",
    timestamp: "Est. 2024-02-21 14:00",
    status: "pending",
    weather: "Sunny, 25°C",
    details: "Final destination"
  }
}

const Logistics = () => {
  const [selectedShipment, setSelectedShipment] = useState(null)
  const [activeFilter, setActiveFilter] = useState('all')
  const [showDetailedTimeline, setShowDetailedTimeline] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [notifications, setNotifications] = useState([])
  const [showNotificationPanel, setShowNotificationPanel] = useState(false)
  const [view, setView] = useState('grid') // 'grid' or 'list'
  const [showScanner, setShowScanner] = useState(false)
  const [showChat, setShowChat] = useState(false)
  const [showAnalytics, setShowAnalytics] = useState(false)
  const [messages, setMessages] = useState([
    { id: 1, type: 'bot', text: 'Hello! How can I help you today?', time: '12:00 PM' }
  ])
  const [isTyping, setIsTyping] = useState(false)
  const controls = useAnimation()

  const geoUrl = "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json"

  // Mock notifications
  useEffect(() => {
    setNotifications([
      {
        id: 1,
        type: 'delay',
        message: 'Shipment SHP001 is experiencing slight delay',
        time: '5 mins ago',
        read: false
      },
      {
        id: 2,
        type: 'update',
        message: 'Package has reached Chicago facility',
        time: '1 hour ago',
        read: false
      }
    ])
  }, [])

  // Enhanced shipment data with more details
  const shipments = [
    {
      id: 'SHP001',
      orderId: 'ORD123',
      product: 'Premium Headphones',
      status: 'in_transit',
      eta: '2 days',
      progress: 65,
      priority: 'high',
      temperature: '20°C',
      humidity: '45%',
      carrier: 'Express Logistics',
      weight: '0.5 kg',
      route: [
        { name: 'New York', status: 'completed', time: '2024-02-18 10:00' },
        { name: 'Chicago', status: 'current', time: '2024-02-19 15:30' },
        { name: 'Denver', status: 'pending', time: 'Est. 2024-02-20' },
        { name: 'Los Angeles', status: 'pending', time: 'Est. 2024-02-21' }
      ],
      timeline: [
        { status: 'Order Placed', time: '2024-02-18 10:00', completed: true, icon: FaClipboardList },
        { status: 'Package Received', time: '2024-02-18 14:30', completed: true, icon: FaBoxOpen },
        { status: 'In Transit', time: '2024-02-19 09:15', completed: true, icon: FaTruck },
        { status: 'Out for Delivery', time: '2024-02-21', completed: false, icon: FaMapMarkerAlt },
        { status: 'Delivered', time: '2024-02-21', completed: false, icon: FaCheckCircle }
      ]
    }
    // Add more shipments as needed
  ]

  // Polymorphic Card Component
  const ShipmentCard = ({ shipment, isExpanded }) => {
    const cardVariants = {
      collapsed: { height: 'auto' },
      expanded: { height: 'auto' }
    }

    return (
      <motion.div
        layout
        variants={cardVariants}
        initial="collapsed"
        animate={isExpanded ? "expanded" : "collapsed"}
        className={`bg-white/80 backdrop-blur-lg rounded-xl p-6 shadow-lg shadow-indigo-500/10 border border-white/50 
          ${isExpanded ? 'col-span-2 row-span-2' : ''}`}
      >
        <motion.div layout="position" className="flex justify-between items-start mb-4">
          <div>
            <motion.h3 layout="position" className="font-medium text-gray-900">
              {shipment.product}
            </motion.h3>
            <motion.div layout="position" className="flex items-center gap-2 mt-1">
              <span className="text-sm text-gray-500">Order #{shipment.orderId}</span>
              <span className={`px-2 py-0.5 rounded-full text-xs font-medium 
                ${shipment.priority === 'high' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'}`}>
                {shipment.priority} priority
              </span>
            </motion.div>
          </div>
          <ShipmentStatus status={shipment.status} />
        </motion.div>

        {/* Enhanced Progress Indicator */}
        <motion.div layout="position" className="mb-4">
          <div className="flex justify-between text-sm text-gray-500 mb-1">
            <span>Delivery Progress</span>
            <span>{shipment.progress}%</span>
          </div>
          <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${shipment.progress}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
            />
          </div>
        </motion.div>

        {/* Shipment Details */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-4"
            >
              {/* Shipping Information */}
              <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                <InfoItem icon={FaTruck} label="Carrier" value={shipment.carrier} />
                <InfoItem icon={FaBox} label="Weight" value={shipment.weight} />
                <InfoItem icon={FaTemperatureHigh} label="Temperature" value={shipment.temperature} />
                <InfoItem icon={FaInfoCircle} label="Humidity" value={shipment.humidity} />
              </div>

              {/* Live Updates */}
              <div className="border-t pt-4">
                <h4 className="font-medium text-gray-900 mb-2">Live Updates</h4>
                <div className="space-y-2">
                  {shipment.route.map((stop, index) => (
                    <motion.div
                      key={stop.name}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-3 text-sm"
                    >
                      <StatusDot status={stop.status} />
                      <span className="font-medium">{stop.name}</span>
                      <span className="text-gray-500">{stop.time}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Action Buttons */}
        <motion.div layout="position" className="mt-6 flex justify-end gap-3">
          <ActionButton
            icon={FaBell}
            label="Notifications"
            onClick={() => setShowNotification(true)}
          />
          <ActionButton
            icon={FaMapMarkerAlt}
            label="Track Live"
            primary
            onClick={() => setSelectedShipment(shipment)}
          />
        </motion.div>
      </motion.div>
    )
  }

  // Utility Components
  const ShipmentStatus = ({ status }) => (
    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
      status === 'in_transit'
        ? 'bg-blue-100 text-blue-800'
        : status === 'delivered'
        ? 'bg-green-100 text-green-800'
        : 'bg-yellow-100 text-yellow-800'
    }`}>
      {status.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
    </span>
  )

  const InfoItem = ({ icon: Icon, label, value }) => (
    <div className="flex items-center gap-2">
      <Icon className="text-gray-400" />
      <div>
        <p className="text-xs text-gray-500">{label}</p>
        <p className="font-medium text-gray-900">{value}</p>
      </div>
    </div>
  )

  const StatusDot = ({ status }) => (
    <div className={`w-3 h-3 rounded-full ${
      status === 'completed' ? 'bg-green-500' :
      status === 'current' ? 'bg-blue-500 animate-pulse' :
      'bg-gray-300'
    }`} />
  )

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

  // Notification Panel Component
  const NotificationPanel = () => (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      className="fixed right-0 top-0 h-full w-80 bg-white shadow-2xl z-50 overflow-y-auto"
    >
      <div className="p-4 border-b sticky top-0 bg-white z-10">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Notifications</h3>
          <button onClick={() => setShowNotificationPanel(false)}>
            <FaTimes className="text-gray-500" />
          </button>
        </div>
      </div>
      <div className="p-4 space-y-4">
        {notifications.map((notification) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-4 rounded-lg ${
              notification.type === 'delay' ? 'bg-red-50' : 'bg-blue-50'
            } ${!notification.read ? 'border-l-4 border-indigo-500' : ''}`}
          >
            <div className="flex items-start gap-3">
              <div className={`p-2 rounded-full ${
                notification.type === 'delay' ? 'bg-red-100' : 'bg-blue-100'
              }`}>
                {notification.type === 'delay' ? 
                  <FaExclamationTriangle className="text-red-500" /> : 
                  <FaInfoCircle className="text-blue-500" />
                }
              </div>
              <div>
                <p className="text-sm font-medium">{notification.message}</p>
                <span className="text-xs text-gray-500">{notification.time}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )

  // Scanner Modal Component
  const ScannerModal = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        className="bg-white rounded-lg p-6 max-w-md w-full mx-4"
      >
        <div className="text-center">
          <div className="relative w-64 h-64 mx-auto mb-4 border-2 border-dashed border-gray-300 rounded-lg">
            <div className="absolute inset-0 flex items-center justify-center">
              <FaCamera className="w-8 h-8 text-gray-400" />
            </div>
            <motion.div
              animate={{ y: [-100, 100], opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute left-0 right-0 h-0.5 bg-red-500"
            />
          </div>
          <p className="text-gray-600 mb-4">Scan QR code or barcode to track shipment</p>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => setShowScanner(false)}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
            >
              Cancel
            </button>
            <button
              onClick={() => setShowScanner(false)}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              Enter Manually
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )

  // Live Chat Component
  const LiveChatPanel = () => (
    <motion.div
      initial={{ x: '100%', opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: '100%', opacity: 0 }}
      className="fixed right-0 bottom-0 w-96 h-[600px] bg-white shadow-2xl rounded-tl-2xl z-50 flex flex-col"
    >
      {/* Chat Header */}
      <div className="p-4 border-b bg-indigo-600 text-white rounded-tl-2xl">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <FaRobot className="w-6 h-6" />
            <div>
              <h3 className="font-semibold">Shipping Assistant</h3>
              <span className="text-xs text-indigo-200">Online</span>
            </div>
          </div>
          <button onClick={() => setShowChat(false)}>
            <FaTimes className="hover:text-indigo-200" />
          </button>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[80%] p-3 rounded-lg ${
              message.type === 'user' 
                ? 'bg-indigo-600 text-white rounded-br-none'
                : 'bg-gray-100 text-gray-800 rounded-bl-none'
            }`}>
              <p className="text-sm">{message.text}</p>
              <span className="text-xs opacity-70 mt-1 block">{message.time}</span>
            </div>
          </motion.div>
        ))}
        {isTyping && (
          <div className="flex gap-2 text-gray-400">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 0.6 }}
              className="w-2 h-2 bg-current rounded-full"
            />
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }}
              className="w-2 h-2 bg-current rounded-full"
            />
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }}
              className="w-2 h-2 bg-current rounded-full"
            />
          </div>
        )}
      </div>

      {/* Chat Input */}
      <div className="p-4 border-t">
        <div className="flex gap-2">
          <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg">
            <FaImage className="w-5 h-5" />
          </button>
          <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg">
            <FaFileAlt className="w-5 h-5" />
          </button>
          <input
            type="text"
            placeholder="Type your message..."
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button className="p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
            <FaPaperPlane className="w-5 h-5" />
          </button>
        </div>
      </div>
    </motion.div>
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
          {/* Add your analytics charts and metrics here */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-sm font-medium text-gray-700 mb-4">Delivery Performance</h3>
            {/* Add chart component here */}
          </div>
          {/* Add more analytics sections */}
        </div>
      </motion.div>
    </motion.div>
  )

  // Enhanced Quick Actions
  const QuickActions = () => (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      {[
        { icon: FaBarcode, label: 'Scan Package', action: () => setShowScanner(true) },
        { icon: FaBell, label: 'Notifications', action: () => setShowNotificationPanel(true) },
        { icon: FaCommentDots, label: 'Live Support', action: () => setShowChat(true) },
        { icon: FaChartBar, label: 'Analytics', action: () => setShowAnalytics(true) }
      ].map((action, index) => (
        <motion.button
          key={index}
          whileHover={{ scale: 1.05, y: -5 }}
          whileTap={{ scale: 0.95 }}
          onClick={action.action}
          className="p-6 bg-white/80 backdrop-blur-lg rounded-xl shadow-sm hover:shadow-md transition-all"
        >
          <motion.div
            whileHover={{ rotate: 15 }}
            className="w-12 h-12 mx-auto mb-3 bg-indigo-50 rounded-xl flex items-center justify-center"
          >
            <action.icon className="w-6 h-6 text-indigo-600" />
          </motion.div>
          <span className="text-sm font-medium text-gray-700">{action.label}</span>
        </motion.button>
      ))}
    </div>
  )

  const ShipmentMap = ({ shipment }) => {
    const [selectedLocation, setSelectedLocation] = useState(null)
    const [zoom, setZoom] = useState(4)
    const [center, setCenter] = useState([-95, 40])

    // Combine all locations for the route
    const allLocations = [
      DUMMY_ROUTE_DATA.origin,
      ...DUMMY_ROUTE_DATA.stops,
      DUMMY_ROUTE_DATA.destination
    ]

    // Generate route segments
    const routeSegments = allLocations.slice(0, -1).map((location, index) => ({
      from: location.coordinates,
      to: allLocations[index + 1].coordinates,
      status: location.status
    }))

    const handleLocationClick = (location) => {
      setSelectedLocation(location)
      setCenter(location.coordinates)
      setZoom(6)
    }

    const LocationMarker = ({ location, type }) => (
      <Marker coordinates={location.coordinates}>
        <motion.g
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.2 }}
          onClick={() => handleLocationClick(location)}
          style={{ cursor: 'pointer' }}
        >
          {location.status === "current" ? (
            <>
              <circle r={8} fill="#4F46E5" />
              <motion.circle
                r={12}
                fill="#4F46E5"
                opacity={0.3}
                animate={{ 
                  r: [12, 20, 12],
                  opacity: [0.3, 0, 0.3]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity
                }}
              />
              <circle r={4} fill="white" />
              {/* Animated truck icon */}
              <motion.path
                d="M10 15v-4h4v4h-4zm-6 0v-4h4v4H4zm12 0h4v-4h-4v4z"
                fill="white"
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity }}
              />
            </>
          ) : (
            <>
              <circle
                r={6}
                fill={type === "origin" ? "#10B981" : type === "destination" ? "#EC4899" : "#6366F1"}
              />
              <circle r={4} fill="white" />
            </>
          )}
        </motion.g>
        <motion.text
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          textAnchor="middle"
          y={20}
          style={{
            fontFamily: "system-ui",
            fontSize: "12px",
            fill: "#4B5563",
            fontWeight: "500"
          }}
        >
          {location.name}
        </motion.text>
      </Marker>
    )

    return (
      <div className="relative h-[500px] w-full">
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{
            scale: 800 * (zoom / 4),
            center: center
          }}
          className="bg-gray-50 rounded-lg"
        >
          <ZoomableGroup
            zoom={zoom}
            center={center}
            onMoveEnd={({ coordinates, zoom }) => {
              setCenter(coordinates)
              setZoom(zoom)
            }}
          >
            {/* Enhanced Geography styling */}
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map((geo) => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill="#E5E7EB"
                    stroke="#D1D5DB"
                    strokeWidth={0.5}
                    style={{
                      default: { outline: 'none' },
                      hover: { fill: "#F3F4F6", outline: 'none' },
                      pressed: { outline: 'none' }
                    }}
                  />
                ))
              }
            </Geographies>

            {/* Animated route lines */}
            {routeSegments.map((segment, index) => (
              <motion.g key={index}>
                <Line
                  from={segment.from}
                  to={segment.to}
                  stroke={segment.status === "completed" ? "#10B981" : "#6366F1"}
                  strokeWidth={2}
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.5, delay: index * 0.5 }}
                />
                <Line
                  from={segment.from}
                  to={segment.to}
                  stroke={segment.status === "completed" ? "#10B981" : "#6366F1"}
                  strokeWidth={4}
                  strokeLinecap="round"
                  strokeOpacity={0.2}
                />
              </motion.g>
            ))}

            {/* Location markers */}
            <LocationMarker location={DUMMY_ROUTE_DATA.origin} type="origin" />
            {DUMMY_ROUTE_DATA.stops.map((stop, index) => (
              <LocationMarker key={index} location={stop} type="stop" />
            ))}
            <LocationMarker location={DUMMY_ROUTE_DATA.destination} type="destination" />
          </ZoomableGroup>
        </ComposableMap>

        {/* Location details panel */}
        <AnimatePresence>
          {selectedLocation && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-lg max-w-xs"
            >
              <h4 className="font-semibold text-gray-900">{selectedLocation.name}</h4>
              <p className="text-sm text-gray-500">{selectedLocation.address}</p>
              <div className="mt-2 space-y-1 text-sm">
                <p className="text-gray-600">{selectedLocation.timestamp}</p>
                <p className="text-gray-600">{selectedLocation.weather}</p>
                <p className="text-gray-600">{selectedLocation.details}</p>
                {selectedLocation.estimatedDelay && (
                  <p className="text-amber-600">Delay: {selectedLocation.estimatedDelay}</p>
                )}
              </div>
              <button
                onClick={() => setSelectedLocation(null)}
                className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
              >
                <FaTimes />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Map controls */}
        <div className="absolute bottom-4 right-4 flex gap-2">
          <button
            onClick={() => setZoom(zoom * 1.2)}
            className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-50"
          >
            <FaPlus className="w-4 h-4 text-gray-600" />
          </button>
          <button
            onClick={() => setZoom(zoom / 1.2)}
            className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-50"
          >
            <FaMinus className="w-4 h-4 text-gray-600" />
          </button>
          <button
            onClick={() => {
              setZoom(4)
              setCenter([-95, 40])
            }}
            className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-50"
          >
            <FaExpand className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      </div>
    )
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

        {/* Enhanced Search and Filters */}
        <div className="sticky top-0 z-20 bg-white/80 backdrop-blur-lg shadow-sm">
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

        {/* Shipments Grid with Polymorphic Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 auto-rows-min">
          {shipments.map((shipment) => (
            <ShipmentCard
              key={shipment.id}
              shipment={shipment}
              isExpanded={selectedShipment?.id === shipment.id}
            />
          ))}
        </div>

        {/* Tracking Visualization Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 backdrop-blur-lg rounded-xl shadow-lg shadow-indigo-500/10 border border-white/50 overflow-hidden"
        >
          {selectedShipment ? (
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Live Tracking</h3>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                    <span className="text-sm text-gray-600">Origin</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-indigo-500" />
                    <span className="text-sm text-gray-600">Current</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-pink-500" />
                    <span className="text-sm text-gray-600">Destination</span>
                  </div>
                </div>
              </div>
              <ShipmentMap shipment={selectedShipment} />
              <div className="mt-6">
                <h4 className="font-medium text-gray-900 mb-4">Shipment Route</h4>
                <div className="space-y-4">
                  {selectedShipment.route.map((stop, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <StatusDot status={stop.status} />
                      <div>
                        <p className="font-medium text-gray-900">{stop.name}</p>
                        <p className="text-sm text-gray-500">{stop.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="h-[400px] flex items-center justify-center bg-gray-50">
              <div className="text-center">
                <FaMapMarkerAlt className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Select a shipment to view tracking details</p>
              </div>
            </div>
          )}
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

      {/* Modals and Panels */}
      <AnimatePresence>
        {showNotificationPanel && <NotificationPanel />}
        {showScanner && <ScannerModal />}
        {showChat && <LiveChatPanel />}
        {showAnalytics && <AnalyticsModal />}
        {/* ... your existing mobile timeline sheet ... */}
      </AnimatePresence>
    </div>
  )
}

export default Logistics 