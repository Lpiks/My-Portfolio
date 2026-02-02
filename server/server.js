const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const xssSanitizer = require('./middleware/securityMiddleware');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Security Middlewares
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');

dotenv.config();

const app = express();

// Connect to Database
connectDB();

// --- SECURITY MIDDLEWARE STACK ---

// 1. Compression (Gzip)
app.use(compression());

// 2. CORS (Must be before other middleware)
app.use(cors({
    origin: (origin, callback) => {
        const allowedOrigins = [
            'http://localhost:5173',
            'http://localhost:3000',
            'https://abdelhadihammaz.netlify.app',
            process.env.FRONTEND_URL
        ].filter(Boolean);

        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);

        // Check if origin is allowed
        const isAllowed = allowedOrigins.some(o => origin === o || origin === o + '/');
        
        if (isAllowed) {
            callback(null, true);
        } else {
            console.log(`Blocked by CORS: ${origin}`); // Debug log
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// 3. Set Security HTTP Headers (Configured for Cross-Origin)
app.use(helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" }
}));

// 4. Body Parser (Reading data from body into req.body)
app.use(express.json({ limit: '10kb' })); // Limit body size
app.use(cookieParser());

// 5. Sanitization Middleware
// 5. Sanitization Middleware
// app.use(mongoSanitize()); // REMOVED: Incompatible with Express 5
app.use(xssSanitizer);       // Custom Middleware (Handles XSS & NoSQL Injection)
app.use(hpp());              // Prevent HTTP Parameter Pollution

// 6. Rate Limiting (100 requests per 10 mins)
const limiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 100,
    message: 'Too many requests from this IP, please try again after 10 minutes'
});
app.use('/api', limiter);

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
