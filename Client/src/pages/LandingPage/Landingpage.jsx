import React, { useState } from "react";
import About from "../../components/about/About";
import AccordionFAQ from "../../components/accordionFAQ/AccordionFAQ";
import "./Landingpage.css";
import { Link } from "react-router-dom";
import {
  Drawer,
  IconButton,
  Box,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

export default function LandingPage() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  return (
    <div className="Lpage">
      {/* Navbar */}
      <div className="Navbar">
        <p id="logotxt">ExpenseWiseAi</p>

        {/* Desktop Nav */}
        <div id="navitems">
          <button id="Signupbtn">
            <Link
              to="/signup"
              style={{
                textDecoration: "none",
                color: "black",
                fontWeight: "bold",
                margin: "25px",
              }}
            >
              SignUp
            </Link>
          </button>

          <button id="Signinbtn">
            <Link
              to="/Login"
              style={{
                textDecoration: "none",
                color: "black",
                fontWeight: "bold",
                margin: "30px",
              }}
            >
              Login
            </Link>
          </button>
        </div>

        {/* MUI Hamburger (Mobile only) */}
        <IconButton onClick={toggleDrawer(true)} id="ham" aria-label="Menu">
          <MenuIcon fontSize="large" />
        </IconButton>

        {/* Drawer Menu */}
        <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
          <Box
            sx={{ width: 250, p: 2 }}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
          >
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <IconButton onClick={toggleDrawer(false)}>
                <CloseIcon />
              </IconButton>
            </Box>
            <List>
              <ListItem button component={Link} to="/signup">
                <ListItemText primary="Sign Up" />
              </ListItem>
              <ListItem button component={Link} to="/Login">
                <ListItemText primary="Login" />
              </ListItem>
            </List>
          </Box>
        </Drawer>
      </div>

      {/* Hero Section */}
      <div className="hero">
        <div className="head">
          <h1 className="txt">
            Navigate Your Financial Journey with <br />
            Confidence and Clarity
          </h1>
          <p className="txt1">
            Reduce your financial worries and focus on achieving stability with
            <br />
            our intuitive AI expense tracker designed for your needs.
          </p>

          <button className="btn" id="down3" aria-label="Download App">
            <i className="bi bi-google-play"></i>
            {" | "}
            <i className="bi bi-apple"></i> Download app
          </button>
        </div>
        <div className="hero-img">
          <img
            className="hero-img"
            style={{ borderRadius: "50px", marginTop: "2%" }}
            src="https://i.postimg.cc/JzmsbpVz/main.jpg"
            alt="Financial Planning Illustration"
          />
        </div>
      </div>

      <AccordionFAQ />
      <About />

      <footer
        style={{
          textAlign: "center",
          padding: "2rem 1rem",
          background: "#000",
          color: "#fff",
        }}
      >
        © 2025 ExpenseWiseAi. Built with ❤️ by PavanKalyan Vandanapu.
      </footer>
    </div>
  );
}
