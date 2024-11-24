import {
  Avatar,
  Box,
  Button,
  Input,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import ReactDOM from "react-dom";
import CloseIcon from "@mui/icons-material/Close";
import { decodeJWTToken } from "../utils/decodeToken";
import { useTheme } from "../contect/themProvider";
import { axiosInstance } from "../utils/axiosInstance";

// Modal Component
function ProfileView({ isOpen, onClose, name = "", src = "" }) {
  const user = decodeJWTToken();
  const theme = useTheme();
  const themeVal = localStorage.getItem("theme") || 0;

  const [val, setVal] = useState(() => localStorage.getItem("theme") || 0);

  async function handleTheme(val) {
    try {
      const res = axiosInstance.post(`${import.meta.env.VITE_API_URL}theme`, {
        value: val,
      });
      setVal(val);
      localStorage.setItem("theme", val);
    } catch (error) {
      console.log("Error occured while changing theme : ", error);
    } finally {
      onClose();
    }
  }

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div style={modalStyle} onClick={onClose}>
      <Box sx={modalContentStyle} onClick={(e) => e.stopPropagation()}>
        <div
          style={{
            // background: "rgba(0,0,0,0.6)",
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "flex-end",
            marginRight: "20px",
            width: "100%",
            position: "absolute",
            textAlign: "right",
            zIndex: 1000,
            color: "black",
          }}
        >
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
        <Box
          sx={{
            position: "relative",
            height: "25%",
            borderTopLeftRadius: "10px",
            borderTopRightRadius: "10px",
            background: theme[themeVal]?.main,
            gap: "10px",
            flexDirection: "column",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              flexDirection: "column",
              display: "flex",
              justifyContent: "center",
              top: "55%",
              position: "absolute",
              width: "100%",
              zIndex: 0,
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Avatar
                alt="Avatar"
                src={user?.avatarUrl}
                style={{
                  width: "6rem",
                  height: "6rem",
                  border: "5px solid white",
                  //   borderRadius: "0",
                }}
              />
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            flexGrow: 1,
            paddingLeft: "1rem",
            paddingRight: "3rem",
            // border: "1px solid",
            width: "90%",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            mt: "15%",
          }}
        >
          <Box>
            <Typography sx={{ textAlign: "left" }}>Username</Typography>
            <TextField
              fullWidth
              sx={{ color: "black" }}
              placeholder="example@gmail.com"
              value={user.username}
              disabled
            ></TextField>
          </Box>

          <Box>
            <Typography sx={{ textAlign: "left" }}>Email</Typography>
            <TextField
              fullWidth
              sx={{ color: "black" }}
              placeholder="example@gmail.com"
              value={user.email}
              disabled
            ></TextField>
          </Box>

          <Box>
            <Typography sx={{ textAlign: "left" }}>Theme</Typography>
            <Box
              sx={{
                flexWrap: "wrap",
                display: "flex",
                gap: ".5rem",
                justifyContent: "center",
              }}
            >
              {theme.map((e, i) => {
                return (
                  <Button
                    key={i}
                    onClick={() => handleTheme(i)}
                    variant="contained"
                    sx={{
                      background: e.main,
                      border: i == val ? `2px solid black` : "none",
                    }}
                  >
                    &nbsp;
                  </Button>
                );
              })}
            </Box>
          </Box>
        </Box>
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
  width: { xs: "20rem", sm: "20rem", md: "25rem", lg: "25rem" },
  height: { xs: "30rem", sm: "30rem", md: "32rem", lg: "32rem" },
  textAlign: "center",
  position: "relative",
  borderRadius: "10px",
  overflowY: "scroll",
  overflowX: "hidden",
  paddingBottom: ".7rem",
};

export default ProfileView;
