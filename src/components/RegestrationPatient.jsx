import React, { useState, useEffect } from "react";
import { TextField, Button, Container, Typography, Box } from "@mui/material";

let counter = 1;

const generateUAN = () => {
  const today = new Date();
  const formattedDate = today.toISOString().split("T")[0].replace(/-/g, "");
  return `${formattedDate}${counter}`;
};

function PatientRegistration(){
  const [formData, setFormData] = useState({
    uan: "",
    patientName: "",
    guardianName: "",
    address: "",
    mobile: "",
    alternateMobile: "",
  });

  useEffect(() => {
    setFormData((prevData) => ({ ...prevData, uan: generateUAN() }));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:4545/api/patients", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData),
      });

      if(response.ok) {
        alert("Patient Registered Successfully!");
        // Reset form
        setFormData({
          uan: generateUAN(),
          patientName: "",
          guardianName: "",
          address: "",
          mobile: "",
          alternateMobile: "",
        });
      }
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4, p: 3, boxShadow: 3, borderRadius: 2 }}>
        <Typography variant="h5" gutterBottom>
          Patient Registration
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            label="UAN Number"
            name="uan"
            value={formData.uan}
            disabled
            placeholder="Auto-generated UAN"
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
          <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
            Register
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default PatientRegistration;
