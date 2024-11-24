import React, { useContext } from "react";
import { createContext } from "react";

const themeArr = [
  {
    main: "crimson",
    primary: "#fa5252",
    secondary: "#ffa8a8",
    bg: "#fff4e6",
  },
  {
    main: "#6741d9",
    primary: "#7950f2",
    secondary: "#b197fc",
    bg: "#f3f0ff",
  },

  {
    main: "#1c7ed6",
    primary: "#228be6",
    secondary: "#74c0fc",
    bg: "#e7f5ff",
  },

  {
    main: "#37b24d",
    primary: "#40c057",
    secondary: "#8ce99a",
    bg: "#ebfbee",
  },

  {
    main: "#f76707",
    primary: "#fd7e14",
    secondary: "#ffc078",
    bg: "#fff4e6",
  },

  {
    main: "#343a40",
    primary: "#868e96",
    secondary: "#dee2e6",
    bg: "#f1f3f5",
  },

  {
    main: "#1098ad",
    primary: "#15aabf6",
    secondary: "#66d9e8",
    bg: "#e3fafc",
  },

  {
    main: "#9c36b5",
    primary: "#be4bdb",
    secondary: "#e599f7",
    bg: "#f8f0fc",
  },

  {
    main: "#f08c00",
    primary: "#fab005",
    secondary: "#ffe066",
    bg: "#fff9db",
  },
];

const Theme = createContext(themeArr);

function ThemProvider({ children }) {
  return <Theme.Provider value={themeArr}>{children}</Theme.Provider>;
}

export function useTheme() {
  const theme = useContext(Theme);
  return theme;
}

export default ThemProvider;
