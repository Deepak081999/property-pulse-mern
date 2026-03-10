const express = require('express');
const { check } = require('express-validator');
const { register, login, getUser } = require('../controllers/authController');
const auth = require('../middleware/auth');

const router = express.Router();

// @route   POST /api/auth/register
// @desc    Register user
// @access  Public
router.post(
    '/register',
    [
        check('email', 'Please include a valid email').isEmail(),
        check('username', 'Username is required').not().isEmpty(),
        check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
    ],
    register
);

// @route   POST /api/auth/login
// @desc    Authenticate user & get token
// @access  Public
router.post(
    '/login',
    [
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Password is required').exists(),
    ],
    login
);

// @route   GET /api/auth/user
// @desc    Get authenticated user
// @access  Private
router.get('/user', auth, getUser);

module.exports = router;