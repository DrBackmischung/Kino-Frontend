//import React, {useEffect, useState} from 'react';
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Movies from "./data";



function MovieCard(){

    /* // react hook for state handler
    const [data , setData]=useState([])

    // fetch Function
    const getData=()=> {
        fetch("../../../public/data.json", {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }
        )
            .then(
                function (res) {
                    console.log(res)
                    return res.json()
                }).then(function (data) {
            // store Data in State Data Variable
            setData(data)
        });
    }
    useEffect(()=>{
        getData()
    },[]) */



    return(
        <Container sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
            position: "relative"
        }} maxWidth="md">
            <Grid container spacing={4}>
                {Movies.map((movie, key) => (
                    <Grid item key={key} xs={12} sm={6} md={4}>
                        <Card
                            sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                            <CardMedia
                                component="img"
                                sx={{
                                     pt: '6%',
                                }}
                                image={movie.Images[0]}
                                alt="poster"/>
                            <CardContent sx={{ flexGrow: 1 }}>
                                <Typography gutterBottom variant="h5" component="h2">
                                    {movie.Title}
                                </Typography>
                                <Typography>
                                    {movie.Runtime}  FSK {movie.FSK}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small">Tickets</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}

export default MovieCard;