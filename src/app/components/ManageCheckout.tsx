/* eslint-disable */
import React, { useState, useEffect } from "react";
import CheckoutDialog from "../components/CheckoutDialog";
import SeatBookingDialog from "../components/SeatBookingDialog";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import APIUrl from "../config/APIUrl";

const theme = createTheme();
function ManageCheckout(props: any) {
  const navigate = useNavigate();
  const { show, open, userData } = props;
  const [openCheckout, setOpenCheckout] = useState(false);
  const [openSeatBooking, setOpenSeatBooking] = useState(false);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedShow, setSelectedShow] = useState();
  const [priceForSeats, setPriceForSeats] = useState(0);
  const apiUrlPrice = `${APIUrl.apiUrl}/price/getAll`;
  const priceQuery: any = useQuery("priceData", () =>
    fetch(apiUrlPrice).then((res) => res.json())
  );
  useEffect(() => {
    if (open > 0) {
      setOpenSeatBooking(true);
    }
  }, [open]);
  useEffect(() => {
    if (open !== undefined) {
      setSelectedShow(show);
    }
  }, [show]);
  const handleClickOpenCheckout = () => {
    setOpenCheckout(true);
    setOpenSeatBooking(false);
  };

  const handleCloseCheckout = () => {
    setOpenCheckout(false);
    resetSelectedSeats();
  };

  const finishTransaction = () => {
    setOpenCheckout(false);
    resetSelectedSeats();
    navigate("/");
  };

  const handleCloseBooking = () => {
    setOpenSeatBooking(false);
    resetSelectedSeats();
  };

  const resetSelectedSeats = () => {
    setSelectedSeats([]);
    setPriceForSeats(0);
  };
  return (
    <ThemeProvider theme={theme}>
      <CheckoutDialog
        open={openCheckout}
        handleClose={handleCloseCheckout}
        finishTransaction={finishTransaction}
        user={userData}
        selectedShow={selectedShow}
        selectedSeats={selectedSeats}
        priceQuery={priceQuery}
        userData={userData}
        priceForSeats={priceForSeats}
      />
      <SeatBookingDialog
        open={openSeatBooking}
        handleClose={handleCloseBooking}
        selectedShow={selectedShow}
        proceedToCheckout={handleClickOpenCheckout}
        userId={userData?.id}
        selectedSeats={selectedSeats}
        setSelectedSeats={setSelectedSeats}
        priceQuery={priceQuery}
        setPriceForSeats={setPriceForSeats}
        priceForSeats={priceForSeats}
      />
    </ThemeProvider>
  );
}

export default ManageCheckout;
