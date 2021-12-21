/* eslint-disable */
import React, { useState, useEffect } from "react";
import MovieDetails from "../components/MovieDetails";
import ShowPicker from "../components/ShowPicker";
import {
  CardMedia,
  CircularProgress,
  Container,
  Grid,
  ThemeProvider,
} from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useQuery } from "react-query";
import palette from "../config/Colours";
import { useNavigate } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import IconButton from "@mui/material/IconButton";
import { useLocation } from "react-router-dom";
import ManageCheckout from "../components/ManageCheckout";

function DetailsPage(props: any) {
  const [movieId, setMovieId] = useState();
  const [openSeatBooking, setOpenSeatBooking] = useState(0);
  const [selectedShow, setSelectedShow] = useState();
  const { state }: any = useLocation();
  let navigate = useNavigate();
  const apiUrlAll = `https://wi2020seb-cinema-api.azurewebsites.net/movie/${movieId}`;
  const { isLoading, data, refetch } = useQuery(
    "movie",
    () => fetch(apiUrlAll).then((res) => res.json()),
    {
      refetchOnWindowFocus: false,
      enabled: false,
    }
  );
  useEffect(() => {
    setMovieId(state.movieId);
  }, [state?.movieId]);
  useEffect(() => {
    if (movieId) {
      refetch();
    }
  }, [movieId]);

  if (isLoading) {
    return (
      <div>
        <CircularProgress />
        <span>Loading...</span>
      </div>
    );
  }

  const theme = createTheme(palette);

  const goBack = () => {
    navigate(-1);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container className="wholeContainer">
        <IconButton onClick={goBack}>
          <ArrowBackIosIcon />
        </IconButton>
        <Container className="movieContainer">
          <Grid
            sx={{
              display: "grid",
              gap: 5,
              gridTemplateColumns: "repeat(2, 1fr)",
            }}
          >
            <div className="imageContainer">
              <CardMedia
                component="img"
                sx={{
                  pt: "6%",
                }}
                src={data?.pictureLink}
                alt="poster"
              />
            </div>
            <Grid
              className="detailsContainer"
              sx={{
                display: "grid",
                gridTemplateRows: "repeat(2,1fr)",
              }}
            >
              <MovieDetails selectedMovie={data} />
              <ShowPicker
                setOpenSeatBooking={setOpenSeatBooking}
                movieId={movieId}
                setSelectedShow={setSelectedShow}
                data={data}
              />
            </Grid>
            <br />
          </Grid>
        </Container>
        <ManageCheckout show={selectedShow} open={openSeatBooking} />
      </Container>
    </ThemeProvider>
  );
}

export default DetailsPage;
