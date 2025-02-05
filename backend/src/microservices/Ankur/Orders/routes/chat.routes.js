const express = require('express');
const router = express.Router();
const { chatController } = require('../controllers/chat.controller');

// Debug middleware
router.use((req, res, next) => {
    console.log('Chat Routes - Request:', {
        method: req.method,
        url: req.url,
        params: req.params,
        query: req.query
    });
    next();
});

// Get specific chats (more specific routes first)
router.get('/buyer/:buyerId/stats', chatController.getBuyerChatStats);
router.get('/buyer/:buyerId', chatController.getBuyerChats);
router.get('/seller/:sellerId/stats', chatController.getSellerChatStats);
router.get('/seller/:sellerId', chatController.getSellerChats);
router.get('/:id', chatController.getChatById);
router.get('/buy-now/:id', chatController.getBuyNowDetails);
router.get('/', chatController.getAllChats);

// Create chat routes
router.post('/create', chatController.createChat);
router.post('/', chatController.createChat);

// Negotiate and deal actions
router.post('/:id/negotiate', chatController.negotiate);
router.post('/:id/accept', chatController.acceptDeal);
router.post('/:id/reject', chatController.rejectDeal);

module.exports = router; 