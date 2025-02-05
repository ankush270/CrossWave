import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaComments, FaSpinner } from 'react-icons/fa';
import { useAuth } from '../../contexts/AuthContext';
import axios from 'axios';
import Chat from '../Chat';

const ChatList = () => {
    const [chats, setChats] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedChat, setSelectedChat] = useState(null);
    const { user } = useAuth();

    useEffect(() => {
        const fetchChats = async () => {
            setLoading(true);
            try {
                console.log('Fetching chats for buyer:', user?.id);
                if (!user?.id) {
                    console.log('No user ID available');
                    setLoading(false);
                    return;
                }
                console.log(user.id)

                const response = await axios.get(`http://localhost:5003/api/chats/buyer/${user.id}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                console.log("user data in chat list :", user);
                console.log('Chats response:', response.data);
                setChats(response.data);
            } catch (err) {
                console.error('Error fetching chats:', err);
                setError('Failed to load chats');
            } finally {
                setLoading(false);
            }
        };

        fetchChats();
    }, [user]);

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

    if (loading) {
        return (
            <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-center p-8">
                    <FaSpinner className="animate-spin text-2xl text-blue-600" />
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-white rounded-lg shadow-md p-6">
                <div className="text-red-500 p-4 text-center">
                    {error}
                </div>
            </div>
        );
    }

    return (
        <div className="relative bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                <FaComments className="text-blue-600" />
                My Chats
            </h2>

            {chats.length === 0 ? (
                <div className="text-center text-gray-500 py-8">
                    No chats found. Start a conversation by requesting a quote!
                </div>
            ) : (
                <div className="grid gap-4">
                    {chats.map((chat) => (
                        <motion.div
                            key={chat._id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="border rounded-lg p-4 hover:shadow-lg transition-shadow"
                        >
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="font-semibold text-lg">{chat.productName}</h3>
                                    <p className="text-sm text-gray-600">
                                        Initial Price: ₹{chat.initialPrice}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        Latest Offer: ₹{chat.negotiations[chat.negotiations.length - 1]?.price || chat.initialPrice}
                                    </p>
                                    <div className="mt-2">
                                        <span className={`px-2 py-1 rounded-full text-xs ${
                                            chat.status === 'active' ? 'bg-green-100 text-green-800' :
                                            chat.status === 'accepted' ? 'bg-blue-100 text-blue-800' :
                                            'bg-red-100 text-red-800'
                                        }`}>
                                            {chat.status.charAt(0).toUpperCase() + chat.status.slice(1)}
                                        </span>
                                    </div>
                                </div>
                                <button
                                    onClick={() => {
                                        console.log('Clicked chat ID:', chat._id);
                                        handleOpenChat(chat._id);
                                    }}
                                    className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                                >
                                    View Details →
                                </button>
                            </div>
                            <div className="mt-3 text-sm text-gray-500">
                                Last updated: {new Date(chat.updatedAt).toLocaleDateString()}
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}

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

export default ChatList; 