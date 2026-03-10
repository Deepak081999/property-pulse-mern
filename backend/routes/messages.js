const express = require('express');
const {
    getMessages,
    sendMessage,
    markAsRead,
    deleteMessage,
    getUnreadCount,
} = require('../controllers/messageController');
const auth = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/messages
// @desc    Get user messages
// @access  Private
router.get('/', auth, getMessages);

// @route   GET /api/messages/unread-count
// @desc    Get unread message count
// @access  Private
router.get('/unread-count', auth, getUnreadCount);

// @route   POST /api/messages
// @desc    Send message
// @access  Private
router.post('/', auth, sendMessage);

// @route   PUT /api/messages/:id
// @desc    Mark message as read
// @access  Private
router.put('/:id', auth, markAsRead);

// @route   DELETE /api/messages/:id
// @desc    Delete message
// @access  Private
router.delete('/:id', auth, deleteMessage);

module.exports = router;