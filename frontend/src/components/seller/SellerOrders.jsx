import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { FaSearch,FaBox, FaTruck, FaRegClock, FaRegCheckCircle } from "react-icons/fa";
import { useAuth } from "../../contexts/AuthContext";
import { productAPI } from '../../api/api';

const SellerOrders = () => {
  const [selectedTab, setSelectedTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [orders, setOrders] = useState([]);
  const [productNames, setProductNames] = useState([]);
  
  // for getting product details
  const getProductName = async (productId) => {
    console.log("Product ID:", productId);
    
    try {
      const response = await productAPI.getProductById(productId);
      console.log("API Response:", response?.data.images[0]);
      if(response.data.error) return "Demo";
      const productName = response?.data?.name || "Demo";
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
      const productIds = orders.map(order => order.product_id);
      const productNamesArray = await Promise.all(productIds.map(id => getProductName(id)));
      
      console.log("Fetched Product Names:", productNamesArray);
      setProductNames(productNamesArray);
      
    } catch (error) {
      console.error("Error fetching product names:", error);
    }
  };

  const user = useAuth();
  const sellerId = user.user.id;

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get(`http://localhost:3000/order/${sellerId}`);
      if (data.success && Array.isArray(data.data)) {
        setOrders(data.data);
        fetchProductNames(data.data);
      } else {
        console.error("Unexpected API response:", data);
        setOrders([]);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      setOrders([]);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateOrderStatus = async (orderId, currentStatus) => {
    const statusFlow = {
      PENDING: "PROCESSING",
      PROCESSING: "SHIPPED",
    };

    const newStatus = statusFlow[currentStatus] || currentStatus;
    if (currentStatus === "SHIPPED") return;

    try {
      await axios.put(`http://localhost:3000/order/${orderId}`, { status: newStatus });
      fetchOrders();
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  const orderTabs = [
    { id: "all", label: "All Orders" },
    { id: "PENDING", label: "Pending" },
    { id: "PROCESSING", label: "Processing" },
    { id: "SHIPPED", label: "Shipped" },
    { id: "DELIVERED", label: "Delivered" },
  ];

  const getStatusIcon = (status) => {
    const icons = {
      PENDING: <FaRegClock className="text-yellow-500" />,
      PROCESSING: <FaRegClock className="text-orange-500" />,
      SHIPPED: <FaTruck className="text-blue-500" />,
      DELIVERED: <FaRegCheckCircle className="text-green-500" />,
    };
    return icons[status] || <FaRegClock className="text-gray-500" />;
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <motion.h1
        className="text-3xl font-bold text-gray-800"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Orders Management
      </motion.h1>

      <motion.div
        className="flex gap-4 items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="relative w-full">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search orders..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 w-full border rounded-lg focus:ring-2 focus:ring-blue-400"
          />
        </div>
      </motion.div>

      <motion.div className="flex gap-2 overflow-x-auto">
        {orderTabs.map((tab) => (
          <motion.button
            key={tab.id}
            onClick={() => setSelectedTab(tab.id)}
            className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
              selectedTab === tab.id
                ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {tab.label}
          </motion.button>
        ))}
      </motion.div>

      <motion.div
  className="space-y-6"
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ delay: 0.4 }}
>
  {orders
    .filter((order) => selectedTab === "all" || order.status === selectedTab)
    .map((order, index) => (
      <motion.div
        key={order.id}
        className="p-6 border rounded-xl bg-white shadow-lg hover:shadow-2xl transition-all"
        whileHover={{ scale: 1.03 }}
      >
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-xl text-gray-800">Order #{order.id}</h3>
            <p className="text-gray-600 text-sm">Customer: {order.customer}</p>
            <div className="flex items-center mt-2 space-x-3">
              {getStatusIcon(order.status)}
              <p className={`text-sm font-semibold ${order.status === "SHIPPED" ? "text-blue-600" : "text-gray-600"}`}>
                {order.status.toUpperCase()}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {(order.status === "PENDING" || order.status === "PROCESSING") && (
              <motion.button
                className="px-5 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                onClick={() => updateOrderStatus(order.id, order.status)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Change Status
              </motion.button>
            )}
          </div>
        </div>

        <div className="flex gap-4 items-center mt-4">
          <div className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center">
            <FaBox className="text-4xl text-gray-500" />
          </div>

          <div className="flex flex-col space-y-2">
            <p className="text-gray-800 font-medium">Product: {productNames[index] || "Loading..."}</p>
            <p className="text-gray-700">Price: <span className="font-semibold">${order.price}</span></p>
            <p className="text-gray-700">Quantity: {order.quantity}</p>
          </div>
        </div>
      </motion.div>
    ))}
</motion.div>

    </div>
  );
};

export default SellerOrders;
