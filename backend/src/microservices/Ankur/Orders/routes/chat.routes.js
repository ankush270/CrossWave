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

// IMPORTANT: Order matters! More specific routes first
router.get('/buy-now/:id', chatController.getBuyNowDetails);
router.post('/', chatController.createChat);
router.get('/', chatController.getAllChats);
router.get('/:id', chatController.getChatById);
router.post('/:id/negotiate', chatController.negotiate);
router.post('/:id/accept', chatController.acceptDeal);
router.post('/:id/reject', chatController.rejectDeal);

module.exports = router; 