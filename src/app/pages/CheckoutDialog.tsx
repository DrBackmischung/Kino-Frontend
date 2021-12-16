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
import React, { useEffect, useState } from "react";
import colours from "../config/colours";

function CheckoutDialog(props: any) {
  const { open, handleClose, selectedMovie, finishTransaction } = props;
  const [paymentMethod, setPaymentMethod] = useState("creditCard");
  const [movie, setMovie] = useState(selectedMovie);

  useEffect(() => {
    setMovie(selectedMovie);
  }, [selectedMovie]);

  const handleRadioChange = (e: any) => {
    setPaymentMethod(e.target.value);
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
              <h2>{selectedMovie?.movie?.titel}</h2>
              <p>
                {selectedMovie?.startTime} Kino{" "}
                {selectedMovie?.cinemaRoom?.story} Sprache:{" "}
                {selectedMovie?.movie?.language}
              </p>
              <Button style={{ marginBottom: "1rem" }} variant="outlined">
                Verpflegung hinzufügen
              </Button>
              <Box sx={{ p: 2, border: "1px solid grey" }}>
                <Grid container spacing={1}>
                  <Grid item xs={10}>
                    <p>X Sitzplätze</p>
                    <p>X Nachos(groß)</p>
                    <p>X Coca Cola (0,5)</p>
                  </Grid>
                  <Grid item xs={2}>
                    <p style={{ textAlign: "right" }}>XX€</p>
                    <p style={{ textAlign: "right" }}>XX€</p>
                    <p style={{ textAlign: "right" }}>XX€</p>
                  </Grid>
                </Grid>
              </Box>
              <Grid container spacing={2}>
                <Grid item xs={10}>
                  <p>Gesamt:</p>
                </Grid>
                <Grid item xs={2}>
                  <p>X€</p>
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
        <Button onClick={finishTransaction}>Bezahlen</Button>
      </DialogActions>
    </Dialog>
  );
}

export default CheckoutDialog;
