import socketIo  from "socket.io";

let io; // Global Socket.IO instance

export const initializeSocket = (server) => {
  io = socketIo(server, {
    cors: {
      origin: ["http://localhost:3000" , 'http://localhost:5173'],
      methods: ["GET", "POST", "PUT", "DELETE"],
      credentials: true,
    },
  });

  console.log("Socket.IO initialized!");

  io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    socket.on("joinRoom", (userId) => {
      if (!userId) {
        console.error("Invalid userId received for room join.");
        return;
      }
      socket.join(userId.toString());
      console.log(`User with ID ${userId} joined room.`);
    });
    

    socket.on("disconnect", () => {
      console.log("A user disconnected:", socket.id);
    });
  });
};

export const sendNotification = (userId, message, orderId) => {
console.log("At the send Notificaion function.......................")

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

const getIO = () => io;

export default {  getIO };