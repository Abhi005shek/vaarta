import { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token") || null;
    if (!token) return;
    navigate("/app");
  }, []);

  async function handleLogin(e) {
    e.preventDefault();

    const data = { username, email };
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const user = await response.json();
      localStorage.setItem("token", user.token);
      localStorage.setItem("theme", user?.theme);
      if (user.success) {
        navigate("/app");
        window.location.reload();
      }
    } catch (error) {
      console.log("Error while login: ", error);
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
          width: { xs: "70%", sm: "70%", md: "25%", lg: "25%" },
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

        <Typography
          variant="h4"
          sx={{
            fontSize: { xs: "1.5rem", sm: "1.5rem", md: "2rem", lg: "2rem" },
            textAlign: "center",
          }}
        >
          Login
        </Typography>

        <form
          onSubmit={handleLogin}
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
            Login
          </Button>
        </form>

        <Typography sx={{ textAlign: "center", marginTop: ".6rem" }}>
          Don't Have An Account? <Link to="/signup">Signup</Link>
        </Typography>
      </Paper>
    </Box>
  );
}

export default Login;
