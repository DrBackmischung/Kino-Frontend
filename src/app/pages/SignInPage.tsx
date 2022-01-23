import React from 'react';

import Grid from "@mui/material/Grid";
import {Avatar, Checkbox, Container, CssBaseline, FormControlLabel, TextField} from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Link from '@mui/material/Link';
import { makeStyles } from '@mui/styles';
import {createTheme, ThemeProvider} from "@mui/material/styles";
import LockIcon from '@mui/icons-material/Lock';
import colours from '../config/Colours';
import "./SignInPage.css";

const theme = createTheme();

const useStyles = makeStyles({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: colours.palette.primary.dark,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        backgroundColor: colours.palette.secondary.dark,
    },
});



export default function SignIn() {
    const classes = useStyles();

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs"
                    sx={{
                        marginTop: theme.spacing(12)
                    }} >
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
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="passwort"
                            label="Passwort"
                            type="passwort"
                            id="passwort"
                            autoComplete="current-password"
                        />
                        <FormControlLabel
                            id="signInPage-formControlLabel"
                            control={<Checkbox value="remember" color="primary"/>}
                            label="Remember me" // in German?
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Anmelden
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link 
                                    id="singInPage-link"
                                    href="#" variant="body2">
                                    Passwort Vergessen?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link 
                                    id="singInPage-link"
                                    href="#" variant="body2">
                                    {"Neuer Benutzer? Registrieren"}
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Container>
        </ThemeProvider>
    );
}