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
  Link,
} from "@mui/material";
import React, { useState } from "react";
import LoadingAnimation from "./layouts/LoadingAnimation";
import APIUrl from "../config/APIUrl";
import "./CheckoutDialog.css";
import { createTheme } from "@mui/material/styles";
import palette from "../config/Colours";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";

function CheckoutDialog(props: any) {
  const {
    open,
    handleClose,
    finishTransaction,
    selectedShow,
    selectedSeats,
    user,
    priceForSeats,
  } = props;
  const [paymentMethod, setPaymentMethod] = useState("creditCard");
  const [error, setError] = useState({ isError: false, msg: "No Error" });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [cardId, setCardId] = useState("");
  const [cardName, setCardName] = useState(`${user?.firstName} ${user?.name}`);
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardPin, setCardPin] = useState("");
  const [agree, setAgree] = useState(false);
  const apiUrlBlockSeat = `${APIUrl.apiUrl}/booking/add`;
  const {
    setValue,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();

  const handleRadioChange = (e: any) => {
    setPaymentMethod(e.target.value);
  };

  const blockSeat = async () => {
    let success: boolean = false;
    setIsLoading(true);
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userID: user.id,
        seatIDs: selectedSeats,
        showID: selectedShow.id,
        state: "Paid",
        bookingDate: new Date(),
      }),
    };
    const response = await fetch(apiUrlBlockSeat, requestOptions);
    if (!response.ok) {
      setError({ isError: true, msg: `Fehler: ${response.statusText}` });
    } else if (response.ok) {
      setError({ isError: false, msg: "No error" });
      success = true;
    }
    setIsLoading(false);
    if (success) {
      finishTransaction();
    }
  };

  function redirectToTerms() {
    navigate("/TermsAndConditionsPage");
  }

  function checkboxHandler() {
    setAgree(!agree);
  }

  const theme = createTheme(palette);
  if (user?.id === undefined) {
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
        <DialogContent dividers={true}>
          <DialogContentText id="scroll-dialog-description">
            {isLoading ? <LoadingAnimation /> : null}
            <Grid container spacing={2}>
              <Grid item xs={5}>
                <h2>{selectedShow?.movie?.titel}</h2>
                <p>
                  Kino: {selectedShow?.cinemaRoom?.roomName}
                  <br />
                  {selectedShow?.startTime?.substring(0, 5)} Uhr
                  <br />
                  Sprache: {selectedShow?.movie?.language}
                </p>
                <Button className="addCateringButton" variant="outlined">
                  Verpflegung hinzufügen
                </Button>
                <br />
                <br />
                <Box className="outlinedBox">
                  <Grid container spacing={1}>
                    <Grid item xs={8}>
                      <p>{selectedSeats.length} Sitzplätze</p>
                      <p>2 Nachos(groß)</p>
                      <p>2 Cola (0,5)</p>
                    </Grid>
                    <Grid item xs={4} className="textAlignRight">
                      <p>{priceForSeats}€</p>
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
                    <p>{priceForSeats + 15}€</p>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={1}>
                <div className="lineOfDivision" />
              </Grid>
              <Grid item xs={6}>
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
                        <Controller
                          name="cardIdInput"
                          control={control}
                          rules={{
                            required: true,
                            minLength: 16,
                            maxLength: 16,
                            pattern:
                              /^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/i,
                          }}
                          render={({ field }) => (
                            <TextField
                              {...field}
                              required
                              margin="normal"
                              autoFocus
                              error={errors.cardIdInput}
                              value={cardId}
                              onChange={(e: any) => {
                                setCardId(e.target.value);
                                setValue("cardIdInput", e.target.value);
                                return;
                              }}
                              fullWidth
                              label="Kartennummer"
                              variant="standard"
                            />
                          )}
                        />
                        <Controller
                          name="cardName"
                          control={control}
                          rules={{
                            required: true,
                            minLength: 3,
                          }}
                          render={({ field }) => (
                            <TextField
                              {...field}
                              required
                              margin="normal"
                              autoFocus
                              error={errors.cardName}
                              value={cardName}
                              onChange={(e: any) => {
                                setCardName(e.target.value);
                                setValue("cardName", e.target.value);
                                return;
                              }}
                              fullWidth
                              label="Name des Karteninhabers"
                              variant="standard"
                            />
                          )}
                        />
                        <Controller
                          name="cardExpiry"
                          control={control}
                          rules={{
                            required: true,
                            minLength: 5,
                            maxLength: 5,
                            pattern: /^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/,
                          }}
                          render={({ field }) => (
                            <TextField
                              {...field}
                              required
                              margin="normal"
                              autoFocus
                              error={errors.cardExpiry}
                              value={cardExpiry}
                              onChange={(e: any) => {
                                setCardExpiry(e.target.value);
                                setValue("cardExpiry", e.target.value);
                                return;
                              }}
                              label="Gültig bis (MM/JJ)"
                              variant="standard"
                            />
                          )}
                        />
                        <Controller
                          name="cardPin"
                          control={control}
                          rules={{
                            required: true,
                            minLength: 3,
                            maxLength: 3,
                            pattern: /[0-9]+/i,
                          }}
                          render={({ field }) => (
                            <TextField
                              {...field}
                              required
                              margin="normal"
                              autoFocus
                              error={errors.cardPin}
                              value={cardPin}
                              onChange={(e: any) => {
                                setCardPin(e.target.value);
                                setValue("cardPin", e.target.value);
                                return;
                              }}
                              label="Sicherheitscode"
                              variant="standard"
                            />
                          )}
                        />
                      </div>
                    ) : null}
                    <FormControlLabel
                      value="paypal"
                      control={<Radio />}
                      label="Paypal"
                    />
                    {paymentMethod === "paypal" ? (
                      <p>
                        Sie werden während des Checkouts zu Paypal
                        weitergeleitet.
                      </p>
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

                  <label htmlFor="agree">
                    <input
                      type="checkbox"
                      id="agree"
                      onChange={checkboxHandler}
                    />{" "}
                    I agree to{" "}
                    <Link onClick={redirectToTerms}>terms and conditions</Link>.{" "}
                  </label>
                </FormControl>
              </Grid>
            </Grid>
            {error.isError ? (
              <small style={{ color: "red" }}>
                Ein Fehler ist aufgetreten. Bitte überprüfen Sie ihre Eingaben.
                Bei technischen Problemen wenden Sie sich bitte an den Admin
                dieser Website. {error.msg}
              </small>
            ) : null}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Abbruch</Button>
          <Button disabled={!agree} onClick={handleSubmit(blockSeat)}>
            Bezahlen
          </Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
}

export default CheckoutDialog;
