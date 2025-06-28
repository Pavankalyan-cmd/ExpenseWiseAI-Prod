import "./styless.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
import CardActions from "@mui/material/CardActions";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const darkTheme = createTheme({
  palette: {
    // mode: "dark",
  },
});
export default function Cards({
  Income,
  Expense,
  Balance,
  showExpensivemodal,
  showIncomemodal,
  onReset,
}) {
  return (
    <ThemeProvider theme={darkTheme}>
      <div className="container-fluid">
        <div className="cardsssection">
          {/* totalbalacecard */}
          <Card className="mycard">
            <CardHeader title="Current Balance" />
            <hr style={{ margin: "2px" }} />

            <CardContent>
              <h6 style={{ paddingLeft: "3%", paddingTop: "3%" }}>
                ₹{Balance}
              </h6>
            </CardContent>
            <CardActions>
              <Button
                variant="contained"
                color="error"
                id="btn"
                onClick={onReset}
              >
                Reset
              </Button>
            </CardActions>
          </Card>
          {/* incomecard */}
          <Card className="mycard">
            <CardHeader title="Total Income" />
            <hr style={{ margin: "2px" }} />

            <CardContent>
              <h6 style={{ paddingLeft: "3%", paddingTop: "3%" }}>₹{Income}</h6>
            </CardContent>
            <CardActions>
              <Button variant="contained" id="btn" onClick={showIncomemodal}>
                Add Income
              </Button>
            </CardActions>
          </Card>{" "}
          {/* expensecard */}
          <Card className="mycard">
            <CardHeader title="Total Expenses" />
            <hr style={{ margin: "2px" }} />
            <CardContent>
              <h6 style={{ paddingLeft: "3%", paddingTop: "3%" }}>
                ₹{Expense}
              </h6>
            </CardContent>
            <CardActions>
              <Button id="btn" variant="contained" onClick={showExpensivemodal}>
                Add Expenses
              </Button>
            </CardActions>
          </Card>
        </div>
      </div>
    </ThemeProvider>
  );
}
