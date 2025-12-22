const express = require('express');
const router = express.Router();
const { createMessage, getMessages, markAsRead, deleteMessage } = require('../controllers/messageController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
    .post(createMessage)
    .get(protect, getMessages);

router.route('/:id')
    .delete(protect, deleteMessage);

router.put('/:id/read', protect, markAsRead);

module.exports = router;
