const Chat = require('../models/chat.model');

let socketService = null;

const chatController = {
    getBuyerChats: async (req, res) => {
        try {
            console.log('getBuyerChats called');
            const { buyerId } = req.params;
            console.log('Buyer ID:', buyerId);
            const chats = await Chat.find({ buyerId })
                .sort({ updatedAt: -1 }) // Sort by most recent first
                .exec();
            console.log('Found chats:', chats);
            res.json(chats);
            console.log('Chats sent to client');
        } catch (error) {
            console.error('Error fetching buyer chats:', error);
            res.status(500).json({ 
                message: 'Failed to fetch buyer chats', 
                error: error.message 
            });
        }
    },

    getSellerChats: async (req, res) => {
        try {
            const { sellerId } = req.params;
            const chats = await Chat.find({ sellerId });
            res.json(chats);
        } catch (error) {
            console.error('Error fetching seller chats:', error);
            res.status(500).json({ message: 'Failed to fetch seller chats', error: error.message });
        }
    },

    createChat: async (req, res) => {
        try {
            const chatData = req.body;
            console.log('Received chat data:', chatData);

            // Validate required fields
            if (!chatData.buyerId) {
                return res.status(400).json({ message: 'Buyer ID is required' });
            }
            if (!chatData.sellerId) {
                return res.status(400).json({ message: 'Seller ID is required' });
            }
            if (!chatData.negotiations?.[0]?.proposedBy?.userId) {
                return res.status(400).json({ message: 'Proposer ID is required' });
            }

            const newChat = new Chat(chatData);
            const savedChat = await newChat.save();

            // Try to emit socket event, but don't fail if it's not available
            try {
                if (socketService && typeof socketService.emitNewChat === 'function') {
                    socketService.emitNewChat(savedChat);
                }
            } catch (socketError) {
                console.warn('Socket emission failed:', socketError);
                // Continue execution - socket failure shouldn't stop the API response
            }

            res.status(201).json(savedChat);
        } catch (error) {
            console.error('Error creating chat:', error);
            
            if (error.name === 'ValidationError') {
                return res.status(400).json({
                    message: 'Validation Error',
                    errors: Object.keys(error.errors).reduce((acc, key) => {
                        acc[key] = error.errors[key].message;
                        return acc;
                    }, {})
                });
            }
            
            res.status(500).json({ 
                message: 'Failed to create chat', 
                error: error.message 
            });
        }
    },

    getAllChats: async (req, res) => {
        try {
            const chats = await Chat.find();
            res.json(chats);
        } catch (error) {
            res.status(500).json({ message: 'Failed to fetch chats', error: error.message });
        }
    },

    getChatById: async (req, res) => {
        try {
            const chat = await Chat.findById(req.params.id);
            if (!chat) {
                return res.status(404).json({ message: 'Chat not found' });
            }
            res.json(chat);
        } catch (error) {
            res.status(500).json({ message: 'Failed to fetch chat', error: error.message });
        }
    },

    getBuyNowDetails: async (req, res) => {
        try {
            const chat = await Chat.findById(req.params.id);
            if (!chat) {
                return res.status(404).json({ message: 'Buy now details not found' });
            }
            res.json(chat);
        } catch (error) {
            res.status(500).json({ message: 'Failed to fetch buy now details', error: error.message });
        }
    },

    negotiate: async (req, res) => {
        try {
            const chat = await Chat.findById(req.params.id);
            if (!chat) {
                return res.status(404).json({ message: 'Chat not found' });
            }

            chat.negotiations.push(req.body);
            await chat.save();

            if (socketService) {
                socketService.emitNegotiation(chat);
            }

            res.json(chat);
        } catch (error) {
            res.status(500).json({ message: 'Failed to negotiate', error: error.message });
        }
    },

    acceptDeal: async (req, res) => {
        try {
            const chat = await Chat.findById(req.params.id);
            if (!chat) {
                return res.status(404).json({ message: 'Chat not found' });
            }

            chat.status = 'accepted';
            await chat.save();

            if (socketService) {
                socketService.emitDealAccepted(chat);
            }

            res.json(chat);
        } catch (error) {
            res.status(500).json({ message: 'Failed to accept deal', error: error.message });
        }
    },

    rejectDeal: async (req, res) => {
        try {
            const chat = await Chat.findById(req.params.id);
            if (!chat) {
                return res.status(404).json({ message: 'Chat not found' });
            }

            chat.status = 'rejected';
            await chat.save();

            if (socketService) {
                socketService.emitDealRejected(chat);
            }

            res.json(chat);
        } catch (error) {
            res.status(500).json({ message: 'Failed to reject deal', error: error.message });
        }
    },

    getBuyerChatStats: async (req, res) => {
        try {
            const { buyerId } = req.params;
            const stats = {
                total: await Chat.countDocuments({ buyerId }),
                active: await Chat.countDocuments({ buyerId, status: 'active' }),
                accepted: await Chat.countDocuments({ buyerId, status: 'accepted' }),
                rejected: await Chat.countDocuments({ buyerId, status: 'rejected' })
            };
            res.json(stats);
        } catch (error) {
            console.error('Error fetching buyer chat stats:', error);
            res.status(500).json({ 
                message: 'Failed to fetch chat statistics', 
                error: error.message 
            });
        }
    },

    getSellerChatStats: async (req, res) => {
        try {
            const { sellerId } = req.params;
            const stats = {
                total: await Chat.countDocuments({ sellerId }),
                active: await Chat.countDocuments({ sellerId, status: 'active' }),
                accepted: await Chat.countDocuments({ sellerId, status: 'accepted' }),
                rejected: await Chat.countDocuments({ sellerId, status: 'rejected' })
            };
            res.json(stats);
        } catch (error) {
            console.error('Error fetching seller chat stats:', error);
            res.status(500).json({ 
                message: 'Failed to fetch chat statistics', 
                error: error.message 
            });
        }
    }
};

// Initialize default chat (if needed)
const initializeDefaultChat = async () => {
    try {
        const defaultChat = await Chat.findOne({ isDefault: true });
        if (!defaultChat) {
            const newDefaultChat = new Chat({
                isDefault: true,
                productId: 'default',
                productName: 'Default Product',
                initialPrice: 0,
                sellerId: 'default',
                buyerId: 'default',
                status: 'active'
            });
            await newDefaultChat.save();
            console.log('Default chat initialized');
        }
    } catch (error) {
        console.error('Failed to initialize default chat:', error);
    }
};

// Initialize socket service
const setSocketService = (service) => {
    if (service && typeof service.emitNewChat === 'function') {
        socketService = service;
        console.log('Socket service initialized');
    } else {
        console.warn('Invalid socket service provided');
    }
};

// Export as a single object with named properties
module.exports = {
    chatController: chatController,  // Make sure this matches how we import it
    initializeDefaultChat,
    setSocketService
};