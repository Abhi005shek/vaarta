import { Box, Button, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import SideBar from "../components/SideBar";
import NoChat from "../components/NoChat";
import getSocket from "../utils/socket";
import LogoutIcon from "@mui/icons-material/Logout";
import SettingsIcon from "@mui/icons-material/Settings";
import ProfileView from "../components/ProfileView";
import ThemeProvider, { useTheme } from "../contect/themProvider";

function Home() {
  const theme = useTheme();
  const navigate = useNavigate();
  const { data } = useParams();
  const [isSidebar, setIsSidebar] = useState(true);
  const [isProfile, setIsProfile] = useState(false);
  const [receiver, setReceiver] = useState(null);
  const themeVal = localStorage.getItem("theme") || 0;

  function handleClick() {
    const socket = getSocket();
    setIsProfile(true);
    console.log(socket);

    if (socket && socket.connected) {
      // socket.emit("joinPrivateChat", {
      //   userId1: "test@gmail.com",
      //   userId2: "test2@gmail.com",
      // });

      // socket.emit("joinPrivateChat", {
      //   userId1: "test@gmail.com",
      //   userId2: "dante@gmail.com",
      // });
    } else {
      console.error("Socket is not connected.");
      // Optionally, handle reconnection or show an error to the user
    }
  }

  function handleOut() {
    localStorage.clear();
    navigate("/login");
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("Token is not found, redirecting to /login...");
      navigate("/login");
    }
  }, []);

  return (
    <ThemeProvider>
      <Box
        sx={{
          display: "flex",
          height: "100vh",
        }}
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateRows: {
              xs: "1fr 4.5rem",
              sm: "1fr 4.5rem",
              md: !isSidebar ? "1fr 6rem" : "1fr 4.5rem",
              lg: !isSidebar ? "1fr 6rem" : "1fr 4.5rem",
            },
            // width: !isSidebar ? '30%' : '5%',
            width: {
              xs: isSidebar ? "0%" : "100%",
              sm: isSidebar ? "0%" : "100%",
              md: isSidebar ? "30%" : "5%",
              lg: isSidebar ? "30%" : "5%",
            },
            // border: "2px solid black",
            background: "#343a40",
            overflow: "hidden",
            height: "100%",
            // left: { sx: "0%" },
            // right: { sx: "0%" },
            position: {
              xs: "absolute",
              sm: "absolute",
              md: "relative",
              lg: "relative",
            },
            transition: "all .25s linear",
            zIndex: 100,
          }}
        >
          <SideBar
            isSidebar={isSidebar}
            setIsSidebar={setIsSidebar}
            setReceiver={setReceiver}
          />
          <Box
            sx={{
              display: {
                xs: isSidebar ? "none " : "flex",
                sm: isSidebar ? "none " : "flex",
                md: !isSidebar ? "block " : "flex",
              },
            }}
          >
            <Button
              startIcon={<SettingsIcon />}
              sx={{
                color: "white",
                width: "50%",
                borderRadius: 0,
              }}
              onClick={handleClick}
            >
              {isSidebar ? "Setting" : ""}
            </Button>
            <Button
              startIcon={<LogoutIcon />}
              variant="contained"
              style={{
                marginLeft: ".4rem",
                // width: "100%",
                // background: "crimson",
                background: theme[themeVal]?.main,
                width: "50%",
                borderRadius: 0,
              }}
              onClick={handleOut}
            >
              {isSidebar ? "Logout" : ""}
            </Button>
          </Box>
        </Box>
        <main style={{ flexGrow: 1 }}>
          {!data ? (
            <NoChat context={{ isSidebar, setIsSidebar }} />
          ) : (
            <Outlet context={{ isSidebar, setIsSidebar, receiver }} />
          )}
        </main>

        <ProfileView isOpen={isProfile} onClose={() => setIsProfile(false)} />
      </Box>
    </ThemeProvider>
  );
}

export default Home;
