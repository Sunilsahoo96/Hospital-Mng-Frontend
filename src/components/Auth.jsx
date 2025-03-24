import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { 
    Container, Paper, Typography, TextField, Select, MenuItem, Button, Alert, Snackbar
} from "@mui/material";
import "../Hospital.css"; 

const Auth = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({ name: "", email: "", password: "", role: "doctor" });
    const [loginSuccess, setLoginSuccess] = useState(false);
    const [signupSuccess, setSignupSuccess] = useState(false); // Added state for signup alert
    const [errorMessage, setErrorMessage] = useState(""); 
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage(""); 
        setLoginSuccess(false); 
        setSignupSuccess(false); // Reset signup alert on new submit

        const endpoint = isLogin ? "login" : "signup";

        try {
            const response = await axios.post(`http://localhost:8000/api/auth/${endpoint}`, formData);
            
            if (isLogin) {
                // Login successful: store token and redirect to dashboard
                localStorage.setItem("token", response.data.token);
                setLoginSuccess(true);
                setTimeout(() => navigate("/dashboard"), 2000);
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
            } else if (error.response?.status === 401) {
                setErrorMessage("Incorrect email or password. Please try again.");
            } else if (error.response?.status === 409) {
                setErrorMessage("User already exists. Please login.");
            } else {
                setErrorMessage(errorMsg);
            }
        }
    };

    return (
        <Container maxWidth="xs">
            <Paper elevation={6} className="auth-container">
                <Typography variant="h5" className="auth-heading">
                    {isLogin ? "Worker Login" : "Worker Sign Up"}
                </Typography>

                {errorMessage && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {errorMessage}
                    </Alert>
                )}

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
                        type="email" 
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
                    {isLogin ? "Create a Worker Account" : "Already have an account? Login"}
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
                        background: "#50C878", color: "#ffffff"

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
                <Alert severity="success" sx={{ width: "100%", background: "#50C878", color: "#ffffff" }}>
                    Sign-up successful! Please log in.
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default Auth;
