const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const authController = require('../controllers/auth');
const {
  loginUserValidator,
  registerUserValidator,
} = require('../middleware/validators');

// @route   GET/auth
// @desc    Retrieve user
// @access  Private
router.get('/', auth, authController.getUser);

// @route   POST/auth/login
// @desc    Authenticate user & get token
// @access  Public
router.post('/login', loginUserValidator, authController.loginUser);

// @route   POST/auth/register
// @desc    Register, authenticate, & get token
// @access  Public
router.post('/register', registerUserValidator, authController.registerUser);

module.exports = router;
