import React, { useContext } from "react";
import { Outlet, Link } from "react-router-dom";
import { Drawer, List, ListItem, ListItemText, Box, Switch, Typography } from "@mui/material";
import ThemeContext from "../Context/ThemeContext";

const DashboardLayout = () => {
    const { themeMode, toggleTheme } = useContext(ThemeContext);

    return (
        <Box sx={{ display: "flex" }}>
            {/* Sidebar */}
            <Drawer
                variant="permanent"
                sx={{
                    width: 240,
                    flexShrink: 0,
                    "& .MuiDrawer-paper": {
                        width: 300,
                        boxSizing: "border-box",
                        p: 2,
                        background: themeMode === "dark"
                            ? "radial-gradient(circle at 30% 30%, #30475E, #0D1B2A)" // 🌙 Dark Mode Background
                            : "#ffffff", // ☀️ Light Mode Background
                        color: themeMode === "dark" ? "white" : "black",
                    },
                }}
            >
                <Typography variant="h6" align="center" sx={{ mb: 2 }}>
                    Dashboard
                </Typography>

                <List>
                    <ListItem
                        component={Link}
                        to="get-medicine"
                        sx={{
                            cursor: "pointer",
                            transition: "background 0.3s, transform 0.2s",
                            "&:hover": {
                                background: themeMode === "dark"
                                    ? "rgba(255, 255, 255, 0.1)" // 🌙 Soft white glow in dark mode
                                    : "rgba(0, 0, 0, 0.05)", // ☀️ Light fading effect in light mode
                                transform: "scale(1.05)", // Smooth hover effect
                            },
                            borderRadius: "8px",
                        }}
                    >
                        <ListItemText primary="Medicine Details" />
                    </ListItem>

                    <ListItem
                        component={Link}
                        to="patient-registration"
                        sx={{
                            cursor: "pointer",
                            transition: "background 0.3s, transform 0.2s",
                            "&:hover": {
                                background: themeMode === "dark"
                                    ? "rgba(255, 255, 255, 0.1)"
                                    : "rgba(0, 0, 0, 0.05)",
                                transform: "scale(1.05)",
                            },
                            borderRadius: "8px",
                        }}
                    >
                        <ListItemText primary="Patient Registration" />
                    </ListItem>
                </List>

                {/* Theme Toggle */}
                <ListItem>
                    <ListItemText primary="Dark Mode" />
                    <Switch checked={themeMode === "dark"} onChange={toggleTheme} />
                </ListItem>
            </Drawer>

            {/* Main Content */}
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <Outlet />
            </Box>
        </Box>
    );
};

export default DashboardLayout;
