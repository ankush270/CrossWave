import React, { useState , useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaInbox, FaUserCircle, FaPaperPlane, FaSearch, 
  FaEllipsisV, FaRegStar, FaStar, FaCheck, FaCheckDouble 
} from 'react-icons/fa';
import DashboardBackground from '../common/DashboardBackground';

import axios from "axios";
import { io } from "socket.io-client";
import {useAuth} from '../../contexts/AuthContext';
const socket = io("http://localhost:3000" ,  {
  transports: ["websocket"], // ✅ Enforce WebSocket transport
  withCredentials: true,
}); // Connect to backend




const SellerMessages = () => {
  const [selectedChat, setSelectedChat] = useState("");
  const [searchQuery, setSearchQuery] = useState('');

  const {user} = useAuth();
  // const [userId , setUserId] = useEffect("");
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  // const [chatId, setChatId] = useState("");
  const userType = "seller"; 
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);

    // hard coded
    const buyerId = "4ca9eb87-9c1a-4ecf-8fc5-2ba1132223bc";
    const sellerId = "5fadbbd2-d0b8-4a6d-81c5-cb467cc4a1b7";

   // Extract user Id from user
       useEffect(() => {
           try {
            //  setUserId(user.id);
           } catch (error) {
             console.error("Invalid User Data", error);
           }
       }, []);

      
       useEffect(() => {
             try{
              if (buyerId && sellerId) {
               fetchAllChats();
             }
            }catch(e){

            }finally{
              setLoading(false);
            }
      }, [buyerId, sellerId]);

      const fetchAllChats = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/chat/get-all-chats?userId=${sellerId}`);
            
            if (response.data.success) {
                console.log("All chats:", response.data.chats);
                setChats(response.data.chats);
            }
        } catch (error) {
            console.error("Error fetching chats:", error);
        }
    };
    
   

      const fetchChatHistory = async () => {
        setLoading(true);

        console.log( " buyer id ", buyerId );
        console.log( " seller id ", sellerId );
        console.log( " seletedChat ", selectedChat );
         
        try {
          const { data } = await axios.get(`http://localhost:3000/chat/get-chat/${selectedChat}`);
          console.log(data);
          
          if (data.success) {
            //setChatId(response.data.chatId);
            setMessages(data.chat.history || []);
          }
        } catch (error) {
          console.error("Error fetching chat history:", error);
        }finally{
          setLoading(false);
        }
      };

          // Ensure socket joins the chat room after chatId is set
      useEffect(() => {
        if (selectedChat) {
          console.log(`Joining chat room: ${selectedChat}`);
          socket.emit("join_chat", { selectedChat });
        }
      }, [selectedChat]);
    
      // Listen for incoming messages
      useEffect(() => {
        if (!selectedChat) return;
        fetchChatHistory();
    
        const handleMessageReceive = (data) => {
          console.log("Received message:", data);
          setMessages((prevMessages) => [...prevMessages, data]); // ✅ Update messages correctly
        };
    
        socket.on("receiveMessage", handleMessageReceive);
    
        return () => {
          socket.off("receiveMessage", handleMessageReceive);
        };
      }, [selectedChat]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (message.trim() === "" || !selectedChat || !userType) {
      console.error("Missing required fields in sendMessage:", { selectedChat, userType, message });
      return;
    }

    let senderId = "", receiverId= "";
    if (userType === "seller") {
      senderId = sellerId;
      receiverId = buyerId;
    } else {
      senderId = buyerId;
      receiverId = sellerId;
    }
    
    const newMessage = { selectedChat, senderId, receiverId, role: userType, message };
     
    console.log("message :" , newMessage);
    
    socket.emit("sendMessage", newMessage);

    try {
      const response = await axios.post("http://localhost:3000/chat/send-message", newMessage);
      if (response.data.success) {
        setMessages((prev) => [...prev, response.data.newMessage]);
      } else {
        console.error("Message sending failed:", response.data.error);
      }
    } catch (error) {
      console.error("Error sending message:", error.response?.data || error.message);
    }

    setMessage("");
  };

  if(messages){
    console.log(messages);
  }

  if(loading){
    return <div>Loading....</div>
  }

  return (
    <div className="relative min-h-screen">
      <DashboardBackground />
      
      {/* Main Content */}
      <div className="relative z-10">
        <div className="h-[calc(100vh-120px)] bg-white/80 backdrop-blur-lg rounded-xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="grid grid-cols-12 h-full">
            {/* Chat List */}
            <div className="col-span-4 border-r border-gray-200">
              {/* Search */}
              <div className="p-4 border-b border-gray-200">
                <div className="relative">
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search messages..."
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              {/* Chats List */}
              <div className="overflow-y-auto h-[calc(100%-73px)]">
                {chats.map((chat) => (
                  <motion.div
                    key={chat._id}
                    whileHover={{ backgroundColor: 'rgba(59, 130, 246, 0.05)' }}
                    className={`p-4 cursor-pointer border-b border-gray-100 ${
                      selectedChat?.id === chat.id ? 'bg-blue-50' : ''
                    }`}
                    onClick={() => {
                      setLoading(true);
                      setSelectedChat(chat._id)
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <FaUserCircle className="text-4xl text-gray-400" />
                        {chat.seen === true && (
                          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                          {/* <h3 className="font-semibold truncate">{chat.user}</h3> */}
                          {/* <span className="text-xs text-gray-500">{chat.time}</span> */}
                        </div>
                        <p className="text-sm text-gray-600 truncate">{chat.lastMessage}</p>
                      </div>
                      {/* {chat.unread > 0 && (
                        <div className="bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                          {chat.unread}
                        </div>
                      )} */}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Chat Area */}
            <div className="col-span-8 flex flex-col">
              {selectedChat ? (
                <>
                  {/* Chat Header */}
                  <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <FaUserCircle className="text-4xl text-gray-400" />
                      <div>
                        <h3 className="font-semibold">{selectedChat.sellerId}</h3>
                        <span className="text-sm text-green-500">Online</span>
                      </div>
                    </div>
                    <button className="p-2 hover:bg-gray-100 rounded-full">
                      <FaEllipsisV className="text-gray-500" />
                    </button>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.map((msg) => (
                      <motion.div
                        key={msg._id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex ${msg.userType === 'seller' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`max-w-[70%] rounded-2xl px-4 py-2 ${
                          msg.userType === 'seller'
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-100'
                        }`}>
                          <p>{msg.message}</p>
                          <div className="flex items-center justify-end gap-1 mt-1">
                            <span className="text-xs opacity-70">{msg.time}</span>
                            {msg.userType === 'seller' && (
                              msg.status === 'read' ? <FaCheckDouble className="text-xs" /> : <FaCheck className="text-xs" />
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Message Input */}
                  <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Type your message..."
                      />
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type="submit"
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg flex items-center gap-2"
                      >
                        <FaPaperPlane />
                        Send
                      </motion.button>
                    </div>
                  </form>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center text-gray-500">
                  Select a chat to start messaging
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerMessages; 