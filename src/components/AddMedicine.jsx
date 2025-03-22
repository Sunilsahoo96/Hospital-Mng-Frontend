import { useState } from "react";

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

    fetch("http://localhost:4545/api/medicine/add-medicine", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData),
    })
    .then(res => res.json())
    .then(data => {
      if(data.message) {
        alert("Medicine Added Successfully!");
        // Reset form
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
    .catch(error => console.error("Error:", error));
  };
  return (
    <div className="container mt-4">
      <div className="card shadow-sm p-4">
        <h2 className="mb-4 text-center">Add Medicine</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Medicine Name</label>
            <input
              type="text"
              name="MedicineName"
              value={formData.MedicineName}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter medicine name"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Manufacturer</label>
            <input
              type="text"
              name="Manufacturer"
              value={formData.Manufacturer}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter manufacturer name"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Manufacturing Date</label>
            <input
              type="date"
              name="MfgDate"
              value={formData.MfgDate}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Expiry Date</label>
            <input
              type="date"
              name="ExpiryDate"
              value={formData.ExpiryDate}
              onChange={handleChange}
              className="form-control"
              required
            />
            {error && <div className="text-danger mt-1">{error}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label">Buying Price</label>
            <input
              type="number"
              name="BuyingPrice"
              value={formData.BuyingPrice}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter buying price"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Selling Price</label>
            <input
              type="number"
              name="SellingPrice"
              value={formData.SellingPrice}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter selling price"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Medicines per Strip</label>
            <input
              type="number"
              name="MedicinePerStrip"
              value={formData.MedicinePerStrip}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter number of medicines per strip"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Add Medicine
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddMedicine;
