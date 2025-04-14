import React, { useContext, useState } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
  Typography,
  Snackbar,
  Alert,
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
} from "@mui/material";
import { Logout } from "@mui/icons-material";
import { ThemeContext } from "@emotion/react";

const AdminDashboard = () => {
  const { themeMode} = useContext(ThemeContext);
  const navigate = useNavigate();

  const [logoutSuccess, setLogoutSuccess] = useState(false);
  const [confirmLogout, setConfirmLogout] = useState(false);

  const userName = localStorage.getItem("userName") || "Admin";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    setLogoutSuccess(true);
    setTimeout(() => {
      setLogoutSuccess(false);
      navigate("/auth");
    }, 2000);
  };

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
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
            height: "100vh",
            background: themeMode === "dark" ? "#30475E" : "#ffffff",
            color: themeMode === "dark" ? "#ffffff" : "black",
          },
        }}
      >
        <Box sx={{ textAlign: "center", mb: 2 }}>
          <img src="/image.png" alt="Cure Care Hospital" width="100" />
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Cure Care Hospital
          </Typography>
          <Typography variant="subtitle1" sx={{ mt: 1, fontWeight: "bold" }}>
            Admin Panel
          </Typography>
        </Box>

        <List>
          <ListItem
            component={Link}
            to="all-medicine"
            sx={{
              "&:hover": { backgroundColor: "#f0f0f0", borderRadius: "5px" },
            }}
          >
            <ListItemText primary="All Medicines" />
          </ListItem>
          <ListItem
            component={Link}
            to="add-medicine"
            sx={{
              "&:hover": { backgroundColor: "#f0f0f0", borderRadius: "5px" },
            }}
          >
            <ListItemText primary="Add Medicine" />
          </ListItem>
          <ListItem
            component={Link}
            to="medicinecashier"
            sx={{
              "&:hover": { backgroundColor: "#f0f0f0", borderRadius: "5px" },
            }}
          >
            <ListItemText primary="Medicine Cashier" />
          </ListItem>
          <ListItem
            component={Link}
            to="all-patients"
            sx={{
              "&:hover": { backgroundColor: "#f0f0f0", borderRadius: "5px" },
            }}
          >
            <ListItemText primary="All Patients" />
          </ListItem>
          <ListItem
            component={Link}
            to="patient-registration"
            sx={{
              "&:hover": { backgroundColor: "#f0f0f0", borderRadius: "5px" },
            }}
          >
            <ListItemText primary="Patient Registration" />
          </ListItem>
        </List>
      </Drawer>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          width: "1200px",
          marginLeft: "50px",
        }}
      >
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            background: "#f5f5f5",
            p: 2,
            boxShadow: 1,
          }}
        >
          <Typography variant="h6">{userName}</Typography>
          <Button
            onClick={() => setConfirmLogout(true)}
            variant="contained"
            color="error"
            startIcon={<Logout />}
          >
            Logout
          </Button>
        </Box>

        {/* Outlet for rendering pages */}
        <Box sx={{ p: 3 }}>
          <Outlet />
        </Box>
      </Box>

      {/* Logout Confirmation Dialog */}
      <Dialog open={confirmLogout} onClose={() => setConfirmLogout(false)}>
        <DialogTitle>Are you sure you want to log out?</DialogTitle>
        <DialogActions>
          <Button onClick={() => setConfirmLogout(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleLogout} color="primary" variant="contained">
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
        <Alert
          severity="success"
          sx={{ width: "100%", background: "#50C878", color: "#ffffff" }}
        >
          Logged out successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AdminDashboard;
