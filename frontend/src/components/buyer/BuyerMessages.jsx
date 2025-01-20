import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaInbox, FaUserCircle, FaPaperPlane, FaSearch, 
  FaEllipsisV, FaRegStar, FaStar, FaCheck, FaCheckDouble,
  FaImage, FaFile, FaSmile, FaLink
} from 'react-icons/fa';

const BuyerMessages = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [newMessage, setNewMessage] = useState('');

  const chats = [
    {
      id: 1,
      supplier: 'Tech Components Ltd',
      lastMessage: 'Your order #ORD001 has been shipped',
      time: '2 min ago',
      unread: 2,
      status: 'online',
      avatar: null,
      messages: [
        {
          id: 1,
          sender: 'supplier',
          text: 'Your order #ORD001 has been shipped',
          time: '10:30 AM',
          status: 'read'
        },
        {
          id: 2,
          sender: 'buyer',
          text: 'Great, thanks! When can I expect delivery?',
          time: '10:32 AM',
          status: 'read'
        },
        {
          id: 3,
          sender: 'supplier',
          text: 'The estimated delivery time is 3-4 business days',
          time: '10:33 AM',
          status: 'read'
        }
      ]
    },
    {
      id: 2,
      supplier: 'Display Solutions Inc',
      lastMessage: 'We can offer bulk discount on LCD panels',
      time: '1 hour ago',
      unread: 1,
      status: 'offline',
      avatar: null,
      messages: [
        {
          id: 1,
          sender: 'buyer',
          text: 'What\'s your best price for 500 units?',
          time: '09:15 AM',
          status: 'read'
        },
        {
          id: 2,
          sender: 'supplier',
          text: 'We can offer bulk discount on LCD panels',
          time: '09:45 AM',
          status: 'read'
        }
      ]
    }
  ];

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    // Add new message to the chat
    if (selectedChat) {
      const newMsg = {
        id: selectedChat.messages.length + 1,
        sender: 'buyer',
        text: newMessage,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: 'sent'
      };

      selectedChat.messages.push(newMsg);
      setNewMessage('');
    }
  };

  return (
    <div className="h-[calc(100vh-120px)] bg-white/80 backdrop-blur-lg rounded-xl shadow-lg border border-gray-100 overflow-hidden">
      <div className="grid grid-cols-12 h-full">
        {/* Chat List */}
        <div className="col-span-4 border-r border-gray-200">
          {/* Search */}
          <div className="p-4 border-b border-gray-200">
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search suppliers..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Chats List */}
          <div className="overflow-y-auto h-[calc(100%-73px)]">
            {chats.map((chat) => (
              <motion.div
                key={chat.id}
                whileHover={{ backgroundColor: 'rgba(59, 130, 246, 0.05)' }}
                className={`p-4 cursor-pointer border-b border-gray-100 ${
                  selectedChat?.id === chat.id ? 'bg-blue-50' : ''
                }`}
                onClick={() => setSelectedChat(chat)}
              >
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-semibold">
                      {chat.supplier.charAt(0)}
                    </div>
                    {chat.status === 'online' && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <h3 className="font-semibold truncate">{chat.supplier}</h3>
                      <span className="text-xs text-gray-500">{chat.time}</span>
                    </div>
                    <p className="text-sm text-gray-600 truncate">{chat.lastMessage}</p>
                  </div>
                  {chat.unread > 0 && (
                    <div className="bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {chat.unread}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="col-span-8 flex flex-col">
          {selectedChat ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-semibold">
                    {selectedChat.supplier.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-semibold">{selectedChat.supplier}</h3>
                    <span className="text-sm text-green-500">
                      {selectedChat.status === 'online' ? 'Online' : 'Offline'}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
                  >
                    <FaRegStar />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
                  >
                    <FaEllipsisV />
                  </motion.button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {selectedChat.messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${message.sender === 'buyer' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[70%] rounded-2xl px-4 py-2 ${
                      message.sender === 'buyer'
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100'
                    }`}>
                      <p>{message.text}</p>
                      <div className="flex items-center justify-end gap-1 mt-1">
                        <span className="text-xs opacity-70">{message.time}</span>
                        {message.sender === 'buyer' && (
                          message.status === 'read' ? <FaCheckDouble className="text-xs" /> : <FaCheck className="text-xs" />
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Message Input */}
              <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200">
                <div className="flex items-center gap-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    type="button"
                    className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
                  >
                    <FaImage />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    type="button"
                    className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
                  >
                    <FaFile />
                  </motion.button>
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Type your message..."
                  />
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    type="button"
                    className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
                  >
                    <FaSmile />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg flex items-center gap-2"
                  >
                    <FaPaperPlane />
                    Send
                  </motion.button>
                </div>
              </form>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-500">
              Select a chat to start messaging
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BuyerMessages; 