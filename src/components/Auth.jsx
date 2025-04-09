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
} from "@mui/material";
import CustomSnackbar from "./Snackbar";
import "../Hospital.css";

const Auth = () => {
  const roles = ["doctor", "nurse", "reception", "admin", "medicine cashier"];
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
  const [showPasswordCriteria, setShowPasswordCriteria] = useState(false);

  const navigate = useNavigate();

  const passwordCriteria = {
    hasLowercase: /[a-z]/.test(formData.password),
    hasUppercase: /[A-Z]/.test(formData.password),
    hasNumber: /\d/.test(formData.password),
    hasSpecialChar: /[@$!%*?&]/.test(formData.password),
    hasMinLength: formData.password.length >= 8,
    hasMaxLength: formData.password.length <= 20,
  };

  const validatePassword = (password) => {
    const strongPasswordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
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
      if (!validatePassword(formData.password)) {
        setErrorMessage(
          "Password must be 8-20 characters, include uppercase, lowercase, number, and special character."
        );
        setEmailExists(true);
        return;
      }

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
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userName", response.data.name);
        localStorage.setItem("userRole", response.data.role);
        setLoginSuccess(true);

        setTimeout(() => navigate(getDashboardRoute(response.data.role)), 2000);
      } else {
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
      } else if (error.response?.status === 401) {
        setErrorMessage("Incorrect email or password. Please try again.");
      } else if (error.response?.status === 404) {
        setErrorMessage("User not found. Please sign up first.");
      } else if (error.response?.status === 409) {
        setErrorMessage(errorMsg);
      } else {
        setErrorMessage(errorMsg);
      }

      setEmailExists(true);
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
              onFocus={() => setShowPasswordCriteria(true)}
              onBlur={() => setShowPasswordCriteria(false)}
              required
            />

            {!isLogin && showPasswordCriteria && (
              <div style={{ marginTop: "10px" }}>
                <Typography variant="subtitle2">Your password must include:</Typography>
                <ul style={{ paddingLeft: "20px", fontSize: "0.85rem" }}>
                  <li style={{ color: passwordCriteria.hasLowercase ? "green" : "red" }}>
                    One lowercase character
                  </li>
                  <li style={{ color: passwordCriteria.hasUppercase ? "green" : "red" }}>
                    One uppercase character
                  </li>
                  <li style={{ color: passwordCriteria.hasNumber ? "green" : "red" }}>
                    One number
                  </li>
                  <li style={{ color: passwordCriteria.hasSpecialChar ? "green" : "red" }}>
                    One special character
                  </li>
                  <li style={{ color: passwordCriteria.hasMinLength ? "green" : "red" }}>
                    8 characters minimum
                  </li>
                  <li style={{ color: passwordCriteria.hasMaxLength ? "green" : "red" }}>
                    20 characters maximum
                  </li>
                </ul>
              </div>
            )}

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
                {roles.map((role) => (
                  <MenuItem key={role} value={role}>
                    {role
                      .split(" ")
                      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                      .join(" ")}
                  </MenuItem>
                ))}
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

        {/* CustomSnackbars */}
        <CustomSnackbar
          open={loginSuccess}
          onClose={() => setLoginSuccess(false)}
          message="Login successful! Redirecting..."
          severity="success"
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        />

        <CustomSnackbar
          open={signupSuccess}
          onClose={() => setSignupSuccess(false)}
          message="Sign-up successful! Please log in."
          severity="success"
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        />

        <CustomSnackbar
          open={emailExists}
          onClose={() => setEmailExists(false)}
          message={errorMessage}
          severity="error"
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        />
      </Container>
    </div>
  );
};

export default Auth;
