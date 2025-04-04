import React, { useState, useEffect } from "react";
import { TextField, Button, Container, Typography, Box, Snackbar, Alert } from "@mui/material";
import CustomSnackbar from "../Snackbar";
const API_URL = process.env.REACT_APP_API_URL;

const generateUAN = (counter) => {
  const today = new Date();
  const formattedDate = today.toISOString().split("T")[0].replace(/-/g, "");
  return `${formattedDate}${counter}`;
};

function PatientRegistration() {
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

  // Update UAN whenever counter changes
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
      <Box sx={{ mt: 4, p: 3, boxShadow: 3, borderRadius: 2, backgroundColor: "white" }}>
        <Typography variant="h5" gutterBottom>
          Patient Registration
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField fullWidth margin="normal" label="UAN Number" name="uan" value={formData.uan} disabled />
          <TextField fullWidth margin="normal" label="Patient Name" name="patientName" value={formData.patientName} onChange={handleChange} required />
          <TextField fullWidth margin="normal" label="Guardian Name" name="guardianName" value={formData.guardianName} onChange={handleChange} required />
          <TextField fullWidth margin="normal" label="Address" name="address" value={formData.address} onChange={handleChange} multiline rows={3} required />
          <TextField fullWidth margin="normal" label="Mobile Number" name="mobile" value={formData.mobile} onChange={handleChange} required />
          <TextField fullWidth margin="normal" label="Alternate Mobile Number" name="alternateMobile" value={formData.alternateMobile} onChange={handleChange} />
          <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
            Register
          </Button>
        </form>
      </Box>

      <CustomSnackbar
        open={snackbar.open}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        message={snackbar.message}
        severity={snackbar.severity}
        autoHideDuration={4000}
      />
    </Container>
  );
}

export default PatientRegistration;
