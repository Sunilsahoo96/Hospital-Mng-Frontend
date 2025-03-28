import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Select,
  MenuItem,
  Button,
  Alert,
  Snackbar,
} from "@mui/material";
import "../Hospital.css";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "doctor",
  });
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [signupSuccess, setSignupSuccess] = useState(false); 
  const [errorMessage, setErrorMessage] = useState("");
  const [emailExists, setEmailExists] = useState(false);

  const navigate = useNavigate();

  const validatePassword = (password) => {
    const strongPasswordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return strongPasswordRegex.test(password);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const getDashboardRoute = (role) => {
    return `/${role.replace(/\s+/g, "-").toLowerCase()}-dashboard`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setLoginSuccess(false);
    setSignupSuccess(false); 

    if (!isLogin) {
        // Validate password strength
        if (!validatePassword(formData.password)) {
          setErrorMessage(
            "Password must be at least 8 characters, contain an uppercase letter, a lowercase letter, a number, and a special character."
          );
          setEmailExists(true); 
          return;
        }
  
        // Confirm password match
        if (formData.password !== formData.confirmPassword) {
          setErrorMessage("Passwords do not match.");
          setEmailExists(true); 
          return;
        }
      }

    const endpoint = isLogin ? "login" : "signup";

    const requestData = isLogin
      ? { email: formData.email, password: formData.password }
      : formData;

    try {
      const response = await axios.post(
        `http://localhost:8000/api/auth/${endpoint}`,
        requestData
      );

      if (isLogin) {
        // Login successful: store token and redirect to dashboard
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userName", response.data.name);
        localStorage.setItem("userRole", response.data.role);

        console.log("Stored Name:", localStorage.getItem("userName"));
        console.log("Stored Role:", localStorage.getItem("userRole"));
        setLoginSuccess(true);

        setTimeout(() => navigate(getDashboardRoute(response.data.role)), 2000); //role based navigation
      } else {
        // Signup successful: show Snackbar alert
        setSignupSuccess(true);
        setTimeout(() => {
          setIsLogin(true);
          setFormData({ name: "", email: "", password: "", role: "doctor" });
        }, 3000);
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Something went wrong";

      if (error.response?.status === 400) {
        setErrorMessage("Invalid email format. Please enter a valid email.");
        setEmailExists(true);
      } else if (error.response?.status === 401) {
        setErrorMessage("Incorrect email or password. Please try again.");
        setEmailExists(true);
      } else if (error.response?.status === 409) {
        setErrorMessage(errorMsg); 
        setEmailExists(true); 
      } else {
        setErrorMessage(errorMsg);
      }
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={6}
          className="auth-container"
          sx={{ width: "350px", padding: 3 }}
        >
          <Typography variant="h5" className="auth-heading">
            {isLogin ? "Worker Login" : "Worker Sign Up"}
          </Typography>

        

          <form onSubmit={handleSubmit} className="auth-form">
            {!isLogin && (
              <TextField
                className="auth-input"
                name="name"
                label="Full Name"
                variant="outlined"
                value={formData.name}
                onChange={handleChange}
                required
              />
            )}
            <TextField
              className="auth-input"
              name="email"
              label="Email"
              type="text"
              variant="outlined"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <TextField
              className="auth-input"
              name="password"
              label="Password"
              type="password"
              variant="outlined"
              value={formData.password}
              onChange={handleChange}
              required
            />
              {!isLogin && (
              <TextField
                className="auth-input"
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                variant="outlined"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            )}

            {!isLogin && (
              <Select
                className="auth-input"
                name="role"
                value={formData.role}
                onChange={handleChange}
              >
                <MenuItem value="doctor">Doctor</MenuItem>
                <MenuItem value="nurse">Nurse</MenuItem>
                <MenuItem value="reception">Reception</MenuItem>
                <MenuItem value="admin">Admin</MenuItem>
                <MenuItem value="medicine cashier">Medicine Cashier</MenuItem>
              </Select>
            )}

            <Button type="submit" variant="contained" className="auth-button">
              {isLogin ? "Login" : "Sign Up"}
            </Button>
          </form>

          <Button onClick={() => setIsLogin(!isLogin)} className="auth-toggle">
            {isLogin
              ? "Create a Worker Account"
              : "Already have an account? Login"}
          </Button>
        </Paper>

        {/* Login Success Alert (Fixed Top-Center) */}
        {loginSuccess && (
          <Alert
            severity="success"
            sx={{
              position: "fixed",
              top: 20,
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 1300,
              width: "fit-content",
              textAlign: "center",
              background: "#50C878",
              color: "#ffffff",
            }}
          >
            Login successful! Redirecting...
          </Alert>
        )}

        {/* Signup Success Snackbar (Top-Center) */}
        <Snackbar
          open={signupSuccess}
          autoHideDuration={3000}
          onClose={() => setSignupSuccess(false)}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            severity="success"
            sx={{ width: "100%", background: "#50C878", color: "#ffffff" }}
          >
            Sign-up successful! Please log in.
          </Alert>
        </Snackbar>
        <Snackbar
          open={emailExists}
          autoHideDuration={3000}
          onClose={() => setEmailExists(false)}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert severity="error" sx={{ width: "100%" }}>
            {errorMessage} 
          </Alert>
        </Snackbar>
        
      </Container>
    </div>
  );
};

export default Auth;
