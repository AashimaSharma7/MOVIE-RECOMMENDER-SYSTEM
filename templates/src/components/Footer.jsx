import React from "react";
import "./componetStyles/footer.css";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import EmailIcon from "@mui/icons-material/Email";
import Fab from "@mui/material/Fab";
import MovieIcon from "@mui/icons-material/Movie";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const navigateTo = (url) => {
    window.open(url, "_blank");
  };
  const handleSmoothScroll = (event, targetId) => {
    event.preventDefault();

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <footer className="footer-distributed">
      <div className="footer-left">
        <h3>
          <span>
            M<MovieIcon fontSize="36px" color="error" />
            VIE
          </span>{" "}
          <span>
            REC
            <MovieIcon fontSize="36px" sx={{ color: "#176B87" }} />
            MMENDER
          </span>
        </h3>
        <p className="footer-links">
          <a href="#main" onClick={(e) => handleSmoothScroll(e, "#main")}>
            Home
          </a>
          <a href="#about">About</a>
          <a href="mailto:anonymous@company.com">Contact</a>
        </p>
        <p className="footer-company-name">STL © {currentYear}</p>
      </div>

      <div className="footer-center">
        <div>
          <Fab
            size="small"
            onClick={() => navigateTo("https://twitter.com/VerShivu")}
          >
            <TwitterIcon />
          </Fab>
          <p>Follow us on Twitter</p>
        </div>
        <div>
          <Fab
            size="small"
            onClick={() =>
              navigateTo(
                "https://www.linkedin.com/in/shivansh-verma-650a92222/"
              )
            }
          >
            <LinkedInIcon />
          </Fab>
          <p>Follow us on LinkedIn</p>
        </div>
        <div>
          <Fab
            size="small"
            onClick={() => navigateTo("https://github.com/STLTeam")}
          >
            <GitHubIcon />
          </Fab>
          <p>Star us on GitHub</p>
        </div>
        <div>
          <Fab
            size="small"
            onClick={() => navigateTo("mailto:anonymous@company.com")}
          >
            <EmailIcon />
          </Fab>
          <p>Email Us</p>
        </div>
      </div>

      <div className="footer-right">
        <p className="footer-company-about">
          <span id="about">About</span>A movie recommender uses advanced
          algorithms and machine learning to suggest personalized films based on
          user behavior and preferences. Analyzing historical choices, it
          predicts enjoyable films by identifying patterns in vast datasets,
          enhancing the user experience.
        </p>
      </div>
    </footer>
  );
};

export default Footer;