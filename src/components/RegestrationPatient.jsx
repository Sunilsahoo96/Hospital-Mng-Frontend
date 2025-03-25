import React, { useState, useEffect, useContext } from "react";
import { TextField, Button, Container, Typography, Box, Snackbar, Alert } from "@mui/material";
import ThemeContext from "../Context/ThemeContext";

const API_URL = process.env.REACT_APP_API_URL;

const generateUAN = (counter) => {
  const today = new Date();
  const formattedDate = today.toISOString().split("T")[0].replace(/-/g, "");
  return `${formattedDate}${counter}`;
};

function PatientRegistration() {
  const { themeMode } = useContext(ThemeContext);

  const [counter, setCounter] = useState(() => {
    return Number(localStorage.getItem("uanCounter")) || 1;
  });

  const [formData, setFormData] = useState({
    uan: "",
    patientName: "",
    guardianName: "",
    address: "",
    mobile: "",
    alternateMobile: "",
  });

  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      uan: generateUAN(counter),
    }));
  }, [counter]);

  useEffect(() => {
    setCounter((prev) => prev + 1);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/api/patient/registration`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSnackbar({ open: true, message: "Patient Registered Successfully!", severity: "success" });
        const newCounter = counter + 1;
        setCounter(newCounter);
        localStorage.setItem("uanCounter", newCounter);
        setFormData({
          uan: generateUAN(newCounter),
          patientName: "",
          guardianName: "",
          address: "",
          mobile: "",
          alternateMobile: "",
        });
      } else {
        const errorData = await response.json();
        setSnackbar({ open: true, message: errorData.message || "Registration failed", severity: "error" });
      }
    } catch (error) {
      setSnackbar({ open: true, message: "Error registering patient", severity: "error" });
      console.error("Registration error:", error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          mt: 4,
          p: 3,
          boxShadow: 3,
          borderRadius: 2,
          bgcolor: themeMode === "dark" ? "#333" : "#fff",
          color: themeMode === "dark" ? "#fff" : "#000",
        }}
      >
        <Typography variant="h5" gutterBottom>
          Patient Registration
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField fullWidth margin="normal" label="UAN Number" name="uan" value={formData.uan} disabled InputProps={{ style: { color: themeMode === "dark" ? "#fff" : "#000" } }} />
          <TextField fullWidth margin="normal" label="Patient Name" name="patientName" value={formData.patientName} onChange={handleChange} required InputProps={{ style: { color: themeMode === "dark" ? "#fff" : "#000" } }} />
          <TextField fullWidth margin="normal" label="Guardian Name" name="guardianName" value={formData.guardianName} onChange={handleChange} required InputProps={{ style: { color: themeMode === "dark" ? "#fff" : "#000" } }} />
          <TextField fullWidth margin="normal" label="Address" name="address" value={formData.address} onChange={handleChange} multiline rows={3} required InputProps={{ style: { color: themeMode === "dark" ? "#fff" : "#000" } }} />
          <TextField fullWidth margin="normal" label="Mobile Number" name="mobile" value={formData.mobile} onChange={handleChange} required InputProps={{ style: { color: themeMode === "dark" ? "#fff" : "#000" } }} />
          <TextField fullWidth margin="normal" label="Alternate Mobile Number" name="alternateMobile" value={formData.alternateMobile} onChange={handleChange} InputProps={{ style: { color: themeMode === "dark" ? "#fff" : "#000" } }} />
          <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
            Register
          </Button>
        </form>
      </Box>

      <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={() => setSnackbar({ ...snackbar, open: false })}>
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: "100%", bgcolor: themeMode === "dark" ? "#444" : "#50C878", color: "#fff" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default PatientRegistration;