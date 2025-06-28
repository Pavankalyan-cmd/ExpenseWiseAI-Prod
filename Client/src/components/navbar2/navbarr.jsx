import "./navbarr.css";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

export default function Navbarr() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  function handleSignOut() {
    signOut(auth)
      .then(() => {
        navigate("/");
        toast.success("Logged out successfully");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  }

  function goToProfile() {
    navigate("/user-profile");
    setAnchorEl(null);
  }

  return (
    <div className="parentnav">
      <div className="childnav">
        <div>
          <p id="logotxt">ExpenseWiseAi</p>
        </div>

        {user && (
          <>
            <Avatar
              alt={user.displayName || "User"}
              src={user.photoURL || ""}
              onClick={(event) => setAnchorEl(event.currentTarget)}
              style={{ cursor: "pointer" }}
            />
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={() => setAnchorEl(null)}
            >
              <MenuItem disabled>{user.displayName || "User"}</MenuItem>
              <MenuItem onClick={goToProfile}>My Profile</MenuItem>
              <MenuItem onClick={handleSignOut}>Logout</MenuItem>
            </Menu>
          </>
        )}
      </div>
      <div className="blobb"></div>
    </div>
  );
}
