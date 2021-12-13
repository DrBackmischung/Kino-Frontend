import React, { useState } from "react";
import "./App.css";
import CheckoutDialog from "./app/pages/CheckoutDialog";
import Button from "@mui/material/Button";
import SeatBookingDialog from "./app/pages/SeatBookingDialog";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

function App() {
  const [openCheckout, setOpenCheckout] = useState(false);
  const [openSeatBooking, setOpenSeatBooking] = useState(false);

  const handleClickOpenCheckout = () => {
    setOpenCheckout(true);
  };

  const handleCloseCheckout = () => {
    setOpenCheckout(false);
  };

  const handleClickOpenBooking = () => {
    setOpenSeatBooking(true);
  };

  const handleCloseBooking = () => {
    setOpenSeatBooking(false);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <Button onClick={handleClickOpenCheckout}>
        Dialog öffnen! (Checkout)
      </Button>
      <Button onClick={handleClickOpenBooking}>
        Dialog öffnen! (SeatBooking)
      </Button>
      <CheckoutDialog open={openCheckout} handleClose={handleCloseCheckout} />
      <SeatBookingDialog
        open={openSeatBooking}
        handleClose={handleCloseBooking}
      />
    </QueryClientProvider>
  );
}

export default App;
