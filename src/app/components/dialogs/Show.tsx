import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Box,
  TextField,
  ThemeProvider,
  Container,
  Typography,
  CssBaseline,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import React, { useState } from "react";
import ErrorPage from "../../pages/ErrorPage";
import LoadingAnimation from "../layouts/LoadingAnimation";
import APIUrl from "../../config/APIUrl";
import { createTheme } from "@mui/material/styles";
import palette from "../../config/Colours";
import { useQuery } from "react-query";

export function AddShowDialog(props: any) {
  const [date, setDate] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [movieID, setMovieID] = useState("");
  const [cinemaID, setCinemaID] = useState("");
  const [cinemaRoomID, setCinemaRoomID] = useState("");
  const { open, cancel } = props;
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const apiUrlGetAllCinemas = `${APIUrl.apiUrl}/cinema/getAll`;

  const {
    isLoading: isLoadingCinema,
    isError: errorCinema,
    data: dataCinema,
  }: any = useQuery("Cinemas", () =>
    fetch(apiUrlGetAllCinemas).then((res) => res.json())
  );

  const apiUrlGetAllCinemaRooms = `${APIUrl.apiUrl}/cinemaRoom/getAll`;

  const {
    isLoading: isLoadingCinemaRoom,
    isError: errorCinemaRoom,
    data: dataCinemaRoom,
  } = useQuery("CinemaRooms", () =>
    fetch(apiUrlGetAllCinemaRooms).then((res) => res.json())
  );

  const apiUrlGetAllMovies = `${APIUrl.apiUrl}/movie/getAll`;

  const {
    isLoading: isLoadingMovie,
    isError: errorMovie,
    data: dataMovie,
  } = useQuery("Movies", () =>
    fetch(apiUrlGetAllMovies).then((res) => res.json())
  );

  const addShow = () => {
    setStart(start + ":00");
    setEnd(end + ":00");
    setIsLoading(true);
    const apiUrlAddShow = `${APIUrl.apiUrl}/show/add`;
    // eslint-disable-next-line
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        date,
        start: start + ":00",
        end: end + ":00",
        movieID,
        cinemaID,
        cinemaRoomID,
      }),
    };
    fetch(apiUrlAddShow, requestOptions).then((response) => {
      if (!response.ok) {
        setError(true);
        setIsLoading(false);
        return;
      }
      return response.json().then((data) => {
        setIsLoading(false);
      });
    });
    cancel();
  };

  const theme = createTheme(palette);

  if (isLoading || isLoadingCinema || isLoadingCinemaRoom || isLoadingMovie) {
    return <LoadingAnimation />;
  }
  if (errorCinema || dataCinema?.error) {
    return <ErrorPage errorCode={dataCinema?.status} />;
  }

  if (errorCinemaRoom || dataCinemaRoom?.error) {
    return <ErrorPage errorCode={dataCinemaRoom?.status} />;
  }

  if (errorMovie || dataMovie?.error) {
    return <ErrorPage errorCode={dataMovie?.status} />;
  }

  if (error) {
    return <ErrorPage />;
  }
  return (
    <ThemeProvider theme={theme}>
      <Dialog
        open={open}
        onClose={cancel}
        scroll="paper"
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        fullWidth={true}
        maxWidth="sm"
      >
        <DialogTitle id="scroll-dialog-title">Show</DialogTitle>
        {error || errorCinema || errorCinemaRoom || errorMovie ? (
          <ErrorPage />
        ) : (
          <DialogContent dividers={true}>
            <DialogContentText id="scroll-dialog-description">
              <Container
                component="main"
                maxWidth="xs"
                sx={{
                  bgcolor: "background.paper",
                  pt: 4,
                  pb: 4,
                  position: "relative",
                }}
              >
                <CssBaseline />
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Typography component="h1" variant="h5">
                    Add a show
                  </Typography>
                  <form noValidate>
                    <Box component="form" noValidate sx={{ mt: 3 }}>
                      <Grid container spacing={2}>
                        <Typography component="h1" variant="h5">
                          Movie list
                        </Typography>
                        <List>
                          {dataMovie?.map((movie: any) => (
                            <ListItem>
                              <ListItemText
                                primary={movie.title}
                                secondary={movie.id}
                              />
                            </ListItem>
                          ))}
                        </List>
                        <Typography component="h1" variant="h5">
                          Cinema list
                        </Typography>
                        <List>
                          {dataCinema?.map((cinema: any) => (
                            <ListItem>
                              <ListItemText
                                primary={cinema.name}
                                secondary={cinema.id}
                              />
                            </ListItem>
                          ))}
                        </List>
                        <Typography component="h1" variant="h5">
                          CinemaRoom list
                        </Typography>
                        <List>
                          {dataCinemaRoom?.map((cr: any) => (
                            <ListItem>
                              <ListItemText
                                primary={cr.roomName}
                                secondary={cr.id}
                              />
                            </ListItem>
                          ))}
                        </List>
                        <Grid item xs={12}>
                          <TextField
                            name="date"
                            required
                            fullWidth
                            type="date"
                            id="date"
                            label="Show Date"
                            autoFocus
                            onChange={(e: any) => setDate(e.target.value)}
                            value={date}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            name="start"
                            required
                            fullWidth
                            type="time"
                            id="start"
                            label="Start Time"
                            autoFocus
                            onChange={(e: any) => setStart(e.target.value)}
                            value={start}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            name="end"
                            required
                            fullWidth
                            type="time"
                            id="end"
                            label="End Time"
                            autoFocus
                            onChange={(e: any) => setEnd(e.target.value)}
                            value={end}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            name="movieID"
                            required
                            fullWidth
                            id="movieID"
                            label="Movie ID"
                            autoFocus
                            onChange={(e: any) => setMovieID(e.target.value)}
                            value={movieID}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            name="cinemaID"
                            required
                            fullWidth
                            id="cinemaID"
                            label="Cinema ID"
                            autoFocus
                            onChange={(e: any) => setCinemaID(e.target.value)}
                            value={cinemaID}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            name="cinemaRoomID"
                            required
                            fullWidth
                            id="cinemaRoomID"
                            label="CinemaRoom ID"
                            autoFocus
                            onChange={(e: any) =>
                              setCinemaRoomID(e.target.value)
                            }
                            value={cinemaRoomID}
                          />
                        </Grid>
                      </Grid>
                    </Box>
                  </form>
                </Box>
              </Container>
            </DialogContentText>
          </DialogContent>
        )}
        <DialogActions>
          <Button onClick={cancel}>Abbruch</Button>
          <Button onClick={addShow}>Speichern</Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
}

export function DeleteShowDialog(props: any) {
  const [id, setId] = useState("");
  const { open, cancel } = props;
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const apiUrlGetAllShows = `${APIUrl.apiUrl}/show/getAll`;

  const {
    isLoading: isLoadingShow,
    error: errorShow,
    data: dataShow,
  }: any = useQuery("Shows", () =>
    fetch(apiUrlGetAllShows).then((res) => res.json())
  );

  const deleteShow = () => {
    setIsLoading(true);
    const apiUrlDeleteShow = `${APIUrl.apiUrl}/show/${id}`;
    // eslint-disable-next-line
    const requestOptions = {
      method: "DELETE",
    };
    fetch(apiUrlDeleteShow, requestOptions).then((response) => {
      if (!response.ok) {
        setError(true);
        setIsLoading(false);
        return;
      }
      return response.json().then((data) => {
        setIsLoading(false);
      });
    });
    cancel();
  };

  const theme = createTheme(palette);

  function isFuture(date: String) {
    const now = new Date();
    const today = now.toISOString().substring(0, 10);
    const todayYear = today.substring(0, 4);
    const todayMonth = today.substring(5, 7);
    const todayDay = today.substring(8, 10);
    const showYear = date.substring(0, 4);
    const showMonth = date.substring(5, 7);
    const showDay = date.substring(8, 10);
    if (todayYear < showYear) {
      return true;
    } else if (todayYear === showYear && todayMonth < showMonth) {
      return true;
    } else if (
      todayYear === showYear &&
      todayMonth === showMonth &&
      todayDay <= showDay
    ) {
      return true;
    } else {
      return false;
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Dialog
        open={open}
        onClose={cancel}
        scroll="paper"
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        fullWidth={true}
        maxWidth="sm"
      >
        <DialogTitle id="scroll-dialog-title">Show</DialogTitle>
        {error || errorShow ? (
          <ErrorPage />
        ) : isLoading || isLoadingShow ? (
          <LoadingAnimation />
        ) : (
          <DialogContent dividers={true}>
            <DialogContentText id="scroll-dialog-description">
              <Container
                component="main"
                maxWidth="xs"
                sx={{
                  bgcolor: "background.paper",
                  pt: 4,
                  pb: 4,
                  position: "relative",
                }}
              >
                <CssBaseline />
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Typography component="h1" variant="h5">
                    Delete a show
                  </Typography>
                  <form noValidate>
                    <Box component="form" noValidate sx={{ mt: 3 }}>
                      <Grid container spacing={2}>
                        <List>
                          {dataShow?.map((show: any) =>
                            isFuture(show.showDate) ? (
                              <ListItem>
                                <ListItemText
                                  primary={
                                    show.movie.title +
                                    " " +
                                    show.showDate +
                                    " " +
                                    show.startTime
                                  }
                                  secondary={show.id}
                                />
                              </ListItem>
                            ) : null
                          )}
                        </List>
                        <Grid item xs={12}>
                          <TextField
                            name="id"
                            required
                            fullWidth
                            id="id"
                            label="ID"
                            autoFocus
                            onChange={(e: any) => setId(e.target.value)}
                            value={id}
                          />
                        </Grid>
                      </Grid>
                    </Box>
                  </form>
                </Box>
              </Container>
            </DialogContentText>
          </DialogContent>
        )}
        <DialogActions>
          <Button onClick={cancel}>Abbruch</Button>
          <Button onClick={deleteShow}>Löschen</Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
}
