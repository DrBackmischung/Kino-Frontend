import React, { useState } from "react";
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
import palette from "../config/colours";
import SeatBookingDialog from "./SeatBookingDialog";
import { useNavigate } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import IconButton from "@mui/material/IconButton";

function DetailsPage(props: any) {
  const { movieId } = props;

  const [open, setOpen] = useState<boolean>(false);

  let navigate = useNavigate();

  const apiUrlAll = `https://wi2020seb-cinema-api-dev.azurewebsites.net/movie/${movieId}`;

  const { isLoading, error, data } = useQuery("movie", () =>
    fetch(apiUrlAll).then((res) => res.json())
  );

  if (isLoading) {
    return (
      <div>
        <CircularProgress />
        <span>Loading...</span>
      </div>
    );
  }

  const theme = createTheme(palette);

  const handleClose = () => {
    setOpen(false);
  };

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
                src={data.pictureLink}
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
              <ShowPicker setOpen={setOpen} movieId={movieId} />
            </Grid>
            <br />
          </Grid>
        </Container>
        <SeatBookingDialog open={open} handleClose={handleClose} />
      </Container>
    </ThemeProvider>
  );
}

export default DetailsPage;
