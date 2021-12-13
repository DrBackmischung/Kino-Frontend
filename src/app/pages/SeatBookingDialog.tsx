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

function SeatBookingDialog(props: any) {
  const { open, handleClose } = props;

  const apiUrl =
    "https://wi2020seb-cinema-api-dev.azurewebsites.net/show/e863775b-9487-43cd-b4ce-889d98542bb3/seats";

  const { isLoading, error, data } = useQuery("seatsData", () =>
    fetch(apiUrl).then((res) => res.json())
  );

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
          <strong>Shrek</strong>
          <p>12:00 Kino 3 2D</p>
          <strong>X Sitze XX€</strong>
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
              width: "80%",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            {data?.map((item: any) => (
              <Checkbox
                id={`${item.id}`}
                style={{
                  height: "20px",
                  width: "20px",
                }}
                icon={<p>{item.place}</p>}
                checkedIcon={<Person />}
              />
            ))}
          </Box>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Abbruch</Button>
        <Button>Reservieren</Button>
      </DialogActions>
    </Dialog>
  );
}

export default SeatBookingDialog;
