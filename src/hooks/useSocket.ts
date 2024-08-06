import { useState, useEffect } from "react";
import { io, Socket } from "socket.io-client";

export const useSocket = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const socketInstance = io("http://localhost:4003", {
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    socketInstance.on("connect", () => {
      setIsConnected(true);
      console.log("Socket connected");
    });

    socketInstance.on("disconnect", (reason) => {
      setIsConnected(false);
      console.log(`Socket disconnected: ${reason}`);
    });

    socketInstance.on("connect_error", (error) => {
      console.error("Connection error:", error);
    });

    socketInstance.on("reconnect_attempt", (attempt) => {
      console.log(`Reconnection attempt #${attempt}`);
    });

    socketInstance.on("errorMessage", (message) => {
      console.error("Server error:", message);
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  return { socket, isConnected };
};
