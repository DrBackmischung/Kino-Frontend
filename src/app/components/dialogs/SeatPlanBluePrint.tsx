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
    RadioGroup,
    FormControlLabel,
    Radio,
} from "@mui/material";
import React, { useState } from "react";
import ErrorPage from "../../pages/ErrorPage";
import LoadingAnimation from "../layouts/LoadingAnimation";
import APIUrl from "../../config/APIUrl";
import { createTheme } from "@mui/material/styles";
import palette from "../../config/Colours";
import { useQuery } from "react-query";
import "./SeatPlanBluePrint.css";

export function SeatPlanPainter(props: any) {
    const [numberOfSeats, setNumberOfSeats ] = useState(0);
    const [rowToAdd, setRowToAdd ] = useState(1);
    const [seatsToRender, setSeatsToRender] = useState<any[]>([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [row, setRow] = useState(0);
    const [nr, setNr] = useState(0);
    const {
      open,
      cancel,
      cinemaRoomID,
    } = props;
    const [error, setError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    function openSeatTypeDialog(row: any, nr: any) {
        setOpenDialog(true);
        setRow(row);
        setNr(nr);
    }

    function closeSeatTypeDialog() {
        setOpenDialog(false);
    }
  
    const save = (seats: any) => {
        setIsLoading(true);
        const apiURLSeats = `${APIUrl.apiUrl}/seatsBlueprint/massAdd`;
        // eslint-disable-next-line
        seats?.map((seat: any) => {
            const requestOptions = {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    line: seat.id,
                    place: seat.place,
                    type: seat.type,
                    cinemaRoomID: cinemaRoomID,
                }),
            };
            fetch(apiURLSeats, requestOptions).then((response) => {
                if (!response.ok) {
                    setError(true);
                    setIsLoading(false);
                    return;
                }
                return response.json().then((data) => {
                    console.log(data, data.toString());
                    setIsLoading(false);
                });
            });
        });

    }
  
    const addRow = (seats: any) => {
        for (var i = 1; i <= numberOfSeats; i++) {
            seatsToRender.push({
                line: rowToAdd,
                place: i,
                type: "PARKETT",
                cinemaRoomID: cinemaRoomID
            });
        }
        setRowToAdd(rowToAdd + 1);
        setSeatsToRender(seatsToRender);
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
          <DialogTitle id="scroll-dialog-title">Movie</DialogTitle>
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
                                Add a movie
                            </Typography>
                            <form noValidate>
                                <Box component="form" noValidate sx={{mt: 3}}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <TextField
                                                name="numberOfSeats"
                                                required
                                                type="number"
                                                fullWidth
                                                id="numberOfSeats"
                                                label="Number of Seats"
                                                autoFocus
                                                onChange={(e: any) => setNumberOfSeats(e.target.value)}
                                                value={numberOfSeats}
                                            />
                                        </Grid>
                                        <Box className="cinemaBox">
                                        {seatsToRender?.map((row: any, index) => (
                                            <div key={index} className="rowContainer">
                                            {row?.map((seat: any) => (
                                                <Button
                                                    variant="outlined"
                                                    onClick={() => openSeatTypeDialog(seat.reihe, seat.place)}
                                                >  </Button>
                                            ))}
                                            </div>
                                        ))}
                                        {openDialog ? <SeatTypeDialog
                                            open={openSeatTypeDialog}
                                            cancel={closeSeatTypeDialog}
                                            seatData={seatsToRender}
                                            setSeatData={setSeatsToRender}
                                            row={row}
                                            nr={nr}
                                        /> : null}
                                        </Box>
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
            <Button onClick={addRow}>Reihe hinzufügen</Button>
            <Button onClick={save}>Speichern</Button>
          </DialogActions>
        </Dialog>
      </ThemeProvider>
    );
}

function SeatTypeDialog(props: any) {
    
    const [type, setType ] = useState("");
    const {
      open,
      cancel,
      seatData,
      setSeatData,
      row,
      nr,
    } = props;

    function saveType() {
        let data : any[] = [];
        for (const e of seatData) {
            data.push({
                line: e.line,
                place: e.place,
                type: ((row == e.line) && (nr == e.place) ? type : e.type),
                cinemaRoomID: e.cinemaRoomID
            });
        }
        setSeatData(data);
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
          <DialogTitle id="scroll-dialog-title">Seat Type</DialogTitle>
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
                                Choose Seat Type
                            </Typography>
                            <form noValidate>
                                <Box component="form" noValidate sx={{mt: 3}}>
                                    <RadioGroup
                                        aria-label="seat"
                                        defaultValue="parkett"
                                        name="radio-buttons-seat"
                                    >
                                        <FormControlLabel value="parkett" control={<Radio onChange={() => setType("Parkett")}/>} label="Parkett" />
                                        <FormControlLabel value="loge" control={<Radio onChange={() => setType("Loge")}/>} label="Loge" />
                                        <FormControlLabel value="premium" control={<Radio onChange={() => setType("Premium")}/>} label="Premium" />
                                        <FormControlLabel value="wheelchair" control={<Radio onChange={() => setType("Wheelchair")}/>} label="Wheelchair" />
                                    </RadioGroup>
                                </Box>
                            </form>
                        </Box>
                    </Container>
                </DialogContentText>
            </DialogContent>
          <DialogActions>
            <Button onClick={cancel}>Abbruch</Button>
            <Button onClick={saveType}>Speichern</Button>
          </DialogActions>
        </Dialog>
      </ThemeProvider>
    )
}