import React, {useEffect, useState} from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";

function MovieCard(props: any) {
  const { filter, selectedSort, moviesData } = props;
  const [moviesToRender, setMoviesToRender] = useState(moviesData);
  const [sortBy, setSortBy] = useState(true)


  let navigate = useNavigate();

  function navigateToDetails(movieId: any) {
    navigate("/DetailsPage", { state: { movieId } });
  }

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

                   /* if (selectedSort.value === "best") {
                        return b.rating - a.rating;
                    } */
                });
            }
            setSortBy(!sortBy)
        }



        setMoviesToRender(preparedMovieData);

    },[selectedSort, sortBy, moviesData]);

console.log(selectedSort, moviesToRender);

  return (
    <Container
      sx={{
        bgcolor: "background.paper",
        pt: 8,
        pb: 6,
        position: "relative",
      }}
      maxWidth="md"
    >
      <Grid container spacing={4}>
        {moviesData?.map(
          (movie: any) =>
            movie.title.toLowerCase().includes(filter) && (
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
                      {movie.title}
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
  );
}

export default MovieCard;
