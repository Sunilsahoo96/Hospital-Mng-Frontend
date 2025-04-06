import React, { useState, useEffect } from "react";
import {
<<<<<<< HEAD
  Container, Typography, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Paper, Stack, TextField, Button
} from "@mui/material";
import apiRequest from "../../api/api"; 

const AllPatients = () => {
  const [patients, setPatients] = useState([]);
  const [searchName, setSearchName] = useState("");

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
=======
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Stack,
  TextField,
  Button,
} from "@mui/material";
import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL;

const AllPatients = () => {
  const [patients, setPatients] = useState([]);
  const headers = [
    "PUN Number",
    "Patient Name",
    "Guardian Name",
    "Address",
    "Mobile",
    "Alternate Mobile",
  ];
>>>>>>> 3dc968f1651efb0719b46db62e67176b7698754f

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
<<<<<<< HEAD

        <Stack direction="row" spacing={2} sx={{ mb: 2, justifyContent: "center" }}>
          <TextField
            label="Patient Name"
            variant="outlined"
            size="small"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
          />
          <Button variant="contained" color="primary" onClick={handleSearch}>
            Search
          </Button>
        </Stack>

=======
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
>>>>>>> 3dc968f1651efb0719b46db62e67176b7698754f
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
