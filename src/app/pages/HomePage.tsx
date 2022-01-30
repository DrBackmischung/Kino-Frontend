import React from 'react';
import Carousel from 'react-material-ui-carousel'
import {Button, Paper} from '@mui/material'
import {Box, CardMedia, Container} from "@mui/material";
import APIUrl from "../config/APIUrl";
import {useQuery} from "react-query";
import palette from "../config/Colours";
import MovieCard from "../components/MovieCard";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "./HomePage.css";

function Item(props: any)
{
    return (
        <Paper id="homePage-paper">
            <h2>{props.item.name}</h2>
            <p>{props.item.description}</p>
            <CardMedia
                component="img"
                src={props.item.pictureLink}
                alt="Hier sollte ein Poster sein... Wo ist es nur hin?"
                sx={{
                    maxHeight: "5",
                    maxWidth: "100%",
                    display: "",
                }}
            />
        </Paper>
      )
}

function HomePage(){
    const apiUrlMovies = `${APIUrl.apiUrl}/movie/getAll`;

    const moviesData = useQuery("Movies", () =>
        fetch(apiUrlMovies).then((res) => res.json())
    );

    let items = [
        {
            name: "Unsere Top Film-Empfehlung des Monats",
            description: "Der Blockbuster des Monats: Spider-Man: No Way Home",
            pictureLink: "https://i.blogs.es/cb2ce6/spiderman-no-way-home-cartel/1366_2000.jpeg",
        },
        {
            name: "Wir beschützen Dich!",
            description: "Genieße das voll Kino-Entertainment ohne Angst vor COVID zu haben! Wirf einen Blick auf unsere Regeln...",
            pictureLink: "https://cdn.cineweb.de/media/betreiber/cinexx-hachenburg-2018/city/hachenburg-2018/images/Grafiken_intern/Corona/Corona-Regeln%20Reopening.jpg",
        }
    ]

    const theme: any = createTheme();

    return(
        <ThemeProvider theme={theme}>
            <Container 
                className="wholeContainer" 
                sx={{
                    position: "relative",
                }}
                id="homePage-container"
            >
                <Box>
                    <Carousel>
                        {
                            items.map( (item, i) => <Item key={i} item={item} /> )
                        }
                    </Carousel>
                </Box>
                <Button variant="contained" disabled size="large" sx={{
                    mt: 3,
                    width: 1,
                    height: 30,
                    position: 'relative',
                    backgroundColor: palette.palette.primary.dark,
                }}/>
                <Box id="homePage-box">
                    <h3>Weitere Filme:</h3>
                    <MovieCard
                        filter={""}
                        location={""}
                        moviesData={moviesData.data}
                    />
                </Box>
            </Container>
        </ThemeProvider>
    )
}

export default HomePage;
