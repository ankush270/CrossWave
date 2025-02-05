import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { FaSearch, FaFilter, FaSort, FaTruck, FaBox, FaClock } from "react-icons/fa";
import { useAuth } from "../../contexts/AuthContext";

const SellerOrders = () => {
  const [selectedTab, setSelectedTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [orders, setOrders] = useState([]);
 
  const user = useAuth();

  // console.log("current user:", user.user.id);

  const sellerId = user.user.id;

  // Fetch Orders from Backend
  const fetchOrders = async () => {
    try {
      const { data } = await axios.get(`http://localhost:3000/order/${sellerId}`);

      if (data.success && Array.isArray(data.data)) {
        setOrders(data.data);
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

  // Order Tabs for Filtering
  const orderTabs = [
    { id: "all", label: "All Orders" },
    { id: "PANDING", label: "Pending" },
    { id: "PROCESSING", label: "Processing" },
    { id: "SHIPPED", label: "Shipped" },
    { id: "DELIVERED", label: "Delivered" },
  ];

  // Get Status Icon
  const getStatusIcon = (status) => {
    const icons = {
      pending: <FaClock />,
      processing: <FaBox />,
      shipped: <FaTruck />,
    };
    return icons[status] || <FaClock />;
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <h1 className="text-2xl font-bold">Orders Management</h1>

      {/* Search and Filter Bar */}
      <div className="flex gap-4">
        <div className="relative">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search orders..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 border rounded-lg"
          />
        </div>
      </div>

      {/* Order Tabs */}
      <div className="flex gap-2">
        {orderTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedTab(tab.id)}
            className={`px-4 py-2 rounded-lg ${
              selectedTab === tab.id ? "bg-blue-500 text-white" : "bg-gray-100"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {orders
          .filter((order) => selectedTab === "all" || order.status === selectedTab)
          .map((order) => (
            <div key={order.id} className="p-4 border rounded-lg">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">{order.id}</h3>
                  <p className="text-gray-600">{order.customer}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1 bg-gray-200 px-3 py-1 rounded-full">
                    {getStatusIcon(order.status)} {order.status.toUpperCase()}
                  </span>

                  {/* Order Status Dropdown */}
                  {(order.status === "PENDING" || order.status === "PROCESSING") && (
                    <select
                      className="border px-3 py-1 rounded-lg"
                      onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                    >
                      <option value="">Update Status</option>
                      {order.status === "PENDING" && <option value="PROCESSING">Processing</option>}
                      {order.status === "PROCESSING" && <option value="SHIPPED">Shipped</option>}
                    </select>
                  )}
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default SellerOrders;
