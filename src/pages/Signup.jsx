import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

function SignUp() {
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const navigate = useNavigate();

  const token = localStorage.getItem("token") || null;
  useEffect(() => {
    if (token) {
      navigate("/app");
    }
  }, [token]);

  async function handleSignup(e) {
    e.preventDefault();
    console.log(username, email);

    const data = { username, email };
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const user = await response.json();
      localStorage.setItem("token", user.token);
      if (user.success) {
        navigate("/app");
      }
      console.log(user);
    } catch (error) {
      // if (error) {
      //   const { data } = error?.response;
      //   console.log("Error while signup: ", data?.message);
      // }
      console.log("Error while signup: ", error);
    }
  }

  return (
    <Box
      sx={{
        height: "100vh",
        flexDirection: "column",
        alignContent: "center",
        justifyItems: "center",
      }}
    >
      <Paper
        sx={{
          boxShadow: " rgba(0, 0, 0, 0.24) 0px 3px 8px",
          padding: ".8rem 1.5rem",
          paddingBottom: ".9rem",
          width: "25%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <img
            src="#"
            width={80}
            height={80}
            style={{ border: "2px solid black", borderRadius: "50%" }}
          ></img>
        </Box>
        <Typography variant="h4" sx={{ textAlign: "center" }}>
          Sign Up
        </Typography>
        <form
          onSubmit={handleSignup}
          style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
        >
          <div>
            <TextField
              sx={{ width: "100%" }}
              label="Username"
              placeholder="Enter Username"
              margin="normal"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div>
            <TextField
              style={{ width: "100%" }}
              label="Email"
              type="email"
              placeholder="Enter Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <Button sx={{ padding: ".5rem 0" }} type="submit" variant="contained">
            Sign Up
          </Button>
        </form>
        <Typography sx={{ textAlign: "center", marginTop: ".6rem" }}>
          Already Have An Account? <Link to="/login">Login</Link>
        </Typography>
      </Paper>
    </Box>
  );
}

export default SignUp;
