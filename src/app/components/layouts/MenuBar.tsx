/* eslint-disable */
import React, { useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { Box, Container, Menu, MenuItem, Grid, styled, MenuProps } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import { useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import ProgramPage from "../../pages/ProgramPage";
import DetailsPage from "../../pages/DetailsPage";
import NewsAndEventsPage from "../../pages/NewsAndEventsPage";
import SignInPage from "../../pages/SignInPage";
import UserRegistrationPage from "../../pages/UserRegistrationPage";
import Impressum from "../../pages/Impressum";
import AdminPage from "../../pages/AdminPage";
import { getCookie, setCookie } from "../CookieHandler";
import { useQuery } from "react-query";
import APIUrl from "../../config/APIUrl";
import PricesPage from "../../pages/PricesPage";
import HomePage from "../../pages/HomePage";
import ProfilePage from "../../pages/ProfilePage";
import CookiesNotification from "../CookiesNotification";
import TermsAndConditionsPage from "../../pages/TermsAndConditionsPage";
import InfoPage from "../../pages/InfoPage";
import PasswortVergessenPage from "../../pages/PasswortVergessenPage";
import "./MenuBar.css";
import ChatBot from "../ChatBot";

function MenuBar() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const [currentUser, setCurrentUser] = useState({
    userId: getCookie("userId"),
  });

  const apiUrl = `${APIUrl.apiUrl}/user/${currentUser.userId}`;
  const userData = useQuery(
    "userData",
    () => fetch(apiUrl).then((res) => res.json()),
    {
      refetchOnWindowFocus: true,
      enabled: true,
    }
  );

  useEffect(() => {
    userData.refetch();
  }, [currentUser.userId]);

  const handleClose = () => {
    setAnchorEl(null);
  };
  const [pages, setPages] = useState([
    { name: "Programm", link: "/programm" },
    { name: "News & Events", link: "/events" },
    { name: "Preisübersicht", link: "/preise" },
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
      backgroundColor: '#ba8434',
      padding: '4px 0',
    },
  }));

  return (
    <><>
      <ChatBot userData={userData.data} />
      <AppBar
        style={{ backgroundColor: "#393E41", opacity: 1 }}
        position="sticky"
      >
        <Container fixed>
          <Toolbar>
            <IconButton
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
                height={40} />
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
                  style={{ backgroundColor: "#ba8434", opacity: 0.95 }}
                  key={page.name}
                  sx={{ my: 2, color: "black", display: "block" }}
                  variant="contained"
                  component={Link}
                  to={page.link}
                >
                  {page.name}
                </Button>
              ))}
            </Box>
            <Box>
              {currentUser?.userId !== "null" &&
              currentUser?.userId !== undefined &&
              currentUser?.userId !== "undefined" &&
              userData?.data?.userName !== undefined &&
              userData?.data?.userName !== "undefined" ? (
                <>
                  <Grid container spacing={2}>
                    <Grid item xs={10}>
                      <p style={{ marginTop: "1.35rem", color: "#ba8434" }}>
                        {`Willkommen ${userData?.data?.userName}!`}
                      </p>
                    </Grid>
                    <Grid item xs={2} sx={{ pt: 3, pb: 2 }}>
                      <IconButton
                        id="menuBar-iconButton"
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleMenu}
                        sx={{ pt: 3 }}
                      >
                        <AccountCircle />
                      </IconButton>
                      <StyledMenu
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
                        <MenuItem component={Link} to="/profil">
                          Profil
                        </MenuItem>
                        <MenuItem
                          onClick={() => {
                            setCookie("userId", "null", 7);
                            setCookie("role", "null", 7);
                            setCurrentUser({
                              userId: "null",
                            });
                          } }
                        >
                          Ausloggen
                        </MenuItem>
                      </StyledMenu>
                    </Grid>
                  </Grid>
                </>
              ) : (
                <>
                  <IconButton
                    id="menuBar-iconButton"
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleMenu}
                    color="inherit"
                  >
                    <AccountCircle />
                  </IconButton>
                  <StyledMenu
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
                      <MenuItem component={Link} to="/login">
                          Einloggen
                      </MenuItem>
                      <MenuItem component={Link} to="/registrierung">
                      Registrieren
                    </MenuItem>
                    </StyledMenu>
                </>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </><Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/programm" element={<ProgramPage />} />
        <Route path="/events" element={<NewsAndEventsPage />} />
        <Route path="/preise" element={<PricesPage />} />
        <Route path="/AGBs" element={<TermsAndConditionsPage />} />
        <Route
          path="/film"
          // @ts-ignore
          element={<DetailsPage userData={userData?.data} />} />
        <Route
          path="/login"
          // @ts-ignore
          element={<SignInPage setUser={setUser} />} />
        <Route
          path="/registrierung"
          // @ts-ignore
          element={<UserRegistrationPage setUser={setUser} />} />
        <Route path="/impressum" element={<Impressum />} />
        <Route path="/admin" element={<AdminPage userData={userData} />} />
        <Route path="/profil" element={<ProfilePage />} />
        <Route path="/info/:bookingID" element={<InfoPage />} />
        <Route path="/pw" element={<PasswortVergessenPage />} />
      </Routes><CookiesNotification /></>
    
  );
}

export default MenuBar;