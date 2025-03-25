import { useEffect, useState, useCallback, useContext } from "react";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography,
  CircularProgress, TextField, Stack, Button, TablePagination, TableSortLabel, IconButton
} from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material"; // Icons for toggle
import dayjs from "dayjs";
import { useDebounce } from "../hooks/useDebounce";
import ThemeContext from "../Context/ThemeContext";

const API_URL = process.env.REACT_APP_API_URL;

const AllMedicineDetails = () => {
  const { themeMode, toggleTheme } = useContext(ThemeContext);
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalRows, setTotalRows] = useState(0);
  const [hoveredRow, setHoveredRow] = useState(null);

  const searchQueryDebounced = useDebounce(searchQuery, 500);

  const fetchMedicines = useCallback(() => {
    setLoading(true);
    fetch(`${API_URL}/api/medicine/get-medicine?page=${page + 1}&limit=${rowsPerPage}&search=${searchQueryDebounced}`, {
      headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setMedicines(Array.isArray(data.medicines) ? data.medicines : []);
        setTotalRows(data.total);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching medicines:", error);
        setMedicines([]);
        setLoading(false);
      });
  }, [page, rowsPerPage, searchQueryDebounced]);

  useEffect(() => {
    fetchMedicines();
  }, [fetchMedicines]);

  return (
    <div style={{ height: "90vh" }}>
      <TableContainer
        component={Paper}
        sx={{
          maxWidth: 2000,
          margin: "auto",
          mt: 4,
          p: 2,
          backgroundColor: themeMode === "dark" ? "#0D1B2A" : "#ffffff",
          backgroundImage: themeMode === "dark"
            ? "radial-gradient(circle at 30% 30%, #30475E, #0D1B2A)"
            : "none",
          color: themeMode === "dark" ? "white" : "black",
          boxShadow: themeMode === "dark"
            ? "0 0 15px rgba(255, 255, 255, 0.2)" // 🌙 Moonlight Glow in Dark Mode
            : "0 0 10px rgba(0, 0, 0, 0.1)", // 📌 Soft shadow in Light Mode
          border: themeMode === "dark" ? "none" : "1px solid #ccc", // 📌 Add border in Light Mode
          borderRadius: "8px",
        }}
      >
        {/* Theme Toggle Button */}
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
          <Typography variant="h5" align="center" gutterBottom>
            All Medicines
          </Typography>
          <IconButton onClick={toggleTheme} color="inherit">
            {themeMode === "dark" ? <Brightness4 /> : <Brightness7 />}
          </IconButton>
        </Stack>

        <Stack direction="row" spacing={2} sx={{ mb: 2, justifyContent: "center" }}>
          <TextField
            label="Medicine Name"
            variant="outlined"
            size="small"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{
              backgroundColor: themeMode === "dark" ? "#333" : "white",
              input: { color: themeMode === "dark" ? "white" : "black" }
            }}
          />
          <Button variant="contained" onClick={fetchMedicines} color="primary">
            Search
          </Button>
        </Stack>

        {loading ? (
          <CircularProgress sx={{ display: "block", margin: "auto" }} />
        ) : (
          <>
            <Table sx={{ borderCollapse: "collapse" }}>
              <TableHead>
                <TableRow sx={{
                  backgroundColor: themeMode === "dark" ? "#222" : "#f5f5f5",
                  borderBottom: "2px solid #ddd"
                }}>
                  <TableCell>
                    <TableSortLabel
                      active
                      direction={sortOrder}
                      onClick={() => {
                        setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                        setMedicines([...medicines].sort((a, b) => (
                          sortOrder === "asc"
                            ? a.MedicineName.localeCompare(b.MedicineName)
                            : b.MedicineName.localeCompare(a.MedicineName)
                        )));
                      }}
                      sx={{
                        color: themeMode === "dark" ? "white" : "black",
                        "& .MuiTableSortLabel-icon": {
                          color: themeMode === "dark" ? "white !important" : "black !important",
                        },
                      }}
                    >
                      <b>Medicine Name</b>
                    </TableSortLabel>
                  </TableCell>
                  <TableCell><b>Manufacturer</b></TableCell>
                  <TableCell><b>Expiry Date</b></TableCell>
                  <TableCell><b>Selling Price</b></TableCell>
                  <TableCell><b>Total Count of Medicine</b></TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {medicines.length > 0 ? (
                  medicines.map((medicine, index) => {
                    const totalCount = (medicine.HowManyStrips || 0) * (medicine.MedicinePerStrip || 0);
                    return (
                      <TableRow
                        key={medicine._id}
                        onMouseEnter={() => setHoveredRow(index)}
                        onMouseLeave={() => setHoveredRow(null)}
                        sx={{
                          backgroundColor: hoveredRow === index
                            ? themeMode === "dark" ? "#333" : "#f0f8ff"
                            : "inherit",
                          borderBottom: "1px solid #ddd", // 📌 Table row border
                        }}
                      >
                        <TableCell>{medicine.MedicineName}</TableCell>
                        <TableCell>{medicine.Manufacturer}</TableCell>
                        <TableCell>{dayjs(medicine.ExpiryDate).format("DD MMM YYYY")}</TableCell>
                        <TableCell>{medicine.SellingPrice}</TableCell>
                        <TableCell>{totalCount}</TableCell>
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
              onPageChange={(event, newPage) => setPage(newPage)}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={(event) => {
                setRowsPerPage(parseInt(event.target.value, 10));
                setPage(0);
              }}
            />
          </>
        )}
      </TableContainer>
    </div>
  );
};

export default AllMedicineDetails;
