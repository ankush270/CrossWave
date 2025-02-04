const Chat = require('../models/chat.model');
let socketService; // Will be set from server.js

// Initialize default chat if none exists
const initializeDefaultChat = async () => {
    try {
        console.log('Checking for existing chat...');
        const existingChat = await Chat.findOne();
        
        if (!existingChat) {
            console.log('No existing chat found. Creating default chat...');
            const defaultChat = new Chat({
                productId: 'default-product',
                productName: 'Test Product',
                initialPrice: 100,
                sellerId: 'default-seller',
                buyerId: 'default-buyer',
                status: 'active',
                negotiations: [{
                    price: 100,
                    quantity: 10,
                    requirements: 'Initial requirements',
                    proposedBy: {
                        userId: 'default-seller',
                        role: 'seller'
                    }
                }]
            });
            
            await defaultChat.save();
            console.log('Default chat created successfully');
            return defaultChat;
        }
        
        console.log('Existing chat found');
        return existingChat;
    } catch (error) {
        console.error('Error initializing default chat:', error);
        throw error;
    }
};

// Add this function to set the socket service
const setSocketService = (service) => {
    socketService = service;
};

const chatController = {
    // Create a new chat
    createChat: async (req, res) => {
        try {
            console.log('Creating new chat with data:', req.body);
            if (!req.body.productId) {
                throw new Error('Product ID is required');
            }

            const chatData = {
                ...req.body,
                productId: req.body.productId,
                sellerId: 'default-seller',
                buyerId: 'current-user-id',
                status: 'active'
            };

            console.log('Processed chat data:', chatData);
            const chat = new Chat(chatData);
            const savedChat = await chat.save();
            console.log('Chat created successfully:', savedChat);
            res.status(201).json(savedChat);
        } catch (error) {
            console.error('Error creating chat:', error);
            res.status(500).json({ message: 'Error creating chat', error: error.message });
        }
    },

    // Get all chats
    getAllChats: async (req, res) => {
        try {
            let chats = await Chat.find().sort({ updatedAt: -1 });
            
            if (chats.length === 0) {
                // If no chats exist, create a default one
                const defaultChat = await initializeDefaultChat();
                chats = [defaultChat];
            }
            
            res.json(chats);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Get chat by ID
    getChatById: async (req, res) => {
        try {
            let chat = await Chat.findById(req.params.id);
            if (!chat) {
                console.log('Chat not found, returning default chat...');
                chat = await initializeDefaultChat();
            }
            res.json(chat);
        } catch (error) {
            console.error('Error in getChatById:', error);
            res.status(500).json({ message: error.message });
        }
    },

    // Submit new negotiation
    negotiate: async (req, res) => {
        try {
            const { price, quantity, requirements, userId, role } = req.body;
            const chat = await Chat.findById(req.params.id);
            
            if (!chat) {
                return res.status(404).json({ message: 'Chat not found' });
            }

            chat.negotiations.push({
                price,
                quantity,
                requirements,
                proposedBy: {
                    userId,
                    role
                }
            });
            
            const updatedChat = await chat.save();
            
            // Emit update with a small delay to ensure database operation is complete
            setTimeout(() => {
                if (socketService) {
                    console.log('Emitting chat update after negotiation');
                    socketService.emitChatUpdate(chat._id.toString(), updatedChat);
                }
            }, 100);

            res.json(updatedChat);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Accept deal
    acceptDeal: async (req, res) => {
        try {
            const chat = await Chat.findById(req.params.id);
            if (!chat) {
                return res.status(404).json({ message: 'Chat not found' });
            }

            const lastNegotiation = chat.negotiations[chat.negotiations.length - 1];
            chat.status = 'accepted';
            chat.finalPrice = lastNegotiation.price;
            chat.finalQuantity = lastNegotiation.quantity;
            
            const updatedChat = await chat.save();
            
            // Emit update
            if (socketService) {
                socketService.emitChatUpdate(chat._id.toString(), updatedChat);
            }

            res.json(updatedChat);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Reject deal
    rejectDeal: async (req, res) => {
        try {
            const chat = await Chat.findById(req.params.id);
            if (!chat) {
                return res.status(404).json({ message: 'Chat not found' });
            }

            chat.status = 'rejected';
            const updatedChat = await chat.save();
            
            // Emit update
            if (socketService) {
                socketService.emitChatUpdate(chat._id.toString(), updatedChat);
            }

            res.json(updatedChat);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Get buy now details
    getBuyNowDetails: async (req, res) => {
        try {
            const productId = req.params.id;
            console.log('Fetching buy now details for product:', productId);
            
            if (!productId) {
                throw new Error('Product ID is required');
            }

            const chat = await Chat.findOne({
                productId: productId,
                status: 'accepted'
            }).sort({ updatedAt: -1 });

            console.log('Found chat for product:', productId, chat);

            if (chat) {
                res.json({
                    isNegotiated: true,
                    details: {
                        productId: chat.productId,
                        productName: chat.productName,
                        finalPrice: chat.finalPrice,
                        finalQuantity: chat.finalQuantity,
                        chatId: chat._id,
                        status: chat.status
                    }
                });
            } else {
                // Return dummy data for testing
                res.json({
                    isNegotiated: false,
                    details: {
                        productId: productId,
                        productName: "Standard Product",
                        finalPrice: 1000,
                        finalQuantity: 10,
                        type: 'standard'
                    }
                });
            }
        } catch (error) {
            console.error('Error in getBuyNowDetails:', error);
            res.status(500).json({ 
                message: 'Error fetching buy now details',
                error: error.message 
            });
        }
    }
};

// Export both the controller and initialization function
module.exports = {
    chatController,
    initializeDefaultChat,
    setSocketService
};