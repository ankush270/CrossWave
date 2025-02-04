const net = require('net');

const findAvailablePort = (startPort) => {
  return new Promise((resolve, reject) => {
    const server = net.createServer();
    server.unref();
    server.on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        findAvailablePort(startPort + 1).then(resolve, reject);
      } else {
        reject(err);
      }
    });
    server.listen(startPort, () => {
      const { port } = server.address();
      server.close(() => {
        resolve(port);
      });
    });
  });
};

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

module.exports = {
    ...config,
    findAvailablePort
}; 