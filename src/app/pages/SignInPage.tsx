import React, { useEffect, useState } from "react";

import Grid from "@mui/material/Grid";
import {
  Avatar,
  Checkbox,
  Container,
  CssBaseline,
  FormControlLabel,
  TextField,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import { makeStyles } from "@mui/styles";
import { createTheme } from "@mui/material/styles";
import LockIcon from "@mui/icons-material/Lock";
import colours from "../config/Colours";
import { setCookie, getCookie } from "../components/CookieHandler";
import { useNavigate } from "react-router-dom";
import APIUrl from "../config/APIUrl";
import { RestaurantMenuTwoTone } from "@mui/icons-material";

const theme = createTheme();

const useStyles = makeStyles({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: colours.palette.primary.dark,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: colours.palette.secondary.dark,
  },
});

export default function SignIn(props: any) {
  const { setUser } = props;
  const classes = useStyles();
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const apiUlr = `${APIUrl.apiUrl}/login`;

  let navigate = useNavigate();

  const redirectToHome = () => {
    navigate("/");
  };
  const passwordMd5 = (password: any) => {
    let md5 = require("md5");
    let hashPassword = md5(password);
    return hashPassword;
  };

  const handleSubmitClick = (e: any, isHashPassword: boolean) => {
    e.preventDefault();
    let passwordToSend: string;
    if (isHashPassword) {
      passwordToSend = userPassword;
    } else {
      passwordToSend = passwordMd5(userPassword);
    }
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: userName,
        passwordHash: passwordToSend,
      }),
    };
    fetch(apiUlr, requestOptions).then((response) => {
      if (!response.ok) {
        debugger;
        // TODO Error Handling
        console.log(response);
        return;
      } else if (response.ok) {
        debugger;
        console.log(response);
        setCookie("userPasswordHash", passwordToSend, 7);
        setCookie("userName", userName, 7);
        setUser();
        redirectToHome();
        return;
      }
    });
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        marginTop: theme.spacing(12),
      }}
    >
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoFocus
            onChange={(e) => setUserName(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="passwort"
            label="Passwort"
            type="password"
            id="passwort"
            autoComplete="current-password"
            onChange={(e) => setUserPassword(e.target.value)}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me" // in German?
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={(e) => handleSubmitClick(e, false)}
          >
            Anmelden
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Passwort Vergessen?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/SignUpPage" variant="body2">
                {"Neuer Benutzer? Registrieren"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
