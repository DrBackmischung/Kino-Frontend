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
import colours from "../config/colours";
import { useQuery } from "react-query";
import { AnyMxRecord, AnyRecord } from "dns";
import { ConstructionOutlined } from "@mui/icons-material";

function SeatBookingDialog(props: any) {
  const { open, handleClose, selectedShow, proceedToCheckout } = props;
  const [seatsToRender, setSeatsToRender] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const cinemaRoom = selectedShow.cinemaRoom.cinemaRoomSeatingPlan;
  const apiUrlSeats = `https://wi2020seb-cinema-api-dev.azurewebsites.net/show/${selectedShow.id}/seats`;
  const seatsQuery = useQuery("seatsData", () =>
    fetch(apiUrlSeats).then((res) => res.json())
  );

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
      preparedSeatsForRender(seatsQuery.data, cinemaRoom.reihen)
    );
  }, [seatsQuery?.data]);

  const handleSeatChecked = (e: any) => {
    console.log(e);
    setSelectedSeats((prevValues: any) => prevValues?.concat(e));
  };

  const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userID: "e3e13a2a-f792-4d50-88fc-6bc05514868c",
      seatID: "b86c9f4c-b339-4414-8e50-968b73a73b4e",
      priceID: "b37f1de2-44cd-45ec-bbb9-0db1175f0343",
      showID: "118e31db-145a-403d-834c-a683de7ddce2",
    }),
  };

  const blockSeat = () => {
    const apiUrl = `https://wi2020seb-cinema-api-dev.azurewebsites.net/ticket/add`;
    fetch(apiUrl, requestOptions).then((response) => {
      if (!response.ok) {
        console.log(response.statusText);
      }
      console.log(response.json());
    });
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
          <strong>{selectedShow?.movie?.titel}</strong>
          <p>
            {selectedShow?.startTime} Kino 3 Sprache:{" "}
            {selectedShow?.movie?.language}
          </p>
          <strong>
            {selectedSeats?.length} Sitze {selectedSeats?.length * 5}€
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
                      height: "20px",
                      width: "20px",
                      margin: ".03rem",
                    }}
                    icon={<Person />}
                    checkedIcon={<Person />}
                    onChange={() => handleSeatChecked(seat.id)}
                  />
                ))}
              </div>
            ))}
          </Box>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Abbruch</Button>
        <Button onClick={blockSeat}>Reservieren</Button>
      </DialogActions>
    </Dialog>
  );
}
export default SeatBookingDialog;
