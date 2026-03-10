const express = require('express');
const multer = require('multer');
const {
    getProperties,
    getProperty,
    createProperty,
    updateProperty,
    deleteProperty,
    getUserProperties,
    getFeaturedProperties,
    searchProperties,
} = require('../controllers/propertyController');
const auth = require('../middleware/auth');

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    },
});

const upload = multer({ storage: storage });

// @route   GET /api/properties
// @desc    Get all properties
// @access  Public
router.get('/', getProperties);

// @route   GET /api/properties/featured
// @desc    Get featured properties
// @access  Public
router.get('/featured', getFeaturedProperties);

// @route   GET /api/properties/search
// @desc    Search properties
// @access  Public
router.get('/search', searchProperties);

// @route   GET /api/properties/:id
// @desc    Get single property
// @access  Public
router.get('/:id', getProperty);

// @route   GET /api/properties/user/:userId
// @desc    Get user properties
// @access  Private
router.get('/user/:userId', auth, getUserProperties);

// @route   POST /api/properties
// @desc    Create new property
// @access  Private
router.post('/', auth, upload.array('images', 10), createProperty);

// @route   PUT /api/properties/:id
// @desc    Update property
// @access  Private
router.put('/:id', auth, updateProperty);

// @route   DELETE /api/properties/:id
// @desc    Delete property
// @access  Private
router.delete('/:id', auth, deleteProperty);

module.exports = router;