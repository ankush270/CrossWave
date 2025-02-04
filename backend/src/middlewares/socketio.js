import { Server } from "socket.io";

let io; // Global Socket.IO instance

export const initializeSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST", "PUT", "DELETE"],
      credentials: true,
    },
  });

  console.log("Socket.IO initialized!");

  io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    // Join a chat room based on chatId
    socket.on("join_chat", ({ chatId }) => {
      if (!chatId) {
        console.error("Invalid chatId received for room join.");
        return;
      }
      socket.join(chatId.toString());
      console.log(`Socket ${socket.id} joined chat room: ${chatId}`);
    });

    // Handle real-time messaging
    socket.on("sendMessage", (data) => {
      console.log("Received message data:", data);

      const { chatId, senderId, receiverId, message } = data;

      if (!chatId || !senderId || !receiverId || !message) {
        console.error("Invalid message data received:", data);
        return;
      }

      const newMessage = {
        chatId,
        senderId,
        receiverId,
        message,
        timestamp: new Date(),
      };

      console.log(`Message sent in chat ${chatId}:`, newMessage);

      // Emit message to the chat room (both users will receive it)
      io.to(chatId.toString()).emit("receiveMessage", newMessage);
    });

    // Handle disconnection
    socket.on("disconnect", () => {
      console.log(`A user disconnected: ${socket.id}`);
      socket.rooms.forEach((room) => {
        socket.leave(room);
        console.log(`Socket ${socket.id} left room: ${room}`);
      });
    });
  });
};

// Function to send real-time notifications
export const sendNotification = (userId, message, orderId) => {
  console.log("At the sendNotification function...");

  if (io) {
    console.log(`Notification sent to user: ${userId}`);
    io.to(userId.toString()).emit("newNotification", {
      message,
      orderId,
      date: new Date(),
    });
  } else {
    console.error("Socket.IO is not initialized.");
  }
};

// Ensure getIO() doesn't return undefined
export const getIO = () => {
  if (!io) {
    throw new Error("Socket.IO has not been initialized!");
  }
  return io;
};
