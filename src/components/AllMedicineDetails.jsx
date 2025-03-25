import { useEffect, useState, useCallback,useContext } from "react";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, CircularProgress, TextField, Stack, Button, TablePagination, TableSortLabel
} from "@mui/material";
import dayjs from "dayjs";
import { useDebounce } from "../hooks/useDebounce";
import ThemeContext from "../Context/ThemeContext";

const API_URL = process.env.REACT_APP_API_URL;

const AllMedicineDetails = () => {
  const { themeMode } = useContext(ThemeContext);
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
          return sortOrder === "asc"
            ? a.MedicineName.localeCompare(b.MedicineName)
            : b.MedicineName.localeCompare(a.MedicineName);
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
    <TableContainer component={Paper} sx={{ maxWidth: 2000, margin: "auto", mt: 4, p: 2, fontFamily:"Winky Sans, sans-serif", fontOpticalSizing: "auto", fontWeight:500,fontStyle:"normal" }}>
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
      </Stack>
      {loading ? (
        <CircularProgress sx={{ display: "block", margin: "auto" }} />
      ) : (
        <>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ p: 2, textAlign: "center" }}>
                  <TableSortLabel active direction={sortOrder} onClick={handleSort} sx={{
                    color: "black",
                    "& .MuiTableSortLabel-icon": { color: "black !important" },
                  }}>
                    <b>Medicine Name</b>
                  </TableSortLabel>
                </TableCell>
                <TableCell sx={{ p: 2, textAlign: "center" }}><b>Manufacturer</b></TableCell>
                <TableCell sx={{ p: 2, textAlign: "center" }}><b>Expiry Date</b></TableCell>
                <TableCell sx={{ p: 2, textAlign: "center" }}><b>Selling Price</b></TableCell>
                <TableCell sx={{ p: 2, textAlign: "center" }}><b>Total Count of Medicine</b></TableCell> {/* New Column */}
              </TableRow>
            </TableHead>
            <TableBody>
              {medicines.length > 0 ? (
                medicines.map((medicine) => {
                  // Calculate total count of medicines
                  const totalCount = (medicine.HowManyStrips || 0) * (medicine.MedicinePerStrip || 0);
                  return (
                    <TableRow key={medicine._id} sx={{ '&:hover': { backgroundColor: '#f0f8ff' } }}>
                      <TableCell sx={{ p: 2, textAlign: "center" }}>{medicine.MedicineName}</TableCell>
                      <TableCell sx={{ p: 2, textAlign: "center" }}>{medicine.Manufacturer}</TableCell>
                      <TableCell sx={{ p: 2, textAlign: "center" }}>
                        {dayjs(medicine.ExpiryDate).format("DD MMM YYYY")}
                      </TableCell>
                      <TableCell sx={{ p: 2, textAlign: "center" }}>{medicine.SellingPrice}</TableCell>
                      <TableCell sx={{ p: 2, textAlign: "center" }}>{totalCount}</TableCell> {/* New Column */}
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={5} sx={{ textAlign: "center", py: 3, fontSize: "15px", color: "red" }}>
                    No medicines found
                  </TableCell>
                </TableRow>
              )}
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
