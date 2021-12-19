import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Box,
  TextField,
  RadioGroup,
  FormControl,
  FormLabel,
  FormControlLabel,
  Radio,
} from "@mui/material";
import React, { useState } from "react";

function CheckoutDialog(props: any) {
  const {
    open,
    handleClose,
    finishTransaction,
    selectedShow,
    selectedSeats,
    user,
    priceQuery,
  } = props;
  const [paymentMethod, setPaymentMethod] = useState("creditCard");

  const handleRadioChange = (e: any) => {
    setPaymentMethod(e.target.value);
  };

  const blockSeat = () => {
    var ticketsToDownload: any = "";
    const apiUrlBlockSeat = `https://wi2020seb-cinema-api.azurewebsites.net/ticket/add`;
    // eslint-disable-next-line
    selectedSeats?.map((item: any) => {
      const requestOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userID: user.id,
          seatID: item,
          priceID: priceQuery?.data?.[0]?.id,
          showID: selectedShow.id,
        }),
      };
      fetch(apiUrlBlockSeat, requestOptions).then((response) => {
        if (!response.ok) {
          console.log(response.statusText);
          return;
        }
        return response.json().then((data) => {
          console.log(data, data.toString());
          ticketsToDownload = ticketsToDownload + " " + data.toString();
        });
      });
    });
    console.log(ticketsToDownload);
    finishTransaction();
    var dataStr =
      "data:text/json;charset=utf-8," +
      encodeURIComponent(JSON.stringify(ticketsToDownload));
    var dlAnchorElem: any = document.getElementById("downloadAnchorElem");
    dlAnchorElem.setAttribute("href", dataStr);
    dlAnchorElem.setAttribute("download", "scene.json");
    dlAnchorElem.click();
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
          <Grid container spacing={2}>
            <Grid item xs={5}>
              <h2>{selectedShow?.movie?.titel}</h2>
              <p>
                {selectedShow?.startTime} Kino 3
                <br />
                Sprache: {selectedShow?.movie?.language}
              </p>
              <Button style={{ marginBottom: "1rem" }} variant="outlined">
                Verpflegung hinzufügen
              </Button>
              <Box sx={{ p: 2, border: "1px solid grey" }}>
                <Grid container spacing={1}>
                  <Grid item xs={8}>
                    <p>{selectedSeats.length} Sitzplätze</p>
                    <p>2 Nachos(groß)</p>
                    <p>2 Cola (0,5)</p>
                  </Grid>
                  <Grid item xs={4}>
                    <p style={{ textAlign: "right" }}>
                      {selectedSeats.length * priceQuery?.data?.[0]?.price}€
                    </p>
                    <p style={{ textAlign: "right" }}>10€</p>
                    <p style={{ textAlign: "right" }}>5€</p>
                  </Grid>
                </Grid>
              </Box>
              <Grid container spacing={2}>
                <Grid item xs={8}>
                  <p>Gesamt:</p>
                </Grid>
                <Grid item xs={4}>
                  <p>
                    {selectedSeats.length * priceQuery?.data?.[0]?.price + 15}€
                  </p>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={1}>
              <div style={{ borderLeft: "1px solid grey", height: "100%" }} />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                id="nameInput"
                label="Name"
                variant="standard"
                defaultValue={`${user.firstName} ${user.name}`}
              />
              <TextField
                fullWidth
                id="adressInput"
                label="Adresse"
                variant="standard"
              />
              <TextField
                fullWidth
                id="emailInput"
                label="E-Mail"
                variant="standard"
                defaultValue={user.email}
              />
              <FormControl style={{ marginTop: "1rem" }} component="fieldset">
                <FormLabel component="legend">
                  <strong>Zahlungsart</strong>
                </FormLabel>
                <RadioGroup
                  aria-label="paymentMethod"
                  defaultValue="creditCard"
                  onChange={handleRadioChange}
                >
                  <FormControlLabel
                    value="creditCard"
                    control={<Radio />}
                    label="Kreditkarte"
                  />
                  {paymentMethod === "creditCard" ? (
                    <div>
                      <TextField
                        fullWidth
                        id="cardIdInput"
                        label="Kartennummer"
                        variant="standard"
                      />
                      <TextField
                        fullWidth
                        id="nameOfCardUserInput"
                        label="Name des Karteninhabers"
                        variant="standard"
                      />
                      <TextField
                        id="cardValidTo"
                        label="Gültig bis (MM/JJ)"
                        variant="standard"
                      />
                      <TextField
                        id="cardSafetyCode"
                        label="Sicherheitscode"
                        variant="standard"
                      />
                    </div>
                  ) : null}
                  <FormControlLabel
                    value="paypal"
                    control={<Radio />}
                    label="Paypal"
                  />
                  {paymentMethod === "paypal" ? (
                    <div>
                      <TextField
                        fullWidth
                        id="paypalEmailInput"
                        label="E-Mail"
                        variant="standard"
                      />
                      <TextField
                        fullWidth
                        id="paypalPasswordInput"
                        label="Passwort"
                        variant="standard"
                      />
                    </div>
                  ) : null}
                  <FormControlLabel
                    value="instantBankTransfer"
                    control={<Radio />}
                    label="Sofortüberweisung"
                  />
                  {paymentMethod === "instantBankTransfer" ? (
                    <p>
                      Sie werden während des Checkouts zu Klarna weitergeleitet.
                    </p>
                  ) : null}
                </RadioGroup>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Abbruch</Button>
        <Button onClick={blockSeat}>Bezahlen</Button>
      </DialogActions>
    </Dialog>
  );
}

export default CheckoutDialog;
