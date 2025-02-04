import React, { useState, useEffect } from 'react';
import RequestQuote from '../components/RequestQuote';
import Chat from '../components/Chat';

const TestPage = () => {
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [chatId, setChatId] = useState(null);
  const [role, setRole] = useState('buyer'); // Toggle between 'buyer' and 'seller'
  const [activeChats, setActiveChats] = useState([]);

  const testProduct = {
    _id: '123',
    name: 'Test Product',
    price: 100,
    moq: 10,
    image: 'https://via.placeholder.com/150'
  };

  // Fetch active chats when role changes or a new chat is created
  useEffect(() => {
    if (role === 'seller') {
      fetchActiveChats();
    }
  }, [role]);

  const fetchActiveChats = async () => {
    try {
      const response = await fetch('/api/chats');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log('Active chats:', data);
      setActiveChats(data);
    } catch (error) {
      console.error('Error fetching chats:', error);
    }
  };

  const handleChatCreated = (newChatId) => {
    setChatId(newChatId);
    setIsQuoteOpen(false);
    if (role === 'seller') {
      fetchActiveChats(); // Refresh the list when a new chat is created
    }
  };

  return (
    <div className="p-8">
      {/* Role Switcher */}
      <div className="mb-8 flex items-center gap-4">
        <label className="font-medium">Test as:</label>
        <div className="flex gap-2">
          <button
            onClick={() => setRole('buyer')}
            className={`px-4 py-2 rounded-lg ${
              role === 'buyer' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            Buyer
          </button>
          <button
            onClick={() => setRole('seller')}
            className={`px-4 py-2 rounded-lg ${
              role === 'seller' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            Seller
          </button>
        </div>
      </div>

      {/* Active Chats List */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Active Negotiations</h2>
        <div className="space-y-4">
          {role === 'buyer' && chatId && (
            <div className="p-4 bg-white rounded-lg shadow border flex justify-between items-center">
              <div>
                <h3 className="font-medium">{testProduct.name}</h3>
                <p className="text-sm text-gray-500">Chat ID: {chatId}</p>
              </div>
              <button
                onClick={() => setChatId(chatId)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Open Chat
              </button>
            </div>
          )}

          {role === 'seller' && activeChats.map(chat => (
            <div 
              key={chat._id} 
              className="p-4 bg-white rounded-lg shadow border flex justify-between items-center"
            >
              <div>
                <h3 className="font-medium">{chat.productName}</h3>
                <p className="text-sm text-gray-500">
                  Initial Price: ${chat.initialPrice} | 
                  Quantity: {chat.negotiations[0].quantity}
                </p>
                <p className="text-sm text-gray-500">Status: {chat.status}</p>
              </div>
              <button
                onClick={() => setChatId(chat._id)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Open Chat
              </button>
            </div>
          ))}

          {role === 'seller' && activeChats.length === 0 && (
            <p className="text-gray-500 text-center">No active negotiations</p>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      {role === 'buyer' && (
        <button
          onClick={() => setIsQuoteOpen(true)}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Request Quote
        </button>
      )}

      {/* Modals */}
      {role === 'buyer' && (
        <RequestQuote
          product={testProduct}
          isOpen={isQuoteOpen}
          onClose={() => setIsQuoteOpen(false)}
          onChatCreated={handleChatCreated}
        />
      )}

      {chatId && (
        <Chat
          chatId={chatId}
          userRole={role}
          onClose={() => {
            setChatId(null);
            if (role === 'seller') {
              fetchActiveChats(); // Refresh the list when closing a chat
            }
          }}
        />
      )}
    </div>
  );
};

export default TestPage; 