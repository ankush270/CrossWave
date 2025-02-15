const Chat = require('../models/chat.model');

class SocketService {
    constructor(io) {
        this.io = io;
    }

    initialize() {
        this.io.on('connection', (socket) => {
            console.log('Client connected:', socket.id);

            socket.on('error', (error) => {
                console.error('Socket error:', error);
            });

            // Join a chat room
            socket.on('join_chat', (chatId) => {
                try {
                    socket.join(chatId);
                    console.log(`Socket ${socket.id} joined chat: ${chatId}`);
                    // Acknowledge join
                    socket.emit('joined_chat', chatId);
                } catch (error) {
                    console.error('Error joining chat:', error);
                    socket.emit('error', { message: 'Failed to join chat' });
                }
            });

            // Leave a chat room
            socket.on('leave_chat', (chatId) => {
                try {
                    socket.leave(chatId);
                    console.log(`Socket ${socket.id} left chat: ${chatId}`);
                    // Acknowledge leave
                    socket.emit('left_chat', chatId);
                } catch (error) {
                    console.error('Error leaving chat:', error);
                }
            });

            socket.on('disconnect', () => {
                console.log('Client disconnected:', socket.id);
            });
        });

        // Handle server-side errors
        this.io.engine.on('connection_error', (error) => {
            console.error('Connection error:', error);
        });
    }

    // Method to emit chat updates
    emitChatUpdate(chatId, updatedChat) {
        try {
            console.log('Emitting chat update for:', chatId);
            this.io.to(chatId).emit('chat_updated', updatedChat);
        } catch (error) {
            console.error('Error emitting chat update:', error);
        }
    }

    emitNewChat(chat) {
        if (this.io) {
            this.io.emit('new-chat', chat);
            console.log('Emitted new chat:', chat._id);
        } else {
            console.warn('Socket.io not initialized');
        }
    }

    emitNegotiation(chat) {
        if (this.io) {
            this.io.emit(`chat-${chat._id}-negotiation`, chat);
        }
    }

    emitDealAccepted(chat) {
        if (this.io) {
            this.io.emit(`chat-${chat._id}-accepted`, chat);
        }
    }

    emitDealRejected(chat) {
        if (this.io) {
            this.io.emit(`chat-${chat._id}-rejected`, chat);
        }
    }
}

module.exports = SocketService; 