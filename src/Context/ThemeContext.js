import React, { createContext, useState, useMemo } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const ThemeContext = createContext();

export const ThemeProviderWrapper = ({ children }) => {
  const [themeMode, setThemeMode] = useState("light");

  const toggleTheme = () => {
    setThemeMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  // Define MUI theme with global font
  const theme = useMemo(
    () =>
      createTheme({
        palette: { mode: themeMode },
        typography: {
          fontFamily: `"Winky Sans", sans-serif`, // ✅ Apply globally via MUI
        },
        components: {
          MuiCssBaseline: {
            styleOverrides: {
              body: {
                fontFamily: `"Winky Sans", sans-serif`,
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
