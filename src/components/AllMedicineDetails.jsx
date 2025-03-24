import { useEffect, useState, useCallback } from "react";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, CircularProgress, TextField, Stack, Button, TablePagination, TableSortLabel
} from "@mui/material";
import dayjs from "dayjs";
import { useDebounce } from "../hooks/useDebounce";

const API_URL = process.env.REACT_APP_API_URL;

const AllMedicineDetails = () => {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalRows, setTotalRows] = useState(0);

  const searchQueryDebounced = useDebounce(searchQuery, 500);

  const fetchMedicines = useCallback(() => {
    setLoading(true);
    fetch(`${API_URL}/api/medicine/get-medicine?page=${page + 1}&limit=${rowsPerPage}&search=${searchQueryDebounced}&sort=MedicineName,${sortOrder}`, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
       
        setMedicines(data.medicines.sort((a, b) => {
          if (sortOrder === "asc") {
            return a.MedicineName.localeCompare(b.MedicineName);
          } else {
            return b.MedicineName.localeCompare(a.MedicineName);
          }
        }));
        setTotalRows(data.total);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching medicines:", error);
        setLoading(false);
      });
  }, [page, rowsPerPage, searchQueryDebounced, sortOrder]);

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
    <TableContainer component={Paper} sx={{ maxWidth: 1200, margin: "auto", mt: 4, p: 2 }}>
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
        <Button variant="contained" onClick={handleSort} color="secondary">Sort</Button>
      </Stack>
      {loading ? (
        <CircularProgress sx={{ display: "block", margin: "auto" }} />
      ) : (
        <>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ p: 2, textAlign: "center" }}>
                  <TableSortLabel active direction={sortOrder} onClick={handleSort}>
                    <b>Medicine Name</b>
                  </TableSortLabel>
                </TableCell>
                <TableCell sx={{ p: 2, pr: 4, textAlign: "center" }}><b>Manufacturer</b></TableCell>
                <TableCell sx={{ p: 2, pr: 4, textAlign: "center" }}><b>Expiry Date</b></TableCell>
                <TableCell sx={{ p: 2, pr: 4, textAlign: "center" }}><b>Selling Price</b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {medicines.map((medicine) => (
                <TableRow 
                  key={medicine._id} 
                  sx={{ '&:hover': { backgroundColor: '#f0f8ff' } }}
                >
                  <TableCell sx={{ p: 2, pr: 4, textAlign: "center" }}>{medicine.MedicineName}</TableCell>
                  <TableCell sx={{ p: 2, pr: 4, textAlign: "center" }}>{medicine.Manufacturer}</TableCell>
                  <TableCell sx={{ p: 2, pr: 4, textAlign: "center" }}>{dayjs(medicine.ExpiryDate).format("DD MMM YYYY")}</TableCell>
                  <TableCell sx={{ p: 2, pr: 4, textAlign: "center" }}>{medicine.SellingPrice}</TableCell>
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