import Cards from "../../components/cards/Card";
import { useEffect, useState } from "react";
import Addexpensive from "../../components/modals/ExpensiveModal";
import Addincome from "../../components/modals/IncomeModal";
import { fetchExpenses, fetchIncome } from "../services/services";
import Tabledata from "../../components/table/Table";
import { toast } from "react-toastify";
import MyChart from "../../components/charts/Newchart";
import Notransaction from "../../components/notransaction/Notransaction";
import { auth } from "../../firebase";
import Navbarr from "../../components/navbar2/navbarr";
import AgentChatWidget from "../../components/agentchatwidget/AgentChatWidget";
import { resetAllTransactions } from "../services/services";
import "./Dashboard.css"; // Import your CSS for spinner and fade-in
import ConfirmModal from "../../components/modals/ConfirmModal";

export default function Dashboard() {
  const [isExpensivemodalVisible, setIsExpensivemodalVisible] = useState(false);
  const [isIncomemodalVisible, setIsIncomemodalVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [Transactions, setTransactions] = useState([]);
  const [Income, SetIncome] = useState(0);
  const [Expense, SetExpense] = useState(0);
  const [Balance, setBalance] = useState(0);
  const [confirmResetOpen, setConfirmResetOpen] = useState(false);
  const [user, setUser] = useState(auth.currentUser);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const funnyMessages = [
    "💸 Crunching numbers...",
    "💰 Calculating your fortune...",
    "📈 Compiling your financial history...",
    "💳 Checking your balance... twice!",
    "🤓 Counting coins and bills...",
    "🧾 Auditing your virtual wallet...",
    "💡 Finding ways to save you money...",
    "🔍 Searching for missing cents...",
    "📊 Making graphs look cooler...",
    "🚀 Launching your financial future...",
  ];

  const randomMessage =
    funnyMessages[Math.floor(Math.random() * funnyMessages.length)];

  const showExpensivemodal = () => setIsExpensivemodalVisible(true);
  const showIncomemodal = () => setIsIncomemodalVisible(true);
  const handleCloseExpensiveModal = () => setIsExpensivemodalVisible(false);
  const handleCloseIncomeModal = () => setIsIncomemodalVisible(false);

  const refreshTransactions = () => {
    if (user) {
      setLoading(true);
      Promise.all([fetchIncome(user.uid), fetchExpenses(user.uid)])
        .then(([incomeResponse, expenseResponse]) => {
          const incomes = incomeResponse.data || [];
          const expenses = expenseResponse.data || [];

          setTransactions([...incomes, ...expenses]);
          calculateBalance([...incomes, ...expenses]);
          toast.success("Transactions fetched successfully");
        })
        .catch((error) => {
          toast.error("Failed to fetch transactions");
          console.error(error);
        })
        .finally(() => setLoading(false));
    }
  };

  const handleResetConfirmed = async () => {
    try {
      await resetAllTransactions();
      setTransactions([]);
      SetIncome(0);
      SetExpense(0);
      setBalance(0);
      toast.success("All transactions have been reset.");
    } catch (error) {
      toast.error("Reset failed. Please try again.");
      console.error(error);
    } finally {
      setConfirmResetOpen(false);
    }
  };

  useEffect(() => {
    if (user) {
      refreshTransactions();
    } else {
      setLoading(false);
    }
  }, [user]);

  const calculateBalance = (allTransactions = Transactions) => {
    let Incomebalance = 0;
    let Expensebalance = 0;
    allTransactions.forEach((transaction) => {
      if (transaction.Type === "Income") {
        Incomebalance += parseFloat(transaction.Amount);
      } else {
        Expensebalance += parseFloat(transaction.Amount);
      }
    });
    setBalance(Incomebalance - Expensebalance);
    SetIncome(Incomebalance);
    SetExpense(Expensebalance);
  };

  const sortedtransactions = [...Transactions].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  return (
    <div className="container-fluid" style={{ height: "auto" }}>
      <Navbarr />

      {loading ? (
        <div className="loading-container">
          <div className="spinner"></div>
          <p className="fade-in loading-text">{randomMessage}</p>
        </div>
      ) : (
        <>
          <Cards
            Income={Income}
            Expense={Expense}
            Balance={Balance}
            showExpensivemodal={showExpensivemodal}
            showIncomemodal={showIncomemodal}
            onReset={() => setConfirmResetOpen(true)}
          />
          <ConfirmModal
            open={confirmResetOpen}
            onClose={() => setConfirmResetOpen(false)}
            onConfirm={handleResetConfirmed}
            message="Are you sure you want to reset all your data? This cannot be undone."
          />

          {/* Expense Modal */}
          <Addexpensive
            isExpensivemodalVisible={isExpensivemodalVisible}
            handleCloseExpensiveModal={handleCloseExpensiveModal}
            refreshTransactions={refreshTransactions}
          />

          {/* Income Modal */}
          <Addincome
            isIncomemodalVisible={isIncomemodalVisible}
            handleCloseIncomeModal={handleCloseIncomeModal}
            refreshTransactions={refreshTransactions}
          />

          {Transactions.length !== 0 ? (
            <MyChart sortedtransactions={sortedtransactions} />
          ) : (
            <Notransaction />
          )}

          <Tabledata
            Transactions={Transactions}
            refreshTransactions={refreshTransactions}
          />

          <AgentChatWidget userId={user?.uid} userName={user?.displayName} />

          <footer
            style={{
              marginTop: "5%",
              textAlign: "center",
              padding: "2rem 1rem",
              color: "#000",
            }}
          >
            © 2025 ExpenseWiseAi. Built by PavanKalyan Vandanapu.
          </footer>
        </>
      )}
    </div>
  );
}
