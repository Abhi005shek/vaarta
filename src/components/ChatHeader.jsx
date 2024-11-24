import { Avatar, Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { decodeJWTToken } from "../utils/decodeToken";
import { axiosInstance } from "../utils/axiosInstance";
import { useTheme } from "../contect/themProvider";

function ChatHeader({ isSidebar, setIsSidebar, receiver, chatInfo }) {
  const [info, setInfo] = useState({});
  const user = decodeJWTToken();
  const theme = useTheme();
  const themeVal = localStorage.getItem("theme") || 0;
  const url = import.meta.env.VITE_API_URL;
  useEffect(() => {
    (async () => {
      let id = null;
      if (chatInfo?.type == "private") {
        id = chatInfo.participants.find((ele) => ele !== user._id);
        // console.log("id : ", id);
      }
      const avatarInfo = await axiosInstance.post(`${url}avatarUrl`, { id });

      setInfo(avatarInfo.data.avatarInfo);
      // console.log("AvatarInfo: ", avatarInfo.data.avatarInfo);
    })();
  }, [chatInfo]);

  return (
    <Box
      sx={{
        background: theme[themeVal]?.primary,
        alignItems: "center",
        gap: ".4rem",
        display: "flex",
        // border: "2px solid grey",
        padding: "1.2rem",
      }}
    >
      <Box
        onClick={() => setIsSidebar((prev) => !prev)}
        sx={{
          cursor: "pointer",
          display: {
            xs: !isSidebar ? "none" : "block",
            sm: !isSidebar ? "none" : "block",
            md: "none",
          },
        }}
      >
        <ArrowBackIcon />
      </Box>
      <Avatar src={info?.avatarUrl ? info.avatarUrl : ""}></Avatar>
      <Box>
        <Typography>{info?.username ? info.username : "Name"}</Typography>
        <Typography>
          {info?.type == "private" ? info.status : "offline"}
        </Typography>
      </Box>
    </Box>
  );
}

export default ChatHeader;
