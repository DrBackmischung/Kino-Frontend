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
    const [date, setDate ] = useState("");
    const [start, setStart ] = useState("");
    const [end, setEnd ] = useState("");
    const [movieID, setMovieID ] = useState("");
    const [cinemaID, setCinemaID ] = useState("");
    const [cinemaRoomID, setCinemaRoomID ] = useState("");
    const {
      open,
      cancel
    } = props;

    const apiUrlGetAllShow = `${APIUrl.apiUrl}/cinema/getAll`;
  
    const {isLoading, error, data} : any = useQuery("Cinemas", () =>
      fetch(apiUrlGetAllShow).then((res) => res.json())
    );

    const apiUrlGetAllCinema = `${APIUrl.apiUrl}/cinemaRoom/getAll`;
  
    const {isLoading2, error2, data2} : any = useQuery("Cinema Rooms", () =>
      fetch(apiUrlGetAllCinema).then((res) => res.json())
    );
  
    const addShow = () => {
        // setIsLoading(true);
        const apiUrlAddShow = `${APIUrl.apiUrl}/show/add`;
        // eslint-disable-next-line
        const requestOptions = {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                date,
                start,
                end,
                movieID,
                cinemaID,
                cinemaRoomID,
            }),
        };
        fetch(apiUrlAddShow, requestOptions).then((response) => {
            if (!response.ok) {
        //        setError(true);
        //        setIsLoading(false);
                return;
            }
            return response.json().then((data) => {
        //        setIsLoading(false);
            });
        });
        cancel();
    };
  
    const theme = createTheme(palette);
  
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
          {error || error2 ? (
            <ErrorPage />
          ) : isLoading || isLoading2 ? (
            <LoadingAnimation />
          ) : (
            <DialogContent dividers={true}>
                <DialogContentText id="scroll-dialog-description">
                    <Container component="main" maxWidth="xs" sx={{
                        bgcolor: "background.paper",
                        pt: 8,
                        pb: 6,
                        position: "relative",
                    }}>
                        <CssBaseline/>
                        <Box
                            sx={{
                                marginTop: 8,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <Typography component="h1" variant="h5">
                                Add a show
                            </Typography>
                            <form noValidate>
                                <Box component="form" noValidate sx={{mt: 3}}>
                                    <Grid container spacing={2}>
                                        <Typography component="h1" variant="h5">
                                            Cinema list
                                        </Typography>
                                        <List>
                                            {data?.map( 
                                                (cinema: any) => 
                                                    <ListItem>
                                                        <ListItemText
                                                            primary={cinema.title}
                                                            secondary={cinema.id}
                                                        />
                                                    </ListItem>
                                                )    
                                            }
                                        </List>
                                        <Typography component="h1" variant="h5">
                                            CinemaRoom list
                                        </Typography>
                                        <List>
                                            {data2?.map( 
                                                (cr: any) => 
                                                    <ListItem>
                                                        <ListItemText
                                                            primary={cr.title}
                                                            secondary={cr.id}
                                                        />
                                                    </ListItem>
                                                )    
                                            }
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
                                                onChange={(e: any) => setCinemaRoomID(e.target.value)}
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
  
export function UpdateShowDialog(props: any) {
    const [id, setId ] = useState("");
    const [date, setDate ] = useState("");
    const [start, setStart ] = useState("");
    const [end, setEnd ] = useState("");
    const [movieID, setMovieID ] = useState("");
    const [cinemaID, setCinemaID ] = useState("");
    const [cinemaRoomID, setCinemaRoomID ] = useState("");
    const {
      open,
      cancel
    } = props;

    const apiUrlGetAllShow = `${APIUrl.apiUrl}/show/getAll`;
  
    const {isLoading, error, data} : any = useQuery("Shows", () =>
      fetch(apiUrlGetAllShow).then((res) => res.json())
    );

    const apiUrlGetAllCinema = `${APIUrl.apiUrl}/cinema/getAll`;
  
    const {isLoading2, error2, data2} : any = useQuery("Cinemas", () =>
      fetch(apiUrlGetAllCinema).then((res) => res.json())
    );

    const apiUrlGetAllCinemaRoom = `${APIUrl.apiUrl}/cinemaRoom/getAll`;
  
    const {isLoading3, error3, data3} : any = useQuery("Cinema Rooms", () =>
      fetch(apiUrlGetAllCinemaRoom).then((res) => res.json())
    );
  
    const updateShow = () => {

        // setIsLoading(true);
        const apiUrlAddMovie = `${APIUrl.apiUrl}/show/${id}`;
        // eslint-disable-next-line
        const requestOptions = {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                date,
                start,
                end,
                movieID,
                cinemaID,
                cinemaRoomID,
            }),
        };
        fetch(apiUrlAddMovie, requestOptions).then((response) => {
            if (!response.ok) {
                // setError(true);
                // setIsLoading(false);
                return;
            }
            return response.json().then((data) => {
                // setIsLoading(false);
            });
        });
        cancel();
    };
  
    const theme = createTheme(palette);
  
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
          {error || error2 || error3 ? (
            <ErrorPage />
          ) : isLoading || isLoading2 || isLoading3 ? (
            <LoadingAnimation />
          ) : (
            <DialogContent dividers={true}>
                <DialogContentText id="scroll-dialog-description">
                    <Container component="main" maxWidth="xs" sx={{
                        bgcolor: "background.paper",
                        pt: 8,
                        pb: 6,
                        position: "relative",
                    }}>
                        <CssBaseline/>
                        <Box
                            sx={{
                                marginTop: 8,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <Typography component="h1" variant="h5">
                                Update a movie
                            </Typography>
                            <form noValidate>
                                <Box component="form" noValidate sx={{mt: 3}}>
                                    <Grid container spacing={2}>
                                        <Typography component="h1" variant="h5">
                                            Show list
                                        </Typography>
                                        <List>
                                            {data?.map( 
                                                (show: any) => 
                                                    <ListItem>
                                                        <ListItemText
                                                            primary={show.title}
                                                            secondary={show.id}
                                                        />
                                                    </ListItem>
                                                )    
                                            }
                                        </List>
                                        <Typography component="h1" variant="h5">
                                            Cinema list
                                        </Typography>
                                        <List>
                                            {data2?.map( 
                                                (cinema: any) => 
                                                    <ListItem>
                                                        <ListItemText
                                                            primary={cinema.title}
                                                            secondary={cinema.id}
                                                        />
                                                    </ListItem>
                                                )    
                                            }
                                        </List>
                                        <Typography component="h1" variant="h5">
                                            CinemaRoom list
                                        </Typography>
                                        <List>
                                            {data3?.map( 
                                                (cr: any) => 
                                                    <ListItem>
                                                        <ListItemText
                                                            primary={cr.title}
                                                            secondary={cr.id}
                                                        />
                                                    </ListItem>
                                                )    
                                            }
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
                                                onChange={(e: any) => setCinemaRoomID(e.target.value)}
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
            <Button onClick={updateShow}>Speichern</Button>
          </DialogActions>
        </Dialog>
      </ThemeProvider>
    );
}
  
export function DeleteShowDialog(props: any) {
    const [id, setId ] = useState("");
    const {
      open,
      cancel
    } = props;

    const apiUrlGetAllShows = `${APIUrl.apiUrl}/show/getAll`;
  
    const {isLoading, error, data} : any = useQuery("Movies", () =>
      fetch(apiUrlGetAllShows).then((res) => res.json())
    );
  
    const deleteShow = () => {

        // setIsLoading(true);
        const apiUrlDeleteShow = `${APIUrl.apiUrl}/show/${id}`;
        // eslint-disable-next-line
        const requestOptions = {
            method: "DELETE"
        };
        fetch(apiUrlDeleteShow, requestOptions).then((response) => {
            if (!response.ok) {
                // setError(true);
                // setIsLoading(false);
                return;
            }
            return response.json().then((data) => {
                // setIsLoading(false);
            });
        });
        cancel();
    };
  
    const theme = createTheme(palette);
  
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
          {error ? (
            <ErrorPage />
          ) : isLoading ? (
            <LoadingAnimation />
          ) : (
            <DialogContent dividers={true}>
                <DialogContentText id="scroll-dialog-description">
                    <Container component="main" maxWidth="xs" sx={{
                        bgcolor: "background.paper",
                        pt: 8,
                        pb: 6,
                        position: "relative",
                    }}>
                        <CssBaseline/>
                        <Box
                            sx={{
                                marginTop: 8,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <Typography component="h1" variant="h5">
                                Delete a show
                            </Typography>
                            <form noValidate>
                                <Box component="form" noValidate sx={{mt: 3}}>
                                    <Grid container spacing={2}>
                                        <List>
                                            {data?.map( 
                                                (movie: any) => 
                                                    <ListItem>
                                                        <ListItemText
                                                            primary={movie.title}
                                                            secondary={movie.id}
                                                        />
                                                    </ListItem>
                                                )    
                                            }
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
  