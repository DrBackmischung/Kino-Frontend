import React from "react";
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
  const { filter, moviesData } = props;

  let navigate = useNavigate();

  function navigateToDetails(movieId: any) {
    navigate("/DetailsPage", { state: { movieId } });
  }

  const theme = createTheme(palette)
  
  return (
    <ThemeProvider theme={theme}>
      <Container
        className="movieCard-container"
        maxWidth="md"
      >
        <Grid container spacing={4}>
          {moviesData?.map(
            (movie: any) =>
              movie.titel.toLowerCase().includes(filter) && (
                <Grid item key={movie.id} xs={12} sm={6} md={4}>
                  <Card
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <CardMedia
                      component="img"
                      sx={{
                        pt: "6%",
                      }}
                      image={movie.pictureLink}
                      alt="poster"
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography gutterBottom variant="h5" component="h2">
                        {movie.titel}
                      </Typography>
                      <Typography>
                        {movie.duration} Min FSK {movie.fsk}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button
                        size="small"
                        onClick={() => {
                          navigateToDetails(`${movie.id}`);
                        }}
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
