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
                    "& .MuiDrawer-paper": { width: 300, boxSizing: "border-box", p: 2 },
                }}
            >
                <Typography variant="h6" align="center" sx={{ mb: 2 }}>
                    Dashboard
                </Typography>
                <List>
                    <ListItem button component={Link} to="get-medicine">
                        <ListItemText primary="Medicine Details" />
                    </ListItem>
                    <ListItem button component={Link} to="patient-registration">
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
