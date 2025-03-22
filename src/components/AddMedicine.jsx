import { useState } from "react";
import { TextField, Button, Grid, Card, CardContent, Typography } from "@mui/material";

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
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "ExpiryDate" && formData.MfgDate && value <= formData.MfgDate) {
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
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          alert("Medicine Added Successfully!");
          setFormData({
            MedicineName: "",
            Manufacturer: "",
            MfgDate: "",
            ExpiryDate: "",
            BuyingPrice: "",
            SellingPrice: "",
            MedicinePerStrip: "",
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
    });
  };

  const isFormIncomplete = Object.values(formData).some((val) => val === "");

  return (
    <Card sx={{ maxWidth: 500, margin: "auto", mt: 4, p: 3 }}>
      <CardContent>
        <Typography variant="h5" align="center" gutterBottom>
          Add Medicine
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField label="Medicine Name" name="MedicineName" fullWidth margin="dense" value={formData.MedicineName} onChange={handleChange} required />
          <TextField label="Manufacturer" name="Manufacturer" fullWidth margin="dense" value={formData.Manufacturer} onChange={handleChange} required />
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={6}>
              <TextField label="Manufacturing Date" type="date" name="MfgDate" fullWidth InputLabelProps={{ shrink: true }} margin="dense" value={formData.MfgDate} onChange={handleChange} required />
            </Grid>
            <Grid item xs={6}>
              <TextField label="Expiry Date" type="date" name="ExpiryDate" fullWidth InputLabelProps={{ shrink: true }} margin="dense" value={formData.ExpiryDate} onChange={handleChange} required />
              {error && <Typography color="error" variant="body2">{error}</Typography>}
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={6}>
              <TextField label="Buying Price" type="number" name="BuyingPrice" fullWidth margin="dense" value={formData.BuyingPrice} onChange={handleChange} required />
            </Grid>
            <Grid item xs={6}>
              <TextField label="Selling Price" type="number" name="SellingPrice" fullWidth margin="dense" value={formData.SellingPrice} onChange={handleChange} required />
            </Grid>
          </Grid>
          <TextField label="Medicines per Strip" type="number" name="MedicinePerStrip" fullWidth margin="dense" value={formData.MedicinePerStrip} onChange={handleChange} required />
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={6}>
              <Button variant="outlined" fullWidth onClick={handleCancel} sx={{ mt: 1 }}>
                Cancel
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button type="submit" variant="contained" fullWidth disabled={isFormIncomplete} sx={{ mt: 1 }}>
                Add Medicine
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddMedicine;
