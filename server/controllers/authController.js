const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken');

const generateToken = (res, userId) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });

    res.cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Use secure cookies ONLY in production
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
    });
};

// @desc    Auth admin & get token
// @route   POST /api/auth/login
// @access  Public
const authAdmin = async (req, res) => {
    const { username, password } = req.body;

    const admin = await Admin.findOne({ username });

    if (admin && (await admin.matchPassword(password))) {
        generateToken(res, admin._id);
        res.json({
            _id: admin._id,
            username: admin.username
        });
    } else {
        res.status(401).json({ message: 'Invalid username or password' });
    }
};

// @desc    Logout admin / clear cookie
// @route   POST /api/auth/logout
// @access  Private
const logoutAdmin = (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        expires: new Date(0)
    });
    res.status(200).json({ message: 'Logged out successfully' });
};

// @desc    Get auth status
// @route   GET /api/auth/profile
// @access  Private
const getAdminProfile = async (req, res) => {
    const admin = {
        _id: req.admin._id,
        username: req.admin.username
    };
    res.status(200).json(admin);
};


module.exports = {
    authAdmin,
    logoutAdmin,
    getAdminProfile
};
