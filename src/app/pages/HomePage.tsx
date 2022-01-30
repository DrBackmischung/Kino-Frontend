import React from 'react';
import Carousel from 'react-material-ui-carousel'
import {Button, Paper} from '@mui/material'
import {Box, Container} from "@mui/material";
import APIUrl from "../config/APIUrl";
import {useQuery} from "react-query";
import palette from "../config/Colours";
import MovieCard from "../components/MovieCard";
import {LazyLoadImage} from "react-lazy-load-image-component";

function Item(props: any)
{
    return (
         <Paper>
            <h2>{props.item.name}</h2>
            <p>{props.item.description}</p>
             <LazyLoadImage
                 src={props.item.pictureLink}
                 alt="Hier sollte ein Poster sein... Wo ist es nur hin?"
                 width={1200}
                 height={800}
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
            name: "Our Top Movie of the Month",
            description: "Probably the most random thing you have ever seen!",
            pictureLink: "https://i.blogs.es/cb2ce6/spiderman-no-way-home-cartel/1366_2000.jpeg",
        },
        {
            name: "Keeping you safe!",
            description: "Watching the future of cinema without the fear of COVID! Have a look at our rules...",
            pictureLink: "https://cdn.cineweb.de/media/betreiber/cinexx-hachenburg-2018/city/hachenburg-2018/images/Grafiken_intern/Corona/Corona-Regeln%20Reopening.jpg",
        }
    ]


    return(
         <Container className="wholeContainer" sx={{
            position: "relative",
        }}>
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
            <Box>
                <h3>More Movies:</h3>
                <MovieCard
                    filter={""}
                    location={""}
                    moviesData={moviesData.data}
                />
            </Box>
        </Container>
    )
}

export default HomePage;
