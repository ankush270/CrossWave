const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chat.controller');

// Add logging middleware
router.use((req, res, next) => {
    console.log(`${req.method} ${req.originalUrl}`);
    next();
});

// Start a new chat
router.post('/start', chatController.startChat);

// Get chat details
router.get('/:id', chatController.getChatById);

// Submit new negotiation
router.post('/negotiate/:id', chatController.negotiate);

// Accept deal
router.post('/accept/:id', chatController.acceptDeal);

// Reject deal
router.post('/reject/:id', chatController.rejectDeal);

// Get all chats
router.get('/', chatController.getAllChats);

module.exports = router; 