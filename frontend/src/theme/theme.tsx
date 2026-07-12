import { createTheme } from "@mui/material/styles";

export const getTheme = (mode: "light" | "dark") =>
  createTheme({
    typography: {
      fontFamily: '"Poppins", sans-serif',
    },

    palette: {
      mode,

      primary: {
        main: "#AA0506",
      },

      secondary: {
        main: "#000001",
      },

      background: {
        default: mode === "light" ? "#eeeeee" : "#121212",
        paper: mode === "light" ? "#ffffff" : "#1E1E1E",
      },

      info: {
        main: "#ffffff",
        dark: "#000001",
        contrastText: "#AA0506",
      },
    },
  });