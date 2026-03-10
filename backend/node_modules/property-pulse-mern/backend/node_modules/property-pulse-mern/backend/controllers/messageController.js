const Message = require('../models/Message');

// @desc    Get user messages
// @route   GET /api/messages
// @access  Private
const getMessages = async (req, res) => {
    try {
        const readMessages = await Message.find({ recipient: req.user.id, read: true })
            .sort({ createdAt: -1 })
            .populate('sender', 'username')
            .populate('property', 'name');

        const unreadMessages = await Message.find({
            recipient: req.user.id,
            read: false,
        })
            .sort({ createdAt: -1 })
            .populate('sender', 'username')
            .populate('property', 'name');

        const messages = [...unreadMessages, ...readMessages];

        res.json(messages);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Send message
// @route   POST /api/messages
// @access  Private
const sendMessage = async (req, res) => {
    const { name, email, phone, message, property, recipient } = req.body;

    try {
        // Can not send message to self
        if (req.user.id === recipient) {
            return res.status(400).json({ message: 'Can not send a message to yourself' });
        }

        const newMessage = new Message({
            sender: req.user.id,
            recipient,
            property,
            name,
            email,
            phone,
            body: message,
        });

        await newMessage.save();

        res.status(201).json({ message: 'Message Sent' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Mark message as read
// @route   PUT /api/messages/:id
// @access  Private
const markAsRead = async (req, res) => {
    try {
        const message = await Message.findById(req.params.id);

        if (!message) {
            return res.status(404).json({ message: 'Message not found' });
        }

        // Make sure user is recipient
        if (message.recipient.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        message.read = true;
        await message.save();

        res.json(message);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Delete message
// @route   DELETE /api/messages/:id
// @access  Private
const deleteMessage = async (req, res) => {
    try {
        const message = await Message.findById(req.params.id);

        if (!message) {
            return res.status(404).json({ message: 'Message not found' });
        }

        // Make sure user is recipient
        if (message.recipient.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        await message.remove();

        res.json({ message: 'Message removed' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Get unread message count
// @route   GET /api/messages/unread-count
// @access  Private
const getUnreadCount = async (req, res) => {
    try {
        const count = await Message.countDocuments({
            recipient: req.user.id,
            read: false,
        });

        res.json({ count });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    getMessages,
    sendMessage,
    markAsRead,
    deleteMessage,
    getUnreadCount,
};