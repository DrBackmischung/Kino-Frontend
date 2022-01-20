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

    const { filter: search, selectedLanguage, moviesData, selectedFSK, selectedGenre} = props;

    const [moviesToRender, setMoviesToRender] = useState(moviesData);




    let navigate = useNavigate();

    function navigateToDetails(movieId: any) {
        navigate("/DetailsPage", { state: { movieId } });
    }




    useEffect(()=>{
        let preparedMovieData = moviesData;


        //Language Filter

        if (selectedLanguage !== undefined) {
            if (selectedLanguage?.length !== 0) {
                preparedMovieData = preparedMovieData.filter((movie: any) => {
                    return selectedLanguage.includes(movie.language)
                });
            }
        }


        // FSK
        if (selectedFSK !== undefined) {
            if (selectedFSK?.length !== 0) {
                preparedMovieData = preparedMovieData.filter((movie: any) => {
                    return selectedFSK.includes(movie.fsk.toString())
                });
            }
        }
        // Genre

        if (selectedFSK !== undefined) {
            if (selectedGenre?.length !== 0) {
                preparedMovieData = preparedMovieData.filter((movie: any) => {
                    return (movie.genre.toString().includes(selectedGenre));
                });
            }
        }


        setMoviesToRender(preparedMovieData);

    },[selectedLanguage, selectedFSK, selectedGenre, moviesData]);





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
                {moviesToRender?.map(
                    (movie: any) =>
                        movie.title.toLowerCase().includes(search) && (
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