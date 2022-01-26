import React, { useState, useEffect } from "react";
import MovieDetails from "../components/MovieDetails";
import ShowPicker from "../components/ShowPicker";
import Slider from "../components/Slider";
import { Box, Container, Grid, ThemeProvider, Typography } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useQuery } from "react-query";
import palette from "../config/Colours";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import IconButton from "@mui/material/IconButton";
import { useLocation } from "react-router-dom";
import ManageCheckout from "../components/ManageCheckout";
import ErrorPage from "./ErrorPage";
import LoadingAnimation from "../components/layouts/LoadingAnimation";
import APIUrl from "../config/APIUrl";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Ratings from "../components/Ratings";
import { getCookie } from "../components/CookieHandler";
import ProfileDetails from "../components/ProfileDetails";
import CreditCardDetails from "../components/CreditCardDetails";
import UpdateProfileDashboard from "../components/UpdateProfileDashboard";
import { useTreeData } from "@adobe/react-spectrum";
import { BookingCard } from "../components/BookingCard";

function ProfilePage() {
  const userID : string = getCookie("userId");
  let row2Width : number = 6;

  const apiUrlGetUser = `${APIUrl.apiUrl}/user/${userID}`;
  const {isLoading: isLoadingUser, error: errorUser, data: dataUser} : any = useQuery("User", () =>
    fetch(apiUrlGetUser).then((res) => res.json())
  );

  if(dataUser) {
    if(dataUser.role.autorization === "ADMIN") {
      row2Width = 4;
    }
  }

  if (isLoadingUser) {
    return <LoadingAnimation />;
  }

  if (errorUser) {
    return <ErrorPage />;
  }

  const theme = createTheme(palette);

  return (
    <ThemeProvider theme={theme}>
      <Container
        className="wholeContainer"
        sx={{
          bgcolor: "background.paper",
          pt: 4,
          pb: 6,
          position: "relative",
          marginTop: theme.spacing(12),
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography align="center" component="h1" variant="h5">Profil von {dataUser?.userName}</Typography>
          </Grid>
          <Grid item xs={4}>
            <ProfileDetails selectedUser={dataUser} />
          </Grid>
          <Grid item xs={4}>
            <CreditCardDetails selectedUser={dataUser} />
          </Grid>
          <Grid item xs={4}>
            <UpdateProfileDashboard />
          </Grid>
          <Grid item xs={row2Width}>
            <BookingCard selectedUser={dataUser} />
          </Grid>
          <Grid item xs={row2Width}>
            <CreditCardDetails selectedUser={dataUser} />
          </Grid>
          {dataUser.role.autorization === "ADMIN" ? (
            <Grid item xs={row2Width}>
            <UpdateProfileDashboard />
            </Grid>
          ) : null}
        </Grid>
      </Container>
    </ThemeProvider>
  );
}

export default ProfilePage;
