import React from "react";
import Carousel from "react-material-ui-carousel";
import { Paper } from "@mui/material";
import { Box, Container } from "@mui/material";
import APIUrl from "../config/APIUrl";
import { useQuery } from "react-query";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "./HomePage.css";

function Item(props: any) {
  return (
    <Paper id="homePage-paper">
      <h2>{props.item.name}</h2>
      <p>{props.item.description}</p>
      <LazyLoadImage
        src={props.item.pictureLink}
        alt="Hier sollte ein Poster sein... Wo ist es nur hin?"
        width={1200}
        height={800}
      />
    </Paper>
  );
}

function HomePage() {

  let items = [
    {
      name: "Unsere Top Film-Empfehlung des Monats",
      description: "Der Blockbuster des Monats: Spider-Man: No Way Home",
      pictureLink:
        "https://i.blogs.es/cb2ce6/spiderman-no-way-home-cartel/1366_2000.jpeg",
    },
    {
      name: "Wir beschützen Dich!",
      description:
        "Genieße das voll Kino-Entertainment ohne Angst vor COVID zu haben! Wirf einen Blick auf unsere Regeln...",
      pictureLink:
        "https://cdn.cineweb.de/media/betreiber/cinexx-hachenburg-2018/city/hachenburg-2018/images/Grafiken_intern/Corona/Corona-Regeln%20Reopening.jpg",
    },
  ];

  const theme = createTheme();

  return (
    <ThemeProvider theme={theme}>
      <Container
        id="homePage-container"
        className="wholeContainer"
        sx={{
          position: "relative",
        }}
      >
        <Box id="homePage-box">
          <Carousel>
            {items.map((item, i) => (
              <Item key={i} item={item} />
            ))}
          </Carousel>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default HomePage;
