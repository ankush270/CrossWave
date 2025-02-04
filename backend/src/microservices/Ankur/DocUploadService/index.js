const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { connectDB } = require('./config/database');
const uploadRoutes = require('./routes/upload.routes');
const serviceConfig = require('./config/service.config');
const morgan = require('morgan');
const helmet = require('helmet');
const path = require('path');
const { findAvailablePort } = require('./config/service.config');
// const cors = require( "cors");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors())

// Security middleware
app.use(helmet({
    contentSecurityPolicy: false // This allows loading of resources
}));

// CORS configuration
app.use(cors({
    origin: serviceConfig.cors.origins,
    methods: serviceConfig.cors.methods,
    allowedHeaders: serviceConfig.cors.allowedHeaders
}));

// Logging middleware
app.use(morgan('combined'));

// Basic middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from public directory
app.use(express.static(path.join(__dirname, 'public')));

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({
        service: serviceConfig.service.name,
        version: serviceConfig.service.version,
        status: 'healthy',
        timestamp: new Date().toISOString()
    });
});

// API documentation endpoint
app.get('/api-docs', (req, res) => {
    res.json({
        service: serviceConfig.service.name,
        version: serviceConfig.service.version,
        endpoints: {
            upload: {
                path: `${serviceConfig.endpoints.base}${serviceConfig.endpoints.upload}`,
                method: 'POST',
                headers: ['X-User-Id', 'X-User-Email'],
                body: 'multipart/form-data'
            },
            list: {
                path: `${serviceConfig.endpoints.base}${serviceConfig.endpoints.get}`,
                method: 'GET',
                headers: ['X-User-Id', 'X-User-Email']
            },
            delete: {
                path: `${serviceConfig.endpoints.base}${serviceConfig.endpoints.delete}`,
                method: 'DELETE',
                headers: ['X-User-Id', 'X-User-Email']
            }
        }
    });
});

// Routes
app.use('/api/documents', uploadRoutes);

// Serve index.html for the root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        error: {
            message: err.message || 'Internal Server Error',
            code: err.code || 'INTERNAL_ERROR'
        }
    });
});

// Initialize Database Connection and Start Server
const startServer = async () => {
    try {
        await connectDB();
        
        const availablePort = await findAvailablePort(process.env.PORT || 3000);
        
        const server = app.listen(availablePort, () => {
            console.log(`${serviceConfig.service.name} is running on port ${availablePort}`);
        }).on('error', (err) => {
            if (err.code === 'EADDRINUSE') {
                console.log(`Port ${availablePort} is busy, trying ${availablePort + 1}`);
                server.listen(availablePort + 1);
            } else {
                console.error('Server error:', err);
            }
        });

        // Graceful shutdown
        process.on('SIGTERM', () => {
            console.log('SIGTERM signal received: closing HTTP server');
            server.close(() => {
                console.log('HTTP server closed');
                process.exit(0);
            });
        });

    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};

startServer();

// Export for testing
module.exports = app; 