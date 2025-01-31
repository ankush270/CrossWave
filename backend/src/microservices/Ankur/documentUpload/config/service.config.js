const config = {
    service: {
        name: 'document-service',
        version: '1.0.0',
    },
    cors: {
        origins: process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : ['http://localhost:3000'],
        methods: ['GET', 'POST', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'X-User-Id', 'X-User-Email', 'Authorization'],
    },
    upload: {
        maxFileSize: 10 * 1024 * 1024, // 10MB
        allowedTypes: ['image/jpeg', 'image/png', 'application/pdf', 'application/msword'],
        maxFiles: 10
    },
    endpoints: {
        base: '/api/documents',
        upload: '/upload',
        get: '/list',
        delete: '/:id'
    }
};

module.exports = config; 