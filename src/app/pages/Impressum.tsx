import React from "react";
import {Container, Link} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import {useNavigate} from "react-router-dom";
import Box from "@mui/material/Box";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import palette from "../config/Colours";
import "./Impressum.css";

function Impressum() {
    let navigate = useNavigate();

    const goBack = () => {
        navigate(-1);
    };

    const theme = createTheme(palette);

    function redirectToTerms() {
        navigate("/AGBs");
    }

    return (
        <div id="impressum-div">
            <IconButton id="impressum-iconButton" sx={{marginTop: -1, marginBottom: -12, marginLeft: 5, position: 'fixed', zIndex: '100'}} onClick={goBack}>
                <ArrowBackIosIcon/>
            </IconButton>
            <Container className="wholeContainer"
                sx={{
                    pb: 6,
                    position: "relative",
                }}
            >
                <Container className="AGBContainer">
                    <Box>
                        <h1>Impressum</h1>
                        <h2>Verantwortliche für den Inhalt der Webseite:</h2>
                        <Box className="mainNameBox" sx={{fontStyle: "italic"}}>
                            <p>Mathis Neunzig</p>
                            <p>Parkring 21</p>
                            <p>68159 Mannheim</p>
                            <p>Deutschland</p>
                            <p>mathis.neunzig@gmail.com</p>
                            <p>+49 174 9885992</p>
                        </Box>
                        <br/>
                        <p>
                            Dieses Kino-Ticket-Reservierungs-System in Form dieser Webseite
                            entstand im Rahmen der Prüfung des Modules "Methoden der
                            Wirtschaftsinformatik" des Kurses "WWI 2020 SE B" der Dualen
                            Hochschule Baden-Württemberg unter Leitung des Dozenten "Georg
                            Tielsch". Die verwendeten Daten sind nicht unsere Eigenen, sondern
                            entsprechenden Quellen des Internets entnommen. Neben dem
                            Hauptverantwortlichen gehören des Weiteren folgende Personen zu der
                            Gruppe dieses Projekts:
                        </p>
                        <Box className="nameBox" sx={{fontStyle: "italic"}}>
                            <p>Anna Khristolyubova</p>
                            <p>Babett Müller</p>
                            <p>Frederick Orschiedt</p>
                            <p>Jost-Tomke Müller</p>
                            <p>Marcel Mildenberger</p>
                            <p>Nathalie Möck</p>
                        </Box>
                        <br/>
                        <span>Die Allgemeinen Geschäftsbedingungen können </span>
                        <Link id="impressum-link" onClick={redirectToTerms}>hier</Link><span> gefunden werden.</span>
                    </Box>
                </Container>
            </Container>
        </div>
    );
}

export default Impressum;
