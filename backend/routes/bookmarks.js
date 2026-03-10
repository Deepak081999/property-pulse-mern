const express = require('express');
const {
    getBookmarks,
    toggleBookmark,
    checkBookmark,
} = require('../controllers/bookmarkController');
const auth = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/bookmarks
// @desc    Get user bookmarks
// @access  Private
router.get('/', auth, getBookmarks);

// @route   GET /api/bookmarks/check/:propertyId
// @desc    Check if property is bookmarked
// @access  Private
router.get('/check/:propertyId', auth, checkBookmark);

// @route   POST /api/bookmarks
// @desc    Add/Remove bookmark
// @access  Private
router.post('/', auth, toggleBookmark);

module.exports = router;