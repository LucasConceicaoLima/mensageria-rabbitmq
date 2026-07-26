/* eslint-disable react-refresh/only-export-components */

import React, { createContext, useMemo, useState, useEffect } from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { getTheme } from "./theme";

interface ThemeContextType {
  toggleTheme: () => void;
  mode: "light" | "dark";
}

export const ThemeContext = createContext<ThemeContextType>({
  toggleTheme: () => {},
  mode: "light",
});

export const ThemeContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  const [mode, setMode] = useState<"light" | "dark">(() => {
    const saved = localStorage.getItem("themeMode");

    if (saved === "light" || saved === "dark") {
      return saved;
    }

    return prefersDark ? "dark" : "light";
  });

  const toggleTheme = () => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    localStorage.setItem("themeMode", mode);
  }, [mode]);

  const theme = useMemo(() => getTheme(mode), [mode]);

  return (
    <ThemeContext.Provider value={{ toggleTheme, mode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};