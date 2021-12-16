//import React, {useEffect, useState} from 'react';
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import {useQuery} from "react-query";
import {useState} from "react";



function MovieCard(){


    const apiUrl =
        "https://wi2020seb-cinema-api-dev.azurewebsites.net/movie/getAll";


    const { isLoading, error, data } = useQuery("Movies", () =>
        fetch(apiUrl).then((res) => res.json())
    );
    console.log(isLoading, error, data);

    const [filter, setFilter] = useState("");

    const handleSearchChange = (e: any) => {
        setFilter(e.target.value);
    }

    return(
        <Container sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
            position: "relative"
        }} maxWidth="md">
            <Grid container spacing={4}>
                {data?.map((movie: any) => (

                    <Grid item key={movie.id} xs={12} sm={6} md={4}>
                        <Card
                            sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                            <CardMedia
                                component="img"
                                sx={{
                                     pt: '6%',
                                }}
                                image={movie.pictureLink}
                                alt="poster"/>
                            <CardContent sx={{ flexGrow: 1 }}>
                                <Typography gutterBottom variant="h5" component="h2">
                                    {movie.titel}
                                </Typography>
                                <Typography>
                                    {movie.duration} Min      FSK {movie.fsk}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small"
                                        href="../pages/DetailsPage">Tickets</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}

export default MovieCard;