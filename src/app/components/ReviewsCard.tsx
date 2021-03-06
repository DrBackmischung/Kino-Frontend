import * as React from "react";
import { Box, Container, Grid, Rating } from "@mui/material";
import ErrorPage from "../pages/ErrorPage";
import LoadingAnimation from "./layouts/LoadingAnimation";
import "./ReviewsCard.css";

function ReviewsCard(props: any) {
  const { data, isLoading, isError } = props;

  let prepareReviews: any = (reviews: any) => {
    if (data === undefined) {
      return;
    } else {
      data.sort((itemA: any, itemB: any) => {
        return new Date(itemB.date).getTime() - new Date(itemA.date).getTime();
      });
      return reviews;
    }
  };

  let formatDate: any = (reviewDate: any) => {
    return new Date(reviewDate).toLocaleDateString(undefined, {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  if (isLoading) {
    return <LoadingAnimation />;
  }

  if (isError || data?.error) {
    return <ErrorPage errorCode={data?.status} />;
  }

  return (
    <Container
      sx={{
        position: "relative",
      }}
      maxWidth="md"
    >
      {prepareReviews(data)?.map((review: any) => (
        <Box key={review.id} sx={{ m: 1.5 }}>
          <Grid container>
          <Grid item xs={6}>
              <Box sx={{ fontWeight: "bold" }}>{review.header}</Box>
          </Grid>
          <Grid item xs={6}>
            <Rating
              name = "rating"
              readOnly
              value={review.rating}
              onChange={(event, newValue) => {
                
              }}
            />
          </Grid>
          <Grid item xs={6}>
              <Box sx={{ fontStyle: "italic" }}>{review.user.userName}</Box>
          </Grid>
          <Grid item xs={2}>
              <Box sx={{ fontStyle: "italic" }}>{formatDate(review.date)}</Box>
          </Grid>

          <Grid item xs={12}>
              <Box>{review.content}</Box>
          </Grid>

          </Grid>
        </Box>
      ))}
    </Container>
  );
}

export default ReviewsCard;
