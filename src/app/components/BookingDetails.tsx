import React from "react";
import { Grid, Typography, Card, CardContent } from "@mui/material";

function BookingDetails(props: any) {
  const { selectedBooking } = props;
  return (
    <Grid container xs={12} borderTop={"3px solid grey"}>
      <Grid item xs={12} spacing={3} paddingTop={5}>
        <Typography align="center" component="h1" variant="h5">Tickets</Typography>
      </Grid>
      <Grid item xs={12}>
        <p><b>Vorstellung:</b> {selectedBooking?.show.movie.title} am {selectedBooking.show.showDate.substring(8, 10)}.{selectedBooking.show.showDate.substring(5, 7)}.{selectedBooking.show.showDate.substring(0, 4)} um {selectedBooking.show.startTime.substring(0, 5)}</p>
      </Grid>
      <Grid item xs={12}>
        <p><b>Saal:</b> {selectedBooking?.show.cinemaRoom.roomName}</p>
      </Grid>
      {selectedBooking.tickets.map(
          (t: any) => (
          <Grid item xs={12} padding={2}>
              <Card sx={{ display: 'flex' }}>
              <CardContent>
                  <p><b>Reihe</b> {t.seat.reihe}</p>
                  <p><b>Nummer</b> {t.seat.place}</p>
              </CardContent>
              </Card>
          </Grid> 
          )
      )}
    </Grid>
  );
}

export default BookingDetails;
