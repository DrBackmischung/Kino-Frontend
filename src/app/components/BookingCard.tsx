import React, { useState } from "react";
import { Grid, Typography, Card, CardMedia, CardContent, CardActions, Button } from "@mui/material";
import APIUrl from "../config/APIUrl";
import { useQuery } from "react-query";
import ErrorPage from "../pages/ErrorPage";
import LoadingAnimation from "./layouts/LoadingAnimation";
import ManageBooking from "./ManageBooking";

export function BookingCard(props: any) {

  const { selectedUser } = props;
  const [booking, setBooking ] = useState();
  const [openBookingDetails, setOpenBookingDetails] = useState(false);

  const handleOpenBooking = () => {
    setOpenBookingDetails(true);
  };
  const handleCloseBooking = () => {
    setOpenBookingDetails(false);
  };

  const apiUrlGetBookings = `${APIUrl.apiUrl}/user/${selectedUser?.id}/bookings`;
  const {isLoading: isLoadingBookings, error: errorBookings, data: dataBookings} : any = useQuery("Bookings", () =>
    fetch(apiUrlGetBookings).then((res) => res.json())
  );

  console.log(dataBookings);

  if (isLoadingBookings) {
    return <LoadingAnimation />;
  }

  if (errorBookings) {
    return <ErrorPage />;
  }

  if (dataBookings[0] === undefined) {
    return (
      <Grid item xs={12} spacing={3} borderTop={"3px solid grey"} paddingTop={5}>
        <Typography align="center" component="h1" variant="h5">Keine Buchungen</Typography>
      </Grid>
    );
  }

  return (
    <Grid container xs={12} borderTop={"3px solid grey"}>
      <Grid item xs={12} spacing={3} paddingTop={5}>
        <Typography align="center" component="h1" variant="h5">Buchungen</Typography>
      </Grid>
      {dataBookings.map(
        (b: any) => (
          <Grid item xs={12} padding={2}>
            <Card sx={{ display: 'flex' }}>
              <CardContent sx={{ flex: '1 0 auto' }}>
                <p><b>{b.show.movie.title}</b></p>
                <p>am {b.show.showDate.substring(8, 10)}.{b.show.showDate.substring(5, 7)}.{b.show.showDate.substring(0, 4)} um {b.show.startTime.substring(0, 5)}</p>
                <Button
                  fullWidth
                  onClick={() => {
                    handleOpenBooking();
                    setBooking(b);
                  }}
                  variant="contained"
                >
                  Details
                </Button>
              </CardContent>
              <CardMedia
                component="img"
                
                sx={{
                  pt: "2%",
                  pr: "2%",
                  pb: "2%",
                  width: "25%",
                }}
                src={"data:image/png;base64," + b.qrCode}
                alt="poster"
              />
            </Card>
          </Grid> 
        )
      )}
      <ManageBooking 
        isOpen={openBookingDetails}
        open={handleOpenBooking}
        close={handleCloseBooking}
        booking={booking}
      />
    </Grid>
  );
}
