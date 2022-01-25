/* eslint-disable */
import React, { useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import HomeIcon from "@mui/icons-material/Home";
import { Box, Container, Menu, MenuItem, Grid, MenuProps } from "@mui/material";
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
import UserRegistrationPage from "../../pages/UserRegistrationPage";
import { getCookie, setCookie } from "../CookieHandler";
import { useQuery } from "react-query";
import APIUrl from "../../config/APIUrl";
import PricesPage from "../../pages/PricesPage";
import HomePage from "../../pages/HomePage";
import CookiesNotification from "../CookiesNotification";
import { styled } from '@mui/material/styles';

function MenuBar() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const [currentUser, setCurrentUser] = useState({
    userId: getCookie("userId"),
  });

  const apiUrl = `${APIUrl.apiUrl}/user/${currentUser.userId}`;
  const { data, refetch } = useQuery(
    "userData",
    () => fetch(apiUrl).then((res) => res.json()),
    {
      refetchOnWindowFocus: false,
      enabled: false,
    }
  );

  useEffect(() => {
    refetch();
  }, [currentUser.userId]);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [pages, setPages] = useState([
    { name: "Programm", link: "/programPage" },
    { name: "Events", link: "/eventsPage" },
    { name: "Preisübersicht", link: "/pricesOverviewPage" },
    { name: "News", link: "/newsPage" },
  ]);

  const setUser = () => {
    setCurrentUser({
      userId: getCookie("userId"),
    });
  };

  const StyledMenu = styled((props: MenuProps) => (
    <Menu
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      {...props}
    />
  ))(({theme})=>({
    '& .MuiPaper-root': {
      borderRadius: 6,
      minWidth:180,
    },
    '& .MuiMenu-list': {
      backgroundColor: '#6d6d6d',
      padding: '4px 0',
    },
  }));

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
                <img
                  src="https://raw.githubusercontent.com/DrBackmischung/Kino-Dokumentation/main/KV.png"
                  alt="Kinovation Logo"
                  height={40}
                />
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
                {currentUser.userId !== "null" ? (
                  <>
                    <Grid container spacing={2}>
                      <Grid item xs={8}>
                        <p
                          style={{ marginTop: "1.35rem" }}
                        >{`Willkommen ${data?.userName}!`}</p>
                      </Grid>
                      <Grid item xs={4}>
                        <Button
                          style={{ backgroundColor: "white", opacity: 0.95 }}
                          key="Ausloggen"
                          sx={{ my: 2, color: "black", display: "block" }}
                          variant="outlined"
                          onClick={(e) => {
                            setCookie("userId", "null", 7);
                            setCurrentUser({
                              userId: "null",
                            });
                          }}
                        >
                          Ausloggen
                        </Button>
                      </Grid>
                    </Grid>
                  </>
                ) : (
                  <>
                    <IconButton
                      className="menu-icon" 
                      sx={{ height: "40px", width: "40px" }}
                      size="large"
                      aria-label="account of current user"
                      aria-controls="menu-appbar"
                      aria-haspopup="true"
                      onClick={handleMenu}
                      color="secondary"
                    >
                      <AccountCircle />
                    </IconButton>
                    <StyledMenu
                      id="menu-appbar"
                      anchorEl={anchorEl}
                      keepMounted
                      open={Boolean(anchorEl)}
                      onClose={handleClose}>
                      <MenuItem component={Link} to="/SignUpPage">
                          Registrieren
                      </MenuItem>
                      <MenuItem component={Link} to="/SignInPage">
                          Einloggen
                      </MenuItem>
                      <MenuItem onClick={handleClose}>My account</MenuItem>
                    </StyledMenu>
                  </>
                )}
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </ThemeProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/programPage" element={<ProgramPage />} />
        <Route path="/eventsPage" element={<ComingSoon />} />
        <Route path="/pricesOverviewPage" element={<PricesPage />} />
        <Route path="/newsPage" element={<ComingSoon />} />
        <Route
          path="/DetailsPage"
          // @ts-ignore
          element={<DetailsPage userData={data} />}
        />
        <Route
          path="/SignInPage"
          // @ts-ignore
          element={<SignInPage setUser={setUser} />}
        />
        <Route
          path="/SignUpPage"
          // @ts-ignore
          element={<UserRegistrationPage setUser={setUser} />}
        />
        <Route path="/Impressum" element={<Impressum />} />
      </Routes>
      <CookiesNotification/>
    </BrowserRouter>
  );
}

export default MenuBar;
