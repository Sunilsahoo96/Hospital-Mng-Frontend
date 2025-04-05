import { useState } from "react";
import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  Snackbar,
  Alert,
  Stack,
} from "@mui/material";
import CustomSnackbar from "../Snackbar";
const API_URL = process.env.REACT_APP_API_URL;

const AddMedicine = () => {
  const [formData, setFormData] = useState({
    MedicineName: "",
    Manufacturer: "",
    MfgDate: "",
    ExpiryDate: "",
    BuyingPrice: "",
    SellingPrice: "",
    MedicinePerStrip: "",
    HowManyStrips: "", // Added strip count field
  });

  const [error, setError] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (
      name === "ExpiryDate" &&
      formData.MfgDate &&
      value <= formData.MfgDate
    ) {
      setError("Expiry date must be after manufacturing date.");
    } else {
      setError("");
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`${API_URL}/api/medicine/add-medicine`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          setOpenSnackbar(true);
          setFormData({
            MedicineName: "",
            Manufacturer: "",
            MfgDate: "",
            ExpiryDate: "",
            BuyingPrice: "",
            SellingPrice: "",
            MedicinePerStrip: "",
            HowManyStrips: "", // Reset strip count
          });
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  const handleCancel = () => {
    setFormData({
      MedicineName: "",
      Manufacturer: "",
      MfgDate: "",
      ExpiryDate: "",
      BuyingPrice: "",
      SellingPrice: "",
      MedicinePerStrip: "",
      HowManyStrips: "",
    });
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const isFormIncomplete = Object.values(formData).some((val) => val === "");

  return (
    <Card sx={{ maxWidth: 500, margin: "auto", mt: 4, p: 3 }}>
      <CardContent>
        <Typography variant="h5" align="center" gutterBottom>
          Add Medicine
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Medicine Name"
            name="MedicineName"
            fullWidth
            margin="normal"
            value={formData.MedicineName}
            onChange={handleChange}
            required
          />
          <TextField
            label="Manufacturer"
            name="Manufacturer"
            fullWidth
            margin="normal"
            value={formData.Manufacturer}
            onChange={handleChange}
            required
          />
          <Stack direction="row" spacing={2} sx={{ mt: 1 }}>
            <TextField
              label="Manufacturing Date"
              type="date"
              name="MfgDate"
              fullWidth
              InputLabelProps={{ shrink: true }}
              margin="normal"
              value={formData.MfgDate}
              onChange={handleChange}
              required
            />
            <TextField
              label="Expiry Date"
              type="date"
              name="ExpiryDate"
              fullWidth
              InputLabelProps={{ shrink: true }}
              margin="normal"
              value={formData.ExpiryDate}
              onChange={handleChange}
              required
            />
          </Stack>
          {error && (
            <Typography color="error" variant="body2">
              {error}
            </Typography>
          )}
          <Stack direction="row" spacing={2} sx={{ mt: 1 }}>
            <TextField
              label="Buying Price"
              type="number"
              name="BuyingPrice"
              fullWidth
              margin="normal"
              value={formData.BuyingPrice}
              onChange={handleChange}
              required
            />
            <TextField
              label="Selling Price"
              type="number"
              name="SellingPrice"
              fullWidth
              margin="normal"
              value={formData.SellingPrice}
              onChange={handleChange}
              required
            />
          </Stack>
          <TextField
            label="Medicines per Strip"
            type="number"
            name="MedicinePerStrip"
            fullWidth
            margin="normal"
            value={formData.MedicinePerStrip}
            onChange={handleChange}
            required
          />
          <TextField
            label="How Many Strips"
            type="number"
            name="HowManyStrips"
            fullWidth
            margin="normal"
            value={formData.HowManyStrips}
            onChange={handleChange}
            required
          />
          <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
            <Button variant="outlined" fullWidth onClick={handleCancel}>
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={isFormIncomplete}
            >
              Add Medicine
            </Button>
          </Stack>
        </form>
      </CardContent>
      <CustomSnackbar
        open={openSnackbar}
        onClose={handleCloseSnackbar}
        message="Medicine Added Successfully!"
        severity="success"
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      />
    </Card>
  );
};

export default AddMedicine;
