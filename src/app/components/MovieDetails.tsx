import React from "react";

function MovieDetails(props: any) {
  const { selectedMovie } = props;
  return (
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
        {/*TODO Add Actors in Backend*/}
        <p>Actors: {selectedMovie?.actors}</p>
      </div>
  );
}

export default MovieDetails;
