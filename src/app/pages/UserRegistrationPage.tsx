import React from "react";
import SignUp from "../components/SignUp";
import {Container, IconButton} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import {useNavigate} from "react-router-dom";
import "./UserRegistrationPage.css";

function UserRegistrationPage(props: any) {
    const {setUser} = props;
    let navigate = useNavigate();

    function goBack() {
        navigate(-1)
    }

    return (
        <div>
            <IconButton id="userRegistrationPage-iconButton" sx={{ marginTop: 2, marginLeft: 5, zIndex: '100'}} onClick={goBack}>
                <ArrowBackIosIcon/>
            </IconButton>
            <Container sx={{mt: 2}}>
                <SignUp setUser={setUser}/>
            </Container>
        </div>
    );
}

export default UserRegistrationPage;
