import React, { useState } from "react";
import {
  TextField, Button, Container, Typography, Box, IconButton, MenuItem,
  Table, TableBody, TableCell, TableHead, TableRow, Card, CardContent
} from "@mui/material";
import { Add, ShoppingCart, RemoveCircle, PictureAsPdf } from "@mui/icons-material";
import apiRequest from "../../api/api";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import CustomSnackbar from "../Snackbar";


function SellMedicine() {
  const [pun, setPUN] = useState("");
  const [patient, setPatient] = useState(null);
  const [medicines, setMedicines] = useState([]);
  const [medicineOptions, setMedicineOptions] = useState([]);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  const fetchPatientDetails = async () => {
    try {
      const data = await apiRequest({ endpoint: `/api/patient/allPatient/${pun}` });
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
    if (!pun || !patient || medicines.length === 0) {
      setSnackbar({ open: true, message: "Missing required data!", severity: "error" });
      return;
    }

    try {
      const result = await apiRequest({
        endpoint: "/api/medicine/sell-medicine",
        method: "POST",
        data: {
          pun,
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
    } catch (error) {
      setSnackbar({ open: true, message: error.message || "Failed to sell medicines", severity: "error" });
    }
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    const logo = "/image.png"
    // Add logo and hospital name
    doc.addImage(logo, "PNG", 150, 5, 40, 20);
    doc.setFontSize(16);
    doc.text("Cure Care Multi-Speciality Hospital", 20, 20);

    // Patient Info
    doc.setFontSize(12);
    doc.text(`Patient Name: ${patient.name}`, 20, 30);
    doc.text(`Mobile: ${patient.mobile}`, 20, 36);

    // Table
    autoTable(doc, {
      startY: 45,
      head: [["Medicine", "Price", "Quantity", "Total"]],
      body: medicines.map(m => [
        m.MedicineName,
        m.SellingPrice,
        m.quantity,
        m.SellingPrice * m.quantity
      ]),
    });

    const totalAmount = medicines.reduce((sum, m) => sum + m.SellingPrice * m.quantity, 0);
    doc.text(`Grand Total: ${totalAmount}`, 20, doc.lastAutoTable.finalY + 10);

    doc.save(`${patient.name}-medicine-bill.pdf`);

    setMedicines([]);
    setPUN("");
    setPatient("");
  };

  const totalAmount = medicines.reduce((sum, m) => sum + m.SellingPrice * m.quantity, 0);

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4, p: 3, boxShadow: 3, borderRadius: 2, backgroundColor: "white" }}>
        <Typography variant="h5" gutterBottom>Sell Medicine</Typography>

        <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
          <TextField fullWidth label="Enter PUN" value={pun} onChange={(e) => setPUN(e.target.value)} />
          <Button variant="contained" color="primary" onClick={fetchPatientDetails}>Search</Button>
        </Box>

        {patient && (
          <Box sx={{ mt: 2, p: 2, backgroundColor: "#f5f5f5", borderRadius: 1 }}>
            <Typography><strong>Patient Name:</strong> {patient.name}</Typography>
            <Typography><strong>Mobile:</strong> {patient.mobile}</Typography>
          </Box>
        )}

        {patient && (
          <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={addMedicineRow}>
            <Add /> Add Medicine
          </Button>
        )}

        {medicines.length > 0 && (
          <>
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
                        select fullWidth value={medicine.MedicineName}
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
                        type="number" value={medicine.quantity}
                        onChange={(e) => handleQuantityChange(index, Number(e.target.value))}
                        inputProps={{ min: 1 }} sx={{ width: "80px" }}
                      />
                    </TableCell>
                    <TableCell>₹{medicine.SellingPrice * medicine.quantity || 0}</TableCell>
                    <TableCell>
                      <IconButton color="error" onClick={() => deleteMedicineRow(index)}>
                        <RemoveCircle />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <Card sx={{ mt: 3, backgroundColor: "#f1f8e9" }}>
              <CardContent>
                <Typography variant="h6">Bill Summary</Typography>
                <Typography><strong>Total:</strong> ₹{totalAmount}</Typography>
              </CardContent>
            </Card>

            <Box sx={{ mt: 2, display: "flex", gap: 2 }}>
              <Button
                variant="contained"
                color="success"
                startIcon={<ShoppingCart />}
                onClick={handleSellMedicine}
              >
                Sell Medicines
              </Button>
              <Button
                variant="outlined"
                startIcon={<PictureAsPdf />}
                onClick={generatePDF}
              >
                Download PDF
              </Button>
            </Box>
          </>
        )}
      </Box>

      <CustomSnackbar
        open={snackbar.open}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        message={snackbar.message}
        severity={snackbar.severity}
      />
    </Container>
  );
}

export default SellMedicine;
