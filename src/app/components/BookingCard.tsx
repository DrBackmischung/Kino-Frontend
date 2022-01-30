import React, { useState } from "react";
import { Grid, Typography, Card, CardMedia, CardContent, Button } from "@mui/material";
import APIUrl from "../config/APIUrl";
import { useQuery } from "react-query";
import ErrorPage from "../pages/ErrorPage";
import LoadingAnimation from "./layouts/LoadingAnimation";
import ManageBooking from "./ManageBooking";

export function BookingCard(props: any) {

  const { selectedUser } = props;
  const [booking, setBooking ] = useState<any>();
  const [bookingID, setBookingID ] = useState();
  const [openBookingDetails, setOpenBookingDetails] = useState(false);

  const handleOpenBooking = () => {
    setOpenBookingDetails(true);
  };
  const handleCloseBooking = () => {
    setOpenBookingDetails(false);
  };
  const [openCancel, setOpenCancel] = useState(false);

  const handleOpenCancel = () => {
    setOpenCancel(true);
  };
  const handleCloseCancel = () => {
    setOpenCancel(false);
  };

  const deleteBooking = () => {
    if(booking) {
      const apiUrlCancelBooking = `${APIUrl.apiUrl}/booking/${bookingID}/changeStatus`;
      let seatIDs : any[] = [];
      let snackIDs : any[] = [];
      for(const ticket of booking.tickets) {
        seatIDs.push(ticket?.seat?.id);
      }
      for(const snack of booking.snacks) {
        seatIDs.push(snack?.id);
      }
      // eslint-disable-next-line
      const requestOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userID: booking.user.id,
          seatIDs: seatIDs,
          showID: booking.show.id,
          state: "Canceled",
          bookingDate: booking.bookingDate,
          snackIDs: snackIDs
        }),
      };
      fetch(apiUrlCancelBooking, requestOptions).then((response) => {
              return response.json();
          });
    }
    handleCloseCancel();
  }

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
                {b.state === "Canceled" ? (
                  <p><b>=== Buchung storniert! ===</b></p>
                ): (
                  <Button
                    sx={{marginTop:1}}
                    fullWidth
                    onClick={() => {
                      handleOpenCancel();
                      setBooking(b);
                      setBookingID(b.id);
                    }}
                    variant="contained"
                  >
                    Buchung stornieren
                  </Button>
                )}
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
        isOpenCancel={openCancel}
        openCancel={handleOpenCancel}
        closeCancel={handleCloseCancel}
        booking={booking}
        deleteBooking={deleteBooking}
      />
    </Grid>
  );
}
