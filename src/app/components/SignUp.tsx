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
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Box,
  Typography,
  Container,
} from "@mui/material";

function Copyright(props: any) {
  let navigate = useNavigate();

  const redirectToImpressum = () => {
    navigate("/Impressum");
  };

  return (
    <Box pb={5}>
      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
        {...props}
      >
        {"Copyright © "}
        <Link color="inherit" onClick={() => redirectToImpressum()}>
          by SAuE Team 1
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    </Box>
  );
}

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

  const handleSubmitClick = (e: any) => {
    e.preventDefault();

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
      fetch(apiUrlAll, requestOptions)
        .then((response) => {
          if (!response.ok) {
            return response.json();
          } else if (response.ok) {
            return response.json();
          }
        })
        .then((data) => {
          postMessage("Registration successfull! Redirecting to Homepage!");
          if (data.id !== "undefined") {
            setCookie("userId", data.id, 7);
          }
          setUser();
          redirectToHome();
        });
    } else {
      // TODO Error Handling
    }
  };
  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        bgcolor: "background.paper",
        pt: 8,
        pb: 6,
        position: "relative",
      }}
    >
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form noValidate>
          <Box component="form" noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="userName"
                  required
                  fullWidth
                  id="userName"
                  label="User Name"
                  autoFocus
                  onChange={(e: any) => setUserName(e.target.value)}
                  value={userName}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  onChange={(e: any) => setFirstName(e.target.value)}
                  value={firstName}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  onChange={(e: any) => setLastName(e.target.value)}
                  value={lastName}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="E-mail Address"
                  name="email"
                  autoComplete="email"
                  onChange={(e: any) => setEmail(e.target.value)}
                  value={email}
                />
                <small>We won't share your e-mail with anyone else!</small>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={(e: any) => setPassword(e.target.value)}
                  value={password}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e: any) => setConfirmPassword(e.target.value)}
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
                  <TextField
                    required
                    fullWidth
                    name="street"
                    label="Street"
                    id="street"
                    value={street}
                    onChange={(e: any) => setStreet(e.target.value)}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    required
                    fullWidth
                    name="number"
                    label="Number"
                    id="number"
                    value={number}
                    onChange={(e: any) => setNumber(e.target.value)}
                  />
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="PLZ"
                  label="PLZ"
                  id="plz"
                  value={plz}
                  onChange={(e: any) => setPlz(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="city"
                  label="City"
                  id="city"
                  value={city}
                  onChange={(e: any) => setCity(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="I want to receive inspiration, marketing promotions and updates via e-mail."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={handleSubmitClick}
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link className="loginText" onClick={() => redirectToLogin()}>
                  Already have an account? Login here
                </Link>
              </Grid>
            </Grid>
          </Box>
        </form>
      </Box>
      <Copyright sx={{ mt: 5 }} />
    </Container>
  );
}

export default SignUp;
