import React, { useRef, useState } from "react";
import MessageInput from "./MessageInput";
import ChatHeader from "./ChatHeader";
import { useOutletContext, useParams } from "react-router-dom";
import ChatMessages from "./ChatMessages";
import './scrollbar.css'
import { useTheme } from "../contect/themProvider";

function ChatSection() {
  const listEndRef = useRef(null);
  const context = useOutletContext();
  const [chatInfo, setChatInfo] = useState(null);
  const theme = useTheme();
  const themeVal = localStorage.getItem("theme") ?  localStorage.getItem("theme") :  0 ;


  const scrollToBottom = () => {
    if (listEndRef.current) {
      listEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      style={{
        position: "relative",
        border: "1px solid black",
        height: "100vh",
        display: "grid",
        gridTemplateRows: "5rem 1fr 3rem",
      }}
    >
      <ChatHeader isSidebar={context?.isSidebar} setIsSidebar={context?.setIsSidebar} receiver={context?.receiver} chatInfo={chatInfo}/>

      <div className="scrollable" style={{ overflowY: "scroll", overflowX:'hidden', background: theme[themeVal]?.bg, }}>
        <ChatMessages scrollToBottom={scrollToBottom} listEndRef={listEndRef} setChatInfo={setChatInfo} />
      </div>

      <div style={{height: '100%', background: 'grey'}}>
        <MessageInput scrollToBottom={scrollToBottom}/>
      </div>
    </div>
  );
}

export default ChatSection;
