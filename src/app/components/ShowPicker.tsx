// eslint-disable-next-line
import React from "react";
import {useEffect, useState} from "react";
import {useQuery} from "react-query";
import {
    Button,
    Container,
    Grid,
    TextField,
    Tooltip,
    Zoom,
} from "@mui/material";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import Box from "@mui/material/Box";
import ErrorPage from "../pages/ErrorPage";
import LoadingAnimation from "./layouts/LoadingAnimation";
import APIUrl from "../config/APIUrl";
import Rating from "./Ratings";

function ShowPicker(props: any) {
    const {setOpenSeatBooking, movieId, setSelectedShow} = props;

    const apiUrlAll = `${APIUrl.apiUrl}/movie/${movieId}/shows`;
    const {isLoading, error, data} = useQuery(
        ["shows", movieId],
        () => {
            return fetch(apiUrlAll).then((res) => {
                return res.json();
            });
        },
        {enabled: Boolean(movieId)}
    );

    let prepareShows: any = (shows: any) => {
        if (data === undefined) return;
        let returnedShows: any = [];
        const sortedShows = data?.sort(
            (itemA: any, itemB: any) =>
            {
                if (itemA.showDate !== itemB.showDate) {
                    return new Date(itemA.showDate).getTime() - new Date(itemB.showDate).getTime();
                } else {
                    return new Date(itemA.startTime).getTime() - new Date(itemB.startTime).getTime();
                    //TODO nach Zeit sortieren
                }
            }
        );
        returnedShows.push(sortedShows);
        console.log(sortedShows)
        return returnedShows;
    };

    /*useEffect(() => {
      setFilteredData(() => {
        return data?.filter?.((show: any) => {
          const showDateFormatted = new Date(show.showDate).toLocaleDateString(
            undefined,
            {
              day: "2-digit",
              month: "2-digit",
              year: "2-digit",
            }
          );
          const showTimeFormatted = new Date(show.startTime).toLocaleDateString(
            undefined,
            {
              hour: "2-digit",
              minute: "2-digit"
            }
          );
          return showDateFormatted + showTimeFormatted;
        });
      });
    }, [date, data]);*/

    if (isLoading) {
        return <LoadingAnimation/>;
    }

    if (error) return <ErrorPage/>;

    function openDialog(show: any) {
        setOpenSeatBooking((prevVal: any) => prevVal + 1);
        setSelectedShow(show);
    }

    return (
        <Box className="overallContainer" maxWidth="sm">
            <h3>Shows:</h3>
            <Box className="showTimeContainer" sx={{mt: 5}}>
                <Grid
                    container
                    spacing={{xs: 2, md: 3}}
                    columns={{xs: 4, sm: 8, md: 12}}
                >
                    {error ? (
                        <ErrorPage/>
                    ) : isLoading ? (
                        <LoadingAnimation/>
                    ) : (
                        prepareShows(data)?.map((item: any) => (
                            <Grid item xs={2} sm={4} md={4} key={`${item.id}`}>
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
                                        {item.showDate/*prepareShows((show: any) => {
                                            const showDateFormatted = new Date(show.showDate).toLocaleDateString(
                                                undefined,
                                                {
                                                    day: "2-digit",
                                                    month: "2-digit",
                                                    year: "2-digit",
                                                });
                                            return showDateFormatted.toString();
                                        })*/
                                        }
                                        <br/>
                                        {item.startTime/*prepareShows((show: any) => {
                                            const showTimeFormatted = new Date(show.startTime).toLocaleDateString(
                                                undefined,
                                                {
                                                    hour: "2-digit",
                                                    minute: "2-digit",
                                                });
                                            return showTimeFormatted.toString();
                                        })*/
                                        }
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
