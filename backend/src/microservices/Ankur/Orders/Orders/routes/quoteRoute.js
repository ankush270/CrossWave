const express = require('express');
const router = express.Router();

// Import controllers
const {
  startChat,
  getChatById,
  negotiate,
  acceptDeal,
  rejectDeal,
} = require('../controllers/chatController');

// Middleware for authentication
const authMiddleware = require('../middleware/auth');

// Routes
// Start a new chat
router.post('/chats/start', authMiddleware, startChat);

// Get chat details
router.get('/chats/:id', authMiddleware, getChatById);

// Negotiate price and quantity
router.post('/chats/:id/negotiate', authMiddleware, negotiate);

// Accept the deal
router.put('/chats/:id/accept', authMiddleware, acceptDeal);

// Reject the deal
router.put('/chats/:id/reject', authMiddleware, rejectDeal);

module.exports = router;
