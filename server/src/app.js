const express = require('express');
const cors = require('cors');

const profileRoutes = require('./routes/profileRoutes');
const contactRoutes = require('./routes/contactRoutes');

const app = express();

// Allowed origins (Local dev + process.env.CLIENT_URL)
const allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:3000',
    process.env.CLIENT_URL
].filter(Boolean);

// CORS setup
app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Blocked by CORS'));
        }
    },
    credentials: true
}));

// Body parser
app.use(express.json());

// Routes
app.use('/api/profile', profileRoutes);
app.use('/api/contact', contactRoutes);

module.exports = app;