import React from "react";
import SignUp from "../components/SignUp";
import {Container, IconButton} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import {useNavigate} from "react-router-dom";

function UserRegistrationPage(props: any) {
    const {setUser} = props;
    let navigate = useNavigate();

    function goBack() {
        navigate(-1)
    }

    return (
        <div>
            <IconButton sx={{marginBottom: -12, marginLeft: 5, position: 'fixed', zIndex: '100'}} onClick={goBack}>
                <ArrowBackIosIcon/>
            </IconButton>
            <Container sx={{mt: 2}}>
                <SignUp setUser={setUser}/>
            </Container>
        </div>
    );
}

export default UserRegistrationPage;
