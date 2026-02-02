const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Security Middlewares
const helmet = require('helmet');
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');

dotenv.config();

const app = express();

// Connect to Database
connectDB();

// --- SECURITY MIDDLEWARE STACK ---

// 1. Set Security HTTP Headers
app.use(helmet());

// 2. Body Parser (Reading data from body into req.body)
app.use(express.json({ limit: '10kb' })); // Limit body size
app.use(cookieParser());

// NO Sanitization Middleware (Incompatible with Express 5 currently)
// app.use(mongoSanitize());
// app.use(xss());
// app.use(hpp());

// 6. Rate Limiting (100 requests per 10 mins)
const limiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 minutes
    max: 100,
    message: 'Too many requests from this IP, please try again after 10 minutes'
});
app.use('/api', limiter);

// 7. CORS (Allow Credentials for Cookies)
app.use(cors({
    origin: (origin, callback) => {
        const allowedOrigin = process.env.FRONTEND_URL || 'http://localhost:5173';
        const isAllowed = origin === allowedOrigin || origin === allowedOrigin.replace(/\/$/, "");
        
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);

        if (isAllowed) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// --- ROUTES ---

app.get('/', (req, res) => {
    res.send('API is running securely...');
});

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/projects', require('./routes/projectRoutes'));
app.use('/api/messages', require('./routes/messageRoutes'));

// Global Error Handler
app.use((err, req, res, next) => {
    console.error("🔥 Global Error Handler:", err);
    res.status(500).json({
        message: err.message || 'Internal Server Error',
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
