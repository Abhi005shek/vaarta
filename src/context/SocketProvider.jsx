import React, { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext();
function SocketProvider({ children }) {
  const [socket, setSocket] = useState(null);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!localStorage.getItem("socketId")) {
      const newSocket = io("http://localhost:5000/", {
        query: { token },
        transports: ["websocket"],
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
      });
      newSocket.connect();
      localStorage.setItem("socketId", JSON.stringify({newSocket}));
      setSocket(JSON.parse(localStorage.getItem('socketId')));

      newSocket.on("connect", () => {
        console.log("Socket Connected");
      });

      newSocket.on("connect_error", (error) => {
        console.error("Connection error:", error);
      });

      newSocket.on("connect_timeout", () => {
        console.log("Connection Timeout");
      });

      newSocket.on("error", (err) => {
        console.error("Socket error:", err);
      });
    }
    return () => {
      if (socket) {
        socket.off("connect");
        socket.disconnect();
      }
    };
  }, [socket]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
}

export function useSocket() {
  const socket = useContext(SocketContext);
  return socket;
}

export default SocketProvider;
