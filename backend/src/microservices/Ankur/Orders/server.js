//main file for creating server in product service
//loading environment variables
require('dotenv').config();

const express = require('express');
const http = require('http');
const cors = require('cors');
const mongoose = require('mongoose');
const socketIO = require('socket.io');
const SocketService = require('./services/socket.service');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');

// Import routes
const chatRoutes = require('./routes/chat.routes');

// Initialize express app
const app = express();
const server = http.createServer(app);

// Configure CORS
app.use(cors({
    origin: "http://localhost:8080",  // Update this to match your test.html server
    methods: ["GET", "POST"],
    credentials: true
}));

// Initialize Socket.IO with proper configuration
const io = socketIO(server, {
    cors: {
        origin: "http://localhost:8080",  // Update this to match your test.html server
        methods: ["GET", "POST"],
        credentials: true,
        allowedHeaders: ["*"]
    },
    transports: ['websocket', 'polling'],
    allowEIO3: true,
    pingTimeout: 60000
});

// Initialize Socket Service
const socketService = new SocketService(io);
socketService.initialize();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api/chat', chatRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

// Add global error handler
process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

// Connect to MongoDB and start server
const startServer = async () => {
    try {
        await connectDB();
        const PORT = process.env.PORT || 5000;
        server.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};

startServer();

// Handle graceful shutdown
process.on('SIGTERM', () => {
    console.log('SIGTERM received. Shutting down gracefully...');
    server.close(() => {
        mongoose.connection.close(false, () => {
            console.log('Server closed. Exiting process...');
            process.exit(0);
        });
    });
});
