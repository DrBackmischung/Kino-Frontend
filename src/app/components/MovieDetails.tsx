import React from "react";
import { createTheme } from "@mui/material/styles";
import palette from "../config/Colours";
import { ThemeProvider } from "@mui/styles";
import "./MovieDetails.css";

function MovieDetails(props: any) {
  const { selectedMovie } = props;
  const theme = createTheme(palette)
  
  return (
    <ThemeProvider theme={theme}>  
      <div className="detailsContainer">
        <div className="movieDetails">
          <h1>{selectedMovie?.titel}</h1>
          <h2>
            Movie Duration: {selectedMovie?.duration} min. FSK{" "}
            {selectedMovie?.fsk}
          </h2>
          <h3>Language: {selectedMovie?.language}</h3>
          <h3>Movie Description:</h3>
          <p>{selectedMovie?.description}</p>
          <br />
          <p>Director: {selectedMovie?.director}</p>
          <p>Actors: {selectedMovie?.actors}</p>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default MovieDetails;
