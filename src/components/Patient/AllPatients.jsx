import React, { useState, useEffect } from "react";
import {
  Container, Typography, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Paper, Stack, TextField, Button
} from "@mui/material";
import apiRequest from "../../api/api"; 

const AllPatients = () => {
  const [patients, setPatients] = useState([]);
  const [searchName, setSearchName] = useState("");
  const headers = [
    "PUN Number",
    "Patient Name",
    "Guardian Name",
    "Address",
    "Mobile",
    "Alternate Mobile",
  ];

  const fetchPatients = async () => {
    try {
      const endpoint = searchName
        ? `/api/patient/allPatient?patientName=${encodeURIComponent(searchName)}`
        : `/api/patient/allPatient`;

      const data = await apiRequest({ endpoint });
      setPatients(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching patients:", error.message);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  const handleSearch = () => {
    fetchPatients();
  };

  return (
    <Container maxWidth="md">
      <TableContainer
        component={Paper}
        sx={{ maxWidth: 1200, margin: "auto", mt: 4, p: 2 }}
      >
        <Typography variant="h5" gutterBottom sx={{ mt: 4, mb: 2 }}>
          All Patients
        </Typography>
        <Stack
          direction="row"
          spacing={2}
          sx={{ mb: 2, justifyContent: "center" }}
        >
          <TextField label="Patient Name" variant="outlined" size="small" />
          <Button variant="contained" color="primary">
            Search
          </Button>
        </Stack>
        <Table>
          <TableHead>
            <TableRow>
              {headers.map((label, index) => (
                <TableCell key={index}>
                  <strong>{label}</strong>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {patients.map((patient, index) => (
              <TableRow key={index}>
                <TableCell>{patient.pun}</TableCell>
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
