import React, { createContext, useState, useMemo } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const ThemeContext = createContext();

export const ThemeProviderWrapper = ({ children }) => {
  const [themeMode, setThemeMode] = useState("light");

  const toggleTheme = () => {
    setThemeMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  // Define MUI theme
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: themeMode,
          background: { default: themeMode === "dark" ? "#121212" : "#fff" },
          text: { primary: themeMode === "dark" ? "#fff" : "#000" },
        },
        typography: {
          fontFamily: `"Winky Sans", sans-serif`,
          allVariants: {
            color: themeMode === "dark" ? "#fff" : "#000",
          },
        },
        components: {
          MuiCssBaseline: {
            styleOverrides: {
              body: {
                backgroundColor: themeMode === "dark" ? "#0D1B2A" : "#ffffff",
                backgroundImage: themeMode === "dark"
                ? "radial-gradient(circle at 30% 30%, #30475E, #0D1B2A)" // 🌙 Gradient Effect
                : "none",
                color: themeMode === "dark" ? "#fff" : "#000",
              },
            },
          },
        },
      }),
    [themeMode]
  );

  return (
    <ThemeContext.Provider value={{ themeMode, toggleTheme }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
