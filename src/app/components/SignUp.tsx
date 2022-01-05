import React, {useState} from "react";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import APIUrl from "../config/APIUrl";
import {useQuery} from "react-query";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import {useForm} from "react-hook-form";
import axios from "axios";
import {useNavigate} from "react-router-dom";

function Copyright(props: any) {
    let navigate = useNavigate();

    const redirectToImpressum = () => {
        navigate('/Impressum');
    }

    return (
        <Box pb={5}>
            <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
                <Link color="inherit" onClick={() => redirectToImpressum()}>
                    by SAuE Team 1
                </Link>
                {' '}
                {new Date().getFullYear()}
                {'.'}
            </Typography>
        </Box>
    );
}

function SignUp(props: any) {
    const [state, setState] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        street: "",
        number: "",
        plz: "",
        city: "",
        successMessage: null
    })

    let navigate = useNavigate();

    /*const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');*/

    const apiUrlAll = `${APIUrl.apiUrl}/user/put`;
    const {isLoading, data, refetch, error} = useQuery(
        "user",
        () => fetch(apiUrlAll).then((res) => res.json()),
        {
            refetchOnWindowFocus: false,
            enabled: false,
        }
    );

    const handleChange = (e: any) => {
        const {id, value} = e.target
        setState((prevState: any) => ({
            ...prevState,
            [id]: value
        }))
    }

    /*const sendDetailsToServer = () => {
        if(state.email.length && state.password.length) {
            props.showError(null);
            const payload={
                "firstName": state.firstName,
                "lastName": state.lastName,
                "email": state.email,
                "password": passwordMd5,
                "confirmPassword": confirmPasswordMd5,
                "street": state.street,
                "number": state.number,
                "plz": state.plz,
                "city": state.city
            }
            axios.post(apiUrlAll, payload)
                .then(function (response: any) {
                    if(response.status === 200){
                        setState(prevState => ({
                            ...prevState,
                            'successMessage' : 'Registration successful. Redirecting to home page..'
                        }))
                        localStorage.setItem(ACCESS_TOKEN_NAME,response.data.token);
                        redirectToHome();
                        props.showError(null)
                    } else{
                        props.showError("Some error ocurred");
                    }
                })
                .catch(function (error: any) {
                    console.log(error);
                });
        } else {
            props.showError('Please enter valid username and password')
        }
    }*/

    const redirectToHome = () => {
        navigate('/');
    }

    const redirectToLogin = () => {
        navigate('/Login');
    }

    const passwordMd5 = (password: any) => {
        let hashPassword; //TODO md5 password
        return hashPassword;
    };

    const confirmPasswordMd5 = (password: any) => {
        let hashConfirmPassword; //TODO md5 password
        return hashConfirmPassword;
    };

    const handleSubmitClick = (e: any) => {
        e.preventDefault();
        if (passwordMd5 === confirmPasswordMd5) {
            //sendDetailsToServer()
            console.log("Passwort matches");
        } else {
            props.showError('Passwords do not match');
        }
    }

    const schema = yup.object().shape({
        firstName: yup.string().required().min(2).max(25),
        lastName: yup.string().required().min(2).max(30),
        email: yup.string().required().email(),
        password: yup.string().required().min(8).max(120),
        street: yup.string().required().min(8).max(120),
        number: yup.string().required().min(1).max(15),
        plz: yup.number().required().min(5).max(6),
        city: yup.string().required().min(2).max(50)
    });

    interface IFormInput {
        firstName: string;
        lastName: string;
        email: string;
        password: string;
        street: string;
        number: string;
        plz: number;
        city: string
    }

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<IFormInput>({
        resolver: yupResolver(schema),
    });

    const [json, setJson] = useState<string>();

    const onSubmit = (data: IFormInput) => {
        setJson(JSON.stringify(data));
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    <Box component="form" noValidate sx={{mt: 3}}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    {...register("firstName")}
                                    autoComplete="given-name"
                                    name="firstName"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    autoFocus
                                    onChange={handleChange}
                                    value={state.firstName}
                                    helperText={errors.firstName?.message}
                                    error={!!errors.firstName?.message}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    {...register("lastName")}
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    autoComplete="family-name"
                                    onChange={handleChange}
                                    value={state.lastName}
                                    helperText={errors.lastName?.message}
                                    error={!!errors.lastName?.message}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    {...register("email")}
                                    required
                                    fullWidth
                                    id="email"
                                    label="E-mail Address"
                                    name="email"
                                    autoComplete="email"
                                    onChange={handleChange}
                                    value={state.email}
                                    helperText={errors.email?.message}
                                    error={!!errors.email?.message}
                                />
                                <small>We won't share your e-mail with anyone else!</small>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    {...register("password")}
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                    onChange={handleChange}
                                    value={state.password}
                                    helperText={errors.password?.message}
                                    error={!!errors.password?.message}
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
                                    value={state.confirmPassword}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid container
                                  direction="row"
                                  justifyContent="flex-end"
                                  alignItems="center"
                                  spacing={2}
                                  pt={2.2}>
                                <Grid item xs={7.55}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="street"
                                        label="Street"
                                        id="street"
                                        value={state.street}
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item xs={4}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="number"
                                        label="Number"
                                        id="number"
                                        value={state.number}
                                        onChange={handleChange}
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
                                    value={state.plz}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="city"
                                    label="City"
                                    id="city"
                                    value={state.city}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={<Checkbox value="allowExtraEmails" color="primary"/>}
                                    label="I want to receive inspiration, marketing promotions and updates via e-mail."
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            onClick={handleSubmitClick}
                            sx={{mt: 3, mb: 2}}
                        >
                            Sign Up
                        </Button>
                        <div className="alert alert-success mt-2"
                             style={{display: state.successMessage ? 'block' : 'none'}}
                             role="alert">
                            {state.successMessage}
                        </div>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link className="loginText" onClick={() => redirectToLogin()}>Already have an account?
                                    Login
                                    here</Link>
                            </Grid>
                        </Grid>
                    </Box>
                </form>
            </Box>
            <Copyright sx={{mt: 5}}/>
        </Container>
    );
}

export default SignUp;