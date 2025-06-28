import React from "react";
import { Modal, Box, Typography, Button, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export default function ConfirmModal({ open, onClose, onConfirm, message }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // small screens

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: isMobile ? "90%" : 350,
    bgcolor: "background.paper",
    borderRadius: 2,
    boxShadow: 24,
    p: 3,
    textAlign: "center",
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Typography variant="body1" gutterBottom>
          {message || "Are you sure you want to continue?"}
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            gap: 2,
            mt: 3,
            justifyContent: "center",
          }}
        >
          <Button
            variant={isMobile ? "contained" : "outlined"}
            onClick={onClose}
            color="inherit"
            fullWidth={isMobile}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={onConfirm}
            fullWidth={isMobile}
          >
            Yes, Reset
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
