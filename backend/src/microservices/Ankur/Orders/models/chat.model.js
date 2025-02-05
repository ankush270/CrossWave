const mongoose = require('mongoose');

const negotiationSchema = new mongoose.Schema({
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    requirements: {
        type: String,
        required: true
    },
    proposedBy: {
        userId: {
            type: String,
            required: true
        },
        role: {
            type: String,
            required: true,
            enum: ['buyer', 'seller']
        }
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

const chatSchema = new mongoose.Schema({
    productId: {
        type: String,
        required: true
    },
    productName: {
        type: String,
        required: true
    },
    initialPrice: {
        type: Number,
        required: true
    },
    sellerId: {
        type: String,
        required: true
    },
    buyerId: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'rejected'],
        default: 'active'
    },
    negotiations: [negotiationSchema],
    finalPrice: Number,
    finalQuantity: Number,
    finalRequirements: String,
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Chat', chatSchema); 