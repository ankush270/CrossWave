import { getIO } from "../middlewares/socketio.js"; // Import Socket.IO instance
import { PrismaClient } from "@prisma/client";
import Chat from "../models/ChatSchema.js"; // Your Mongoose chat model
import mongoose from "mongoose";

const prisma = new PrismaClient();

export const getOrCreateChat = async (req, res) => {
    console.log("getOrCreateChat function called at backend!");
    const { buyerId, sellerId } = req.body; // IDs from frontend
    
    const userId1 = buyerId;
    const userId2 = sellerId;

    console.log("userId1 :" , userId1);
    console.log("userId2 :" , userId2);


    try {
        // Fetch users from PostgreSQL (Prisma)
        const user1 = await prisma.user.findUnique({ where: { id: userId1 } });
        const user2 = await prisma.user.findUnique({ where: { id: userId2 } });

        if (!user1 || !user2) {
            return res.status(404).json({ error: "One or both users not found" });
        }

        // Determine roles (seller/buyer) based on Prisma user data
        let sellerId, buyerId;
        if (user1.is_seller) {
            sellerId = userId1;
            buyerId = userId2;
        } else {
            sellerId = userId2;
            buyerId = userId1;
        }

        // Check if a chat already exists in MongoDB
        let chat = await Chat.findOne({
            $or: [
                { sellerId, buyerId },
                { sellerId: buyerId, buyerId: sellerId } // Ensure both directions
            ]
        });

        // If chat doesn't exist, create a new one in MongoDB
        if (!chat) {
            chat = new Chat({ sellerId, buyerId, history: [] });
            await chat.save();
        }

        res.status(200).json({ success: true, chatId: chat._id, messages: chat.history });

    } catch (error) {
        console.error("Error finding/creating chat:", error);
        res.status(500).json({ error: "Server error" });
    }
};


export const getAllChats = async (req, res) => {
    const { userId } = req.query; 

    console.log("user Id is :", userId );

    if (!userId) {
        return res.status(400).json({ success: false, message: "User ID is required" });
    }

    try {
        // Find all chats where the user is a mentor
        const chats = await Chat.find({ sellerId: userId });

        if (!chats.length) {
            return res.status(404).json({ success: false, message: "No chats found" });
        }

        res.status(200).json({ success: true, chats });
    } catch (error) {
        console.error("Error fetching chats:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

export const getChat = async (req, res) => {
    const  {chatId}  = req.params;  // Extract chatId from query parameters

    console.log("Chat ID is:", chatId);

    if (!chatId) {
        return res.status(400).json({ success: false, message: "Chat ID is required" });
    }

    try {
        // ✅ Fetch chat by `chatId`
        const chat = await Chat.findById(chatId);

        if (!chat) {
            return res.status(404).json({ success: false, message: "Chat not found" });
        }

        res.status(200).json({ success: true, chat });
    } catch (error) {
        console.error("Error fetching chat:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};


export const sendMessage =  async (req, res) => {
    // console.log("ENter in the seneMessage funcion at backend : ");
    try {
        const { chatId, senderId, receiverId, role , message } = req.body;

        if (!chatId || !senderId || !receiverId || !message) {
            return res.status(400).json({ error: "Missing required fields" });
        }
       
        console.log("chatID is : " , chatId);
        // Find or create chat
        let chat = await Chat.findById({ _id: new mongoose.Types.ObjectId(chatId) });
        // console.log("current chat id is :" , chat);

        if (!chat) {
            return res.status(404).json({ error: "Chat not found" });
        }

        // Add message to chat history
        const newMessage = {
            userType: role === "mentor" ? "sender" : "receiver",
            message,
            timestamp: new Date(),
            seen: false,
        };

        chat.history.push(newMessage);
        chat.lastMessage = message;
        chat.updatedAt = new Date();
        await chat.save();

        // Emit message via WebSocket
        const io = getIO();
        io.to(receiverId.toString()).emit("receiveMessage", newMessage);

        res.status(200).json({ success: true, message: "Message sent successfully", newMessage });
    } catch (error) {
        console.error("Error sending message:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};