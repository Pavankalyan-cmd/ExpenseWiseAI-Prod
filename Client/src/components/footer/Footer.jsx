import CopyrightIcon from "@mui/icons-material/Copyright";
import "./styless.css";
import { IconButton } from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import GoogleIcon from "@mui/icons-material/Google";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import CallIcon from "@mui/icons-material/Call";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";

export default function Footer() {
  return (
    <footer className="foott ">
      <div className="sociall d-flex justify-content-between ">
        <IconButton
          sx={{
            color: "white",
            backgroundColor: "black",
            "&:hover": { color: "black" },
          }}
        >
          <InstagramIcon />
        </IconButton>
        <IconButton
          sx={{
            color: "white",
            backgroundColor: "black",
          }}
        >
          <GoogleIcon />
        </IconButton>
        <IconButton
          sx={{
            color: "white",
            backgroundColor: "black",
            "&:hover": { color: "black" },
          }}
        >
          <TwitterIcon />
        </IconButton>
        <IconButton
          sx={{
            color: "white",
            backgroundColor: "black",
            "&:hover": { color: "black" },
          }}
        >
          <LinkedInIcon />
        </IconButton>
        <IconButton
          sx={{
            color: "white",
            backgroundColor: "black",
            "&:hover": { color: "black" },
          }}
        >
          <CallIcon />
        </IconButton>
        <IconButton
          sx={{
            color: "white",
            backgroundColor: "black",
            "&:hover": { color: "black" },
          }}
        >
          <FacebookRoundedIcon />
        </IconButton>
      </div>
      <div className="blob"></div>
      <div className="foot d-flex justify-content-center ">
        <p style={{ margin: "0 3%" }}>Copyright {<CopyrightIcon />}2024</p>
        {"  "}
        <p style={{ margin: "0 3%" }}> Designed By PavankalyanVandanapu</p>
      </div>
    </footer>
  );
}
