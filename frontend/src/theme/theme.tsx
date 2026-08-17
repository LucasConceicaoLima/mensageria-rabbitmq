import { createTheme } from "@mui/material/styles";

export const getTheme = (mode: "light" | "dark") =>
  createTheme({
    typography: {
      fontFamily: '"Poppins", sans-serif',
    },

    palette: {
      mode,

      primary: {
        main: "#F97316",
        light: "#FB923C",
        dark: "#EA580C",
        contrastText: "#FFFFFF",
      },

      secondary: {
        main: "#F59E0B",
        light: "#FBBF24",
        dark: "#D97706",
        contrastText: "#2A211C",
      },

      background: {
        default: mode === "light" ? "#eeeeee" : "#121212",
        paper: mode === "light" ? "#ffffff" : "#1E1E1E",
      },

      info: {
        main: "#ffffff",
        dark: "#000001",
        contrastText: "#F97316",
      },
    },

    components: {
      MuiTableHead: { styleOverrides: { root: { background: "linear-gradient(90deg,#F97316,#F59E0B)", "& .MuiTableCell-root": { color: "#FFF", fontWeight: 700, borderBottom: 0, }, }, }, },
    }
  });