// socket.js
import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

// Used to store online users: { userId: socketId }
const userSocketMap = {};

// Configure Socket.io with CORS
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173", "https://letstalkchat.netlify.app"], // local + production
    methods: ["GET","POST","PUT","DELETE","OPTIONS"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  const userId = socket.handshake.query.userId;
  if (userId) {
    userSocketMap[userId] = socket.id;
  }

  // Notify all clients about online users
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);
    if (userId && userSocketMap[userId]) {
      delete userSocketMap[userId];
    }
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

// Helper function to get a specific user's socket ID
export function getReceiverSocketId(userId) {
  return userSocketMap[userId];
}

export { io, app, server };
