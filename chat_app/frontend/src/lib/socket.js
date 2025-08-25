import { io } from "socket.io-client";

let socket = null;

export const connectSocket = (userId) => {
   console.log("Connecting socket with userId:", userId); 
  socket = io(import.meta.env.VITE_API_BASE_URL, {
    query: { userId },
    withCredentials: true, // ✅ send cookies
    transports: ["websocket"], // ✅ force WebSocket
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
