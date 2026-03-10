const User = require('../models/User');
const Property = require('../models/Property');

// @desc    Get user bookmarks
// @route   GET /api/bookmarks
// @access  Private
const getBookmarks = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);

        const bookmarks = await Property.find({ _id: { $in: user.bookmarks } });

        res.json(bookmarks);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Add/Remove bookmark
// @route   POST /api/bookmarks
// @access  Private
const toggleBookmark = async (req, res) => {
    try {
        const { propertyId } = req.body;

        const user = await User.findById(req.user.id);

        let isBookmarked = user.bookmarks.includes(propertyId);

        let message;

        if (isBookmarked) {
            // If already bookmarked, remove it
            user.bookmarks.pull(propertyId);
            message = 'Bookmark removed successfully';
            isBookmarked = false;
        } else {
            // If not bookmarked, add it
            user.bookmarks.push(propertyId);
            message = 'Bookmark added successfully';
            isBookmarked = true;
        }

        await user.save();

        res.json({ message, isBookmarked });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Check if property is bookmarked
// @route   GET /api/bookmarks/check/:propertyId
// @access  Private
const checkBookmark = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);

        const isBookmarked = user.bookmarks.includes(req.params.propertyId);

        res.json({ isBookmarked });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    getBookmarks,
    toggleBookmark,
    checkBookmark,
};