import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaCheck, FaTimes as FaReject } from 'react-icons/fa';
import io from 'socket.io-client';
import { Link } from 'react-router-dom';

const Chat = ({ chatId, userRole = 'buyer', onClose }) => {
  const [chat, setChat] = useState(null);
  const [socket, setSocket] = useState(null);
  const [newPrice, setNewPrice] = useState('');
  const [newQuantity, setNewQuantity] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialize socket connection
  useEffect(() => {
    console.log('Initializing socket connection...');
    const newSocket = io('http://127.0.0.1:5000', {
      path: '/socket.io/',
      transports: ['websocket', 'polling'],
      withCredentials: true,
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000
    });

    newSocket.on('connect', () => {
      console.log('Socket connected:', newSocket.id);
    });

    newSocket.on('connect_error', (error) => {
      console.error('Socket connection error:', error);
    });

    newSocket.on('disconnect', (reason) => {
      console.log('Socket disconnected:', reason);
    });

    setSocket(newSocket);

    return () => {
      console.log('Cleaning up socket connection...');
      if (newSocket) {
        newSocket.disconnect();
      }
    };
  }, []);

  // Fetch initial chat data and set up socket listeners
  useEffect(() => {
    const fetchChatDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/chats/${chatId}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setChat(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching chat:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    if (chatId) {
      fetchChatDetails();
    }

    if (socket && chatId) {
      console.log('Joining chat room:', chatId);
      socket.emit('join_chat', chatId);

      // Listen for chat updates
      const handleChatUpdate = (updatedChat) => {
        console.log('Received chat update:', updatedChat);
        setChat(updatedChat);
        setNewPrice('');
        setNewQuantity('');
      };

      socket.on('chat_updated', handleChatUpdate);

      return () => {
        console.log('Leaving chat room:', chatId);
        socket.emit('leave_chat', chatId);
        socket.off('chat_updated', handleChatUpdate);
      };
    }
  }, [socket, chatId]);

  const handleNegotiate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/chats/${chatId}/negotiate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          price: Number(newPrice),
          quantity: Number(newQuantity),
          userId: 'current-user-id',
          role: userRole
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error negotiating:', error);
      setError(error.message);
    }
  };

  const handleAccept = async () => {
    try {
      const response = await fetch(`/api/chats/${chatId}/accept`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error accepting deal:', error);
      setError(error.message);
    }
  };

  const handleReject = async () => {
    try {
      const response = await fetch(`/api/chats/${chatId}/reject`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error rejecting deal:', error);
      setError(error.message);
    }
  };

  // Helper function to check if user can accept/reject
  const canAcceptOrReject = () => {
    if (!chat || !chat.negotiations.length) return false;
    
    const lastNegotiation = chat.negotiations[chat.negotiations.length - 1];
    // Buyer can accept only if seller made the last offer
    if (userRole === 'buyer') {
      return lastNegotiation.proposedBy.role === 'seller';
    }
    // Seller can accept only if buyer made the last offer
    if (userRole === 'seller') {
      return lastNegotiation.proposedBy.role === 'buyer';
    }
    return false;
  };

  const renderDealStatus = () => {
    if (chat.status === 'accepted') {
      console.log('Chat data for buy now:', chat);
      const productId = chat.productId || chat._id;
      return (
        <div className="space-y-4">
          <div className="p-4 rounded-lg bg-green-100 text-green-800">
            <p className="text-center font-semibold">Deal Accepted</p>
            <div className="mt-2 text-center">
              <p>Final Price: ${chat.finalPrice}</p>
              <p>Final Quantity: {chat.finalQuantity}</p>
              <p>Total Value: ${chat.finalPrice * chat.finalQuantity}</p>
            </div>
          </div>
          {userRole === 'buyer' && (
            <Link
              to={`/buy-now/${productId}`}
              state={{ 
                dealDetails: {
                  finalPrice: chat.finalPrice,
                  finalQuantity: chat.finalQuantity,
                  chatId: chat._id,
                  productName: chat.productName,
                  productId: productId
                }
              }}
              className="block w-full text-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Proceed to Buy
            </Link>
          )}
        </div>
      );
    } else if (chat.status === 'rejected') {
      return (
        <div className="p-4 rounded-lg bg-red-100 text-red-800">
          <p className="text-center font-semibold">Deal Rejected</p>
          <p className="text-center text-sm mt-2">This negotiation has been rejected.</p>
        </div>
      );
    }
    return null;
  };

  if (loading) return <div className="text-center p-4">Loading...</div>;
  if (error) return <div className="text-center p-4 text-red-600">Error: {error}</div>;
  if (!chat) return <div className="text-center p-4">No chat available</div>;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl shadow-xl max-w-2xl w-full"
        >
          {/* Header */}
          <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <h2 className="text-2xl font-bold">Negotiation Details</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <FaTimes />
            </button>
          </div>

          <div className="p-6 space-y-6">
            {/* Product Info */}
            <div className="bg-blue-50 rounded-xl p-4">
              <h3 className="font-semibold">{chat.productName}</h3>
              <p className="text-sm text-gray-600">Initial Price: ${chat.initialPrice}</p>
              <p className="text-sm text-gray-600">Initial Quantity: {chat.negotiations[0].quantity}</p>
            </div>

            {/* Negotiation History */}
            <div className="space-y-4">
              <h3 className="font-semibold">Negotiation History</h3>
              <div className="border rounded-lg divide-y">
                {chat.negotiations.map((neg, index) => (
                  <div key={index} className="p-4 flex justify-between items-center">
                    <div>
                      <p className="font-medium">
                        {neg.proposedBy.role === userRole ? 'You' : 
                          neg.proposedBy.role === 'buyer' ? 'Buyer' : 'Seller'}
                      </p>
                      <p className="text-sm text-gray-500">
                        {new Date(neg.timestamp).toLocaleString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">${neg.price} per unit</p>
                      <p className="text-sm text-gray-600">{neg.quantity} units</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Deal Status */}
            {chat.status !== 'active' && renderDealStatus()}

            {/* New Offer Form */}
            {chat.status === 'active' && (
              <form onSubmit={handleNegotiate} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Price (per unit)
                    </label>
                    <input
                      type="number"
                      required
                      value={newPrice}
                      onChange={(e) => setNewPrice(e.target.value)}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter price"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Quantity
                    </label>
                    <input
                      type="number"
                      required
                      value={newQuantity}
                      onChange={(e) => setNewQuantity(e.target.value)}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter quantity"
                    />
                  </div>
                </div>
                <div className="flex gap-4">
                  <button
                    type="submit"
                    className="flex-1 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Submit Offer
                  </button>
                  {canAcceptOrReject() && (
                    <>
                      <button
                        type="button"
                        onClick={handleAccept}
                        className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                      >
                        Accept
                      </button>
                      <button
                        type="button"
                        onClick={handleReject}
                        className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                      >
                        Reject
                      </button>
                    </>
                  )}
                </div>
                {!canAcceptOrReject() && chat.negotiations.length > 0 && (
                  <p className="text-sm text-gray-500 text-center mt-2">
                    {userRole === 'buyer' 
                      ? "Waiting for seller's offer to accept/reject"
                      : "Waiting for buyer's offer to accept/reject"}
                  </p>
                )}
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default Chat; 