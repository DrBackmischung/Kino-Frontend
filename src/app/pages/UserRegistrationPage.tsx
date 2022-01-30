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
        <Container sx={{marginTop: 12}}>
            <IconButton onClick={goBack}>
                <ArrowBackIosIcon/>
            </IconButton>
            <SignUp setUser={setUser}/>
        </Container>
    );
}

export default UserRegistrationPage;
