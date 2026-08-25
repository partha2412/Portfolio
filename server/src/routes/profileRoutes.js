// src/routes/profileRoutes.js
const express = require('express');
const router = express.Router();

// Destructure the exact exported function names
const { getProfile, updateProfile } = require('../controllers/profileController');

router.get('/', getProfile);
router.put('/', updateProfile);

module.exports = router;