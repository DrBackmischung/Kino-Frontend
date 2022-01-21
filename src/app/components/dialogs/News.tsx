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
  
export function AddNewsDialog(props: any) {
    const [date, setDate ] = useState("");
    const [time, setTime ] = useState("");
    const [header, setHeader ] = useState("");
    const [content, setContent ] = useState("");
    const [pictureLink, setPictureLink ] = useState("");
    const {
        userID,
        open,
        cancel
    } = props;
    const [error, setError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
  
    const addNews = () => {
        setIsLoading(true);
        const apiUrlAddNews = `${APIUrl.apiUrl}/news/add`;
        // eslint-disable-next-line
        const requestOptions = {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                date,
                time: time + ":00",
                header,
                content,
                pictureLink,
                userID,
            }),
        };
        fetch(apiUrlAddNews, requestOptions).then((response) => {
            console.log(response);
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
          <DialogTitle id="scroll-dialog-title">News</DialogTitle>
          {error ? (
            <ErrorPage />
          ) : isLoading ? (
            <LoadingAnimation />
          ) : (
            <DialogContent dividers={true}>
                <DialogContentText id="scroll-dialog-description">
                    <Container component="main" maxWidth="xs" sx={{
                        bgcolor: "background.paper",
                        pt: 4,
                        pb: 4,
                        position: "relative",
                    }}>
                        <CssBaseline/>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <Typography component="h1" variant="h5">
                                Add news
                            </Typography>
                            <form noValidate>
                                <Box component="form" noValidate sx={{mt: 3}}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <TextField
                                                name="header"
                                                required
                                                fullWidth
                                                id="header"
                                                label="Header"
                                                autoFocus
                                                onChange={(e: any) => setHeader(e.target.value)}
                                                value={header}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                name="content"
                                                required
                                                fullWidth
                                                id="content"
                                                label="Content"
                                                autoFocus
                                                onChange={(e: any) => setContent(e.target.value)}
                                                value={content}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                required
                                                fullWidth
                                                type="date"
                                                id="date"
                                                name="date"
                                                onChange={(e: any) => setDate(e.target.value)}
                                                value={date}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                required
                                                fullWidth
                                                type="time"
                                                id="time"
                                                name="time"
                                                onChange={(e: any) => setTime(e.target.value)}
                                                value={time}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                name="pictureLink"
                                                required
                                                fullWidth
                                                id="pictureLink"
                                                label="Picture"
                                                autoFocus
                                                onChange={(e: any) => setPictureLink(e.target.value)}
                                                value={pictureLink}
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
            <Button onClick={addNews}>Speichern</Button>
          </DialogActions>
        </Dialog>
      </ThemeProvider>
    );
}
  
export function DeleteNewsDialog(props: any) {
    const [id, setId ] = useState("");
    const {
      open,
      cancel
    } = props;

    const apiUrlGetAllMovies = `${APIUrl.apiUrl}/news/getAll`;
  
    const {isLoading, error, data} : any = useQuery("Movies", () =>
      fetch(apiUrlGetAllMovies).then((res) => res.json())
    );
  
    const deleteNews = () => {

        // setIsLoading(true);
        const apiUrlAddMovie = `${APIUrl.apiUrl}/news/${id}`;
        // eslint-disable-next-line
        const requestOptions = {
            method: "DELETE"
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
          <DialogTitle id="scroll-dialog-title">News</DialogTitle>
          {error ? (
            <ErrorPage />
          ) : isLoading ? (
            <LoadingAnimation />
          ) : (
            <DialogContent dividers={true}>
                <DialogContentText id="scroll-dialog-description">
                    <Container component="main" maxWidth="xs" sx={{
                        bgcolor: "background.paper",
                        pt: 4,
                        pb: 4,
                        position: "relative",
                    }}>
                        <CssBaseline/>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <Typography component="h1" variant="h5">
                                Delete news
                            </Typography>
                            <form noValidate>
                                <Box component="form" noValidate sx={{mt: 3}}>
                                    <Grid container spacing={2}>
                                        <List>
                                            {data?.map( 
                                                (news: any) => 
                                                    <ListItem>
                                                        <ListItemText
                                                            primary={news.header}
                                                            secondary={news.id}
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
            <Button onClick={deleteNews}>Löschen</Button>
          </DialogActions>
        </Dialog>
      </ThemeProvider>
    );
}
  