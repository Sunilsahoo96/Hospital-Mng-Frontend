import { useState } from "react";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

function Signup() {
  const [formData, setFormData] = useState({ name: "", email: "", password: "", role: "Doctor" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_URL}/api/auth/signup`, formData);

      // Check for expected response structure
      if (res.data && res.data.message) {
        setMessage(res.data.message);
      } else {
        setMessage("Registration completed successfully!");
      }
    } catch (error) {
      // Handle different error types
      const errorMessage = error.response?.data?.message ||
        error.message ||
        "Registration failed! Please try again.";
      setMessage(errorMessage);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.overlay}></div>
      <div style={styles.card}>
        <h2 style={styles.heading}>📝 Signup</h2>
        {message && <p style={styles.message}>{message}</p>}
        <form onSubmit={handleSubmit} style={styles.form}>
          <input type="text" name="name" placeholder="Name" onChange={handleChange} required style={styles.input} />
          <input type="email" name="email" placeholder="Email" onChange={handleChange} required style={styles.input} />
          <input type="password" name="password" placeholder="Password" onChange={handleChange} required style={styles.input} />
          <select name="role" onChange={handleChange} style={styles.input}>
            <option>Doctor</option>
            <option>Nurse</option>
            <option>Reception</option>
            <option>Admin</option>
            <option>Medicine Cashier</option>
          </select>
          <button type="submit" style={styles.button}>Signup</button>
        </form>
      </div>
    </div>
  );
}


const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundImage: "url('https://www.sermo.com/wp-content/uploads/2023/11/improve-medical-practice-management-hero-min-1050x591.jpg.webp')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    position: "relative",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0, 0, 0, 0.4)",
    backdropFilter: "blur(5px)",
  },
  card: {
    position: "relative",
    background: "rgba(255, 255, 255, 0.2)",
    padding: "2rem",
    borderRadius: "15px",
    boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.2)",
    textAlign: "center",
    width: "350px",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255, 255, 255, 0.3)",
  },
  heading: {
    fontSize: "2rem",
    marginBottom: "1rem",
    fontFamily: "Poppins, sans-serif",
    color: "#fff",
  },
  message: {
    color: "red",
    fontWeight: "bold",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  input: {
    padding: "12px",
    fontSize: "1rem",
    borderRadius: "5px",
    outline: "none",
    transition: "0.3s",
    background: "rgba(255, 255, 255, 0.2)",
    color: "#fff",
    backdropFilter: "blur(5px)",
    border: "1px solid rgba(255, 255, 255, 0.3)",
  },
  button: {
    padding: "12px",
    fontSize: "1rem",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
    background: "linear-gradient(90deg, #4CAF50, #45a049)",
    color: "#fff",
    transition: "0.3s",
  },
};

export default Signup;
