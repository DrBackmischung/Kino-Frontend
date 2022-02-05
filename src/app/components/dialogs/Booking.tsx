import {
  Grid,
  Card,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Container,
} from "@mui/material";
import { useEffect } from "react";
import { useQuery } from "react-query";
import APIUrl from "../../config/APIUrl";
import ErrorPage from "../../pages/ErrorPage";
import LoadingAnimation from "../layouts/LoadingAnimation";
import "./Booking.css";

export function Booking(props: any) {
  const { open, cancel, selectedBooking } = props;
  const apiUrlMovies = `${APIUrl.apiUrl}/booking/${selectedBooking.id}/tickets`;

  const bookedSeats = useQuery("BookedSeatsData", () =>
    fetch(apiUrlMovies).then((res) => res.json())
  );

  useEffect(() => {
    bookedSeats.refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedBooking]);
  if (bookedSeats.isLoading) {
    return <LoadingAnimation />;
  }
  if (bookedSeats.error) {
    return <ErrorPage />;
  }
  return (
    <Dialog
      open={open}
      onClose={cancel}
      scroll="paper"
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
      fullWidth={true}
      maxWidth="sm"
    >
      <DialogTitle id="scroll-dialog-title">
        {selectedBooking.show.movie.title}
        <br></br> am {selectedBooking.show.showDate.substring(8, 10)}.
        {selectedBooking.show.showDate.substring(5, 7)}.
        {selectedBooking.show.showDate.substring(0, 4)} um{" "}
        {selectedBooking.show.startTime.substring(0, 5)}
      </DialogTitle>
      <DialogContent dividers={true}>
        <DialogContentText id="scroll-dialog-description">
          <Container
            component="main"
            maxWidth="xs"
            sx={{
              bgcolor: "background.paper",
              pt: 8,
              pb: 6,
              position: "relative",
            }}
          >
            <Grid container xs={12}>
              {selectedBooking.tickets.map((t: any) => (
                <Grid item xs={12} padding={2}>
                  <Card sx={{ display: "flex" }}>
                    <CardContent>
                      <p>
                        <b>Reihe</b> {t.seat.reihe}
                      </p>
                      <p>
                        <b>Nummer</b> {t.seat.place}
                      </p>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button className="booking-button" onClick={cancel}>Schließen</Button>
      </DialogActions>
    </Dialog>
  );
}

export function CancelBooking(props: any) {
  const { open, cancel, selectedBooking, deleteBooking } = props;
  return (
    <Dialog
      open={open}
      onClose={cancel}
      scroll="paper"
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
      fullWidth={true}
      maxWidth="sm"
    >
      <DialogTitle id="scroll-dialog-title">
        {selectedBooking.show.movie.title}
        <br></br> am {selectedBooking.show.showDate.substring(8, 10)}.
        {selectedBooking.show.showDate.substring(5, 7)}.
        {selectedBooking.show.showDate.substring(0, 4)} um{" "}
        {selectedBooking.show.startTime.substring(0, 5)}
      </DialogTitle>
      <DialogContent dividers={true}>
        <DialogContentText id="scroll-dialog-description">
          Willst du wirklich stornieren?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button className="booking-button" onClick={deleteBooking}>Ja</Button>
        <Button className="booking-button" onClick={cancel}>Nein</Button>
      </DialogActions>
    </Dialog>
  );
}
