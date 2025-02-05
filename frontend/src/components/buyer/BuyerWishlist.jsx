import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaComments, FaSpinner, FaExclamationCircle, FaFilter } from 'react-icons/fa';
import { useAuth } from '../../contexts/AuthContext';
import axios from 'axios';
import Chat from '../Chat';
import { useNavigate } from 'react-router-dom';

const BuyerWishlist = () => {
  const [chats, setChats] = useState([]);
  const [filteredChats, setFilteredChats] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedChat, setSelectedChat] = useState(null);
  const [activeFilter, setActiveFilter] = useState('active'); // Default filter
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (!user?.id) {
          setLoading(false);
          return;
        }

        const [chatsResponse, statsResponse] = await Promise.all([
          axios.get(`http://localhost:5003/api/chats/buyer/${user.id}`, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          }),
          axios.get(`http://localhost:5003/api/chats/buyer/${user.id}/stats`, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          })
        ]);

        console.log("User data in BuyerWishlist:", user);
        console.log('Chats response:', chatsResponse.data);
        console.log('Stats response:', statsResponse.data);
        
        setChats(chatsResponse.data);
        setFilteredChats(chatsResponse.data.filter(chat => chat.status === activeFilter));
        setStats(statsResponse.data);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  // Filter chats when activeFilter changes
  useEffect(() => {
    setFilteredChats(chats.filter(chat => chat.status === activeFilter));
  }, [activeFilter, chats]);

  const handleFilterChange = (status) => {
    setActiveFilter(status);
  };

  const handleOpenChat = (chatId) => {
    console.log('Opening chat with ID:', chatId);
    if (!chatId) {
      console.error('No chat ID provided');
      return;
    }
    setSelectedChat(chatId);
  };

  const handleCloseChat = () => {
    console.log('Closing chat');
    setSelectedChat(null);
  };

  const handleProceedToBuy = (chat) => {
    const lastNegotiation = chat.negotiations[chat.negotiations.length - 1];
    const dealDetails = {
      chatId: chat._id,
      productId: chat.productId,
      productName: chat.productName,
      finalPrice: lastNegotiation.price,
      finalQuantity: lastNegotiation.quantity,
      sellerId: chat.sellerId,
      buyerId: chat.buyerId
    };

    navigate(`/buy-now/${chat.productId}`, { 
      state: { dealDetails }
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <FaSpinner className="animate-spin text-2xl text-blue-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <FaExclamationCircle className="mx-auto text-4xl text-red-500 mb-4" />
        <h3 className="text-lg font-medium text-red-500">{error}</h3>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Dashboard */}
      <div className="bg-gradient-to-r from-white to-blue-50 rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            <FaComments className="text-blue-600" />
            RFQ Dashboard
          </h2>
        </div>

        {stats && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: 'Active RFQs', value: stats.active, color: 'emerald', status: 'active' },
              { label: 'Accepted', value: stats.accepted, color: 'blue', status: 'accepted' },
              { label: 'Rejected', value: stats.rejected, color: 'red', status: 'rejected' },
              { label: 'Total RFQs', value: stats.total, color: 'gray', status: 'all' }
            ].map((stat) => (
              <button
                key={stat.label}
                onClick={() => handleFilterChange(stat.status)}
                className={`p-4 rounded-xl border transition-all ${
                  activeFilter === stat.status
                    ? `bg-${stat.color}-100 border-${stat.color}-200 shadow-md scale-105`
                    : `bg-${stat.color}-50 border-${stat.color}-100 hover:scale-105`
                }`}
              >
                <div className={`text-3xl font-bold text-${stat.color}-600 mb-1`}>
                  {stat.value}
                </div>
                <div className={`text-sm text-${stat.color}-600 font-medium`}>{stat.label}</div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 bg-white p-2 rounded-lg shadow-sm">
        {['active', 'accepted', 'rejected'].map((status) => (
          <button
            key={status}
            onClick={() => handleFilterChange(status)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeFilter === status
                ? 'bg-blue-100 text-blue-700'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      {/* RFQ List */}
      <div className="space-y-4">
        {filteredChats.length === 0 ? (
          <div className="text-center text-gray-500 py-12 bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="mb-4">
              <FaComments className="text-gray-400 text-4xl mx-auto" />
            </div>
            <p className="text-lg font-medium text-gray-600">No {activeFilter} RFQs found</p>
            <p className="text-sm text-gray-500 mt-1">
              {activeFilter === 'active' 
                ? 'Start a conversation by requesting a quote!'
                : `No ${activeFilter} deals yet`}
            </p>
          </div>
        ) : (
          filteredChats.map((chat) => (
          <motion.div
              key={chat._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all overflow-hidden"
            >
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800">{chat.productName}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        {chat.status === 'accepted' ? (
                          <div className="flex items-center gap-2">
                            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                              Deal Accepted
                            </span>
                            <button
                              onClick={() => handleProceedToBuy(chat)}
                              className="px-3 py-1 bg-green-600 text-white rounded-full text-xs font-medium hover:bg-green-700"
                            >
                              Proceed to Buy
                            </button>
                          </div>
                        ) : (
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            chat.status === 'active' ? 'bg-emerald-100 text-emerald-700' :
                            'bg-red-100 text-red-700'
                          }`}>
                            {chat.status.charAt(0).toUpperCase() + chat.status.slice(1)}
                          </span>
                        )}
                        <span className="text-sm text-gray-500">
                          Last updated: {new Date(chat.updatedAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-1">
                        <p className="text-sm text-gray-500 font-medium">Initial Price</p>
                        <p className="text-lg font-semibold text-gray-800">₹{chat.initialPrice}</p>
                      </div>
                      {chat.negotiations.length > 0 && (
                        <div className="space-y-1">
                          <p className="text-sm text-gray-500 font-medium">Latest Offer</p>
                          <p className="text-lg font-semibold text-blue-600">
                            ₹{chat.negotiations[chat.negotiations.length - 1]?.price || chat.initialPrice}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      console.log('Clicked chat ID:', chat._id);
                      handleOpenChat(chat._id);
                    }}
                    className="flex items-center gap-2 px-5 py-2.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors font-medium"
                  >
                    View Details
                    <span className="text-lg">→</span>
                  </button>
                </div>

                {chat.negotiations.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-600">
                        {chat.negotiations.length} {chat.negotiations.length === 1 ? 'negotiation' : 'negotiations'} so far
                      </p>
                      <div className="flex items-center gap-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          chat.negotiations[chat.negotiations.length - 1]?.proposedBy.role === 'buyer'
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-purple-100 text-purple-700'
                        }`}>
                          Last offer by {chat.negotiations[chat.negotiations.length - 1]?.proposedBy.role}
                      </span>
                      </div>
                    </div>
                  </div>
                )}
                </div>
              </motion.div>
          ))
        )}
              </div>

      {/* Chat Modal */}
      {selectedChat && (
        <Chat 
          key={selectedChat}
          chatId={selectedChat}
          userRole="buyer"
          onClose={handleCloseChat}
        />
      )}
    </div>
  );
};

export default BuyerWishlist; 