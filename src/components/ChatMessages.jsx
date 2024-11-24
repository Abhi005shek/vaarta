import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import getSocket from "../utils/socket";
import { decodeJWTToken } from "../utils/decodeToken";
import "./message.css";
import axios from "axios";
import { convertTo24HourFormat } from "../utils/dateFormater";
import { Box, Button } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useTheme } from "../contect/themProvider";

function ChatMessages({ listEndRef, scrollToBottom, setChatInfo }) {
  const { data: room } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [msg, setMsg] = useState([]);
  const user = decodeJWTToken();
  const theme = useTheme();
  const themeVal = localStorage.getItem("theme") || 0;


  const axiosInstance = axios.create({
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  function checkForEmoji(message) {
    const inputText = message;
    const emojiRegex = /[\p{Emoji}\u200B\uFE0F]/gu;

    // Check if the input contains emojis
    return (
      message.length >= 1 && message.length <= 2 && emojiRegex.test(inputText)
    );
  }

  useEffect(() => {
    setMsg([]);
    // scrollToBottom();
    async function fetchHistory() {
      try {
        setIsLoading(true);
        const response = await axiosInstance.post(
          `${import.meta.env.VITE_API_URL}chathistory`,
          {
            room,
          }
        );
        // console.log("Fetched data: ", response.data);

        if (response.data.messages) {
          setMsg(response.data.messages);
          setChatInfo(response.data?.chatRoom);
          // console.log(response.data);
          scrollToBottom();
        }
        scrollToBottom();
      } catch (err) {
        if (err.response) {
          console.log("Error response:", err.response.data);
        } else if (err.request) {
          console.log("Error request:", err.request);
        } else {
          console.log("Error message:", err.message);
        }
      } finally {
        setIsLoading(false);
        scrollToBottom();
      }
    }

    const socket = getSocket();
    fetchHistory();
    scrollToBottom();
    socket.on("chatmsg", (d) => {
      // console.log("chatmsg: -> ", d);
      try {
        setMsg((prev) => {
          const updatedMessages = [...prev, d];
          return updatedMessages;
        });
      } catch (err) {
        console.error("Error updating messages:", err);
      }
    });
    return () => {
      socket.off("chatmsg");
    };
  }, [room]);

  return (
    <div style={{}}>
      {isLoading ? (
        <div
          style={{
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <p style={{ textAlign: "center" }}>Loading...</p>
        </div>
      ) : (
        <div
          style={{
            padding: ".6rem",
            fontFamily: "sans-serif",
            listStyle: "none",
            display: "flex",
            flexDirection: "column",
            width: "100%",
          }}
        >
          {msg?.map((m, i) => {
            return (
              <Box
                key={i}
                style={{
                  position: "relative",
                  marginBottom: ".4rem",
                  margin: m.sender === user._id ? ".4rem 1.5rem" : "",
                  // float: m.sender === user._id ? "right" : "left",
                  textAlign: m.sender === user._id ? "right" : "left",
                  justifySelf: m.sender === user._id ? "end" : "start",
                  padding: ".3rem",
                }}
              >
                <Box
                  className={m.sender === user._id ? "div-right" : "div-left"}
                  sx={{
                    // fontSize: checkForEmoji(m.messageText)
                    //   ? "2.6rem"
                    //   : "1.3rem",

                    "--primary-color" : theme[themeVal]?.primary,
                    "--secondary-color" : theme[themeVal]?.secondary,
                    fontSize: {
                      xs: checkForEmoji(m.messageText) ? "2rem" : "1rem",
                      sm: checkForEmoji(m.messageText) ? "2rem" : "1rem",
                      md: checkForEmoji(m.messageText) ? "2.6rem" : "1.3rem",
                      lg: checkForEmoji(m.messageText) ? "2.6rem" : "1.3rem",
                    },
                    maxWidth: "60%",
                    width: "fit-content",
                    // width: checkForEmoji(m.messageText) ? "8%" : "20%",
                    flexShrink: "1",
                    display: "inline-block",
                    wordWrap: "break-word",
                    overflowWrap: "break-word",
                    textAlign: checkForEmoji(m.messageText) ? "center" : "",
                    // background: m.sender === user._id ? "#9775fa" : "white",
                    background:
                      m.sender === user._id
                        ? theme[themeVal]?.primary
                        : theme[themeVal]?.secondary,
                    boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                    position: "relative",
                  }}
                >
                  <span>{m.messageText}</span>
                  <br></br>
                  <span
                    style={{
                      display: "inline-block",
                      width: "100%",
                      textAlign: "right",
                      color: "black",
                      fontSize: ".7rem",
                    }}
                  >
                    {convertTo24HourFormat(m.sentAt)}
                  </span>
                </Box>
              </Box>
            );
          })}
          <p ref={listEndRef} />
        </div>
      )}

      <Button
        onClick={scrollToBottom}
        variant="contained"
        sx={{
          background: theme[themeVal].secondary,
          position: "fixed",
          bottom: "9%",
          right: "1.2%",
        }}
      >
        <KeyboardArrowDownIcon sx={{ color: "black", fontSize: "1.6rem" }} />
      </Button>
    </div>
  );
}

export default ChatMessages;
