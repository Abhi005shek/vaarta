import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
// import {CssBaseLine} from "@mui/material"
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    {/* <CssBaseLine/> */}
    <App />
  </BrowserRouter>
);
