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
} from "@mui/material";
import Person from "@mui/icons-material/Person";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import ErrorPage from "../pages/ErrorPage";
import LoadingAnimation from "./layouts/LoadingAnimation";

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
  const cinemaRoom = selectedShow?.cinemaRoom?.cinemaRoomSeatingPlan;
  const apiUrlSeats = `https://wi2020seb-cinema-api.azurewebsites.net/show/${selectedShow?.id}/seats`;
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

  const preparedSeatsForRender: any = (seats: any, numberOfRows: any) => {
    if (seatsQuery?.data === undefined) return;
    let SeatsArrayToBeReturned: any = [];
    for (let index = 1; index <= numberOfRows; index++) {
      const filterCurrentRow = seatsQuery?.data?.filter(
        (item: any) => parseInt(item.reihe) === index
      );
      const sortedCurrentShow = filterCurrentRow.sort(
        (itemA: any, itemB: any) =>
          parseInt(itemA.place) - parseInt(itemB.place)
      );
      SeatsArrayToBeReturned.push(sortedCurrentShow);
    }
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

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      scroll="paper"
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
      fullWidth={true}
      maxWidth="sm"
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
              <div
                style={{
                  marginTop: "2rem",
                  marginLeft: "auto",
                  marginRight: "auto",
                  borderBottom: "2px solid grey",
                  width: "80%",
                  textAlign: "center",
                }}
              >
                <strong>Leinwand</strong>
              </div>
              <Box
                sx={{
                  p: 2,
                  border: "1px solid grey",
                  marginTop: "1rem",
                  width: "95%",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              >
                {seatsToRender?.map((row: any, index) => (
                  <div
                    key={index}
                    style={{
                      marginBottom: ".5rem",
                      marginLeft: "auto",
                      marginRight: "auto",
                    }}
                  >
                    {row?.map((seat: any) => (
                      <Checkbox
                        disabled={seat.blocked}
                        key={`${seat.id}`}
                        style={{
                          height: "19.62px",
                          width: "19.62px",
                          marginLeft: ".4rem",
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
  );
}
export default SeatBookingDialog;
