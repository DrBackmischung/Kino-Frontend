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

export function AddMovieDialog(props: any) {
  const [title, setTitle] = useState("");
  const [originalTitle, setOGTitle] = useState("");
  const [language, setLanguage] = useState("");
  const [duration, setDuration] = useState("");
  const [director, setDirector] = useState("");
  const [actors, setActors] = useState("");
  const [description, setDescription] = useState("");
  const [originalDescription, setOGDescription] = useState("");
  const [pictureLink, setPictureLink] = useState("");
  const [trailerLink, setTrailerLink] = useState("");
  const [genre, setGenre] = useState("");
  const [FSK, setFSK] = useState(0);
  const { open, cancel } = props;
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const addMovie = () => {
    setIsLoading(true);
    const apiUrlAddMovie = `${APIUrl.apiUrl}/movie/add`;
    // eslint-disable-next-line
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        originalTitle,
        language,
        duration,
        director,
        actors,
        description,
        originalDescription,
        pictureLink,
        trailerLink,
        genre,
        fsk: FSK,
      }),
    };
    fetch(apiUrlAddMovie, requestOptions).then((response) => {
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
        <DialogTitle id="scroll-dialog-title">Movie</DialogTitle>
        {error ? (
          <ErrorPage />
        ) : isLoading ? (
          <LoadingAnimation />
        ) : (
          <DialogContent dividers={true}>
            <DialogContentText id="scroll-dialog-description">
              <Container
                component="main"
                maxWidth="xs"
                sx={{
                  bgcolor: "background.paper",
                  pt: 8,
                  pb: 6,
                  position: "relative",
                }}
              >
                <CssBaseline />
                <Box
                  sx={{
                    marginTop: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Typography component="h1" variant="h5">
                    Add a movie
                  </Typography>
                  <form noValidate>
                    <Box component="form" noValidate sx={{ mt: 3 }}>
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <TextField
                            name="title"
                            required
                            fullWidth
                            id="title"
                            label="Film Title"
                            autoFocus
                            onChange={(e: any) => setTitle(e.target.value)}
                            value={title}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            name="OGTitle"
                            required
                            fullWidth
                            id="OGTitle"
                            label="Original Title"
                            autoFocus
                            onChange={(e: any) => setOGTitle(e.target.value)}
                            value={originalTitle}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            required
                            fullWidth
                            id="language"
                            label="Language"
                            name="language"
                            onChange={(e: any) => setLanguage(e.target.value)}
                            value={language}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            required
                            fullWidth
                            id="duration"
                            label="Duration"
                            name="duration"
                            onChange={(e: any) => setDuration(e.target.value)}
                            value={duration}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            required
                            fullWidth
                            name="director"
                            label="Director"
                            id="director"
                            autoComplete="new-password"
                            onChange={(e: any) => setDirector(e.target.value)}
                            value={director}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            required
                            fullWidth
                            name="actors"
                            label="Actors"
                            id="actors"
                            value={actors}
                            onChange={(e: any) => setActors(e.target.value)}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            required
                            fullWidth
                            multiline
                            minRows={5}
                            name="description"
                            label="Description"
                            id="description"
                            value={description}
                            onChange={(e: any) =>
                              setDescription(e.target.value)
                            }
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            required
                            fullWidth
                            multiline
                            minRows={5}
                            name="OGdescription"
                            label="Description"
                            id="OGdescription"
                            value={originalDescription}
                            onChange={(e: any) =>
                              setOGDescription(e.target.value)
                            }
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            required
                            fullWidth
                            name="pictureLink"
                            label="Link to Thumbnail Picture"
                            id="pictureLink"
                            value={pictureLink}
                            onChange={(e: any) =>
                              setPictureLink(e.target.value)
                            }
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            required
                            fullWidth
                            name="trailerLink"
                            label="Link to Youtube Trailer"
                            id="trailerLink"
                            value={trailerLink}
                            onChange={(e: any) =>
                              setTrailerLink(e.target.value)
                            }
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            required
                            fullWidth
                            name="genre"
                            label="Genre"
                            id="genre"
                            value={genre}
                            onChange={(e: any) => setGenre(e.target.value)}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            required
                            fullWidth
                            type="number"
                            name="FSK"
                            label="FSK"
                            id="FSK"
                            value={FSK}
                            onChange={(e: any) => setFSK(e.target.value)}
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
          <Button onClick={addMovie}>Speichern</Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
}

export function UpdateMovieDialog(props: any) {
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [originalTitle, setOGTitle] = useState("");
  const [language, setLanguage] = useState("");
  const [duration, setDuration] = useState("");
  const [director, setDirector] = useState("");
  const [actors, setActors] = useState("");
  const [description, setDescription] = useState("");
  const [originalDescription, setOGDescription] = useState("");
  const [pictureLink, setPictureLink] = useState("");
  const [trailerLink, setTrailerLink] = useState("");
  const [genre, setGenre] = useState("");
  const [FSK, setFSK] = useState("");
  const { open, cancel } = props;
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const apiUrlGetAllMovies = `${APIUrl.apiUrl}/movie/getAll`;

  const {
    isLoading: isLoadingMovie,
    isError: errorMovie,
    data: dataMovie,
  }: any = useQuery("Movies", () =>
    fetch(apiUrlGetAllMovies).then((res) => res.json())
  );

  const updateMovie = () => {
    setIsLoading(true);
    const apiUrlAddMovie = `${APIUrl.apiUrl}/movie/update/${id}`;
    // eslint-disable-next-line
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        originalTitle,
        language,
        duration,
        director,
        actors,
        description,
        originalDescription,
        pictureLink,
        trailerLink,
        genre,
        fsk: FSK,
      }),
    };
    fetch(apiUrlAddMovie, requestOptions).then((response) => {
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

  if (errorMovie || dataMovie?.error) {
    return <ErrorPage errorCode={dataMovie?.status} />;
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
        <DialogTitle id="scroll-dialog-title">Movie</DialogTitle>
        {error ? (
          <ErrorPage />
        ) : isLoading || isLoadingMovie ? (
          <LoadingAnimation />
        ) : (
          <DialogContent dividers={true}>
            <DialogContentText id="scroll-dialog-description">
              <Container
                component="main"
                maxWidth="xs"
                sx={{
                  bgcolor: "background.paper",
                  pt: 8,
                  pb: 6,
                  position: "relative",
                }}
              >
                <CssBaseline />
                <Box
                  sx={{
                    marginTop: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Typography component="h1" variant="h5">
                    Update a movie
                  </Typography>
                  <form noValidate>
                    <Box component="form" noValidate sx={{ mt: 3 }}>
                      <Grid container spacing={2}>
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
                            name="title"
                            required
                            fullWidth
                            id="title"
                            label="Film Title"
                            autoFocus
                            onChange={(e: any) => setTitle(e.target.value)}
                            value={title}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            name="OGTitle"
                            required
                            fullWidth
                            id="OGTitle"
                            label="Original Title"
                            autoFocus
                            onChange={(e: any) => setOGTitle(e.target.value)}
                            value={originalTitle}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            required
                            fullWidth
                            id="language"
                            label="Language"
                            name="language"
                            onChange={(e: any) => setLanguage(e.target.value)}
                            value={language}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            required
                            fullWidth
                            id="duration"
                            label="Duration"
                            name="duration"
                            onChange={(e: any) => setDuration(e.target.value)}
                            value={duration}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            required
                            fullWidth
                            name="director"
                            label="Director"
                            id="director"
                            autoComplete="new-password"
                            onChange={(e: any) => setDirector(e.target.value)}
                            value={director}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            required
                            fullWidth
                            name="actors"
                            label="Actors"
                            id="actors"
                            value={actors}
                            onChange={(e: any) => setActors(e.target.value)}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            required
                            fullWidth
                            multiline
                            minRows={5}
                            name="description"
                            label="Description"
                            id="description"
                            value={description}
                            onChange={(e: any) =>
                              setDescription(e.target.value)
                            }
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            required
                            fullWidth
                            multiline
                            minRows={5}
                            name="OGdescription"
                            label="Description"
                            id="OGdescription"
                            value={originalDescription}
                            onChange={(e: any) =>
                              setOGDescription(e.target.value)
                            }
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            required
                            fullWidth
                            name="pictureLink"
                            label="Link to Thumbnail Picture"
                            id="pictureLink"
                            value={pictureLink}
                            onChange={(e: any) =>
                              setPictureLink(e.target.value)
                            }
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            required
                            fullWidth
                            name="trailerLink"
                            label="Link to Youtube Trailer"
                            id="trailerLink"
                            value={trailerLink}
                            onChange={(e: any) =>
                              setTrailerLink(e.target.value)
                            }
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            required
                            fullWidth
                            name="genre"
                            label="Genre"
                            id="genre"
                            value={genre}
                            onChange={(e: any) => setGenre(e.target.value)}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            required
                            fullWidth
                            name="FSK"
                            label="FSK"
                            id="FSK"
                            value={FSK}
                            onChange={(e: any) => setFSK(e.target.value)}
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
          <Button onClick={updateMovie}>Speichern</Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
}

export function DeleteMovieDialog(props: any) {
  const [id, setId] = useState("");
  const { open, cancel } = props;
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const apiUrlGetAllMovies = `${APIUrl.apiUrl}/movie/getAll`;

  const {
    isLoading: isLoadingMovie,
    isError: errorMovie,
    data: dataMovie,
  }: any = useQuery("Movies", () =>
    fetch(apiUrlGetAllMovies).then((res) => res.json())
  );

  const deleteMovie = () => {
    setIsLoading(true);
    const apiUrlAddMovie = `${APIUrl.apiUrl}/movie/${id}`;
    // eslint-disable-next-line
    const requestOptions = {
      method: "DELETE",
    };
    fetch(apiUrlAddMovie, requestOptions).then((response) => {
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

  if (errorMovie || dataMovie?.error) {
    return <ErrorPage errorCode={dataMovie?.status} />;
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
        <DialogTitle id="scroll-dialog-title">Movie</DialogTitle>
        {error ? (
          <ErrorPage />
        ) : isLoading || isLoadingMovie ? (
          <LoadingAnimation />
        ) : (
          <DialogContent dividers={true}>
            <DialogContentText id="scroll-dialog-description">
              <Container
                component="main"
                maxWidth="xs"
                sx={{
                  bgcolor: "background.paper",
                  pt: 8,
                  pb: 6,
                  position: "relative",
                }}
              >
                <CssBaseline />
                <Box
                  sx={{
                    marginTop: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Typography component="h1" variant="h5">
                    Delete a movie
                  </Typography>
                  <form noValidate>
                    <Box component="form" noValidate sx={{ mt: 3 }}>
                      <Grid container spacing={2}>
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
          <Button onClick={deleteMovie}>Löschen</Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
}
