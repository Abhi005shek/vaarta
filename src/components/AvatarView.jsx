import { Avatar, Box, Typography } from "@mui/material";
import React from "react";
import ReactDOM from "react-dom";
import CloseIcon from "@mui/icons-material/Close";

// Modal Component
function AvatarView({ isOpen, onClose, name = "", src = "" }) {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div style={modalStyle} onClick={onClose}>
      <Box sx={modalContentStyle} onClick={(e) => e.stopPropagation()}>
        <div
          style={{
            background: "rgba(0,0,0,0.6)",
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            marginRight: "20px",
            width: "100%",
            position: "absolute",
            textAlign: "right",
            zIndex: 100,
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontSize: { xs: "1.6rem", sm: "1.6rem", md: "2rem" },
              color: "white",
              marginLeft: ".5rem",
              fontWeight: "700",
              textTransform: "capitalize",
            }}
          >
            {name}
          </Typography>
          <button
            style={{
              marginRight: "5px",
              cursor: "pointer",
              outline: "none",
              background: "transparent",
              border: "none",
            }}
            onClick={onClose}
          >
            <CloseIcon sx={{ color: "#fa5252", fontSize: "2rem" }} />
          </button>
        </div>
        <div style={{ height: "100%" }}>
          <Avatar
            alt="Avatar"
            src={src}
            style={{
              width: "100%",
              height: "100%",

              borderRadius: "0",
            }}
          />
        </div>
      </Box>
    </div>,
    document.getElementById("root")
  );
}

const modalStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
};

const modalContentStyle = {
  backgroundColor: "white",
  //   padding: "10px",
  borderRadius: "5px",
  width: { xs: "16rem", sm: "16rem", md: "25rem", lg: "25rem" },
  height: { xs: "16rem", sm: "16rem", md: "25rem", lg: "25rem" },
  textAlign: "center",
  position: "relative",
};

export default AvatarView;
