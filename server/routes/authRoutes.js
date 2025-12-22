const express = require('express');
const router = express.Router();
const { authAdmin, logoutAdmin, getAdminProfile } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

router.post('/login', authAdmin);
router.post('/logout', logoutAdmin);
router.get('/profile', protect, getAdminProfile);

module.exports = router;
