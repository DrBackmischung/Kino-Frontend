import React, { useState } from "react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import APIUrl from "../config/APIUrl";
import { useNavigate } from "react-router-dom";
import { setCookie } from "./CookieHandler";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Link,
  Grid,
  Box,
  Typography,
  Container,
} from "@mui/material";
import LoadingAnimation from "./layouts/LoadingAnimation";
import { useForm, Controller } from "react-hook-form";
import "./SignUp.css";


function SignUp(props: any) {
  const { setUser } = props;
  const [userName, setUserName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [street, setStreet] = useState("");
  const [number, setNumber] = useState("");
  const [plz, setPlz] = useState("");
  const [city, setCity] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({ isError: false, msg: "No Error" });
  const [agree, setAgree] = useState(false);

  const {
    setValue,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();

  let navigate = useNavigate();

  const apiUrlAll = `${APIUrl.apiUrl}/registration`;

  const redirectToHome = () => {
    navigate("/");
  };

  const redirectToLogin = () => {
    navigate("/Login");
  };

  const passwordMd5 = (password: any) => {
    let md5 = require("md5");
    let hashPassword = md5(password);
    return hashPassword;
  };

  const confirmPasswordMd5 = (confirmPassword: any) => {
    let md5 = require("md5");
    let hashConfirmPassword = md5(confirmPassword);
    return hashConfirmPassword;
  };

  const handleSubmitClick = async () => {
    let redirectHome: boolean = false;
    setIsLoading(true);
    let hashPassword = passwordMd5(password);
    let hashConfirmPassword = confirmPasswordMd5(confirmPassword);

    if (hashPassword === hashConfirmPassword) {
      const requestOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: userName,
          firstName: firstName,
          name: lastName,
          email: email,
          passwordHash: hashPassword,
          passwordConfirmHash: hashConfirmPassword,
          street: street,
          number: number,
          plz: parseInt(plz),
          city: city,
        }),
      };
      const response = await fetch(apiUrlAll, requestOptions);
      if (!response.ok) {
        setError({ isError: true, msg: `Fehler: ${response.statusText}` });
        setAgree(false);
      } else if (response.ok) {
        const data: any = await response.json();
        setError({ isError: false, msg: "No error" });
        setCookie("userId", data.id, 7);
        setUser();
        redirectHome = true;
      }
      setIsLoading(false);
      if (redirectHome) {
        redirectToHome();
      }
    } else {
      setError({
        isError: true,
        msg: "Fehler: Das eingegebene Passwort stimmt nicht mit dem zur Überprüfung überein!",
      });
    }
    setIsLoading(false);
  };
  if (isLoading)
    return (
      <Container
        sx={{
          bgcolor: "background.paper",
          pt: 8,
          pb: 6,
          position: "relative",
          marginTop: "15rem",
        }}
        maxWidth="md"
      >
        <LoadingAnimation />
      </Container>
    );

  function checkboxHandler() {
    setAgree(!agree);
  }

  function redirectToTerms() {
    navigate("/AGBs");
  }

  return (
    <Container 
      id ="signUp-container"
      component="main"
      maxWidth="xs"
      sx={{
        bgcolor: "background.paper",
        pb: 6,
        position: "relative",
      }}
    >
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Registrierung
        </Typography>
        <form noValidate>
          <Box component="form" noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Controller
                  name="userName"
                  control={control}
                  rules={{ required: true, minLength: 3 }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      required
                      fullWidth
                      label="Benutzername"
                      autoFocus
                      onChange={(e: any) => {
                        setUserName(e.target.value);
                        setValue("userName", e.target.value);
                        return;
                      }}
                      value={userName}
                      error={errors.userName}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="firstName"
                  control={control}
                  rules={{ required: true, minLength: 2 }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      autoComplete="given-name"
                      required
                      fullWidth
                      label="Vorname"
                      autoFocus
                      onChange={(e: any) => {
                        setFirstName(e.target.value);
                        setValue("firstName", e.target.value);
                        return;
                      }}
                      value={firstName}
                      error={errors.firstName}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="lastName"
                  control={control}
                  rules={{ required: true, minLength: 2 }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      required
                      fullWidth
                      label="Nachname"
                      autoComplete="family-name"
                      onChange={(e: any) => {
                        setLastName(e.target.value);
                        setValue("lastName", e.target.value);
                        return;
                      }}
                      value={lastName}
                      error={errors.lastName}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="email"
                  control={control}
                  rules={{
                    required: true,
                    minLength: 2,
                    // => RFC 2822 Email
                    pattern:
                      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/i, // eslint-disable-line no-useless-escape
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      required
                      fullWidth
                      label="E-Mail-Adresse"
                      autoComplete="email"
                      onChange={(e: any) => {
                        setEmail(e.target.value);
                        setValue("email", e.target.value);
                        return;
                      }}
                      value={email}
                      error={errors.email}
                    />
                  )}
                />

                <small>Wir werden Deine E-Mail niemals mit einem Dritten teilen!</small>
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="password"
                  control={control}
                  rules={{
                    required: true,
                    minLength: 7,
                    maxLength: 32,
                    pattern:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[-!@#\$%\^&\*])(?=.{7,})?/i, //eslint-disable-line no-useless-escape
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      required
                      fullWidth
                      label="Passwort"
                      type="password"
                      autoComplete="new-password"
                      onChange={(e: any) => {
                        setPassword(e.target.value);
                        setValue("password", e.target.value);
                        return;
                      }}
                      value={password}
                      error={errors.password}
                    />
                  )}
                />

                {errors.password && (
                  <small>
                    Bitte geben Sie eine gültiges Password ein! Anforderungen:
                    mind. 7 Zeichen, ein Großbuchstabe, ein Kleinbuchstabe, eine
                    Zahl und ein Sonderzeichen.
                  </small>
                )}
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="confirmPassword"
                  control={control}
                  rules={{
                    required: true,
                    minLength: 7,
                    maxLength: 32,
                    pattern:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[-!@#\$%\^&\*])(?=.{7,})?/i, //eslint-disable-line no-useless-escape
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      required
                      fullWidth
                      label="Bestätige Password"
                      type="password"
                      value={confirmPassword}
                      onChange={(e: any) => {
                        setConfirmPassword(e.target.value);
                        setValue("confirmPassword", e.target.value);
                        return;
                      }}
                      error={errors.confirmPassword}
                    />
                  )}
                />
              </Grid>
              <Grid
                container
                direction="row"
                justifyContent="flex-end"
                alignItems="center"
                spacing={2}
                pt={2.2}
              >
                <Grid item xs={7.55}>
                  <Controller
                    name="street"
                    control={control}
                    rules={{ required: true, minLength: 3 }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        required
                        fullWidth
                        label="Straße"
                        value={street}
                        onChange={(e: any) => {
                          setStreet(e.target.value);
                          setValue("street", e.target.value);
                          return;
                        }}
                        error={errors.street}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={4}>
                  <Controller
                    name="number"
                    control={control}
                    rules={{ required: true, minLength: 1 }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        required
                        fullWidth
                        label="Hausnummer"
                        value={number}
                        onChange={(e: any) => {
                          setNumber(e.target.value);
                          setValue("number", e.target.value);
                          return;
                        }}
                        error={errors.number}
                      />
                    )}
                  />
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="PLZ"
                  control={control}
                  rules={{
                    required: true,
                    minLength: 5,
                    maxLength: 5,
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      required
                      fullWidth
                      label="PLZ"
                      value={plz}
                      onChange={(e: any) => {
                        setPlz(e.target.value);
                        setValue("PLZ", e.target.value);
                        return;
                      }}
                      error={errors.PLZ}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="city"
                  control={control}
                  rules={{ required: true, minLength: 3 }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      required
                      fullWidth
                      label="Ort"
                      value={city}
                      onChange={(e: any) => {
                        setCity(e.target.value);
                        setValue("city", e.target.value);
                        return;
                      }}
                      error={errors.city}
                    />
                  )}
                />{" "}
                {error.isError && (
                  <small style={{ color: "red" }}>
                    Ein Fehler ist aufgetreten. Bitte überprüfen Sie ihre
                    Eingaben. Bei technischen Problemen wenden Sie sich bitte an
                    den Admin dieser Website. {error.msg}
                  </small>
                )}
              </Grid>

              <Grid item xs={12}>
                <input
                  type="checkbox"
                  value="allowExtraEmails"
                  color="primary"
                />
                <label>
                  {" "}
                    Ich möchte Inspiration, Marketingaktionen und Updates per E-Mail erhalten.
                </label>
              </Grid>

              <Grid item xs={12}>
                <input type="checkbox" id="agree" onChange={checkboxHandler} />
                <label htmlFor="agree"> Ich stimme den </label>
                <Link sx={{color: "#ba8434"}} onClick={redirectToTerms}>Allgemeinen Geschäftsbedingungen (AGBs)</Link>
                <label> zu.</label>
              </Grid>
            </Grid>
            <Button
              id="signUp-button"
              disabled={!agree}
              type="submit"
              fullWidth
              variant="contained"
              onClick={handleSubmit(handleSubmitClick)}
              sx={{ mt: 3, mb: 2 }}
            >
              Registrieren
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link className="loginText" sx={{color: "#ba8434"}} onClick={() => redirectToLogin()}>
                  Du hast bereits einen Account? Logge Dich hier ein!
                </Link>
              </Grid>
            </Grid>
          </Box>
        </form>
      </Box>

    </Container>
  );
}

export default SignUp;
