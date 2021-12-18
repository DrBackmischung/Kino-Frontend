import React from "react";
import { Container, Grid } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";

function Impressum() {
  let navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <Container className="wholeContainer">
      <IconButton onClick={goBack}>
        <ArrowBackIosIcon />
      </IconButton>
      <Container className="AGBContainer">
        <Box>
          <h1>Impressum</h1>
          <h2>Verantwortliche für den Inhalt der Webseite:</h2>
          <Box className="mainNameBox" sx={{ fontStyle: "italic" }}>
            <p>Vorname Nachname</p>
            <p>Straße Hausnummer</p>
            <p>PLZ Ort</p>
            <p>Deutschland</p>
            <p>E-Mail: </p>
          </Box>
          <br />
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
          <Box className="nameBox" sx={{ fontStyle: "italic" }}>
            <p>Anna Khristolyubova</p>
            <p>Babett Müller</p>
            <p>Frederick Orschiedt</p>
            <p>Jost-Tomke Müller</p>
            <p>Marcel Mildenberger</p>
            <p>Mathis Neunzig</p>
            <p>Nathalie Möck</p>
          </Box>
        </Box>
      </Container>
    </Container>
  );
}

export default Impressum;