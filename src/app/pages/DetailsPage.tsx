/* eslint-disable */
import React, { useState, useEffect } from "react";
import MovieDetails from "../components/MovieDetails";
import ShowPicker from "../components/ShowPicker";
import Slider from "../components/Slider";
import { Box, Container, Grid, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useQuery } from "react-query";
import palette from "../config/Colours";
import { useNavigate } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import IconButton from "@mui/material/IconButton";
import { useLocation } from "react-router-dom";
import ManageCheckout from "../components/ManageCheckout";
import ErrorPage from "./ErrorPage";
import LoadingAnimation from "../components/layouts/LoadingAnimation";
import APIUrl from "../config/APIUrl";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Ratings from "../components/Ratings";
import ReviewsCard from "../components/ReviewsCard";

function DetailsPage(props: any) {
  const { userData } = props;
  const [movieId, setMovieId] = useState();
  const [openSeatBooking, setOpenSeatBooking] = useState(0);
  const [selectedShow, setSelectedShow] = useState();
  const { state }: any = useLocation();
  let navigate = useNavigate();
  const apiUrlAll = `${APIUrl.apiUrl}/movie/${movieId}`;

  const { isLoading, data, refetch, error } = useQuery(
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
    return <LoadingAnimation />;
  }

  if (error) {
    return <ErrorPage />;
  }

  const theme = createTheme(palette);

  const goBack = () => {
    navigate(-1);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container
        className="wholeContainer"
        sx={{
          bgcolor: "background.paper",
          pt: 4,
          pb: 6,
          position: "relative",
          marginTop: theme.spacing(12),
        }}
      >
        <IconButton onClick={goBack}>
          <ArrowBackIosIcon />
        </IconButton>
        <Container className="movieContainer">
          <Grid
            sx={{
              display: "grid",
              gap: 5,
              gridTemplateColumns: "repeat(2, 5fr)",
            }}
          >
            <Slider selectedMovie={data} />
            <Grid
              className="detailsContainer"
              sx={{
                display: "grid",
                gridTemplateRows: "repeat(1,1fr)",
              }}
            >
              <Box>
                <MovieDetails selectedMovie={data} />
                <Ratings ratingValue={2} />
                <ShowPicker
                  setOpenSeatBooking={setOpenSeatBooking}
                  movieId={movieId}
                  setSelectedShow={setSelectedShow}
                  data={data}
                />
              </Box>
            </Grid>
            <Grid>
              
            </Grid>
            <br />
          </Grid>
        </Container>
        <Box>
          <ReviewsCard
            movieId={movieId}
          />
        </Box>
        <ManageCheckout
          show={selectedShow}
          open={openSeatBooking}
          userData={userData}
        />
      </Container>
    </ThemeProvider>
  );
}

export default DetailsPage;
