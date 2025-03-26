import React, { useContext, useState } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import {
    Drawer, List, ListItem, ListItemText, Box, Switch, Typography,
    IconButton, Menu, MenuItem, Dialog, DialogTitle, DialogActions, Button, Snackbar, Alert
} from "@mui/material";
import { AccountCircle, Logout } from "@mui/icons-material"; // Profile and Logout Icons
import ThemeContext from "../Context/ThemeContext";


const DashboardLayout = () => {
    const { themeMode, toggleTheme } = useContext(ThemeContext);
    const navigate = useNavigate();

    const [profileAnchor, setProfileAnchor] = useState(null);
    const [confirmLogout, setConfirmLogout] = useState(false);
    const [logoutSuccess, setLogoutSuccess] = useState(false);

    // Fetch user's name from localStorage (or API if needed)
    const userName = localStorage.getItem("userName") || "User";

    // Open Profile Menu
    const handleProfileClick = (event) => {
        setProfileAnchor(event.currentTarget);
    };

    // Close Profile Menu
    const handleProfileClose = () => {
        setProfileAnchor(null);
    };

    // Open Logout Confirmation Dialog
    const handleLogoutClick = () => {
        setConfirmLogout(true);
        handleProfileClose(); // Close the profile menu
    };

    // Confirm Logout
    const handleConfirmLogout = () => {
        setConfirmLogout(false);
        localStorage.removeItem("token"); // Remove user token
        localStorage.removeItem("userName"); // Remove user name (if stored)
        
        setLogoutSuccess(true); // Show success alert

        setTimeout(() => {
            setLogoutSuccess(false);
            navigate("/auth"); // Redirect to login page
        }, 2000);
    };

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
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        height: "100vh",
                        background: themeMode === "dark"
                            ? "radial-gradient(circle at 30% 30%, #30475E, #0D1B2A)" // 🌙 Dark Mode
                            : "#ffffff", // ☀️ Light Mode
                        color: themeMode === "dark" ? "" : "black",
                    },
                }}
            >
                {/* Hospital Name & Logo */}
                <Box sx={{ textAlign: "center", mb: 3 }}>
                    <img src="/image.png" alt="Hospital Logo" width="100" className="rounded rounded-5" />
                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                        Cure Care Hospital
                    </Typography>
                </Box>

                {/* Sidebar Links */}
                <List>
                    <ListItem
                        component={Link}
                        to="get-medicine"
                        sx={{
                            cursor: "pointer",
                            transition: "background 0.3s, transform 0.2s",
                            "&:hover": {
                                background: themeMode === "dark"
                                    ? "rgba(255, 255, 255, 0.1)" // Glow effect in dark mode
                                    : "rgba(0, 0, 0, 0.05)", // Light fading effect
                                transform: "scale(1.05)",
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

                {/* Bottom Section - Theme Toggle + Profile */}
                <Box sx={{ mt: "auto" }}>
                    {/* Theme Toggle */}
                    <ListItem>
                        <ListItemText primary="Dark Mode" />
                        <Switch checked={themeMode === "dark"} onChange={toggleTheme} />
                    </ListItem>

                    {/* Profile Button in Sidebar Bottom Right */}
                    <Box sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        alignItems: "center",
                        p: 2,
                        cursor: "pointer",
                        transition: "background 0.3s, transform 0.2s",
                        "&:hover": {
                            background: themeMode === "dark"
                                ? "rgba(255, 255, 255, 0.1)" // Glow effect
                                : "rgba(0, 0, 0, 0.05)",
                            transform: "scale(1.05)",
                        }
                    }} onClick={handleProfileClick}>
                        <IconButton color="inherit">
                            <AccountCircle />
                        </IconButton>
                        <Typography variant="body1">Profile</Typography>
                    </Box>
                </Box>
            </Drawer>

            {/* Main Content */}
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <Outlet />
            </Box>

            {/* Profile Menu */}
            <Menu
                anchorEl={profileAnchor}
                open={Boolean(profileAnchor)}
                onClose={handleProfileClose}
            >
                <MenuItem disabled>
                    <Typography variant="body1" sx={{ fontWeight: "bold",  color: themeMode === "dark" ? "#FFFFFF" : "#000000"}}>
                        {userName}
                    </Typography>
                </MenuItem>
                <MenuItem onClick={handleLogoutClick}>
                    <Logout sx={{ mr: 1 }} />
                    Logout
                </MenuItem>
            </Menu>

            {/* Logout Confirmation Dialog */}
            <Dialog open={confirmLogout} onClose={() => setConfirmLogout(false)}>
                <DialogTitle>Are you sure you want to log out?</DialogTitle>
                <DialogActions>
                    <Button onClick={() => setConfirmLogout(false)} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={handleConfirmLogout} color="primary" variant="contained">
                        Logout
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Logout Success Alert */}
            <Snackbar
                open={logoutSuccess}
                autoHideDuration={2000}
                onClose={() => setLogoutSuccess(false)}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
                <Alert severity="success" sx={{ width: "100%", background: "#50C878", color: "#ffffff" }}>
                    Logged out successfully!
                </Alert>
            </Snackbar>
            
        </Box>
    );
};

export default DashboardLayout;

