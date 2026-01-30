import { io } from "socket.io-client";

let socket = null;

export const connectSocket = () => {
  if (socket) return socket;

  socket = io(import.meta.env.VITE_BACKEND_URL, {
    withCredentials: true,       // ✅ send HttpOnly cookie
    transports: ["websocket"],   // websocket only
  });

  socket.on("con", () => {
    console.log("Socket connected:", socket.id);
  });

  socket.on("disconnect", () => {
    console.log("Socket disconnected");
  });

  return socket;
};

export const getSocket = () => socket;

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};
