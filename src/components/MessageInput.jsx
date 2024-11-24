import { Box, Button, Input, Popover } from "@mui/material";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import getSocket from "../utils/socket";
import SentimentVerySatisfiedIcon from "@mui/icons-material/SentimentVerySatisfied";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import EmojiPicker from "emoji-picker-react";
import SendSharpIcon from "@mui/icons-material/SendSharp";
import { useTheme } from "../contect/themProvider";

function MessageInput({ scrollToBottom }) {
  const { data } = useParams();
  const [msg, setMsg] = useState("");
  const [anchorEl, setAnchorEl] = useState(null); // anchorEl should be a DOM element or ref
  const [sendRotate, setSendRotate] = useState("-30deg");
  const [isSend, setIsSend] = useState(false);
  const [isEmoji, setIsEmoji] = useState(false);
  const theme = useTheme();
  const themeVal =  localStorage.getItem("theme") ||  0 ;


  // Open the emoji picker popover
  const handleEmojiClick = (event) => {
    setAnchorEl(event.currentTarget); // set the DOM element as anchor
  };

  // Close the emoji picker popover
  const handleCloseEmojiPicker = () => {
    setAnchorEl(null); // close the popover
  };

  // Insert selected emoji into the message
  const handleEmojiSelect = (emoji) => {
    // console.log(emoji);
    setMsg((prev) => prev + emoji.emoji);
    handleCloseEmojiPicker();
  };

  function handleSend(e) {
    e.preventDefault();
    const socket = getSocket();
    if (msg.trim().length > 0) {
      setIsSend(true);
      socket.emit("sendPrivateMessage", { room: data, message: msg });
      setMsg("");
      setTimeout(() => {
        setIsSend(false);
        scrollToBottom();
      }, 400);
    }
  }

  return (
    <>
      <Box
        sx={{
          display: "flex",
          height: "100%",
          overflow: "hidden",
          background: theme[themeVal]?.primary,
        }}
      >
        <Button
          style={{transition: "all .2s linear", height: "100%", padding: "0.8rem" }}
          onClick={handleEmojiClick}
          onMouseOver={() => setIsEmoji(true)}
          onMouseOut={() => setIsEmoji(false)}
          variant="warning"
        >
          {isEmoji ? (
            <SentimentVerySatisfiedIcon sx={{ color: "black",fontSize: "2rem" }} />
          ) : (
            <SentimentSatisfiedAltIcon sx={{ color: "black", fontSize: "1.8rem", }} />
          )}
        </Button>

        <Input
          value={msg}
          onChange={(e) => {
            setMsg(e.target.value);
          }}
          variant="standard"
          autoFocus
          style={{
            height: "100%",
            border: "none",
            outline: "none",
            fontSize: "1.2rem",
            padding: "0 .5rem",
            flexGrow: 1,
            borderRadius: 0,
            background: theme[themeVal]?.bg,
          }}
          placeholder="Type a Message..."
        />
        <Button
          onClick={handleSend}
          onMouseOver={() => setSendRotate("0deg")}
          onMouseOut={() => setSendRotate("-30deg")}
          sx={{ background: theme[themeVal]?.primary, height: "100%" }}
          variant="contained"
        >
          <SendSharpIcon
            sx={{
              transition: "all .1s linear",
              transform: isSend ? "translateX(50px)" : ` rotate(${sendRotate})`,
              fontSize: "1.5rem",
            }}
          />
        </Button>
      </Box>

      {/* Emoji Picker Popover */}
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleCloseEmojiPicker}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <EmojiPicker
          theme={"dark"}
          emojiStyle="facebook"
          open={true}
          lazyLoadEmojis={true}
          autoFocusSearch={false}
          onEmojiClick={handleEmojiSelect}
        />
      </Popover>
    </>
  );
}

export default MessageInput;
