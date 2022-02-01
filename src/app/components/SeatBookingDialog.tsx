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
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import PersonOffIcon from "@mui/icons-material/PersonOff";
import WeekendIcon from "@mui/icons-material/Weekend";
import AccessibleIcon from "@mui/icons-material/Accessible";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import ErrorPage from "../pages/ErrorPage";
import LoadingAnimation from "./layouts/LoadingAnimation";
import APIUrl from "../config/APIUrl";
import "./SeatBookingDialog.css";
import { createTheme } from "@mui/material/styles";
import palette from "../config/Colours";
import { grey, blue, orange, red, green, purple } from "@mui/material/colors";

function SeatBookingDialog(props: any) {
  const {
    open,
    handleClose,
    selectedShow,
    proceedToCheckout,
    selectedSeats,
    setSelectedSeats,
    priceQuery,
    setPriceForSeats,
    priceForSeats,
  } = props;
  const [seatsToRender, setSeatsToRender] = useState([]);
  const [widthForSeats, setWidthForSeats] = useState("5%"); //initial value
  const [trigger, setTrigger] = useState(1);
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
    setTrigger((val) => val + 1);
  }, [selectedShow?.id, open]);
  const preparedSeatsForRender: any = (seats: any) => {
    let mostSeatsInARow = 0;
    if (seatsQuery?.data === undefined) return;
    let SeatsArrayToBeReturned: any = [];
    for (let index = 1; index <= 100; index++) {
      const filterCurrentRow = seatsQuery?.data?.filter(
        (item: any) => parseInt(item.reihe) === index
      );
      if (filterCurrentRow.length === 0) break;
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
    setSeatsToRender(preparedSeatsForRender(seatsQuery.data));
  }, [trigger, seatsQuery?.dataUpdatedAt]);

  const handleSeatChecked = (e: any, seatId: any, seat: any) => {
    if (e.target.checked) {
      setSelectedSeats((prevValues: any) => prevValues?.concat(seatId));
      setPriceForSeats((prevVal: any) => {
        let priceForSeat = priceQuery.data.filter((item: any) => {
          return item.type === seat.type;
        });
        return prevVal + priceForSeat[0].price;
      });
    } else {
      setSelectedSeats((prevValues: any) =>
        prevValues.filter((item: any) => item !== seatId)
      );
      setPriceForSeats((prevVal: any) => {
        let priceForSeat = priceQuery.data.filter((item: any) => {
          return item.type === seat.type;
        });
        return prevVal - priceForSeat[0].price;
      });
    }
  };
  const theme = createTheme(palette);

  const convertType: any = (t: string) => {
    switch (t) {
      case "PARQUET":
        return { color: grey[500] };
      case "LODGE":
        return { color: blue[500] };
      case "PREMIUM":
        return { color: orange[500] };
      case "WHEELCHAIR":
        return { color: green[500] };
      case "DOUBLESEAT":
        return { color: purple[500] };
    }
  };
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
        <DialogTitle id="scroll-dialog-title">Sitzplan</DialogTitle>
        <DialogContent dividers={true}>
          <DialogContentText id="scroll-dialog-description">
            {seatsQuery.isError || seatsQuery.data?.error ? (
              <ErrorPage errorCode={seatsQuery.data?.status} />
            ) : seatsQuery.isLoading || priceQuery.isLoading ? (
              <LoadingAnimation />
            ) : priceQuery.isError || priceQuery.data?.error ? (
              <ErrorPage errorCode={priceQuery.data?.status} />
            ) : (
              <>
                <strong>{selectedShow?.movie?.titel}</strong>
                <p>
                  Kino: {selectedShow?.cinemaRoom?.roomName}
                  <br />
                  {selectedShow?.startTime?.substring(0, 5)} Uhr
                  <br />
                  Sprache: {selectedShow?.movie?.language}
                </p>
                <strong>
                  {selectedSeats?.length} Sitze {priceForSeats}€
                </strong>
                <div className="canvasContainer">
                  <strong>Leinwand</strong>
                </div>
                <Box className="cinemaBox">
                  {seatsToRender?.map((row: any, index) => (
                    <div key={index} className="rowContainer">
                      {row?.map((seat: any) => (
                        <Checkbox
                          data-type={seat.type}
                          disabled={seat.state === "RESERVED" ? true : false}
                          key={`${seat.id}`}
                          className="seatCheckbox"
                          sx={{
                            width: widthForSeats,
                          }}
                          icon={
                            seat.state === "RESERVED" ? (
                              <PersonOffIcon sx={{ color: red[500] }} />
                            ) : seat.type === "WHEELCHAIR" ? (
                              <AccessibleIcon sx={convertType(seat.type)} />
                            ) : seat.type === "DOUBLESEAT" ? (
                              <WeekendIcon sx={convertType(seat.type)} />
                            ) : (
                              <PersonOutlineIcon sx={convertType(seat.type)} />
                            )
                          }
                          checkedIcon={<Person sx={convertType(seat.type)} />}
                          onChange={(e) => handleSeatChecked(e, seat.id, seat)}
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
