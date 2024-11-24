import { Box, List, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import ChatListItem from "./ChatListItem";
import "./sidebar.css";
import MenuIcon from "@mui/icons-material/Menu";

function SideBar({ isSidebar, setIsSidebar, setReceiver }) {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    async function fetchRooms() {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          console.error("No token found in localStorage");
          return;
        }

        const response = await fetch("http://localhost:5000/chatrooms", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Check if response is okay
        if (!response.ok) {
          throw new Error(`Error while fetching rooms: ${response.statusText}`);
        }
        const roomsData = await response.json();
        setChats(roomsData.chatRooms);

        // console.log("Rooms Data:", roomsData);
      } catch (error) {
        console.log("ERROR 💥💥:", error);
      }
    }

    fetchRooms();
  }, []);

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "1rem 1rem",
          overflow: "hidden",
          // border: "1px solid",
        }}
      >
        <Typography
          sx={{
            display: {
              xs: isSidebar ? "none" : "block",
              sm: isSidebar ? "none" : "block",
              md: !isSidebar ? "none" : "block",
              lg: !isSidebar ? "none" : "block",
            },
          }}
          variant="body"
          className="font"
        >
          VaartaLaap
        </Typography>
        <Box
          onClick={() => setIsSidebar((prev) => !prev)}
          sx={{
            display: {
              xs: isSidebar ? "none" : "block",
              sm: isSidebar ? "none" : "block",
              md: "block",
            },
            cursor: "pointer",
          }}
        >
          <MenuIcon style={{ color: "white", fontSize: "2rem" }} />
        </Box>
      </div>

      <Box sx={{}}>
        <List
          sx={{
            display: {
              xs: !isSidebar ? "block" : "none",
              sm: !isSidebar ? "block" : "none",
              md: !isSidebar ? "none" : "block",
              lg: !isSidebar ? "none" : "block",
            },
            margin: 0,
            padding: 0,
          }}
        >
          {chats.map((c) => {
            return (
              <ChatListItem
                isSidebar={isSidebar}
                onclick={() => setIsSidebar((p) => !p)}
                key={c._id}
                chat={c}
                setReceiver={setReceiver}
              />
            );
          })}
        </List>
      </Box>
    </div>
  );
}

export default SideBar;
