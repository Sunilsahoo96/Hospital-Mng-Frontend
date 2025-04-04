import { Snackbar, Alert } from "@mui/material";

const CustomSnackbar = ({ open, onClose, message, severity, autoHideDuration = 3000, anchorOrigin }) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={onClose}
      anchorOrigin={anchorOrigin}
    >
      <Alert
        onClose={onClose}
        severity={severity}
        sx={{ width: "100%", background: "#50C878", color: "#ffffff" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default CustomSnackbar;