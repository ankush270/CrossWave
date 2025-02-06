//main file for creating server in product service
//loading environment variables

require("dotenv").config();
const express = require("express");
const http = require("http");
const cors = require("cors");
const mongoose = require("mongoose");
const socketIO = require("socket.io");
const SocketService = require("./services/socket.service");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const {
  chatController,
  initializeDefaultChat,
  setSocketService,
} = require("./controllers/chat.controller");

// Import routes
const chatRoutes = require("./routes/chat.routes");

// Initialize express app
const app = express();
const server = http.createServer(app);

// Configure CORS before other middleware
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "http://localhost:3000",
      "http://127.0.0.1:3000",
      "http://127.0.0.1:5173",
      "http://127.0.0.1:5174",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
    exposedHeaders: ["Content-Range", "X-Content-Range"],
    maxAge: 600, // Increase preflight cache time to 10 minutes
  })
);

// Initialize Socket.IO with proper configuration
const io = socketIO(server, {
  cors: {
    origin: ["http://localhost:5173", "http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  },
});

// Initialize Socket Service
const socketService = new SocketService(io);
socketService.initialize();

// Pass socket service to controller
setSocketService(socketService);

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Add this before your routes
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  console.log("Request params:", req.params);
  console.log("Request query:", req.query);
  next();
});

// Routes
app.use("/api/chats", chatRoutes);

// Add error logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res
    .status(500)
    .json({ message: "Something went wrong!", error: err.message });
});

// Add global error handler
process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
});

// Connect to MongoDB and start server
const startServer = async () => {
  try {
    console.log("Initializing default chat...");
    await connectDB();
    await initializeDefaultChat();

    const PORT = process.env.PORT || 5003;
    server.listen(PORT, () => {
      console.log(`Orders Service running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();

// Handle graceful shutdown
process.on("SIGTERM", () => {
  console.log("SIGTERM received. Shutting down gracefully...");
  server.close(() => {
    mongoose.connection.close(false, () => {
      console.log("Server closed. Exiting process...");
      process.exit(0);
    });
  });
});

// Development CORS configuration
app.use(
  cors({
    origin: true, // Allow all origins
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
