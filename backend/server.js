// import 'dotenv/config';
import express from 'express';
import prisma from "./src/config/database.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Start server
const server = app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


// Graceful shutdown
const gracefulShutdown = async () => {
  console.log('Starting graceful shutdown...');

  // Close server
  server.close(() => {
    console.log('Express server closed');
  });

  try {
    // Disconnect Prisma
    await prisma.$disconnect();
    console.log('Database connection closed');

    process.exit(0);
  } catch (err) {
    console.error('Error during shutdown:', err);
    process.exit(1);
  }
};

// Handle shutdown signals
process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);