import { Route, Routes, Navigate } from "react-router-dom";
import LandingPage from "../LandingPage/Landingpage";
import Dashboard from "../Dashboard/Dashboard";
import { ToastContainer } from "react-toastify";

import { useAuth } from "../../contexts/AuthContext";

import Signuppage from "../Signup/Signup";
import Login from "../Login/Login";
import UserProfile from "../Userprofile/UserProfile";
import AgentChatFullPage from "../agentchatfullpage/AgentChatFullPage";


// ProtectedRoute component
function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return <p>Loading...</p>;
  if (!user) return <Navigate to="/Login" replace />;
  return children;
}

export default function Routespage() {
  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/Login"
          element={<Login />} // Redirect if not signed in
        />

        <Route path="/user-profile" element={<UserProfile />} />
        <Route path="/signup" element={<Signuppage />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/chat"
          element={
            <ProtectedRoute>
              <AgentChatFullPage />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<h1>404 - Page Not Found</h1>} />
      </Routes>
      
    </div>
  );
}
