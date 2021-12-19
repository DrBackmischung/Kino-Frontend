import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";

function MovieCard(props: any) {
    const {filter} = props;

    let navigate = useNavigate();

    function navigateToDetails(movieId: any) {
        navigate("/DetailsPage", { state: { movieId } });
    }

    const apiUrl =
        "https://wi2020seb-cinema-api.azurewebsites.net/movie/getAll";

    const { isLoading, error, data } = useQuery("Movies", () =>
        fetch(apiUrl).then((res) => res.json())
    );


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
                {data?.map((movie: any) => (
                    movie.titel.toLowerCase().includes(filter) &&
                    <Grid item key={movie.id} xs={12} sm={6} md={4}>
                        <Card
                            sx={{ height: "100%", display: "flex", flexDirection: "column" }}
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
                ))}
            </Grid>
        </Container>
    );
}

export default MovieCard;