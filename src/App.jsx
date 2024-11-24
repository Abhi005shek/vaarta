import Login from "./pages/Login";
import { Navigate, Route, Routes } from "react-router-dom";
import SignUp from "./pages/Signup";
import Home from "./pages/Home";
import ChatSection from "./components/ChatSection";
import getSocket from "./utils/socket";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    const socket = getSocket(); // Initialize the socket connection
    // console.log(socket);
    return () => {
      socket.disconnect(); // Cleanup on unmount
    };
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" replace element={<Navigate to="/app" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/app" element={<Home />}>
          <Route path="/app/:data" element={<ChatSection />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
