import React, { useState, useEffect } from "react";
import CheckoutDialog from "../components/CheckoutDialog";
import SeatBookingDialog from "../components/SeatBookingDialog";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";

const user = {
  id: "e3e13a2a-f792-4d50-88fc-6bc05514868c",
  userName: null,
  name: "Mustermann",
  firstName: "Max",
  email: "max.mustermann@t-online.de",
  password: null,
  role: null,
};

const theme = createTheme();
function ManageCheckout(props: any) {
  const navigate = useNavigate();
  const { show, open } = props;
  const [openCheckout, setOpenCheckout] = useState(false);
  const [openSeatBooking, setOpenSeatBooking] = useState(false);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedShow, setSelectedShow] = useState();
  const apiUrlPrice = `https://wi2020seb-cinema-api.azurewebsites.net/price/getAll`;
  const priceQuery: any = useQuery("priceData", () =>
    fetch(apiUrlPrice).then((res) => res.json())
  );
  useEffect(() => {
    if (open === true) {
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
    navigate("/");
  };

  const handleCloseBooking = () => {
    setOpenSeatBooking(false);
  };
  return (
    <ThemeProvider theme={theme}>
      <CheckoutDialog
        open={openCheckout}
        handleClose={handleCloseCheckout}
        finishTransaction={handleCloseCheckout}
        user={user}
        selectedShow={selectedShow}
        selectedSeats={selectedSeats}
        priceQuery={priceQuery}
      />
      <SeatBookingDialog
        open={openSeatBooking}
        handleClose={handleCloseBooking}
        selectedShow={selectedShow}
        proceedToCheckout={handleClickOpenCheckout}
        userId={user.id}
        selectedSeats={selectedSeats}
        setSelectedSeats={setSelectedSeats}
        priceQuery={priceQuery}
      />
    </ThemeProvider>
  );
}

export default ManageCheckout;
