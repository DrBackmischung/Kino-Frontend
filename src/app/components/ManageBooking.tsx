import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Booking } from "./dialogs/Booking";

const theme = createTheme();
function ManageBooking(props: any) {
  const { isOpen, open, close, booking } = props;
  
  return (
    <ThemeProvider theme={theme}>
      {isOpen ? <Booking
        selectedBooking={booking}
        open={open}
        cancel={close}
      /> : null}
    </ThemeProvider>
  );
}

export default ManageBooking;
