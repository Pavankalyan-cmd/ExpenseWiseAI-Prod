import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TextField,
  MenuItem,
  Select,
  Button,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import DownloadIcon from "@mui/icons-material/Download";
import { deleteData } from "../../pages/services/services";
import { toast } from "react-toastify";
import { useState } from "react";
import { unparse } from "papaparse";
import "./table.css";

// Create a dark theme
const darkTheme = createTheme({
  palette: {
    mode: "light",
  },
});
export default function Tabledata({ Transactions, refreshTransactions }) {
  const handleDelete = (type, id) => {
    console.log(`Deleting ${type} with ID: ${id}`);

    deleteData(type, id)
      .then((response) => {
        console.log("Deleted successfully:", response);
        toast.error(`${type} deleted successfully`);
        refreshTransactions();
        // Optionally, refresh the data or update the state
      })
      .catch((error) => {
        toast.error(`${type} deletion failed`);
      });

    // Add your delete logic here (e.g., API call to delete the transaction)
  };

  const [search, setSearch] = useState("");
  let [searchResults] = useState([]);
  const [typefilter, settypefilter] = useState("All");
  const [sortDirection, setSortDirection] = useState("asc");
  const [sortColumn, setSortColumn] = useState("Amount");
  searchResults = Transactions.filter(
    (item) =>
      item.Title.toLowerCase().includes(search.toLowerCase()) &&
      (typefilter === "All" || item.Type === typefilter)
  );
  const sortData = (data) => {
    return data.sort((a, b) => {
      const aValue =
        sortColumn === "Amount" ? Number(a[sortColumn]) : a[sortColumn];
      const bValue =
        sortColumn === "Amount" ? Number(b[sortColumn]) : b[sortColumn];
      if (sortDirection === "asc") {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
  };
  const sortedResults = sortData([...searchResults]);
  function exportCSV() {
    var csv = unparse({
      fields: [
        "Title",
        "Amount",
        "Description",
        "Tag",
        "Type",
        "Paymentmethod",
        "Date",
      ],
      data: Transactions,
    });
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "Transactions.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("downloaded successfully");
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <div className="container-fluid my-3 tablee">
        <>
          <TextField
            id="outlined-basic txt"
            label="Search By Title"
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            value={search}
            placeholder="search by Title"
            sx={{
              width: "85%",
              margin: "1% auto",
              borderRadius: "25px", // Set the border radius to 25px
              "& .MuiOutlinedInput-root": {
                borderRadius: "25px", // Ensure the outlined input also has the same border radius
                boxShadow: "25px 25px 50px #bebebe, -25px -25px 50px #ffffff ",
                color: "black",
              },
            }}
          />
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={typefilter}
            placeholder="selecttype"
            onChange={(e) => {
              settypefilter(e.target.value);
            }}
            sx={{
              width: "15%",
              margin: "1% auto",

              borderRadius: "25px", // Set the border radius to 25px
              boxShadow: "25px 25px 50px #bebebe, -25px -25px 50px #ffffff ",

              "& .MuiOutlinedInput-root": {
                borderRadius: "25px", // Ensure the outlined input also has the same border radius
                boxShadow: "25px 25px 50px #bebebe, -25px -25px 50px #ffffff ",
              },
            }}
          >
            <MenuItem value={"All"}>All</MenuItem>
            <MenuItem value={"Expenses"}>Expenses</MenuItem>
            <MenuItem value={"Income"}>Income</MenuItem>
          </Select>
        </>
        <div className="transaction">
          <h3 style={{ color: "white", marginLeft: "1%" }}>My Transactions</h3>
          <div style={{ marginRight: "1%" }}>
            <Button
              endIcon={<DownloadIcon />}
              color="error"
              onClick={exportCSV}
            >
              Download
            </Button>
          </div>
        </div>
        <TableContainer
          component={Paper}
          sx={{
            borderRadius: "25px",
            padding: "1%",
            boxShadow: "25px 25px 50px #bebebe, -25px -25px 50px #ffffff ",
          }}
        >
          <Table
            sx={{ minWidth: 650, borderRadius: "25px" }}
            aria-label="simple table"
          >
            <TableHead>
              <TableRow>
                <TableCell
                  onClick={() => {
                    setSortColumn("Title");
                    setSortDirection(sortDirection === "asc" ? "desc" : "asc");
                  }}
                >
                  Title{" "}
                  {sortColumn === "Title"
                    ? sortDirection === "asc"
                      ? "↑"
                      : "↓"
                    : null}
                </TableCell>
                <TableCell
                  onClick={() => {
                    setSortColumn("Amount");
                    setSortDirection(sortDirection === "asc" ? "desc" : "asc");
                  }}
                >
                  Amount{" "}
                  {sortColumn === "Amount"
                    ? sortDirection === "asc"
                      ? "↑"
                      : "↓"
                    : null}
                </TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Tag</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Paymentmethod</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedResults.map((row) => {
                return (
                  <TableRow key={row.Id} id={row.Id} type={row.Type}>
                    <TableCell component="th" scope="row" id={row.id}>
                      {row.Title}
                    </TableCell>
                    <TableCell>{row.Amount}</TableCell>
                    <TableCell>{row.Description}</TableCell>
                    <TableCell>{row.Tag}</TableCell>
                    <TableCell>{row.Type}</TableCell>
                    <TableCell>{row.Paymentmethod}</TableCell>
                    <TableCell>{row.Date}</TableCell>
                    <TableCell>
                      <IconButton
                        aria-label="delete"
                        size="large"
                        color="error"
                        onClick={() => handleDelete(row.Type, row.Id)}
                      >
                        <DeleteIcon fontSize="inherit" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </ThemeProvider>
  );
}
