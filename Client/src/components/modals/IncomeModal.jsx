import React, { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { toast } from "react-toastify";
import { addIncome } from "../../pages/services/services";
import { auth } from "../../firebase";
import "./AddIncome.css"; // ✅ Import the CSS

function AddIncome({
  isIncomemodalVisible,
  handleCloseIncomeModal,
  refreshTransactions,
}) {
  const user = auth.currentUser;

  const [incomeData, setIncomeData] = useState({
    User: user ? user.uid : "",
    Title: "",
    Amount: 0,
    Tag: "",
    Type: "Income",
    Date: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setIncomeData({
      ...incomeData,
      [name]: name === "Amount" ? (value ? parseFloat(value) : 0) : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addIncome(incomeData)
      .then((response) => {
        toast.success("Income added successfully");
        refreshTransactions();
      })
      .catch((error) => {
        console.error(error);
        toast.error("Error adding income");
      });

    handleCloseIncomeModal();
  };

  useEffect(() => {
    if (user) {
      setIncomeData((prevData) => ({
        ...prevData,
        User: user.uid,
      }));
    }
  }, [user]);

  return (
    <Modal
      open={isIncomemodalVisible}
      onClose={handleCloseIncomeModal}
      sx={{ maxHeight: "100vh", overflowY: "auto" }}
    >
      <Box className="responsive-income-modal">
        <h2 className="modal-title">Add Income</h2>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Title"
            name="Title"
            value={incomeData.Title}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
          />
          <TextField
            label="Amount"
            name="Amount"
            type="number"
            value={incomeData.Amount}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
          />
          <TextField
            label="Tag"
            name="Tag"
            select
            value={incomeData.Tag}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
          >
            <MenuItem value="Salary">Salary</MenuItem>
            <MenuItem value="Business">Business</MenuItem>
            <MenuItem value="Investment">Investment</MenuItem>
            <MenuItem value="Other">Other</MenuItem>
          </TextField>
          <TextField
            name="Date"
            type="date"
            value={incomeData.Date}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
          />
          <div className="modal-button-group">
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
            <Button
              onClick={handleCloseIncomeModal}
              variant="outlined"
              color="secondary"
            >
              Close
            </Button>
          </div>
        </form>
      </Box>
    </Modal>
  );
}

export default AddIncome;
