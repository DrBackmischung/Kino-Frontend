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
    FormControlLabel,
    FormGroup,
    Checkbox,
} from "@mui/material";
import React, { useState } from "react";
import ErrorPage from "../../pages/ErrorPage";
import LoadingAnimation from "../layouts/LoadingAnimation";
import APIUrl from "../../config/APIUrl";
import { createTheme } from "@mui/material/styles";
import palette from "../../config/Colours";
import { useQuery } from "react-query";
import { SeatPlanPainter } from "./SeatPlanBluePrint";
import "./SeatPlanBluePrint.css";

export function AddCinemaRoomDialog(props: any) {
    const [story, setStory ] = useState(0);
    const [wheelchairAccessible, setWheelchairAccessible ] = useState(true);
    const [roomName, setRoomName ] = useState("");
    const [cinemaID, setCinemaID ] = useState("");
    const [cinemaRoomID, setCinemaRoomID ] = useState("");
    const {
      open,
      cancel,
    } = props;
    const [openDialog, setOpenDialog] = useState(false);

    const apiUrlGetAllCinemas = `${APIUrl.apiUrl}/cinema/getAll`;
  
    const {isLoading, error} : any = useQuery("Movies", () =>
      fetch(apiUrlGetAllCinemas).then((res) => res.json())
    );

    function handleChangeWCA() {
        if(wheelchairAccessible)
            setWheelchairAccessible(false);
        else
            setWheelchairAccessible(true);
    }

    function openSeatPlanDialog() {
        setOpenDialog(true);
    }

    function closeSeatPlanDialog() {
        setOpenDialog(false);
    }
  
    const addRoom = () => {
        //setIsLoading(true);
        const apiURLRoom = `${APIUrl.apiUrl}/cinemaRoom/add`;
        const requestOptions = {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                story,
                wheelchairAccessible,
                roomName,
                cinemaID,
            }),
        };
        fetch(apiURLRoom, requestOptions).then((response) => {
            if (!response.ok) {
                //setError(true);
                //setIsLoading(false);
                return;
            }
            return response.json().then((data) => {
                setCinemaRoomID(data.id);
                //setIsLoading(false);
            });
        });

        openSeatPlanDialog();

    }
  
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
          <DialogTitle id="scroll-dialog-title">Cinema Room</DialogTitle>
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
                                Add a cinema room
                            </Typography>
                            <form noValidate>
                                <Box component="form" noValidate sx={{mt: 3}}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <TextField
                                                name="story"
                                                required
                                                type="number"
                                                fullWidth
                                                id="story"
                                                label="Story"
                                                autoFocus
                                                onChange={(e: any) => setStory(e.target.value)}
                                                value={story}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <FormGroup>
                                                <FormControlLabel control={<Checkbox checked={wheelchairAccessible} onChange={handleChangeWCA} />} label="Wheelchair accessible" />
                                            </FormGroup>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                name="roomName"
                                                required
                                                fullWidth
                                                id="roomName"
                                                label="Room Name"
                                                autoFocus
                                                onChange={(e: any) => setRoomName(e.target.value)}
                                                value={roomName}
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
                                        {openDialog ? <SeatPlanPainter
                                            open={openSeatPlanDialog}
                                            cancel={closeSeatPlanDialog}
                                            cinemaRoomID={cinemaRoomID}
                                            closeRoomDialog={closeSeatPlanDialog}
                                        /> : null}
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
            <Button onClick={addRoom}>Speichern</Button>
          </DialogActions>
        </Dialog>
      </ThemeProvider>
    );
}