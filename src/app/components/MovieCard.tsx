import React, {useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";
import { createTheme } from "@mui/material/styles";
import palette from "../config/Colours";
import "./MovieCard.css";
import { ThemeProvider } from "@mui/styles";

function MovieCard(props: any) {
  const { filter, moviesData, selectedSort } = props;
  const [moviesToRender, setMoviesToRender] = useState(moviesData);
  const [sortBy, setSortBy] = useState(true);

  let navigate = useNavigate();

  function navigateToDetails(movieId: any) {
    navigate("/DetailsPage", { state: { movieId } });
  }

  const theme = createTheme(palette)
  
  useEffect(()=>{
      let preparedMovieData = moviesData;

      if (selectedSort !== undefined) {
          if (selectedSort?.length !== 0) {
              preparedMovieData = preparedMovieData.sort((a: any, b: any) => {
                  if (selectedSort === "longest") {
                      return b.duration - a.duration;
                  }
                  else if (selectedSort === "shortest") {
                      return a.duration - b.duration;
                  }
                  //TODO Sort by Rating
                  return preparedMovieData;
              });
          }
          setSortBy(!sortBy);
      }

      setMoviesToRender(preparedMovieData);

  },[selectedSort, sortBy, moviesData, moviesToRender]);

  return (
    <ThemeProvider theme={theme}>
      <Container
        className="movieCard-container"
        maxWidth="md"
      >
        <Grid container spacing={4}>
          {moviesData?.map(
            (movie: any) =>
              movie.title.toLowerCase().includes(filter) && (
                <Grid item key={movie.id} xs={12} sm={6} md={4}>
                  <Card id="movieCard-card">
                    <CardContent sx={{ flexGrow: 1, height: 90 }}>
                      <Typography gutterBottom variant="h5" component="h2">
                        {movie.title}
                      </Typography>
                      <Typography>
                        {movie.duration} Min FSK {movie.fsk}
                      </Typography>
                    </CardContent>
                  <CardActions>
                    <Button
                      fullWidth
                      size="small"
                      onClick={() => {
                        navigateToDetails(`${movie.id}`);
                      }}/> 
                      <Button
                        size="small"
                        onClick={() => {
                          navigateToDetails(`${movie.id}`);
                        }}
                        //image={movie.pictureLink}
                        //alt="poster"
                      />  
                    </CardActions>
                    <CardActions>
                      <Button
                        size="small"
                        onClick={() => {
                          navigateToDetails(`${movie.id}`);
                        }}
                        id="movieCard-button"
                      >
                        Tickets
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              )
          )}
        </Grid>
      </Container>
    </ThemeProvider>
  );
}

export default MovieCard;
