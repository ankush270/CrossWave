import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaSearch, FaFilter, FaSort, FaEye, FaDownload, FaPrint,
  FaShippingFast, FaBox, FaMoneyBillWave, FaExclamationTriangle,
  FaCheckCircle, FaTruck, FaClock
} from 'react-icons/fa';
import { useAuth } from '../../contexts/AuthContext';
import axios from 'axios';
import { productAPI } from '../../api/api';

const BuyerOrders = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [dateRange, setDateRange] = useState('all');
  const [productName, setProductName] = useState([])
  // for getting product details
  const getProductName = async (productId) => {
    console.log("Product ID:", productId);
    
    try {
      const response = await productAPI.getProductById(productId);
      console.log("API Response:", response);
      if(response.data.error)return "Demo"
      const productName = response?.data?.name || null;
      console.log("Returning Product Name:", productName);
      
      return productName; 
    } catch (e) {
      console.error("An error occurred while fetching:", e.message);
      return "Demo";
    }
  };

  const fetchProductNames = async (orders) => {
    if (!orders || orders.length === 0) return;
  
    try {
      const productIds = orders.map(order => order.product_id); // Extract product IDs
      const productNamesArray = await Promise.all(productIds.map(id => getProductName(id))); // Fetch all names in parallel
  
      console.log("Fetched Product Names:", productNamesArray);
      setProductName(productNamesArray); // Store product names in state
    } catch (error) {
      console.error("Error fetching product names:", error);
    }
  };
  
  
  //end.........
  // get order by buyer id and update order status
  const [selectedTab, setSelectedTab] = useState("all");
  const [buyerOrders, setBuyerOrders] = useState([]);

  const user = useAuth();

  console.log("buyer Id:", user.user.id);

  const buyerId = user.user.id;
  
  // Fetch Orders from Backend
  const fetchOrders = async () => {
    console.log("Fetching buyer orders...");
    try {
      const { data } = await axios.get(`http://localhost:3000/order/get-buyer-order/${buyerId}`);
  
      console.log("Buyer Orders:", data);
  
      if (data.success && Array.isArray(data.data)) {
        setBuyerOrders(data.data);
        fetchProductNames(data.data); // Fetch product names after setting orders
      } else {
        console.error("Unexpected API response:", data);
        setBuyerOrders([]);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      setBuyerOrders([]);
    }
  };
  
  useEffect(() => {
    fetchOrders();
  }, []);

  // Update Order Status
  const updateOrderStatus = async (orderId, newStatus) => {
    if (!newStatus) return;
    try {
      await axios.put(`http://localhost:3000/order/${orderId}`, { status: newStatus });
      fetchOrders(); // Refresh orders after update
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  //end ...................

  const countShippedOrders = (buyerOrders) => {
    if (!Array.isArray(buyerOrders)) {
      throw new Error("Invalid input: buyerOrders should be an array");
    }
  
    return buyerOrders.filter(order => order.status === "SHIPPED").length;
  };
  const countPendingOrders = (buyerOrders) => {
    if (!Array.isArray(buyerOrders)) {
      throw new Error("Invalid input: buyerOrders should be an array");
    }
  
    return buyerOrders.filter(order => order.status === "PENDING").length;
  };
  const totalValue = (buyerOrders) => {
    if (!Array.isArray(buyerOrders)) {
      throw new Error("Invalid input: buyerOrders should be an array");
    }
    let total = 0;
    for(let i of buyerOrders){
       total += i.price;
    }
    return total;
  }
  
  const stats = [
    {
      title: 'Total Orders',
      value: buyerOrders.length,
      icon: <FaBox />,
      color: 'blue',
      change: '+12%'
    },
    {
      title: 'In Transit',
      value: countShippedOrders(buyerOrders),
      icon: <FaTruck />,
      color: 'green',
      change: '+5%'
    },
    {
      title: 'Pending',
      value: countPendingOrders(buyerOrders),
      icon: <FaClock />,
      color: 'yellow',
      change: '-2%'
    },
    {
      title: 'Total Value',
      value: `₹${totalValue(buyerOrders)}`,
      icon: <FaMoneyBillWave />,
      color: 'purple',
      change: '+18%'
    }
  ];

  const orders = [
    {
      id: 'ORD001',
      date: '2024-02-20',
      product: 'Semiconductor Chips - X86',
      supplier: 'Tech Components Ltd',
      quantity: '1000 units',
      amount: '₹85,000',
      status: 'Processing',
      tracking: 'TRK123456',
      eta: '2024-03-01'
    },
    {
      id: 'ORD002',
      date: '2024-02-18',
      product: 'LED Display Modules',
      supplier: 'Display Solutions Inc',
      quantity: '500 units',
      amount: '₹1,20,000',
      status: 'Shipped',
      tracking: 'TRK789012',
      eta: '2024-02-25'
    },
    // Add more orders...
  ];

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'processing': return 'bg-yellow-100 text-yellow-600';
      case 'shipped': return 'bg-blue-100 text-blue-600';
      case 'delivered': return 'bg-green-100 text-green-600';
      case 'cancelled': return 'bg-red-100 text-red-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{stat.title}</p>
                <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
                <span className={`text-sm ${
                  stat.change.startsWith('+') ? 'text-green-500' : 'text-red-500'
                }`}>
                  {stat.change} from last month
                </span>
              </div>
              <div className={`p-3 bg-${stat.color}-50 rounded-lg`}>
                <span className={`text-${stat.color}-500 text-xl`}>
                  {stat.icon}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex flex-wrap gap-4 justify-between items-center">
          <div className="flex-1 min-w-[300px]">
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search orders by ID, product, or supplier..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="flex gap-4">
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Time</option>
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="quarter">This Quarter</option>
            </select>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Status</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg flex items-center gap-2"
            >
              <FaDownload />
              Export
            </motion.button>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-3 px-4">Order ID</th>
                <th className="text-left py-3 px-4">Date</th>
                <th className="text-left py-3 px-4">Product</th>
             
                <th className="text-left py-3 px-4">Quantity</th>
                <th className="text-left py-3 px-4">Amount</th>
                <th className="text-left py-3 px-4">Status</th>
                <th className="text-left py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {buyerOrders.map((order,index) => (
                <motion.tr
                  key={order.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  whileHover={{ backgroundColor: 'rgba(59, 130, 246, 0.05)' }}
                  className="border-t border-gray-100"
                >
                  <td className="py-3 px-4 font-medium">{order.id}</td>
                  <td className="py-3 px-4">{new Date(order.created_at).toISOString().split("T")[0]}</td>

                  <td className="py-3 px-4">{productName[index]}</td>
                 
                  <td className="py-3 px-4">{order.quantity}</td>
                  <td className="py-3 px-4">{order.price}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                      <button
                        onClick={async () => {
                          await updateOrderStatus(order.id, "DELIVERED");
                          order.status = "DELIVERED"; // Update UI optimistically
                        }}
                        disabled={order.status === "DELIVERED"}
                        className={`p-2 text-white rounded ${
                          order.status === "DELIVERED" ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-700"
                        }`}
                      >
                        {order.status === "DELIVERED" ? "Delivered" : "Mark as Delivered"}
                      </button>
                    </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Details Modal */}
      {showOrderDetails && selectedOrder && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center"
          onClick={() => setShowOrderDetails(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-xl p-6 max-w-2xl w-full mx-4 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold">Order Details</h3>
                  <p className="text-sm text-gray-500">Order ID: {selectedOrder.id}</p>
                </div>
                <button
                  onClick={() => setShowOrderDetails(false)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  ×
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Product</p>
                  <p className="font-medium">{selectedOrder.product}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Supplier</p>
                  <p className="font-medium">{selectedOrder.supplier}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Quantity</p>
                  <p className="font-medium">{selectedOrder.quantity}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Amount</p>
                  <p className="font-medium">{selectedOrder.amount}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(selectedOrder.status)}`}>
                    {selectedOrder.status}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-gray-500">ETA</p>
                  <p className="font-medium">{selectedOrder.eta}</p>
                </div>
              </div>

              {selectedOrder.tracking && (
                <div className="mt-4">
                  <p className="text-sm text-gray-500">Tracking Number</p>
                  <p className="font-medium">{selectedOrder.tracking}</p>
                </div>
              )}

              <div className="flex justify-end gap-4 mt-6">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg"
                >
                  Download Invoice
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                >
                  Track Shipment
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default BuyerOrders; 