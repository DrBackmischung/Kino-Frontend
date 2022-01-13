/* eslint-disable */
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Box,
  Checkbox,
  ThemeProvider,
} from "@mui/material";
import Person from "@mui/icons-material/Person";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import ErrorPage from "../pages/ErrorPage";
import LoadingAnimation from "./layouts/LoadingAnimation";
import APIUrl from "../config/APIUrl";
import "./SeatBookingDialog.css";
import { createTheme } from "@mui/material/styles";
import palette from "../config/Colours";

function SeatBookingDialog(props: any) {
  const {
    open,
    handleClose,
    selectedShow,
    proceedToCheckout,
    selectedSeats,
    setSelectedSeats,
    priceQuery,
  } = props;
  const [seatsToRender, setSeatsToRender] = useState([]);
  const [widthForSeats, setWidthForSeats] = useState("5%"); //initial value
  const cinemaRoom = selectedShow?.cinemaRoom?.cinemaRoomSeatingPlan;
  const apiUrlSeats = `${APIUrl.apiUrl}/show/${selectedShow?.id}/seats`;
  const seatsQuery = useQuery(
    "seatsData",
    () => fetch(apiUrlSeats).then((res) => res.json()),
    {
      refetchOnWindowFocus: false,
      enabled: false,
    }
  );
  useEffect(() => {
    if (selectedShow?.id !== undefined) {
      seatsQuery.refetch();
    }
  }, [selectedShow?.id]);
  console.log(selectedShow, seatsQuery.data);
  const preparedSeatsForRender: any = (seats: any, numberOfRows: any) => {
    let mostSeatsInARow = 0;
    if (seatsQuery?.data === undefined) return;
    let SeatsArrayToBeReturned: any = [];
    for (let index = 1; index <= numberOfRows; index++) {
      const filterCurrentRow = seatsQuery?.data?.filter(
        (item: any) => parseInt(item.reihe) === index
      );
      if (filterCurrentRow.length > mostSeatsInARow) {
        mostSeatsInARow = filterCurrentRow.length;
      }
      const sortedCurrentShow = filterCurrentRow.sort(
        (itemA: any, itemB: any) =>
          parseInt(itemA.place) - parseInt(itemB.place)
      );
      SeatsArrayToBeReturned.push(sortedCurrentShow);
    }
    let seatWidth = 100 / mostSeatsInARow;
    setWidthForSeats(`${seatWidth}%`);
    return SeatsArrayToBeReturned;
  };

  useEffect(() => {
    setSeatsToRender(
      preparedSeatsForRender(seatsQuery.data, cinemaRoom?.reihen)
    );
  }, [seatsQuery?.data]);

  const handleSeatChecked = (e: any, seatId: any) => {
    if (e.target.checked) {
      setSelectedSeats((prevValues: any) => prevValues?.concat(seatId));
    } else {
      setSelectedSeats((prevValues: any) =>
        prevValues.filter((item: any) => item !== seatId)
      );
    }
  };
  const theme = createTheme(palette);

  return (
    <ThemeProvider theme={theme}>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll="paper"
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        fullWidth={true}
        maxWidth="sm"
        className="wholeDialog"
      >
        <DialogTitle id="scroll-dialog-title">Checkout</DialogTitle>
        <DialogContent dividers={true}>
          <DialogContentText id="scroll-dialog-description">
            {seatsQuery.error || priceQuery.error ? (
              <ErrorPage />
            ) : seatsQuery.isLoading || priceQuery.isLoading ? (
              <LoadingAnimation />
            ) : (
              <>
                <strong>{selectedShow?.movie?.titel}</strong>
                <p>
                  {selectedShow?.startTime} Kino 3 Sprache:{" "}
                  {selectedShow?.movie?.language}
                </p>
                <strong>
                  {selectedSeats?.length} Sitze{" "}
                  {selectedSeats?.length * priceQuery?.data?.[0]?.price}€
                </strong>
                <div className="canvasContainer">
                  <strong>Leinwand</strong>
                </div>
                <Box className="cinemaBox">
                  {seatsToRender?.map((row: any, index) => (
                    <div key={index} className="rowContainer">
                      {row?.map((seat: any) => (
                        <Checkbox
                          disabled={seat.blocked}
                          key={`${seat.id}`}
                          className="seatCheckbox"
                          sx={{
                            width: widthForSeats,
                            "&.Mui-checked": {
                              color: "orange",
                            },
                          }}
                          icon={<Person />}
                          checkedIcon={<Person />}
                          onChange={(e) => handleSeatChecked(e, seat.id)}
                        />
                      ))}
                    </div>
                  ))}
                </Box>
              </>
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Abbruch</Button>
          <Button
            disabled={selectedSeats?.length > 0 ? false : true}
            onClick={proceedToCheckout}
          >
            Reservieren
          </Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
}
export default SeatBookingDialog;
