import { useEffect, useState, useCallback } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  CircularProgress,
  TextField,
  Stack,
  Button,
  TablePagination,
  TableSortLabel,
} from "@mui/material";
import dayjs from "dayjs";
import { useDebounce } from "../../hooks/useDebounce";
import apiRequest from "../../api/api";

const AllMedicineDetails = () => {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalRows, setTotalRows] = useState(0);
  const [hoveredRow, setHoveredRow] = useState(null);

  const searchQueryDebounced = useDebounce(searchQuery, 500);

  const fetchMedicines = useCallback(async () => {
    setLoading(true);
    try {
      const data = await apiRequest({
        endpoint: `/api/medicine/get-medicine`,
        method: "GET",
        data: {
          page: page + 1,
          limit: rowsPerPage,
          search: searchQueryDebounced,
        },
      });

      setMedicines(Array.isArray(data.medicines) ? data.medicines : []);
      setTotalRows(data.total || 0);
    } catch (error) {
      console.error("Error fetching medicines:", error.message);
      setMedicines([]);
    } finally {
      setLoading(false);
    }
  }, [page, rowsPerPage, searchQueryDebounced]);

  useEffect(() => {
    fetchMedicines();
  }, [fetchMedicines]);

  return (
    <div style={{ height: "89vh" }}>
      <TableContainer
        component={Paper}
        sx={{
          maxWidth: 2000,
          margin: "auto",
          mt: 4,
          p: 2,
          backgroundColor: "#ffffff",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
          border: "1px solid #ccc",
          borderRadius: "8px",
        }}
      >
        <Typography variant="h5"  gutterBottom>
          All Medicines
        </Typography>

        <Stack
          direction="row"
          spacing={2}
          sx={{ mb: 2, justifyContent: "right" }}
        >
          <TextField
            label="Medicine Name"
            variant="outlined"
            size="small"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button variant="contained" onClick={fetchMedicines} color="primary">
            Search
          </Button>
        </Stack>

        {loading ? (
          <CircularProgress sx={{ display: "block", margin: "auto" }} />
        ) : (
          <>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                  <TableCell>
                    <TableSortLabel
                      active
                      direction={sortOrder}
                      onClick={() => {
                        const newOrder = sortOrder === "asc" ? "desc" : "asc";
                        setSortOrder(newOrder);
                        setMedicines(
                          [...medicines].sort((a, b) =>
                            newOrder === "asc"
                              ? a.MedicineName.localeCompare(b.MedicineName)
                              : b.MedicineName.localeCompare(a.MedicineName)
                          )
                        );
                      }}
                    >
                      <b>Medicine Name</b>
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <b>Manufacturer</b>
                  </TableCell>
                  <TableCell>
                    <b>Expiry Date</b>
                  </TableCell>
                  <TableCell>
                    <b>Selling Price</b>
                  </TableCell>
                  <TableCell>
                    <b>Total Count of Medicine</b>
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {medicines.length > 0 ? (
                  medicines.map((medicine, index) => {
                    const totalCount =
                      (medicine.HowManyStrips || 0) *
                      (medicine.MedicinePerStrip || 0);
                    return (
                      <TableRow
                        key={medicine._id}
                        onMouseEnter={() => setHoveredRow(index)}
                        onMouseLeave={() => setHoveredRow(null)}
                        sx={{
                          backgroundColor:
                            hoveredRow === index ? "#f0f8ff" : "inherit",
                          borderBottom: "1px solid #ddd",
                        }}
                      >
                        <TableCell>{medicine.MedicineName}</TableCell>
                        <TableCell>{medicine.Manufacturer}</TableCell>
                        <TableCell>
                          {dayjs(medicine.ExpiryDate).format("DD MMM YYYY")}
                        </TableCell>
                        <TableCell>{medicine.SellingPrice}</TableCell>
                        <TableCell>{totalCount}</TableCell>
                      </TableRow>
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      sx={{
                        textAlign: "center",
                        py: 3,
                        fontSize: "15px",
                        color: "red",
                      }}
                    >
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
