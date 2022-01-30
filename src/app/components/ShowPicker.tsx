// eslint-disable-next-line
import React from "react";
import { useQuery } from "react-query";
import { Button, Grid, Tooltip, Typography, Zoom } from "@mui/material";
import Box from "@mui/material/Box";
import ErrorPage from "../pages/ErrorPage";
import LoadingAnimation from "./layouts/LoadingAnimation";
import APIUrl from "../config/APIUrl";
import "./ShowPicker.css";

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
    if (shows === undefined) return;
    const sortedByDays = shows?.sort((itemA: any, itemB: any) => {
      return (
        new Date(itemA.showDate).getTime() - new Date(itemB.showDate).getTime()
      );
    });

    // eslint-disable-next-line array-callback-return
    const sortedByTime = sortedByDays?.sort((itemC: any, itemD: any) => {
      if (itemC.showDate === itemD.showDate) {
        return (
          new Date("1970/01/01 " + itemC.startTime).getTime() -
          new Date("1970/01/01 " + itemD.startTime).getTime()
        );
      }
    });

    const showsWithFormattedDate = sortedByTime?.map((item: any) => {
      return { ...item, showDate: formattedDate(item?.showDate) };
    });
    return showsWithFormattedDate;
  };

  let formattedDate: any = (showDate: any) => {
    return new Date(showDate).toLocaleDateString(undefined, {
      weekday: "long",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  let formattedTime: any = (item: any) => {
    return item.startTime.substring(0, 5);
  };

  if (isLoading) {
    return <LoadingAnimation />;
  }

  if (error) return <ErrorPage />;

  function openDialog(show: any) {
    setOpenSeatBooking((prevVal: any) => prevVal + 1);
    setSelectedShow(show);
  }

  const renderShowsForWeekDayIGuess = (data: any) => {
    const shows = prepareShows(data);
    const showsMonday = shows?.filter(
      (item: any) => item.showDate.split(",")[0] === "Monday"
    );
    const showsTuesday = shows?.filter(
      (item: any) => item.showDate.split(",")[0] === "Tuesday"
    );
    const showsWednesday = shows?.filter(
      (item: any) => item.showDate.split(",")[0] === "Wednesday"
    );
    const showsThursday = shows?.filter(
      (item: any) => item.showDate.split(",")[0] === "Thursday"
    );
    const showsFriday = shows?.filter(
      (item: any) => item.showDate.split(",")[0] === "Friday"
    );
    const showsSaturday = shows?.filter(
      (item: any) => item.showDate.split(",")[0] === "Saturday"
    );
    const showsSunday = shows?.filter(
      (item: any) => item.showDate.split(",")[0] === "Sunday"
    );

    let showsSortedByTheDays = [];

    if (showsMonday?.length > 0) {
      showsSortedByTheDays.push(showsMonday);
    }
    if (showsTuesday?.length > 0) {
      showsSortedByTheDays.push(showsTuesday);
    }
    if (showsWednesday?.length > 0) {
      showsSortedByTheDays.push(showsWednesday);
    }
    if (showsThursday?.length > 0) {
      showsSortedByTheDays.push(showsThursday);
    }
    if (showsFriday?.length > 0) {
      showsSortedByTheDays.push(showsFriday);
    }
    if (showsSaturday?.length > 0) {
      showsSortedByTheDays.push(showsSaturday);
    }
    if (showsSunday?.length > 0) {
      showsSortedByTheDays.push(showsSunday);
    }

    const showsToBeReturned = showsSortedByTheDays?.sort((a: any, b: any) => {
      return (
        new Date(a?.[0]?.showDate).getTime() -
        new Date(b?.[0]?.showDate).getTime()
      );
    });

    return showsToBeReturned;
  };

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
            renderShowsForWeekDayIGuess(data).map((weekDay: any) => {
              if (weekDay?.length !== 0) {
                return (
                  <>
                    <Box className="weekDayContainer">
                      <strong>{weekDay?.[0]?.showDate}</strong>
                      <br />
                      <Box className="showsContainer">
                        {weekDay?.map((item: any) => (
                          <>
                            <Box key={`${item.id}`} className="showContainer">
                              <Tooltip
                                TransitionComponent={Zoom}
                                title="Click to book a seat!"
                                arrow
                              >
                                <Button
                                  key={`${item.id}`}
                                  onClick={() => {
                                    openDialog(item);
                                  }}
                                  variant="contained"
                                >
                                  <Typography>
                                    <Box
                                      sx={{
                                        fontFamily: "Monospace",
                                        fontSize: 20,
                                      }}
                                    >
                                      {formattedTime(item)}
                                    </Box>
                                  </Typography>
                                </Button>
                              </Tooltip>
                            </Box>
                            <br />
                          </>
                        ))}
                      </Box>
                    </Box>
                  </>
                );
              }
              return null;
            })
          )}
        </Grid>
      </Box>
    </Box>
  );
}

export default ShowPicker;
