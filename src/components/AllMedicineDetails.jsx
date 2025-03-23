import { useEffect, useState, useCallback } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, CircularProgress, TextField, IconButton, Stack, Button, TablePagination } from "@mui/material";
import { ArrowUpward } from "@mui/icons-material";
import dayjs from "dayjs";

const API_URL = process.env.REACT_APP_API_URL;

const AllMedicineDetails = () => {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalRows, setTotalRows] = useState(0);

  const fetchMedicines = useCallback(() => {
    setLoading(true);
    fetch(`${API_URL}/api/medicine/get-medicine?page=${page + 1}&limit=${rowsPerPage}&search=${searchQuery}&sort=${sortOrder}`, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setMedicines(data.medicines);
        setTotalRows(data.total);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching medicines:", error);
        setLoading(false);
      });
  }, [page, rowsPerPage, searchQuery, sortOrder]);

  useEffect(() => {
    fetchMedicines();
  }, [fetchMedicines]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setPage(0);
  };

  const handleSort = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TableContainer component={Paper} sx={{ maxWidth: 1100, margin: "auto", mt: 4, p: 2 }}>
      <Typography variant="h5" align="center" gutterBottom>
        All Medicines
      </Typography>
      <Stack direction="row" spacing={2} sx={{ mb: 2, justifyContent: "center" }}>
        <TextField
          label="Medicine Name"
          variant="outlined"
          size="small"
          value={searchQuery}
          onChange={handleSearch}
        />
        <Button variant="contained" onClick={fetchMedicines} color="primary">Search</Button>
        <IconButton onClick={handleSort} color="primary">
          <ArrowUpward sx={{ transform: sortOrder === "asc" ? "none" : "rotate(180deg)" }} />
        </IconButton>
      </Stack>
      {loading ? (
        <CircularProgress sx={{ display: "block", margin: "auto" }} />
      ) : (
        <>
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
          <TablePagination
            component="div"
            count={totalRows}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </>
      )}
    </TableContainer>
  );
};

export default AllMedicineDetails;
