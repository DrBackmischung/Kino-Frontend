import { Container, CssBaseline, TextField, Button, Grid, Rating, Typography, withStyles, styled } from "@mui/material";
import React, { useState } from "react";
import APIUrl from "../config/APIUrl";
const CssTextField = styled(TextField)({
  '& label.Mui-focused': {
    color: '#ba8434',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: '#ba8434',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#ba8434',
    },
    '&:hover fieldset': {
      borderColor: '#ba8434',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#ba8434',
    },
  },
});

function AddCommentCard(props: any) {
  const { movieId, userId, refetch } = props;

  const [reviewTitle, setReviewTitle] = useState("");
  const [reviewBody, setReviewBody] = useState("");
  const [reviewRating, setReviewRating] : any = useState(0);

  const apiUrl = `${APIUrl.apiUrl}/review/add`;

  const addReview = async () => {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        date: new Date(),
        time: "12:00:00",
        header: reviewTitle,
        content: reviewBody,
        movieID: movieId,
        userID: userId.id,
        rating: reviewRating
      }),
    };
    await fetch(apiUrl, requestOptions).then(() => {
      setReviewTitle("");
      setReviewBody("");
      setReviewRating(0);
    });
    refetch();
  };

  if (movieId === undefined || userId?.id === undefined) {
    return (
      <Container>
        <h2>Reviews</h2>
        <p>Bitte loggen sie sich ein um ein Review schreiben zu können!</p>
      </Container>
    );
  }

  return (
    <Container
      sx={{
        pt: 8,
        pb: 6,
        position: "relative",
      }}
      maxWidth="md"
    >
      <CssBaseline />
      <h2>Reviews</h2>
      <Grid container sx={{ m: 1.5 }}>
        <Grid item xs={12} sx={{ mb: 2 }}>
          <h3>Schreiben sie ein Review:</h3>
        </Grid>
        <Grid item xs={6} sx={{ mb: 2 }}>
          <CssTextField
            required
            fullWidth
            label="Titel"
            variant="outlined"
            onChange={(e: any) => {
              setReviewTitle(e.target.value);
            }}
            value={reviewTitle}
          />
        </Grid>
        <Grid item xs={1}></Grid>
        <Grid item xs={5} sx={{}}>
          <Typography >Bewertung</Typography>
          <Rating
            name = "rating"
            value={reviewRating}
            onChange={(event, newValue) => {
              setReviewRating(newValue);
            }}
          />

        </Grid>
        <Grid item xs={12} sx={{ mb: 2 }}>
          <CssTextField
            required
            fullWidth
            label="Bewertung"
            id="review-content"
            multiline
            maxRows={5}
            onChange={(e: any) => {
              setReviewBody(e.target.value);
            }}
            value={reviewBody}
          />
        </Grid>
        <Grid item xs={3}>
          <Button
            color="secondary"
            variant="contained"
            onClick={() => {
              addReview();
            }}
          >
            Submit
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}

export default AddCommentCard;
