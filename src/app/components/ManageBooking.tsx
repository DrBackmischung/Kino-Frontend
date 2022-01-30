import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Booking, CancelBooking } from "./dialogs/Booking";

const theme = createTheme();
function ManageBooking(props: any) {
  const { isOpen, open, close, isOpenCancel, openCancel, closeCancel, booking, deleteBooking } = props;
  
  return (
    <ThemeProvider theme={theme}>
    {isOpen ? <Booking
      selectedBooking={booking}
      open={open}
      cancel={close}
    /> : null}
    {isOpenCancel ? <CancelBooking
      selectedBooking={booking}
      open={openCancel}
      cancel={closeCancel}
      deleteBooking={deleteBooking}
    /> : null}
    </ThemeProvider>
  );
}

export default ManageBooking;
