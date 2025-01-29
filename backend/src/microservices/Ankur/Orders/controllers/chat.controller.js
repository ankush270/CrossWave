const Chat = require('../models/chat.model');

const chatController = {
    // Start a new chat
    startChat: async (req, res) => {
        try {
            const { productId, sellerId, buyerId, initialPrice, initialQuantity } = req.body;
            
            const chat = new Chat({
                productId,
                sellerId,
                buyerId,
                negotiations: [{
                    price: initialPrice,
                    quantity: initialQuantity,
                    proposedBy: sellerId
                }]
            });

            await chat.save();
            res.status(201).json(chat);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Get chat details
    getChatById: async (req, res) => {
        try {
            const chat = await Chat.findById(req.params.id);
            if (!chat) {
                return res.status(404).json({ message: 'Chat not found' });
            }
            res.json(chat);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Submit new negotiation
    negotiate: async (req, res) => {
        try {
            const { price, quantity, userId } = req.body;
            const chat = await Chat.findById(req.params.id);
            
            if (!chat) {
                return res.status(404).json({ message: 'Chat not found' });
            }

            chat.negotiations.push({
                price,
                quantity,
                proposedBy: userId
            });
            chat.updatedAt = new Date();
            
            await chat.save();
            res.json(chat);
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
            chat.updatedAt = new Date();

            await chat.save();
            res.json(chat);
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
            chat.updatedAt = new Date();

            await chat.save();
            res.json(chat);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Get all chats
    getAllChats: async (req, res) => {
        try {
            const chats = await Chat.find()
                .sort({ updatedAt: -1 })
                .limit(10);  // Limit to last 10 chats for performance
            res.json(chats);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};

module.exports = chatController;