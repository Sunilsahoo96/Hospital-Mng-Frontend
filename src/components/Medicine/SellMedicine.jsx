import React, { useState } from "react";
import {
  TextField, Button, Container, Typography, Box, IconButton, MenuItem, Snackbar,
  Alert, Table, TableBody, TableCell, TableHead, TableRow
} from "@mui/material";
import { Add, ShoppingCart, RemoveCircle } from "@mui/icons-material";
import apiRequest from "../../api/api"; 

function SellMedicine() {
  const [uan, setUAN] = useState("");
  const [patient, setPatient] = useState(null);
  const [medicines, setMedicines] = useState([]);
  const [medicineOptions, setMedicineOptions] = useState([]);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  const fetchPatientDetails = async () => {
    try {
      const data = await apiRequest({ endpoint: `/api/patient/allPatient/${uan}` });
      setPatient({ name: data.patientName, mobile: data.mobile });
    } catch (error) {
      setSnackbar({ open: true, message: error.message || "Patient not found!", severity: "error" });
    }
  };

  const fetchMedicineList = async () => {
    try {
      const data = await apiRequest({ endpoint: "/api/medicine/get-medicine-name" });
      setMedicineOptions(data);
    } catch (error) {
      setSnackbar({ open: true, message: "Failed to load medicines", severity: "error" });
    }
  };

  const addMedicineRow = () => {
    fetchMedicineList();
    setMedicines([...medicines, { MedicineName: "", SellingPrice: 0, quantity: 1 }]);
  };

  const deleteMedicineRow = (index) => {
    const updated = medicines.filter((_, i) => i !== index);
    setMedicines(updated);
  };

  const handleMedicineChange = (index, name) => {
    const med = medicineOptions.find((m) => m.MedicineName === name);
    const updated = [...medicines];
    updated[index] = { ...updated[index], MedicineName: name, SellingPrice: med?.SellingPrice || 0 };
    setMedicines(updated);
  };

  const handleQuantityChange = (index, quantity) => {
    const updated = [...medicines];
    updated[index].quantity = quantity;
    setMedicines(updated);
  };

  const handleSellMedicine = async () => {
    if (!uan || !patient || medicines.length === 0) {
      setSnackbar({ open: true, message: "Missing required data!", severity: "error" });
      return;
    }

    try {
      const result = await apiRequest({
        endpoint: "/api/medicine/sell-medicine",
        method: "POST",
        data: {
          uan,
          patientName: patient.name,
          mobile: patient.mobile,
          medicines: medicines.map((m) => ({
            name: m.MedicineName,
            price: m.SellingPrice,
            quantity: m.quantity,
          }))
        }
      });

      setSnackbar({ open: true, message: result.message || "Medicines sold successfully!", severity: "success" });
      setMedicines([]);
    } catch (error) {
      setSnackbar({ open: true, message: error.message || "Failed to sell medicines", severity: "error" });
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4, p: 3, boxShadow: 3, borderRadius: 2, backgroundColor: "white" }}>
        <Typography variant="h5" gutterBottom>Sell Medicine</Typography>

        <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
          <TextField fullWidth label="Enter UAN" value={uan} onChange={(e) => setUAN(e.target.value)} />
          <Button variant="contained" color="primary" onClick={fetchPatientDetails}>Search</Button>
        </Box>

        {patient && (
          <Box sx={{ mt: 2, p: 2, backgroundColor: "#f5f5f5", borderRadius: 1 }}>
            <Typography><strong>Patient Name:</strong> {patient.name}</Typography>
            <Typography><strong>Mobile:</strong> {patient.mobile}</Typography>
          </Box>
        )}

        <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={addMedicineRow}><Add /></Button>

        {medicines.length > 0 && (
          <Table sx={{ mt: 2 }}>
            <TableHead>
              <TableRow>
                <TableCell>Medicine</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Total</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {medicines.map((medicine, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <TextField
                      select
                      fullWidth
                      value={medicine.MedicineName}
                      onChange={(e) => handleMedicineChange(index, e.target.value)}
                    >
                      {medicineOptions.length > 0 ? medicineOptions.map((med) => (
                        <MenuItem key={med.MedicineName} value={med.MedicineName}>
                          {med.MedicineName}
                        </MenuItem>
                      )) : <MenuItem disabled>No Medicines Available</MenuItem>}
                    </TextField>
                  </TableCell>
                  <TableCell>₹{medicine.SellingPrice}</TableCell>
                  <TableCell>
                    <TextField
                      type="number"
                      value={medicine.quantity}
                      onChange={(e) => handleQuantityChange(index, Number(e.target.value))}
                      inputProps={{ min: 1 }}
                      sx={{ width: "80px" }}
                    />
                  </TableCell>
                  <TableCell>₹{medicine.SellingPrice * medicine.quantity || 0}</TableCell>
                  <TableCell>
                    <IconButton color="success" onClick={handleSellMedicine}><ShoppingCart /></IconButton>
                    <IconButton color="error" onClick={() => deleteMedicineRow(index)}><RemoveCircle /></IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Box>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
      </Snackbar>
    </Container>
  );
}

export default SellMedicine;
