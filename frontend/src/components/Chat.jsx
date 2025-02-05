import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaTimes, 
  FaCheck, 
  FaTimes as FaReject, 
  FaUser,
  FaPaperPlane
} from 'react-icons/fa';
import io from 'socket.io-client';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'sonner';

const ConfirmationModal = ({ onConfirm, onCancel, price, quantity }) => (
  <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white rounded-xl shadow-xl max-w-md w-full p-6"
    >
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Confirm Deal</h3>
      <div className="space-y-4 mb-6">
        <p className="text-gray-600">
          Are you sure you want to finalize this deal at:
        </p>
        <div className="bg-blue-50 p-4 rounded-lg space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Price per unit:</span>
            <span className="font-semibold text-blue-600">₹{price}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Quantity:</span>
            <span className="font-semibold text-blue-600">{quantity} units</span>
          </div>
          <div className="flex justify-between items-center pt-2 border-t border-blue-100">
            <span className="text-gray-600">Total Value:</span>
            <span className="font-semibold text-blue-600">₹{price * quantity}</span>
          </div>
        </div>
      </div>
      <div className="flex gap-4">
        <button
          onClick={onConfirm}
          className="flex-1 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Confirm Deal
        </button>
        <button
          onClick={onCancel}
          className="flex-1 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
        >
          Cancel
        </button>
      </div>
    </motion.div>
  </div>
);

const InitialQuote = ({ quote }) => (
  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 mb-4 rounded-lg border border-blue-100">
    <h4 className="font-medium text-blue-800 mb-2">Initial Quote Request</h4>
    <div className="space-y-2">
      <div className="flex justify-between items-baseline">
        <span className="text-sm text-gray-600">Initial Price:</span>
        <span className="font-semibold text-blue-700">₹{quote.initialPrice}</span>
      </div>
      <div className="flex justify-between items-baseline">
        <span className="text-sm text-gray-600">Initial Quantity:</span>
        <span className="font-semibold text-blue-700">{quote.initialQuantity} units</span>
      </div>
      {quote.requirements && (
        <div className="mt-3 pt-3 border-t border-blue-200">
          <p className="text-sm text-gray-600 font-medium mb-1">Requirements:</p>
          <p className="text-sm text-blue-700">{quote.requirements}</p>
        </div>
      )}
      <div className="mt-2 text-xs text-gray-500">
        Requested on: {new Date(quote.createdAt).toLocaleString()}
      </div>
    </div>
  </div>
);

const AcceptedDealBanner = ({ chat, userRole }) => {
  const navigate = useNavigate();
  const lastNegotiation = chat.negotiations[chat.negotiations.length - 1];

  const handleProceedToBuy = () => {
    const dealDetails = {
      chatId: chat._id,
      productId: chat.productId,
      productName: chat.productName,
      finalPrice: lastNegotiation.price,
      finalQuantity: lastNegotiation.quantity,
      sellerId: chat.sellerId,
      buyerId: chat.buyerId
    };

    navigate(`/product/${chat.productId}/buy`, { 
      state: { dealDetails }
    });
  };

  return (
    <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 border-b border-green-100">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <p className="text-green-700 font-medium">Deal Accepted!</p>
          <p className="text-sm text-green-600">
            Final Price: ₹{lastNegotiation.price} × {lastNegotiation.quantity} units
          </p>
        </div>
        {userRole === 'buyer' && (
          <button
            onClick={handleProceedToBuy}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
          >
            Proceed to Buy
            <span className="text-lg">→</span>
          </button>
        )}
      </div>
    </div>
  );
};

const Chat = ({ chatId, userRole = 'buyer', onClose }) => {
  const { user } = useAuth();
  const [chat, setChat] = useState(null);
  const [socket, setSocket] = useState(null);
  const [newPrice, setNewPrice] = useState('');
  const [newQuantity, setNewQuantity] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [lastOffer, setLastOffer] = useState(null);
  const navigate = useNavigate();

  // Initialize socket connection
    useEffect(() => {
    console.log('Initializing socket connection...');
    const newSocket = io('http://localhost:5003', {
      path: '/socket.io/',
      transports: ['websocket', 'polling']
    });

    newSocket.on('connect', () => {
      console.log('Socket connected:', newSocket.id);
      newSocket.emit('join_chat', chatId);
    });

    setSocket(newSocket);

    return () => {
      if (newSocket) newSocket.disconnect();
    };
  }, [chatId]);

  // Fetch chat data
  useEffect(() => {
    const fetchChat = async () => {
      try {
        console.log('Fetching chat data for ID:', chatId);
        const response = await axios.get(`http://localhost:5003/api/chats/${chatId}`);
        console.log('Chat data received:', response.data);
        setChat(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching chat:', err);
        setError('Failed to load chat details');
        setLoading(false);
      }
    };

    if (chatId) {
      fetchChat();
    }
  }, [chatId]);

  const handleNegotiate = async (e) => {
    e.preventDefault();
    if (!newPrice || !newQuantity) {
      toast.error('Please enter both price and quantity');
      return;
    }

    try {
      const negotiation = {
        price: Number(newPrice),
        quantity: Number(newQuantity),
        requirements: "No specific requirements", // Added as per model requirement
        proposedBy: {
          userId: user.id,
          role: userRole
        }
      };

      const response = await axios.post(
        `http://localhost:5003/api/chats/${chatId}/negotiate`,
        negotiation,
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
      );

      setChat(response.data);
      setNewPrice('');
      setNewQuantity('');
      toast.success('Offer sent successfully!');
    } catch (error) {
      console.error('Error negotiating:', error);
      toast.error('Failed to send offer. Please try again.');
    }
  };

  const handleAccept = async () => {
    try {
      const response = await axios.post(
        `http://localhost:5003/api/chats/${chatId}/accept`,
        {},
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      setChat(response.data);
    } catch (error) {
      console.error('Error accepting deal:', error);
      toast.error('Failed to accept deal. Please try again.');
    }
  };

  const handleReject = async () => {
    try {
      const response = await axios.post(
        `http://localhost:5003/api/chats/${chatId}/reject`,
        {},
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      setChat(response.data);
      toast.success('Deal rejected');
    } catch (error) {
      console.error('Error rejecting deal:', error);
      toast.error('Failed to reject deal. Please try again.');
    }
  };

  const handleAcceptClick = () => {
    const lastNegotiation = chat.negotiations[chat.negotiations.length - 1];
    setLastOffer(lastNegotiation);
    setShowConfirmation(true);
  };

  const handleConfirmDeal = async () => {
    try {
      const response = await axios.post(
        `http://localhost:5003/api/chats/${chatId}/accept`,
        {},
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      setChat(response.data);
      setShowConfirmation(false);
      toast.success('Deal successfully accepted!');
    } catch (error) {
      console.error('Error accepting deal:', error);
      toast.error('Failed to accept deal. Please try again.');
    }
  };

  // Function to check if user can accept the current offer
  const canAcceptOffer = () => {
    if (!chat?.negotiations.length) return false;
    const lastNegotiation = chat.negotiations[chat.negotiations.length - 1];
    return lastNegotiation.proposedBy.role !== userRole;
  };

  // Render the action buttons based on chat status and role
  const renderActionButtons = () => {
    if (chat?.status !== 'active') {
      return (
        <div className="p-4 bg-gray-50 rounded-lg text-center">
          <p className="text-gray-600 font-medium">
            This deal has been {chat?.status}
          </p>
        </div>
      );
    }

    return (
      <div className="p-5 border-t space-y-4 bg-white shadow-lg">
        {/* Price and Quantity Form */}
        <form onSubmit={handleNegotiate} className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Price per unit
            </label>
            <input
              type="number"
              value={newPrice}
              onChange={(e) => setNewPrice(e.target.value)}
              placeholder="Enter price"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Quantity
            </label>
            <input
              type="number"
              value={newQuantity}
              onChange={(e) => setNewQuantity(e.target.value)}
              placeholder="Enter quantity"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            />
          </div>
          <button
            type="submit"
            className="col-span-2 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all shadow-md"
          >
            Send Offer
          </button>
        </form>

        {/* Accept/Reject Section */}
        {canAcceptOffer() && (
          <>
            <div className="border-t pt-4">
              <p className="text-sm text-gray-600 mb-3 text-center">
                You can accept or reject the latest offer
              </p>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={handleAcceptClick}
                  className="py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-xl hover:from-emerald-600 hover:to-emerald-700 transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <FaCheck />
                  Accept Deal
                </button>
                <button
                  onClick={handleReject}
                  className="py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:from-red-600 hover:to-red-700 transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <FaReject />
                  Reject Deal
                </button>
              </div>
            </div>
          </>
        )}
        {!canAcceptOffer() && chat.negotiations.length > 0 && (
          <div className="border-t pt-4">
            <p className="text-sm text-gray-500 text-center">
              Waiting for {userRole === 'buyer' ? 'seller' : 'buyer'} to respond to your offer
            </p>
          </div>
        )}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
        <div className="bg-white rounded-lg p-4">Loading chat...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
        <div className="bg-white rounded-lg p-4 text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white rounded-2xl shadow-xl w-[900px] h-[85vh] flex flex-col"
        >
          {/* Chat Header - Improved */}
          <div className="p-5 border-b flex justify-between items-center bg-gradient-to-r from-blue-50 to-indigo-50">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
                <FaUser className="text-white text-xl" />
              </div>
              <div>
                <h3 className="font-semibold text-lg text-gray-800">{chat?.productName}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                    {userRole === 'buyer' ? 'Seller' : 'Buyer'}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    chat?.status === 'active' ? 'bg-emerald-100 text-emerald-700' :
                    chat?.status === 'accepted' ? 'bg-blue-100 text-blue-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {chat?.status.charAt(0).toUpperCase() + chat?.status.slice(1)}
                  </span>
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/50 rounded-full transition-colors"
            >
              <FaTimes className="text-gray-500" />
            </button>
          </div>

          {/* Accepted Deal Banner - Moved inside main container */}
          {chat?.status === 'accepted' && (
            <AcceptedDealBanner chat={chat} userRole={userRole} />
          )}

          {/* Chat Messages with Initial Quote */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-gray-50 to-white">
            {/* Initial Quote Display */}
            {chat && (
              <InitialQuote 
                quote={{
                  initialPrice: chat.initialPrice,
                  initialQuantity: chat.negotiations[0]?.quantity || 0,
                  requirements: chat.requirements,
                  createdAt: chat.createdAt
                }} 
              />
            )}

            {/* Divider */}
            <div className="flex items-center justify-center">
              <div className="border-t flex-grow"></div>
              <span className="px-4 text-sm text-gray-500">Negotiations</span>
              <div className="border-t flex-grow"></div>
            </div>

            {/* Existing negotiations */}
            {chat?.negotiations.map((neg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${neg.proposedBy.role === userRole ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[60%] ${
                  neg.proposedBy.role === userRole 
                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg rounded-br-none' 
                    : 'bg-white text-gray-800 rounded-lg rounded-bl-none shadow-md border border-gray-100'
                } px-6 py-3`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium opacity-90">
                      {neg.proposedBy.role === userRole ? 'You' : 
                        neg.proposedBy.role === 'buyer' ? 'Buyer' : 'Seller'}
                    </span>
                    <span className="text-xs opacity-75">
                      {new Date(neg.timestamp).toLocaleString()}
                    </span>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-baseline justify-between">
                      <span className="text-sm opacity-90">Price per unit:</span>
                      <span className="text-lg font-semibold">₹{neg.price}</span>
                    </div>
                    <div className="flex items-baseline justify-between">
                      <span className="text-sm opacity-90">Quantity:</span>
                      <span className="text-lg font-semibold">{neg.quantity} units</span>
                    </div>
                    <div className={`flex items-baseline justify-between pt-1 mt-1 ${
                      neg.proposedBy.role === userRole 
                        ? 'border-t border-white/20' 
                        : 'border-t border-gray-100'
                    }`}>
                      <span className="text-sm opacity-90">Total Value:</span>
                      <span className="text-lg font-semibold">₹{neg.price * neg.quantity}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Action Buttons or Deal Status */}
          {chat?.status === 'active' ? (
            renderActionButtons()
          ) : chat?.status === 'accepted' && userRole === 'buyer' ? (
            <div className="p-5 border-t bg-gradient-to-r from-green-50 to-emerald-50">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-green-700 font-medium">Deal Successfully Accepted!</p>
                  <p className="text-sm text-green-600">
                    Final Price: ₹{chat.negotiations[chat.negotiations.length - 1]?.price} × {chat.negotiations[chat.negotiations.length - 1]?.quantity} units
                  </p>
                </div>
              <button
                  onClick={() => {
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
                    navigate(`/product/${chat.productId}/buy`, { state: { dealDetails } });
                  }}
                  className="px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors flex items-center gap-2 shadow-md"
                >
                  <span>Proceed to Buy</span>
                  <span className="text-lg">→</span>
              </button>
              </div>
            </div>
          ) : (
            <div className="p-4 bg-gray-50 rounded-lg text-center">
              <p className="text-gray-600 font-medium">
                This deal has been {chat?.status}
              </p>
            </div>
          )}
        </motion.div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmation && lastOffer && (
        <ConfirmationModal
          price={lastOffer.price}
          quantity={lastOffer.quantity}
          onConfirm={handleConfirmDeal}
          onCancel={() => setShowConfirmation(false)}
        />
      )}
    </AnimatePresence>
  );
};

export default Chat; 