import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import cookie from "cookie";
import { handleChatEvents } from "../socketEvents/handelChatEvents.js";
import handelGroupEvents from "../socketEvents/handelGroupEvents.js";
let io;

export const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: process.env.FRONTEND_URL || "http://localhost:5173", // your Vite dev server
      credentials: true,
    },
    transports: ["websocket"], // force WebSocket
  });

io.use((socket, next) => {
  const cookieHeader = socket.handshake.headers.cookie || "";
  const cookies = cookie.parse(cookieHeader);
  const token = cookies["token"]; // your cookie name

  if (!token) return next(new Error("Unauthorized"));

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
   
    socket.userId = decoded.id._id;
    next();
  } catch (err) {
    next(new Error("Unauthorized"));
  }
});

  io.on("connection", (socket) => {
    const userId = socket.userId;
    console.log(`User connected: ${userId} (socket: ${socket.id})`);
    
    


// socket.emit("con", { message: "You are connected to the socket server" });  



handelGroupEvents(socket, io);

     handleChatEvents(socket, io);

    socket.on("disconnect", () => {
      console.log(`User disconnected: ${userId} (socket: ${socket.id})`);
    });

// getSocket(socket);
    

  });
}




export { io };
