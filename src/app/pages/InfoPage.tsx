import React from "react";
import { Container, Grid, ThemeProvider, Typography } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useQuery } from "react-query";
import palette from "../config/Colours";
import ErrorPage from "./ErrorPage";
import LoadingAnimation from "../components/layouts/LoadingAnimation";
import APIUrl from "../config/APIUrl";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useParams } from "react-router-dom";
import BookingDetails from "../components/BookingDetails";
import SnackDetails from "../components/SnackDetails";

function InfoPage() {
  let { bookingID } = useParams();

  const apiUrlGetBooking = `${APIUrl.apiUrl}/booking/${bookingID}`;
  const {isLoading, error, data} : any = useQuery("Booking", () =>
    fetch(apiUrlGetBooking).then((res) => res.json())
  );

  if (isLoading) {
    return <LoadingAnimation />;
  }

  if (error) {
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
        maxWidth="xl"
      >
        <Grid container spacing={2}>
          {data.state === "Canceled" ? (
            <Grid item xs={12} spacing={3} paddingTop={5}>
              <Typography align="center" component="h1" variant="h5">Buchung wurde storniert!</Typography>
            </Grid>
          ): null}
          <Grid item xs={12}>
            <Typography align="center" component="h1" variant="h5">{data?.show.movie.title}</Typography>
          </Grid>
          <Grid item xs={6}>
            <BookingDetails selectedBooking={data} />
          </Grid>
          <Grid item xs={6}>
            <SnackDetails selectedBooking={data} />
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
}

export default InfoPage;
