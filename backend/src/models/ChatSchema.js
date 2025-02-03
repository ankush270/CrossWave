import mongoose from 'mongoose';

const ChatSchema = new mongoose.Schema({
    sellerId: { type: String, required: true },
    buyerId: { type: String, required: true },
    history: [
        {
            userType: { type: String, enum: ['sender', 'receiver'], required: true }, // Fixed typo
            message: { type: String },
            timestamp: { type: Date, default: Date.now },
            seen: { type: Boolean, default: false }
        }
    ],
    lastMessage: { type: String }, // Storing last message for quick access
}, { timestamps: true }); // Auto handles createdAt & updatedAt

ChatSchema.index({ sellerId: 1, buyerId: 1 }); // Indexing for faster queries

const Chat = mongoose.model('Chat', ChatSchema);
export default Chat;
