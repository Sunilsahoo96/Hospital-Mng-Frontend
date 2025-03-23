import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, CircularProgress, TextField, IconButton, Stack, Button } from "@mui/material";
import { ArrowUpward } from "@mui/icons-material";
import dayjs from "dayjs";

const API_URL = process.env.REACT_APP_API_URL;

const AllMedicineDetails = () => {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [originalMedicines, setOriginalMedicines] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/api/medicine/get-medicine`, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setMedicines(data);
        setOriginalMedicines(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching medicines:", error);
        setLoading(false);
      });
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query === "") {
      setMedicines(originalMedicines);
    } else {
      const filteredMedicines = originalMedicines.filter((medicine) =>
        medicine.MedicineName.toLowerCase().includes(query.toLowerCase())
      );
      setMedicines(filteredMedicines);
    }
  };

  const performSearch = () => {
    const filteredMedicines = originalMedicines.filter((medicine) =>
      medicine.MedicineName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setMedicines(filteredMedicines);
  };

  const handleSort = () => {
    const sortedMedicines = [...medicines].sort((a, b) => {
      if (sortOrder === "asc") {
        return a.MedicineName.localeCompare(b.MedicineName);
      } else {
        return b.MedicineName.localeCompare(a.MedicineName);
      }
    });
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    setMedicines(sortedMedicines);
  };

  return (
    <TableContainer component={Paper} sx={{ maxWidth: 1100, margin: "auto", mt: 4, p: 2 }}>
      <Typography variant="h5" align="center" gutterBottom>
        All Medicines
      </Typography>
      <Stack direction="row" spacing={2} sx={{ mb: 2, justifyContent: "center" }}>
        <TextField
          label="Search Medicine"
          variant="outlined"
          size="small"
          value={searchQuery}
          onChange={handleSearch}
          onKeyDown={(e) => e.key === "Enter" && performSearch()}
        />
        <Button variant="contained" onClick={performSearch} color="primary">Search</Button>
        <IconButton onClick={handleSort} color="primary">
          <ArrowUpward sx={{ transform: sortOrder === "asc" ? "none" : "rotate(180deg)" }} />
        </IconButton>
      </Stack>
      {loading ? (
        <CircularProgress sx={{ display: "block", margin: "auto" }} />
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: 180 }}><b>Medicine Name</b></TableCell>
              <TableCell sx={{ width: 180 }}><b>Manufacturer</b></TableCell>
              <TableCell sx={{ width: 180 }}><b>Mfg Date</b></TableCell>
              <TableCell sx={{ width: 180 }}><b>Expiry Date</b></TableCell>
              <TableCell sx={{ width: 150 }}><b>Buying Price</b></TableCell>
              <TableCell sx={{ width: 150 }}><b>Selling Price</b></TableCell>
              <TableCell sx={{ width: 120 }}><b>Per Strip</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {medicines.map((medicine) => (
              <TableRow key={medicine._id} sx={{ '&:hover': { backgroundColor: '#f0f8ff' } }}>
                <TableCell>{medicine.MedicineName}</TableCell>
                <TableCell>{medicine.Manufacturer}</TableCell>
                <TableCell>{dayjs(medicine.MfgDate).format("DD MMM YYYY")}</TableCell>
                <TableCell>{dayjs(medicine.ExpiryDate).format("DD MMM YYYY")}</TableCell>
                <TableCell>{medicine.BuyingPrice}</TableCell>
                <TableCell>{medicine.SellingPrice}</TableCell>
                <TableCell>{medicine.MedicinePerStrip}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </TableContainer>
  );
};

export default AllMedicineDetails;