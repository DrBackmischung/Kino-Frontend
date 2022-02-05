import React from "react";

function MovieDetails(props: any) {
  const { selectedMovie } = props;
  return (
      <div className="movieDetails">
        <h1>{selectedMovie?.title}</h1>
        <h2>
          Filmdauer: {selectedMovie?.duration} min. FSK{" "}
          {selectedMovie?.fsk}
        </h2>
        <h3>Sprache: {selectedMovie?.language}</h3>
        <h3>Filmbeschreibung:</h3>
        <p>{selectedMovie?.description}</p>
        <br />
        <p>Regisseur: {selectedMovie?.director}</p>
        <p>Schauspieler: {selectedMovie?.actors}</p>
      </div>
  );
}

export default MovieDetails;
