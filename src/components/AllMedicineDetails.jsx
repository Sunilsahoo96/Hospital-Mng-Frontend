import { useEffect, useState, useCallback } from "react";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, CircularProgress, TextField, IconButton, Stack, Button, TablePagination, TableSortLabel, Chip
} from "@mui/material";
import { ArrowUpward } from "@mui/icons-material";
import dayjs from "dayjs";
import { useDebounce } from "../hooks/useDebounce";

const API_URL = process.env.REACT_APP_API_URL;

const AllMedicineDetails = () => {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortColumn, setSortColumn] = useState("MedicineName");
  const [sortOrder, setSortOrder] = useState("asc");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalRows, setTotalRows] = useState(0);

  const searchQueryDebounced = useDebounce(searchQuery, 500);

  const fetchMedicines = useCallback(() => {
    setLoading(true);
    fetch(`${API_URL}/api/medicine/get-medicine?page=${page + 1}&limit=${rowsPerPage}&search=${searchQueryDebounced}&sort=${sortColumn},${sortOrder}`, {
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
  }, [page, rowsPerPage, searchQueryDebounced, sortColumn, sortOrder]);

  useEffect(() => {
    fetchMedicines();
  }, [fetchMedicines]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setPage(0);
  };

  const handleSort = (column) => {
    const isAsc = sortColumn === column && sortOrder === "asc";
    setSortOrder(isAsc ? "desc" : "asc");
    setSortColumn(column);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TableContainer component={Paper} sx={{ maxWidth: 1300, margin: "auto", mt: 4, p: 2 }}>
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
                {["MedicineName", "Manufacturer", "MfgDate", "ExpiryDate", "BuyingPrice", "SellingPrice", "HowManyStrips", "MedicinePerStrip"].map((column) => (
                  <TableCell key={column}>
                    <TableSortLabel
                      active={sortColumn === column}
                      direction={sortColumn === column ? sortOrder : "asc"}
                      onClick={() => handleSort(column)}
                    >
                      {column.replace(/([A-Z])/g, ' $1').trim()}
                    </TableSortLabel>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {medicines.map((medicine) => (
                <TableRow 
                  key={medicine._id} 
                  sx={{ '&:hover': { backgroundColor: '#f0f8ff' } }}
                >
                  <TableCell>{medicine.MedicineName}</TableCell>
                  <TableCell>{medicine.Manufacturer}</TableCell>
                  <TableCell>{dayjs(medicine.MfgDate).format("DD MMM YYYY")}</TableCell>
                  <TableCell>{dayjs(medicine.ExpiryDate).format("DD MMM YYYY")}</TableCell>
                  <TableCell>{medicine.BuyingPrice}</TableCell>
                  <TableCell>{medicine.SellingPrice}</TableCell>
                  <TableCell>
                    {medicine.HowManyStrips < 50 ? (
                      <Chip label={`Low Stock: ${medicine.HowManyStrips}`} color="error" />
                    ) : (
                      medicine.HowManyStrips
                    )}
                  </TableCell>
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
