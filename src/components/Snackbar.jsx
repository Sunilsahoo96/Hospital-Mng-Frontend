import React from "react";
import { Snackbar, Alert, Slide } from "@mui/material";

// Slide Transition Function
function SlideTransition(props) {
  return <Slide {...props} direction="down" />;
}

const CustomSnackbar = ({
  open,
  onClose,
  message,
  severity,
  autoHideDuration = 3000,
  anchorOrigin = { vertical: "top", horizontal: "center" },
}) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={onClose}
      anchorOrigin={anchorOrigin}
      TransitionComponent={SlideTransition}
    >
      <Alert
        onClose={onClose}
        severity={severity}
        sx={{
          width: "100%",
          background: severity === "success" ? "#50C878" : "#f44336",
          color: "#ffffff",
        }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default CustomSnackbar;
