/* eslint-disable */
import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import HomeIcon from "@mui/icons-material/Home";
import { Box, Container, Menu, MenuItem } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import { useState } from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import ProgramPage from "../../pages/ProgramPage";
import ComingSoon from "../../pages/ComingSoon";
import DetailsPage from "../../pages/DetailsPage";
import SignInPage from "../../pages/SignInPage";
import Impressum from "../../pages/Impressum";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import palette from "../../config/Colours";
import "./MenuBar.css";

function MenuBar() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [pages, setPages] = useState([
    { name: "Programm", link: "/programPage" },
    { name: "Events", link: "/eventsPage" },
    { name: "Preisübersicht", link: "/pricesOverviewPage" },
    { name: "News", link: "/newsPage" },
  ]);

  const theme = createTheme(palette)
  
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <AppBar 
          className="menu-appBar"
        >
          <Container fixed>
            <Toolbar>
              <IconButton 
                className="menu-icon"
                sx={{ height: "40px", width: "40px" }}
                size="large"
                edge="start"
                aria-label="menu"
                component={Link}
                to={"/"}
              >
                <HomeIcon />
              </IconButton>
              <Box
                sx={{
                  justifyContent: "space-evenly",
                  flexGrow: 1,
                  display: { xs: "flex" },
                }}
              >
                {pages.map((page) => (
                  <Button 
                    id="menu-button"
                    key={page.name}
                    //onClick={handleCloseNavMenu}
                    variant="contained"
                    component={Link}
                    to={page.link}
                  >
                    {page.name}
                  </Button>
                ))}
              </Box>
              <Box>
                <IconButton
                  className="menu-icon" 
                  sx={{ height: "40px", width: "40px" }}
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem component={Link} to="/SignInPage">
                    Profile
                  </MenuItem>
                  <MenuItem onClick={handleClose}>My account</MenuItem>
                </Menu>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </ThemeProvider>
      <Routes>
        <Route path="/" element={<ComingSoon />} />
        <Route path="/programPage" element={<ProgramPage />} />
        <Route path="/eventsPage" element={<ComingSoon />} />
        <Route path="/pricesOverviewPage" element={<ComingSoon />} />
        <Route path="/newsPage" element={<ComingSoon />} />
        <Route path="/DetailsPage" element={<DetailsPage />} />
        <Route path="/SignInPage" element={<SignInPage />} />
        <Route path="/Impressum" element={<Impressum/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default MenuBar;
