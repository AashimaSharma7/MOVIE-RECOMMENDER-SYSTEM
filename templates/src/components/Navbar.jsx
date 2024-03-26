import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import MovieIcon from "@mui/icons-material/Movie";
import { useNavigate } from "react-router-dom";
import NavbarSearch from "./NavbarSearch";

const pages = ["Home", "About"];

function NavBar({
  updateRecommendations,
  updateRecommendedPosters,
  updateSelectedMovie,
  updateRecommendedMoviesID,
}) {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleMenuItemClick = (page) => {
    switch (page) {
      case "Home":
        navigate("/");
        break;
      case "About":
        const aboutElement = document.getElementById("about");
        if (aboutElement) {
          aboutElement.scrollIntoView({ behavior: "smooth" });
        }
        break;
      default:
        break;
    }
    handleCloseNavMenu();
  };
  return (
    <AppBar sx={{ backgroundColor: "#000" }} position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <MovieIcon
            fontSize="large"
            sx={{
              display: { xs: "none", md: "flex" },
              mr: 1,
              cursor: "pointer",
            }}
            onClick={() => {
              navigate("/");
            }}
          />
          <Typography
            variant="h6"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 900,
              fontSize: "2rem",
              letterSpacing: "0.1rem",
              color: "inherit",
              textDecoration: "none",
              wordSpacing: "-0.3rem",
              cursor: "pointer",
            }}
            onClick={() => {
              navigate("/");
            }}
          >
            MOVIE RECOMMENDER
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page, index) => (
                <MenuItem key={index} onClick={() => handleMenuItemClick(page)}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "right",
              marginRight: "2rem",
            }}
          >
            {pages.map((page, index) => (
              <Button
                key={index}
                onClick={() => handleMenuItemClick(page)}
                sx={{
                  my: 2,
                  color: "white",
                  display: "block",
                  fontWeight: 100,
                }}
              >
                {page}
              </Button>
            ))}
          </Box>
          <NavbarSearch
            updateRecommendations={updateRecommendations}
            updateRecommendedPosters={updateRecommendedPosters}
            updateSelectedMovie={updateSelectedMovie}
            updateRecommendedMoviesID={updateRecommendedMoviesID}
          />
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavBar;