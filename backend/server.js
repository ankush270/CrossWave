// import 'dotenv/config';
import express from 'express';
import prisma from "./src/config/prisma_db.js";
import connectMongoDB from "./src/config/mongo_db.js";
import userRouter from "./src/routes/auth.js";
import cookieParser from "cookie-parser";

const app = express();
const PORT = process.env.PORT || 3000;


//Connect with MongoDB
connectMongoDB();

app.use(express.json());
app.use(cookieParser())

app.use('/user', userRouter)

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