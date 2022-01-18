// eslint-disable-next-line
import React from "react";
import { useQuery } from "react-query";
import { Button, Grid, Tooltip, Typography, Zoom } from "@mui/material";
import Box from "@mui/material/Box";
import ErrorPage from "../pages/ErrorPage";
import LoadingAnimation from "./layouts/LoadingAnimation";
import APIUrl from "../config/APIUrl";

function ShowPicker(props: any) {
  const { setOpenSeatBooking, movieId, setSelectedShow } = props;

  const apiUrlAll = `${APIUrl.apiUrl}/movie/${movieId}/shows`;
  const { isLoading, error, data } = useQuery(
    ["shows", movieId],
    () => {
      return fetch(apiUrlAll).then((res) => {
        return res.json();
      });
    },
    { enabled: Boolean(movieId) }
  );

  let prepareShows: any = (shows: any) => {
    if (data === undefined) return;
    const sortedShows = data?.sort((itemA: any, itemB: any) => {
      if (itemA.showDate !== itemB.showDate) {
        return (
          new Date(itemA.showDate).getTime() -
          new Date(itemB.showDate).getTime()
        );
      } else {
        return (
          new Date(itemA.startTime).getTime() -
          new Date(itemB.startTime).getTime()
        );
        //TODO nach Zeit sortieren
      }
    });
    return sortedShows;
  };

  let formattedDate: any = (showDate: any) => {
    const showDateFormatted = new Date(showDate).toLocaleDateString(undefined, {
      weekday: "long",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
    return showDateFormatted;
  };

  //TODO Format Time
  let formattedTime: any = (item: any) => {
    const showTimeFormatted = item.startTime.substring(0, 5);
    return showTimeFormatted;
  };

  if (isLoading) {
    return <LoadingAnimation />;
  }

  if (error) return <ErrorPage />;

  function openDialog(show: any) {
    setOpenSeatBooking((prevVal: any) => prevVal + 1);
    setSelectedShow(show);
  }

  return (
    <Box className="overallContainer" maxWidth="sm">
      <h3>Shows:</h3>
      <Box className="showTimeContainer">
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {error ? (
            <ErrorPage />
          ) : isLoading ? (
            <LoadingAnimation />
          ) : (
            prepareShows(data)?.map((item: any) => (
              <Grid item xs={1} sm={4} md={4} key={`${item.id}`}>
                <Typography>
                  <Box sx={{ fontWeight: "bold" }}>
                    {formattedDate(item.showDate)}
                  </Box>
                </Typography>
                <Tooltip
                  TransitionComponent={Zoom}
                  title="Click to book a seat!"
                  arrow
                >
                  <Button
                    key={`${item.id}`}
                    fullWidth
                    onClick={() => {
                      openDialog(item);
                    }}
                    variant="contained"
                  >
                    <Typography>
                      <Box sx={{ fontFamily: "Monospace", fontSize: 30 }}>
                        {formattedTime(item)}
                      </Box>
                    </Typography>
                  </Button>
                </Tooltip>
              </Grid>
            ))
          )}
        </Grid>
      </Box>
    </Box>
  );
}

export default ShowPicker;
