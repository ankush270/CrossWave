import "dotenv/config";
import express from "express";
import prisma from "./src/config/prisma_db.js";
import connectMongoDB from "./src/config/mongo_db.js";
import userRouter from "./src/routes/auth.js";
import profileRouter from "./src/routes/profile.js";
import productRouter from "./src/routes/product.js"
import cookieParser from "cookie-parser";
import cors from "cors";
import kycRouter from "./src/routes/kyc.js";
// import { extractText } from "./src/microservices/kyc/aadhaar.js";
// payment routes
import PaymentRoutes from "./src/routes/PaymentRoutes.js";
// chat routes
import ChatRoutes from "./src/routes/ChatRoutes.js";

import {
  verifyProduct,
  upload,
} from "./src/microservices/verify_product/verifyProduct.js";

const app = express();
const PORT = process.env.PORT || 3000;

// config .env
import dotenv from "dotenv";
dotenv.config();


// Import socket middleware and http
import { initializeSocket } from "./src/middlewares/socketio.js";
import http from "http";
const ioserver = http.createServer(app); // HTTP server
// Initialize Socket.IO
initializeSocket(ioserver);





//Connect with MongoDB
connectMongoDB();

app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true })); // Parse form data

app.use("/user", userRouter);
app.use("/kyc", kycRouter);
app.post("/verify-product", upload.array("files", 10), verifyProduct);
// app.post("/extract-text", extractText);
app.use("/user", userRouter);
app.use("/profile", profileRouter);
app.use("/payment", PaymentRoutes);
app.use('/chat', ChatRoutes);



// Start server
const SOCKETIO_PORT = PORT;
const server = app.listen(SOCKETIO_PORT, () => {
  console.log(`Server running on http://localhost:${SOCKETIO_PORT}`);
});

// Graceful shutdown
const gracefulShutdown = async () => {
  console.log("Starting graceful shutdown...");

  // Close server
  server.close(() => {
    console.log("Express server closed");
  });

  try {
    // Disconnect Prisma
    await prisma.$disconnect();
    console.log("Database connection closed");

    process.exit(0);
  } catch (err) {
    console.error("Error during shutdown:", err);
    process.exit(1);
  }
};

// Handle shutdown signals
process.on("SIGTERM", gracefulShutdown);
process.on("SIGINT", gracefulShutdown);
