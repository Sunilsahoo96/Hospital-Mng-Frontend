import React, { useState, useEffect } from "react";
import {
  TextField, Button, Container, Typography, Box
} from "@mui/material";
import apiRequest from "../../api/api"; 
import CustomSnackbar from "../Snackbar";

const generatePUN = (counter) => {
  const today = new Date();
  const formattedDate = today.toISOString().split("T")[0].replace(/-/g, "");
  return `${formattedDate}${counter}`;
};

function PatientRegistration() {
  const [counter, setCounter] = useState(() => {
    return Number(localStorage.getItem("uanCounter")) || 1;
  });

  const [formData, setFormData] = useState({
    pun: "",
    patientName: "",
    guardianName: "",
    address: "",
    mobile: "",
    alternateMobile: "",
  });

  const [snackbar, setSnackbar] = useState({
    open: false, message: "", severity: "success"
  });

  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      pun: generatePUN(counter),
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
      const result = await apiRequest({
        endpoint: "/api/patient/registration",
        method: "POST",
        data: formData,
      });

      setSnackbar({
        open: true,
        message: result.message || "Patient Registered Successfully!",
        severity: "success",
      });

      const newCounter = counter + 1;
      setCounter(newCounter);
      localStorage.setItem("uanCounter", newCounter);

      setFormData({
        pun: generatePUN(newCounter),
        patientName: "",
        guardianName: "",
        address: "",
        mobile: "",
        alternateMobile: "",
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: error.message || "Error registering patient",
        severity: "error",
      });
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
          backgroundColor: "white",
        }}
      >
        <Typography variant="h5" gutterBottom>
          Patient Registration
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            label="PUN Number"
            name="pun"
            value={formData.pun}
            disabled
          />
          <TextField
            fullWidth
            margin="normal"
            label="Patient Name"
            name="patientName"
            value={formData.patientName}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Guardian Name"
            name="guardianName"
            value={formData.guardianName}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            multiline
            rows={3}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Mobile Number"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Alternate Mobile Number"
            name="alternateMobile"
            value={formData.alternateMobile}
            onChange={handleChange}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
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
