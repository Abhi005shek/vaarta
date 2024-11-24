import { Avatar, Badge, Box, ListItem, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { decodeJWTToken } from "../utils/decodeToken";
import getSocket from "../utils/socket";
import { useParams } from "react-router-dom";
import axios from "axios";
import { axiosInstance } from "../utils/axiosInstance";
import AvatarView from "./AvatarView";
import { convertTo24HourFormat } from "../utils/dateFormater";
import { useTheme } from "../contect/themProvider";

function ChatListItem({
  isSidebar,
  setReceiver,
  onclick = {},
  name = "",
  lastmsg = "",
  id = null,
  chat = {},
}) {
  const navigate = useNavigate();
  const user = decodeJWTToken();
  const [isOpen, setIsOpen] = useState(false);
  const [recieverInfo, setreceiverInfo] = useState(null);
  const { data: room } = useParams();
  const theme = useTheme();
  const themeVal = localStorage.getItem("theme") || 0;

  // console.log("chat :", chat);

  useEffect(() => {
    const socket = getSocket();
    socket.emit("lastMsg", chat.lastmessage),
      socket.on("lastmessage", (data) => {
        // console.log(" sdfsdf ", data);
      });
  }, []);

  function chatname(name) {
    let c = name?.split("-");
    c = c?.filter((n) => user.username != n);

    return c?.join("");
  }

  function handleClick() {
    if (recieverInfo) {
      setReceiver({ ...recieverInfo });
    }
    navigate(`/app/${id ? id : chat._id}`);
    // window.location.reload();
    // onclick();
  }

  useEffect(() => {
    (async () => {
      let id = null;
      if (chat.type == "private") {
        id = chat.participants.find((ele) => ele !== user._id);
        // console.log("id : ", id);
      }
      const avatarInfo = await axiosInstance.post(
        `${import.meta.env.VITE_API_URL}avatarUrl`,
        { id }
      );

      setreceiverInfo(avatarInfo.data.avatarInfo);
      // console.log("AvatarInfo: ", avatarInfo.data.avatarInfo);
    })();
  }, []);

  return (
    <ListItem
      onClick={handleClick}
      style={{
        // display: {xs: !isSidebar ? "none" : "block", sm: !isSidebar ? "none" : "block", md: isSidebar ? "none" : "block"},
        cursor: "pointer",
        position: "relative",
        padding: ".6rem .5rem",
        listStyle: "none",
        display: "flex",
        alignItems: "center",
        gap: ".6rem",
        color: "white",
        borderBottom: `1px solid ${theme[themeVal]?.main}`,
      }}
    >
      {/* <Avatar src="http://static.zerochan.net/Dante.(Devil.May.Cry).full.797391.jpg"></Avatar> */}
      <Avatar
        onClick={() => setIsOpen(true)}
        src={recieverInfo?.avatarUrl ? recieverInfo.avatarUrl : ""}
        sx={{ width: "3.8rem", height: "3.8rem" }}
      />
      <div style={{ padding: ".4rem" }}>
        <Typography
          variant="h5"
          sx={{ fontWeight: "700", textTransform: "capitalize" }}
        >
          {chat.name ? chatname(chat.name) : name}
        </Typography>
        <Typography sx={{ color: "grey" }}>
          {chat.lastMsg
            ? chat.lastMsg.length < 40
              ? chat.lastMsg
              : chat.lastMsg.slice(0, 40) + "..."
            : lastmsg}
        </Typography>
      </div>
      <div
        style={{
          color: "lightgrey",
          textAlign: "right",
          right: 30,
          position: "absolute",
        }}
      >
        {/* <Badge badgeContent={4} color="warning"></Badge> */}
        <Typography>
          {chat.lastMsgTime ? convertTo24HourFormat(chat.lastMsgTime) : ""}
        </Typography>
      </div>

      <AvatarView
        name={chatname(chat.name)}
        src={recieverInfo?.avatarUrl ? recieverInfo.avatarUrl : ""}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </ListItem>
  );
}

export default ChatListItem;
