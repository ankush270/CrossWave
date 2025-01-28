const Chat = require('../models/chat.model');

class SocketService {
    constructor(io) {
        this.io = io;
        this.activeUsers = new Map(); // userId -> socketId
        this.negotiations = new Map(); // chatId -> {sellerId, buyerId}
        this.defaultChat = null;
        this.initializeDefaultChat();
    }

    async initializeDefaultChat() {
        try {
            console.log('Initializing default chat...');
            let chat = await Chat.findOne({ productId: 'default_product' });
            
            if (!chat) {
                console.log('Creating new default chat...');
                chat = new Chat({
                    productId: 'default_product',
                    productName: 'Sample Product',
                    initialPrice: 1000,
                    sellerId: 'seller123',
                    buyerId: 'buyer123',
                    negotiations: [{
                        price: 1000,
                        quantity: 1,
                        proposedBy: {
                            userId: 'seller123',
                            role: 'seller'
                        }
                    }]
                });
                await chat.save();
            }
            
            this.defaultChat = chat;
            console.log('Default chat initialized with ID:', chat._id);
        } catch (error) {
            console.error('Error initializing default chat:', error);
        }
    }

    initialize() {
        this.io.on('connection', (socket) => {
            console.log('New client connected:', socket.id);

            socket.on('join_negotiation', async (data) => {
                console.log('Join negotiation request:', data);
                if (!this.defaultChat) {
                    console.log('Waiting for default chat to initialize...');
                    await this.initializeDefaultChat();
                }
                await this.handleJoinNegotiation(socket, this.defaultChat._id, data.role, data.userId);
            });

            // Handle new offer
            socket.on('make_offer', async (data) => {
                await this.handleNewOffer(socket, data);
            });

            // Handle accept
            socket.on('accept_offer', async (data) => {
                await this.handleAcceptOffer(socket, data);
            });

            // Handle reject
            socket.on('reject_offer', async (data) => {
                await this.handleRejectOffer(socket, data);
            });

            // Handle disconnection
            socket.on('disconnect', () => {
                this.handleDisconnect(socket);
            });
        });
    }

    async handleJoinNegotiation(socket, chatId, role, userId) {
        try {
            const chat = await Chat.findById(chatId);
            if (!chat) {
                socket.emit('error', { message: 'Negotiation not found' });
                return;
            }

            // Verify user role and ID
            if ((role === 'seller' && chat.sellerId !== userId) ||
                (role === 'buyer' && chat.buyerId !== userId)) {
                socket.emit('error', { message: 'Unauthorized access' });
                return;
            }

            socket.join(chatId);
            socket.userId = userId;
            socket.role = role;
            socket.chatId = chatId;

            this.activeUsers.set(userId, socket.id);
            
            // Notify room about user joining
            this.io.to(chatId).emit('user_joined', {
                userId,
                role,
                timestamp: new Date()
            });

            // Send current negotiation state
            socket.emit('negotiation_state', chat);
        } catch (error) {
            socket.emit('error', { message: error.message });
        }
    }

    async handleNewOffer(socket, data) {
        try {
            const { price, quantity } = data;
            const chatId = socket.chatId;
            const userId = socket.userId;
            const role = socket.role;

            const chat = await Chat.findById(chatId);
            if (!chat || chat.status !== 'active') {
                socket.emit('error', { message: 'Invalid negotiation' });
                return;
            }

            // Only validate that price and quantity are positive numbers
            if (price <= 0 || quantity <= 0) {
                socket.emit('error', { message: 'Price and quantity must be positive numbers' });
                return;
            }

            const newOffer = {
                price,
                quantity,
                proposedBy: {
                    userId: userId,
                    role: role
                }
            };

            chat.negotiations.push(newOffer);
            chat.updatedAt = new Date();
            await chat.save();

            this.io.to(chatId).emit('new_offer', {
                ...newOffer,
                productName: chat.productName,
                initialPrice: chat.initialPrice,  // Include initial price for reference
                timestamp: new Date()
            });
        } catch (error) {
            console.error('Error in handleNewOffer:', error);
            socket.emit('error', { message: error.message });
        }
    }

    async handleAcceptOffer(socket, data) {
        try {
            const chatId = socket.chatId;
            const userId = socket.userId;
            const role = socket.role;
            
            const chat = await Chat.findById(chatId);
            if (!chat || chat.status !== 'active') {
                socket.emit('error', { message: 'Invalid negotiation' });
                return;
            }

            const lastOffer = chat.negotiations[chat.negotiations.length - 1];
            
            // Prevent accepting own offer
            if (lastOffer.proposedBy.userId === userId) {
                socket.emit('error', { message: 'Cannot accept your own offer' });
                return;
            }

            chat.status = 'accepted';
            chat.finalPrice = lastOffer.price;
            chat.finalQuantity = lastOffer.quantity;
            chat.updatedAt = new Date();
            await chat.save();

            this.io.to(chatId).emit('offer_accepted', {
                acceptedBy: {
                    userId: userId,
                    role: role
                },
                productName: chat.productName,
                finalPrice: lastOffer.price,
                finalQuantity: lastOffer.quantity,
                timestamp: new Date()
            });
        } catch (error) {
            console.error('Error in handleAcceptOffer:', error);
            socket.emit('error', { message: error.message });
        }
    }

    async handleRejectOffer(socket, data) {
        try {
            const chatId = socket.chatId;
            const userId = socket.userId;
            const role = socket.role;
            
            const chat = await Chat.findById(chatId);
            if (!chat || chat.status !== 'active') {
                socket.emit('error', { message: 'Invalid negotiation' });
                return;
            }

            chat.status = 'rejected';
            chat.updatedAt = new Date();

            await chat.save();

            // Broadcast rejection to all participants
            this.io.to(chatId).emit('offer_rejected', {
                rejectedBy: {
                    userId: userId,
                    role: role
                },
                timestamp: new Date()
            });
        } catch (error) {
            socket.emit('error', { message: error.message });
        }
    }

    handleDisconnect(socket) {
        if (socket.userId) {
            this.activeUsers.delete(socket.userId);
            if (socket.chatId) {
                this.io.to(socket.chatId).emit('user_left', {
                    userId: socket.userId,
                    role: socket.role,
                    timestamp: new Date()
                });
            }
        }
        console.log('Client disconnected:', socket.id);
    }
}

module.exports = SocketService; 