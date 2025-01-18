import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaWallet,
  FaSearch,
  FaFileInvoiceDollar,
  FaHistory,
  FaUndo,
  FaCreditCard,
  FaUniversity,
  FaChartPie,
  FaChartLine,
  FaDownload,
  FaQuestionCircle,
  FaComments,
  FaBell,
  FaExclamationCircle,
  FaCheckCircle,
  FaClock,
  FaFilter,
  FaSort,
  FaTimes,
  FaPaypal,
  FaApplePay,
  FaGooglePay,
  FaCalendarAlt,
  FaInfoCircle,
  FaPrint,
  FaShareAlt,
  FaTag,
  FaPercent,
  FaUserCircle,
  FaUser,
  FaExclamationTriangle,
  FaEnvelope,
  FaPhone,
  FaShoppingCart,
  FaTruck,
  FaMoneyBillWave,
  FaReceipt,
  FaChevronRight
} from 'react-icons/fa';
import { Line, Pie, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement
);

const BuyerPayments = () => {
  const [activeTab, setActiveTab] = useState('pending');
  const [searchQuery, setSearchQuery] = useState('');
  const [showMakePayment, setShowMakePayment] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [selectedTimeFilter, setSelectedTimeFilter] = useState('all');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState('all');
  const [showSupport, setShowSupport] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [showWallet, setShowWallet] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [paymentStep, setPaymentStep] = useState(1);
  const [paymentNote, setPaymentNote] = useState('');
  const [showDispute, setShowDispute] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'warning',
      message: 'Payment due in 2 days for Order #12345',
      timestamp: new Date(),
      read: false
    },
    {
      id: 2,
      type: 'success',
      message: 'Payment successful for Order #12346',
      timestamp: new Date(Date.now() - 3600000),
      read: false
    }
  ]);

  // Sample data for payments
  const payments = [
    {
      id: 1,
      sellerId: 'SELL123',
      sellerName: 'Tech Store Inc.',
      amount: 1099.99,
      status: 'pending',
      dueDate: '2024-03-20',
      currency: 'USD',
      items: ['iPhone 14 Pro Max'],
      fees: {
        platform: 10.99,
        processing: 5.99
      }
    },
    {
      id: 2,
      sellerId: 'SELL456',
      sellerName: 'Electronics Hub',
      amount: 2499.99,
      status: 'completed',
      paymentDate: '2024-03-15',
      currency: 'USD',
      items: ['MacBook Pro M2'],
      fees: {
        platform: 24.99,
        processing: 12.99
      }
    }
  ];

  // Analytics data
  const analyticsData = {
    monthlySpending: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [{
        label: 'Monthly Spending',
        data: [1200, 1900, 1500, 2200, 1800, 2400],
        borderColor: '#3B82F6',
        tension: 0.4
      }]
    },
    spendingByCategory: {
      labels: ['Electronics', 'Accessories', 'Services'],
      datasets: [{
        data: [65, 25, 10],
        backgroundColor: ['#3B82F6', '#10B981', '#F59E0B']
      }]
    }
  };

  // Wallet data
  const walletData = {
    balance: 2500.00,
    currency: 'USD',
    recentTransactions: [
      { id: 1, type: 'deposit', amount: 1000, date: '2024-03-18', status: 'completed' },
      { id: 2, type: 'payment', amount: -299.99, date: '2024-03-17', status: 'completed' },
      { id: 3, type: 'refund', amount: 150, date: '2024-03-16', status: 'pending' }
    ],
    cards: [
      { id: 1, type: 'visa', last4: '4242', expiry: '12/25' },
      { id: 2, type: 'mastercard', last4: '8888', expiry: '09/24' }
    ]
  };

  // Enhanced analytics data
  const enhancedAnalytics = {
    ...analyticsData,
    paymentMethods: {
      labels: ['Credit Card', 'Bank Transfer', 'Wallet', 'PayPal'],
      datasets: [{
        data: [45, 25, 20, 10],
        backgroundColor: ['#3B82F6', '#10B981', '#F59E0B', '#6366F1']
      }]
    },
    dailyTransactions: {
      labels: [...Array(7)].map((_, i) => {
        const d = new Date();
        d.setDate(d.getDate() - i);
        return d.toLocaleDateString('en-US', { weekday: 'short' });
      }).reverse(),
      datasets: [{
        label: 'Transactions',
        data: [8, 12, 5, 15, 10, 7, 11],
        backgroundColor: '#3B82F6'
      }]
    }
  };

  // Payment methods with more options
  const paymentMethods = [
    { id: 'card', icon: FaCreditCard, name: 'Credit Card', fees: '2.9% + $0.30' },
    { id: 'bank', icon: FaUniversity, name: 'Bank Transfer', fees: '1.5% (ACH)' },
    { id: 'wallet', icon: FaWallet, name: 'Wallet Balance', fees: '0%' },
    { id: 'paypal', icon: FaPaypal, name: 'PayPal', fees: '3.9% + $0.30' },
    { id: 'applepay', icon: FaApplePay, name: 'Apple Pay', fees: '2.9%' },
    { id: 'googlepay', icon: FaGooglePay, name: 'Google Pay', fees: '2.9%' }
  ];

  // Currency options
  const currencies = [
    { code: 'USD', symbol: '$', name: 'US Dollar' },
    { code: 'EUR', symbol: '€', name: 'Euro' },
    { code: 'GBP', symbol: '£', name: 'British Pound' },
    { code: 'JPY', symbol: '¥', name: 'Japanese Yen' }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  // Tab content components
  const PendingPaymentsTab = () => (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-4"
    >
      {payments
        .filter(p => p.status === 'pending')
        .map(payment => (
          <motion.div
            key={payment.id}
            variants={itemVariants}
            className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-lg">{payment.sellerName}</h3>
                <p className="text-sm text-gray-500">ID: {payment.sellerId}</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold">${payment.amount}</p>
                <p className="text-sm text-orange-500">Due: {payment.dueDate}</p>
              </div>
            </div>
            
            <div className="mt-4 flex items-center gap-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setSelectedPayment(payment);
                  setShowMakePayment(true);
                }}
                className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
              >
                <FaCreditCard /> Pay Now
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <FaComments />
              </motion.button>
            </div>
          </motion.div>
        ))}
    </motion.div>
  );

  const CompletedPaymentsTab = () => (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-4"
    >
      {payments
        .filter(p => p.status === 'completed')
        .map(payment => (
          <motion.div
            key={payment.id}
            variants={itemVariants}
            className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-lg">{payment.sellerName}</h3>
                <p className="text-sm text-gray-500">ID: {payment.sellerId}</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold">${payment.amount}</p>
                <p className="text-sm text-green-500">Paid: {payment.paymentDate}</p>
              </div>
            </div>
            
            <div className="mt-4 flex items-center gap-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
              >
                <FaDownload /> Download Receipt
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-4 py-2 border border-orange-500 text-orange-500 rounded-lg hover:bg-orange-50 transition-colors flex items-center gap-2"
              >
                <FaUndo /> Request Refund
              </motion.button>
            </div>
          </motion.div>
        ))}
    </motion.div>
  );

  // Wallet Component
  const WalletSection = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-lg p-6"
    >
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold">Wallet Balance</h3>
        <div className="flex items-center gap-2">
          <select
            value={selectedCurrency}
            onChange={(e) => setSelectedCurrency(e.target.value)}
            className="px-2 py-1 border rounded-lg text-sm"
          >
            {currencies.map(curr => (
              <option key={curr.code} value={curr.code}>
                {curr.code}
              </option>
            ))}
          </select>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm"
          >
            Add Money
          </motion.button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-6 text-white">
          <p className="text-sm opacity-80">Available Balance</p>
          <h4 className="text-3xl font-bold mt-2">${walletData.balance.toFixed(2)}</h4>
          <div className="mt-4 flex items-center gap-2">
            <FaTag className="opacity-60" />
            <span className="text-sm">No fees on wallet payments</span>
          </div>
        </div>

        <div className="bg-white border rounded-lg p-6">
          <h4 className="text-sm text-gray-500 mb-4">Linked Cards</h4>
          {walletData.cards.map(card => (
            <div key={card.id} className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-gray-100 rounded">
                <FaCreditCard className="text-gray-600" />
              </div>
              <div>
                <p className="text-sm font-medium">•••• {card.last4}</p>
                <p className="text-xs text-gray-500">Expires {card.expiry}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white border rounded-lg p-6">
          <h4 className="text-sm text-gray-500 mb-4">Quick Actions</h4>
          <div className="grid grid-cols-2 gap-3">
            <button className="p-3 border rounded-lg text-sm hover:bg-gray-50 transition-colors">
              <FaDownload className="mx-auto mb-2" />
              Withdraw
            </button>
            <button className="p-3 border rounded-lg text-sm hover:bg-gray-50 transition-colors">
              <FaShareAlt className="mx-auto mb-2" />
              Transfer
            </button>
            <button className="p-3 border rounded-lg text-sm hover:bg-gray-50 transition-colors">
              <FaPrint className="mx-auto mb-2" />
              Statement
            </button>
            <button className="p-3 border rounded-lg text-sm hover:bg-gray-50 transition-colors">
              <FaPercent className="mx-auto mb-2" />
              Limits
            </button>
          </div>
        </div>
      </div>

      <div className="border-t pt-6">
        <h4 className="font-medium mb-4">Recent Transactions</h4>
        <div className="space-y-3">
          {walletData.recentTransactions.map(tx => (
            <div key={tx.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded ${
                  tx.type === 'deposit' ? 'bg-green-100 text-green-600' :
                  tx.type === 'payment' ? 'bg-blue-100 text-blue-600' :
                  'bg-orange-100 text-orange-600'
                }`}>
                  {tx.type === 'deposit' ? <FaDownload /> :
                   tx.type === 'payment' ? <FaCreditCard /> :
                   <FaUndo />}
                </div>
                <div>
                  <p className="font-medium capitalize">{tx.type}</p>
                  <p className="text-sm text-gray-500">{tx.date}</p>
                </div>
              </div>
              <div className="text-right">
                <p className={`font-medium ${tx.amount > 0 ? 'text-green-600' : 'text-gray-900'}`}>
                  {tx.amount > 0 ? '+' : ''}{tx.amount.toFixed(2)} {walletData.currency}
                </p>
                <p className={`text-xs ${
                  tx.status === 'completed' ? 'text-green-600' : 'text-orange-500'
                }`}>
                  {tx.status}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );

  // Support Chat Component
  const SupportChat = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="fixed bottom-20 right-6 w-96 bg-white rounded-lg shadow-xl overflow-hidden"
    >
      <div className="p-4 bg-blue-500 text-white flex justify-between items-center">
        <div className="flex items-center gap-2">
          <FaUserCircle size={24} />
          <div>
            <h4 className="font-medium">Payment Support</h4>
            <p className="text-xs opacity-80">We typically reply in a few minutes</p>
          </div>
        </div>
        <button
          onClick={() => setShowSupport(false)}
          className="text-white hover:text-gray-200"
        >
          <FaTimes />
        </button>
      </div>
      <div className="h-96 p-4">
        {/* Chat content would go here */}
        <div className="text-center text-gray-500 text-sm">
          Start a conversation with our payment support team
        </div>
      </div>
      <div className="p-4 border-t">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Type your message..."
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            Send
          </button>
        </div>
      </div>
    </motion.div>
  );

  // Enhanced Analytics Component
  const EnhancedAnalytics = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="font-semibold mb-4">Monthly Spending Trend</h3>
          <Line data={enhancedAnalytics.monthlySpending} options={{
            responsive: true,
            plugins: {
              legend: {
                display: false
              }
            }
          }} />
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="font-semibold mb-4">Payment Methods Used</h3>
          <Pie data={enhancedAnalytics.paymentMethods} options={{
            responsive: true,
            plugins: {
              legend: {
                position: 'bottom'
              }
            }
          }} />
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="font-semibold mb-4">Daily Transactions</h3>
          <Bar data={enhancedAnalytics.dailyTransactions} options={{
            responsive: true,
            plugins: {
              legend: {
                display: false
              }
            }
          }} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="font-semibold mb-4">Payment Success Rate</h3>
          <div className="flex items-center justify-between">
            <div className="text-center">
              <p className="text-3xl font-bold text-green-500">98.5%</p>
              <p className="text-sm text-gray-500">Success Rate</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-orange-500">1.5%</p>
              <p className="text-sm text-gray-500">Failed</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold">150</p>
              <p className="text-sm text-gray-500">Total Transactions</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="font-semibold mb-4">Average Transaction Value</h3>
          <div className="flex items-center justify-between">
            <div className="text-center">
              <p className="text-3xl font-bold">$245</p>
              <p className="text-sm text-gray-500">Average Amount</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-blue-500">$12.5k</p>
              <p className="text-sm text-gray-500">Total Volume</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-green-500">+15%</p>
              <p className="text-sm text-gray-500">Month Growth</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Payment Methods Component
  const PaymentMethodSelector = () => (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {paymentMethods.map(method => (
        <motion.button
          key={method.id}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setSelectedPaymentMethod(method.id)}
          className={`p-4 border rounded-lg transition-all ${
            selectedPaymentMethod === method.id
              ? 'border-blue-500 bg-blue-50'
              : 'hover:border-gray-300'
          }`}
        >
          <method.icon size={24} className="mx-auto mb-2 text-blue-500" />
          <p className="text-sm font-medium text-center">{method.name}</p>
          <p className="text-xs text-gray-500 text-center mt-1">{method.fees}</p>
        </motion.button>
      ))}
    </div>
  );

  // Dispute Form Component
  const DisputeForm = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
    >
      <div className="bg-white rounded-lg max-w-2xl w-full p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold">Raise a Dispute</h3>
          <button
            onClick={() => setShowDispute(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            <FaTimes size={20} />
          </button>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Transaction
            </label>
            <select className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500">
              <option value="">Choose a transaction</option>
              {enhancedPayments.map(payment => (
                <option key={payment.id} value={payment.id}>
                  {payment.sellerName} - ${payment.amount}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Dispute Reason
            </label>
            <select className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500">
              <option value="">Select a reason</option>
              <option value="not_received">Item not received</option>
              <option value="wrong_item">Wrong item received</option>
              <option value="damaged">Item damaged</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 h-32"
              placeholder="Provide details about your dispute..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Attachments
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
              <FaUpload className="mx-auto text-gray-400 mb-2" size={24} />
              <p className="text-sm text-gray-500">
                Drop files here or click to upload
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => setShowDispute(false)}
              className="flex-1 px-4 py-2 border rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
              Submit Dispute
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );

  // Notifications Panel Component
  const NotificationsPanel = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="absolute top-full right-0 mt-2 w-96 bg-white rounded-lg shadow-xl z-50"
    >
      <div className="p-4 border-b">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold">Notifications</h3>
          <button
            className="text-sm text-blue-500 hover:text-blue-600"
            onClick={() => {
              setNotifications(notifications.map(n => ({ ...n, read: true })));
            }}
          >
            Mark all as read
          </button>
        </div>
      </div>
      <div className="max-h-96 overflow-y-auto">
        {notifications.map(notification => (
          <div
            key={notification.id}
            className={`p-4 border-b hover:bg-gray-50 transition-colors ${
              !notification.read ? 'bg-blue-50' : ''
            }`}
          >
            <div className="flex gap-3">
              <div className={`p-2 rounded-full ${
                notification.type === 'warning'
                  ? 'bg-orange-100 text-orange-500'
                  : 'bg-green-100 text-green-500'
              }`}>
                {notification.type === 'warning' ? (
                  <FaExclamationTriangle size={16} />
                ) : (
                  <FaCheckCircle size={16} />
                )}
              </div>
              <div className="flex-1">
                <p className={`text-sm ${!notification.read ? 'font-medium' : ''}`}>
                  {notification.message}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {new Date(notification.timestamp).toLocaleTimeString()}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );

  // Payment Steps Component
  const PaymentSteps = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-8">
        {[
          { step: 1, label: 'Select Payment' },
          { step: 2, label: 'Enter Details' },
          { step: 3, label: 'Choose Method' },
          { step: 4, label: 'Confirm' }
        ].map((s, i) => (
          <React.Fragment key={s.step}>
            <div className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                paymentStep >= s.step
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-500'
              }`}>
                {s.step}
              </div>
              <span className="ml-2 text-sm font-medium">{s.label}</span>
            </div>
            {i < 3 && (
              <div className={`flex-1 h-0.5 mx-4 ${
                paymentStep > s.step ? 'bg-blue-500' : 'bg-gray-200'
              }`} />
            )}
          </React.Fragment>
        ))}
      </div>

      {paymentStep === 1 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h3 className="font-semibold mb-4">Select Payment to Process</h3>
          <div className="space-y-4">
            {enhancedPayments
              .filter(p => p.status === 'pending')
              .map(payment => (
                <div
                  key={payment.id}
                  className="border rounded-lg p-4 hover:border-blue-500 cursor-pointer transition-colors"
                  onClick={() => {
                    setSelectedPayment(payment);
                    setPaymentStep(2);
                  }}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">{payment.sellerName}</h4>
                      <p className="text-sm text-gray-500">Due: {payment.dueDate}</p>
                    </div>
                    <p className="text-lg font-bold">${payment.amount}</p>
                  </div>
                </div>
              ))}
          </div>
        </motion.div>
      )}

      {paymentStep === 2 && selectedPayment && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h3 className="font-semibold mb-4">Payment Details</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Amount
              </label>
              <input
                type="text"
                value={selectedPayment.amount}
                readOnly
                className="w-full px-4 py-2 border rounded-lg bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Add Note (Optional)
              </label>
              <textarea
                value={paymentNote}
                onChange={(e) => setPaymentNote(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Add a note for your reference..."
              />
            </div>
          </div>
        </motion.div>
      )}

      {paymentStep === 3 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h3 className="font-semibold mb-4">Choose Payment Method</h3>
          <PaymentMethodSelector />
        </motion.div>
      )}

      {paymentStep === 4 && selectedPayment && selectedPaymentMethod && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h3 className="font-semibold mb-4">Confirm Payment</h3>
          <div className="bg-gray-50 rounded-lg p-4 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-medium">${selectedPayment.amount}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Platform Fee</span>
              <span className="font-medium">${selectedPayment.fees.platform}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Processing Fee</span>
              <span className="font-medium">${selectedPayment.fees.processing}</span>
            </div>
            <div className="border-t pt-4 flex justify-between items-center">
              <span className="font-semibold">Total</span>
              <span className="text-xl font-bold">
                ${(
                  selectedPayment.amount +
                  selectedPayment.fees.platform +
                  selectedPayment.fees.processing
                ).toFixed(2)}
              </span>
            </div>
          </div>
        </motion.div>
      )}

      <div className="flex justify-between mt-8">
        {paymentStep > 1 && (
          <button
            onClick={() => setPaymentStep(paymentStep - 1)}
            className="px-6 py-2 border rounded-lg hover:bg-gray-50"
          >
            Back
          </button>
        )}
        {paymentStep < 4 ? (
          <button
            onClick={() => setPaymentStep(paymentStep + 1)}
            disabled={
              (paymentStep === 1 && !selectedPayment) ||
              (paymentStep === 3 && !selectedPaymentMethod)
            }
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed ml-auto"
          >
            Continue
          </button>
        ) : (
          <button
            onClick={() => {
              // Handle payment confirmation
              setShowMakePayment(false);
              // Show success notification
            }}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 ml-auto"
          >
            Confirm Payment
          </button>
        )}
      </div>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gray-50 py-8"
    >
      <div className="container mx-auto px-4">
        {/* Enhanced Header */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex flex-wrap justify-between items-start gap-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-100 rounded-lg">
                <FaUser className="text-blue-500 text-xl" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">
                  Payments – Buyer Mode
                </h1>
                <p className="text-gray-500">
                  Manage your payments and transactions
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <button
                  className="p-2 text-gray-500 hover:text-gray-700 relative"
                  onClick={() => setShowNotifications(!showNotifications)}
                >
                  <FaBell size={20} />
                  {notifications.some(n => !n.read) && (
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full" />
                  )}
                </button>
                <AnimatePresence>
                  {showNotifications && <NotificationsPanel />}
                </AnimatePresence>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowMakePayment(true)}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition-colors flex items-center gap-2"
              >
                <FaCreditCard /> Make Payment
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowDispute(true)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
              >
                <FaExclamationTriangle /> Raise Dispute
              </motion.button>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by transaction ID, seller, or date..."
                  className="w-full px-4 py-2 pl-10 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>
            </div>
            
            <select
              value={selectedTimeFilter}
              onChange={(e) => setSelectedTimeFilter(e.target.value)}
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Time</option>
              <option value="week">Last Week</option>
              <option value="month">Last Month</option>
              <option value="year">Last Year</option>
            </select>

            <select
              value={selectedStatusFilter}
              onChange={(e) => setSelectedStatusFilter(e.target.value)}
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
              <option value="refunded">Refunded</option>
            </select>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className="px-4 py-2 border rounded-lg hover:bg-gray-50 flex items-center gap-2"
            >
              <FaFilter /> More Filters
            </button>
          </div>

          {/* Payment Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <FaFileInvoiceDollar className="text-blue-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Pending</p>
                  <p className="text-xl font-bold">$1,234.56</p>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <FaCheckCircle className="text-green-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Completed</p>
                  <p className="text-xl font-bold">$45,678.90</p>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <FaClock className="text-orange-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Processing</p>
                  <p className="text-xl font-bold">$567.89</p>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-red-100 rounded-lg">
                  <FaExclamationCircle className="text-red-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Failed</p>
                  <p className="text-xl font-bold">$123.45</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Tabs */}
        <div className="bg-white rounded-lg shadow-lg mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex">
              {[
                { id: 'pending', icon: FaClock, label: 'Pending Payments' },
                { id: 'completed', icon: FaCheckCircle, label: 'Completed Payments' },
                { id: 'analytics', icon: FaChartLine, label: 'Fee Breakdown & Analytics' }
              ].map(tab => (
                <button
                  key={tab.id}
                  className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors relative ${
                    activeTab === tab.id
                      ? 'text-blue-600 border-b-2 border-blue-500'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <tab.icon size={16} />
                  {tab.label}
                  {tab.id === 'pending' && (
                    <span className="ml-2 px-2 py-0.5 text-xs bg-orange-100 text-orange-600 rounded-full">
                      {payments.filter(p => p.status === 'pending').length}
                    </span>
                  )}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'pending' && <PendingPaymentsTab />}
            {activeTab === 'completed' && <CompletedPaymentsTab />}
            {activeTab === 'analytics' && <EnhancedAnalytics />}
          </div>
        </div>
      </div>

      {/* Make Payment Modal */}
      <AnimatePresence>
        {showMakePayment && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-white rounded-lg max-w-2xl w-full p-6"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold">Make Payment</h2>
                <button
                  onClick={() => {
                    setShowMakePayment(false);
                    setPaymentStep(1);
                    setSelectedPayment(null);
                    setSelectedPaymentMethod(null);
                    setPaymentNote('');
                  }}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <FaTimes size={24} />
                </button>
              </div>

              <PaymentSteps />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dispute Modal */}
      <AnimatePresence>
        {showDispute && <DisputeForm />}
      </AnimatePresence>

      {/* Support Chat */}
      <AnimatePresence>
        {showSupport && <SupportChat />}
      </AnimatePresence>

      {/* Help Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setShowSupport(!showSupport)}
        className="fixed bottom-6 right-6 p-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full shadow-lg"
      >
        {showSupport ? <FaTimes size={24} /> : <FaQuestionCircle size={24} />}
      </motion.button>
    </motion.div>
  );
};

export default BuyerPayments; 