import { io } from "socket.io-client";

const SERVER_URL = import.meta.env.VITE_SOCKET_URL;
const token = localStorage.getItem("token");
let socket; // This will hold our socket instance

// Function to get the socket instance
const getSocket = () => {
  if (!socket) {
    socket = io(SERVER_URL, {
      query: { token },
      autoConnect: false, // Optional: prevents auto-connection at initialization
    });
    socket.on("connect", () => {
      // console.log("Socket connected:", socket.id); // Socket connected
    });

    socket.on("connect_error", (error) => {
      console.error("Connection error:", error.message);
    });

    socket.connect();
  }
  return socket; // Return the socket instance
};

export default getSocket; // Export the function
