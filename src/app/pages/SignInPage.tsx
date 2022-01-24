import React, { useState } from "react";

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
import { setCookie } from "../components/CookieHandler";
import { useNavigate } from "react-router-dom";
import APIUrl from "../config/APIUrl";
import { useForm, Controller } from "react-hook-form";
import LoadingAnimation from "../components/layouts/LoadingAnimation";

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
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({ isError: false, msg: "No Error" });
  const {
    setValue,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();

  let navigate = useNavigate();

  const redirectToHome = () => {
    navigate("/");
  };
  const passwordMd5 = (password: any) => {
    let md5 = require("md5");
    let hashPassword = md5(password);
    return hashPassword;
  };

  const handleSubmitClick = async () => {
    let redirectHome: boolean = false;
    setIsLoading(true);
    let passwordToSend: string;
    passwordToSend = passwordMd5(userPassword);
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: userName,
        passwordHash: passwordToSend,
      }),
    };
    const response = await fetch(apiUlr, requestOptions);
    if (!response.ok) {
      setError({ isError: true, msg: `Fehler: ${response.statusText}` });
    } else if (response.ok) {
      const data: any = await response.json();
      setError({ isError: false, msg: "No error" });
      setCookie("userId", data.id, 7);
      setCookie("role", data.role.autorization, 7);
      setUser();
      redirectHome = true;
    }
    setIsLoading(false);
    if (redirectHome) {
      redirectToHome();
    }
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
          <Controller
            name="userName"
            control={control}
            rules={{ required: true, minLength: 3 }}
            render={({ field }) => (
              <TextField
                {...field}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Username"
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
            label="Remember me" 
          />
          <br />
          {error.isError && (
            <small style={{ color: "red" }}>
              Ein Fehler ist aufgetreten. Bitte überprüfen Sie ihren
              eingegebenen Benutzernamen und das Passwort. Bei technischen
              Problemen wenden Sie sich bitte an den Admin dieser Website.
              {error.msg}
            </small>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit(handleSubmitClick)}
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
