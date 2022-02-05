import React from "react";
import { Container, Grid, ThemeProvider, Typography } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useQuery } from "react-query";
import palette from "../config/Colours";
import ErrorPage from "./ErrorPage";
import LoadingAnimation from "../components/layouts/LoadingAnimation";
import APIUrl from "../config/APIUrl";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { getCookie } from "../components/CookieHandler";
import ProfileDetails from "../components/ProfileDetails";
import CreditCardDetails from "../components/CreditCardDetails";
import UpdateProfileDashboard from "../components/UpdateProfileDashboard";
import { BookingCard } from "../components/BookingCard";
import { ReviewDashboard } from "../components/ReviewDashboard";

function ProfilePage() {
  const userID: string = getCookie("userId");

  const apiUrlGetUser = `${APIUrl.apiUrl}/user/${userID}`;
  const {
    isLoading: isLoadingUser,
    data: dataUser,
    isError,
  }: any = useQuery("User", () =>
    fetch(apiUrlGetUser).then((res) => res.json())
  );

  if (isLoadingUser) {
    return <LoadingAnimation />;
  }

  if (isError || dataUser?.error) {
    return <ErrorPage errorCode={dataUser?.status} />;
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
        maxWidth="xl"
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography align="center" component="h1" variant="h5">
              Profil von {dataUser?.userName}
            </Typography>
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
          <Grid item xs={6}>
            <BookingCard selectedUser={dataUser} />
          </Grid>
          <Grid item xs={6}>
            <ReviewDashboard selectedUser={dataUser} />
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
}

export default ProfilePage;
