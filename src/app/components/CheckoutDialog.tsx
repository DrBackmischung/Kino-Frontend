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
  ThemeProvider,
} from "@mui/material";
import React, { useState } from "react";
import ErrorPage from "../pages/ErrorPage";
import LoadingAnimation from "./layouts/LoadingAnimation";
import APIUrl from "../config/APIUrl";
import "./CheckoutDialog.css";
import { createTheme } from "@mui/material/styles";
import palette from "../config/Colours";
import { useNavigate } from "react-router-dom";

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
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleRadioChange = (e: any) => {
    setPaymentMethod(e.target.value);
  };

  const blockSeat = () => {
    setIsLoading(true);
    const apiUrlBlockSeat = `${APIUrl.apiUrl}/ticket/add`;
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
          setError(true);
          setIsLoading(false);
          return;
        }
        setError(false);
        setIsLoading(false);
      });
    });
    finishTransaction();
  };

  const theme = createTheme(palette);
  if (user.id === undefined) {
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
        >
          <DialogTitle id="scroll-dialog-title">
            Bitte loggen Sie sich ein, um fortzufahren!
          </DialogTitle>
          <DialogContent dividers={true}>
            <DialogContentText
              id="scroll-dialog-description"
              className="alignCenter"
            >
              Um bei uns Tickets buchen zu können, loggen Sie sich bitte ein
              oder registrieren Sie sich kostenfrei!
              <br />
              <br />
              <Button
                variant="contained"
                onClick={(e) => navigate("/SignInPage")}
              >
                Einloggen
              </Button>
              <strong>{` oder `}</strong>
              <Button
                className="smallButton"
                variant="contained"
                onClick={(e) => navigate("/SignUpPage")}
              >
                Registrieren
              </Button>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Abbruch</Button>
          </DialogActions>
        </Dialog>
      </ThemeProvider>
    );
  }
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
      >
        <DialogTitle id="scroll-dialog-title">Checkout</DialogTitle>
        {error || priceQuery.error ? (
          <ErrorPage />
        ) : isLoading || priceQuery.isLoading ? (
          <LoadingAnimation />
        ) : (
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
                  <Button className="addCateringButton" variant="outlined">
                    Verpflegung hinzufügen
                  </Button>
                  <Box className="outlinedBox">
                    <Grid container spacing={1}>
                      <Grid item xs={8}>
                        <p>{selectedSeats.length} Sitzplätze</p>
                        <p>2 Nachos(groß)</p>
                        <p>2 Cola (0,5)</p>
                      </Grid>
                      <Grid item xs={4} className="textAlignRight">
                        <p>
                          {selectedSeats.length * priceQuery?.data?.[0]?.price}€
                        </p>
                        <p>10€</p>
                        <p>5€</p>
                      </Grid>
                    </Grid>
                  </Box>
                  <Grid container spacing={2}>
                    <Grid item xs={8}>
                      <p>Gesamt:</p>
                    </Grid>
                    <Grid item xs={4}>
                      <p>
                        {selectedSeats.length * priceQuery?.data?.[0]?.price +
                          15}
                        €
                      </p>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={1}>
                  <div className="lineOfDivision" />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    id="nameInput"
                    label="Name"
                    variant="standard"
                    defaultValue={`${user?.firstName} ${user?.name}`}
                  />
                  <TextField
                    fullWidth
                    id="adressInput"
                    label="Adresse"
                    variant="standard"
                    defaultValue={`${user?.street}`}
                  />
                  <TextField
                    fullWidth
                    id="emailInput"
                    label="E-Mail"
                    variant="standard"
                    defaultValue={user?.email}
                  />
                  <FormControl className="marginTop1Rem" component="fieldset">
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
                            defaultValue={`${user?.firstName} ${user?.name}`}
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
                            defaultValue={`${user?.email}`}
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
                          Sie werden während des Checkouts zu Klarna
                          weitergeleitet.
                        </p>
                      ) : null}
                    </RadioGroup>
                  </FormControl>
                </Grid>
              </Grid>
            </DialogContentText>
          </DialogContent>
        )}
        <DialogActions>
          <Button onClick={handleClose}>Abbruch</Button>
          <Button onClick={blockSeat}>Bezahlen</Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
}

export default CheckoutDialog;
