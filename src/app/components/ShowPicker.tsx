// eslint-disable-next-line
import React from "react";
import {useQuery} from "react-query";
import {Button, Container, Grid, Tooltip, Typography, Zoom} from "@mui/material";
import Box from "@mui/material/Box";
import ErrorPage from "../pages/ErrorPage";
import LoadingAnimation from "./layouts/LoadingAnimation";
import APIUrl from "../config/APIUrl";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import palette from "../config/Colours";

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

        const sortedShows = data?.sort((itemA: any, itemB: any) => {
            return (
                new Date(itemA.showDate).getTime() -
                new Date(itemB.showDate).getTime()
            )
        });

        // eslint-disable-next-line array-callback-return
        return sortedShows?.sort((itemC: any, itemD: any) => {
            if (itemC.showDate === itemD.showDate) {
                return (
                    new Date('1970/01/01 ' + itemC.startTime).getTime() -
                    new Date('1970/01/01 ' + itemD.startTime).getTime()
                );
            }
        });
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
        return <LoadingAnimation/>;
    }

    if (error) return <ErrorPage/>;

    function openDialog(show: any) {
        setOpenSeatBooking((prevVal: any) => prevVal + 1);
        setSelectedShow(show);
    }

    const theme = createTheme(palette)

    return (
      <ThemeProvider theme={theme}>
        <Box className="overallContainer" maxWidth="sm">
            <h3>Vorstellungen:</h3>
            <Box className="showTimeContainer">
                <Grid
                    container
                    spacing={{xs: 2, md: 3}}
                    columns={{xs: 4, sm: 8, md: 12}}
                >
                    {error ? (
                        <ErrorPage/>
                    ) : isLoading ? (
                        <LoadingAnimation/>
                    ) : (data?.length === 0 ? (
                            <Container sx={{mt: 6, ml: 7 }}>
                                <Typography sx={{fontStyle: "italic"}}>Sorry, zur Zeit sind leider keine Vorstellungen für diesen Film verfügbar!</Typography>
                            </Container>
                        ) : (
                            prepareShows(data)?.map((item: any) => (
                                <Grid item xs={1} sm={4} md={4} key={`${item.id}`}>
                                    <Typography>
                                        <Box sx={{ fontSize: 17.5, fontWeight: "bold"}}>
                                            {formattedDate(item.showDate)}
                                        </Box>
                                    </Typography>
                                    <Tooltip
                                        TransitionComponent={Zoom}
                                        title="Klick zur Buchung eines Sitzes!"
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
                                                <Box sx={{fontFamily: "Monospace", fontSize: 20}}>
                                                    {formattedTime(item)}
                                                </Box>
                                            </Typography>
                                        </Button>
                                    </Tooltip>
                                </Grid>
                            )))
                    )}
                </Grid>
            </Box>
        </Box>
      </ThemeProvider>
    );
}

export default ShowPicker;
