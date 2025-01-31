const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { connectDB } = require('./config/database');
const uploadRoutes = require('./routes/upload.routes');
const serviceConfig = require('./config/service.config');
const morgan = require('morgan');
const helmet = require('helmet');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Security middleware
app.use(helmet());

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
app.use(serviceConfig.endpoints.base, uploadRoutes);

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
        
        const server = app.listen(PORT, () => {
            console.log(`${serviceConfig.service.name} is running on port ${PORT}`);
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