import React, { useState, useEffect } from "react";
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Stack, TextField, Button} from "@mui/material";
import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL;

const AllPatients = () => {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/patient/allPatient`);
        setPatients(response.data);
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    };

    fetchPatients();
  }, []);

  return (
    <Container maxWidth="md">
      <TableContainer component={Paper}  sx={{ maxWidth: 1200, margin: "auto", mt: 4, p: 2 }}>
      <Typography variant="h5" gutterBottom sx={{ mt: 4, mb: 2 }}>
        All Patients
      </Typography>
      <Stack direction="row" spacing={2} sx={{ mb: 2, justifyContent: "center" }}>
        <TextField
          label="Patient Name"
          variant="outlined"
          size="small"
        />
        <Button variant="contained" color="primary">Search</Button>
      </Stack>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>UAN Number</strong></TableCell>
              <TableCell><strong>Patient Name</strong></TableCell>
              <TableCell><strong>Guardian Name</strong></TableCell>
              <TableCell><strong>Address</strong></TableCell>
              <TableCell><strong>Mobile</strong></TableCell>
              <TableCell><strong>Alternate Mobile</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {patients.map((patient, index) => (
              <TableRow key={index}>
                <TableCell>{patient.uan}</TableCell>
                <TableCell>{patient.patientName}</TableCell>
                <TableCell>{patient.guardianName}</TableCell>
                <TableCell>{patient.address}</TableCell>
                <TableCell>{patient.mobile}</TableCell>
                <TableCell>{patient.alternateMobile}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default AllPatients;
