import React from "react";
import { Grid, Typography, Card, CardContent, Box } from "@mui/material";
import APIUrl from "../config/APIUrl";
import { useQuery } from "react-query";
import ErrorPage from "../pages/ErrorPage";
import LoadingAnimation from "./layouts/LoadingAnimation";
import Ratings from "./Ratings";

export function ReviewDashboard(props: any) {
  const { selectedUser } = props;

  const apiUrlGetReviews = `${APIUrl.apiUrl}/user/${selectedUser?.id}/reviews`;
  const {
    isLoading: isLoadingReviews,
    isError,
    data: dataReviews,
  }: any = useQuery("Reviews", () =>
    fetch(apiUrlGetReviews).then((res) => res.json())
  );

  if (isLoadingReviews) {
    return <LoadingAnimation />;
  }

  if (isError || dataReviews?.error) {
    return <ErrorPage errorCode={dataReviews?.status} />;
  }

  if (dataReviews[0] === undefined) {
    return (
      <Grid
        item
        xs={12}
        spacing={3}
        borderTop={"3px solid grey"}
        paddingTop={5}
      >
        <Typography align="center" component="h1" variant="h5">
          Keine Reviews
        </Typography>
      </Grid>
    );
  }

  return (
    <Grid container xs={12} borderTop={"3px solid grey"}>
      <Grid item xs={12} spacing={3} paddingTop={5}>
        <Typography align="center" component="h1" variant="h5">
          Reviews
        </Typography>
      </Grid>
      {dataReviews.map((r: any) => (
        <Grid item xs={12} padding={2}>
          <Card sx={{ display: "flex", backgroundColor: "#424242" }}>
            <Box>
              <CardContent sx={{ flex: "1 0 auto" }}>
                <Grid container xs={12}>
                  <Grid item xs={12}>
                    <Typography align="left" component="h1" variant="h5"  style={{ color:"#ba8434" }}>
                      {r.movie.title}
                    </Typography>
                    <p style={{ color:"#ba8434" }}>
                      <b>{r.header}</b>
                    </p>
                    <p style={{ color:"#ba8434" }}>{r.content}</p>
                  </Grid>
                  <Grid item xs={12}>
                    <Ratings ratingValue={r.rating} />
                  </Grid>
                </Grid>
              </CardContent>
            </Box>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
