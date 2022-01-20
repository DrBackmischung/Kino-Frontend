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
import PersonIcon from '@mui/icons-material/Person';
import "./SeatPlanBluePrint.css";
import { grey, blue, orange } from '@mui/material/colors';

export function SeatPlanPainter(props: any) {
    const [numberOfSeats, setNumberOfSeats ] = useState(0);
    const [rowToAdd, setRowToAdd ] = useState(1);
    const [seatsToRender, setSeatsToRender] = useState<any[]>([]);
    const [openSeatTypeDialog, setOpenSeatTypeDialog] = useState(false);
    const [openRowTypeDialog, setOpenRowTypeDialog] = useState(false);
    const [row, setRow] = useState(0);
    const [nr, setNr] = useState(0);
    const [rowType, setRowType] = useState(0);
    const {
      open,
      cancel,
      cinemaRoomID,
      closeRoomDialog,
    } = props;
    const [error, setError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    function handleOpenSeatTypeDialog(row: any, nr: any) {
        setOpenSeatTypeDialog(true);
        setRow(row);
        setNr(nr);
    }

    function handleCloseSeatTypeDialog() {
        setOpenSeatTypeDialog(false);
    }

    function handleOpenRowTypeDialog() {
        setRowType(0);
        setOpenRowTypeDialog(true);
    }

    function handleCloseRowTypeDialog() {
        setOpenRowTypeDialog(false);
    }
  
    const save = () => {
        setIsLoading(true);
        const apiURLSeats = `${APIUrl.apiUrl}/seatsBlueprint/massAdd`;
        // eslint-disable-next-line
        const seatData = convertRenderToPlainList(seatsToRender);
        const requestOptions = {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(seatData),
        };
        fetch(apiURLSeats, requestOptions).then((response) => {
            if (!response.ok) {
                setError(true);
                setIsLoading(false);
                return;
            }
            return response.json().then((data) => {
                setIsLoading(false);
            });
        });
        closeRoomDialog();
        cancel();

    }
  
    const addRow = () => {
        let list = convertRenderToPlainList(seatsToRender);
        if(list === undefined)
            list = [];
        for (var i = 1; i <= numberOfSeats; i++) {
            list.push({
                line: rowToAdd,
                place: i,
                type: rowType,
                cinemaRoomID: cinemaRoomID
            });
        }
        setSeatsToRender(preparedSeatsForRender(list, rowToAdd));
        setRowToAdd(rowToAdd + 1);
    }

    const convertRenderToPlainList: any = (data: any) => {
        let list: any = [];
        data?.map((row: any) => {
            row?.map((seat: any) => {
                list.push({
                    line: seat.line,
                    place: seat.place,
                    type: seat.type,
                    cinemaRoomID: seat.cinemaRoomID
                });
            })
        })
        return list;
    }

    const preparedSeatsForRender: any = (seats: any, numberOfRows: any) => {
        let list : any = [];
        for(let i : number = 1; i <= numberOfRows; i++) {
            let row : any = [];
            seats?.map((seat: any) => {
                if(seat.line === i) {
                    row.push({
                        line: seat.line,
                        place: seat.place,
                        type: seat.type,
                        cinemaRoomID: seat.cinemaRoomID
                    });
                }
            });
            list.push(row);
        }
        return list;
    };

    const convertType: any = (t: number) => {
        switch (t) {
            case 0:
                return grey;
            case 1:
                return blue;
            case 2:
                return orange;
          }
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
          maxWidth="xl"
        >
          <DialogTitle id="scroll-dialog-title">Seat Plan</DialogTitle>
          {error ? (
            <ErrorPage />
          ) : isLoading ? (
            <LoadingAnimation />
          ) : (
            <DialogContent dividers={true}>
                <DialogContentText id="scroll-dialog-description">
                    <Container component="main" maxWidth="xl" sx={{
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
                                Create a seat layout
                            </Typography>
                            <form noValidate>
                                <Box component="form" noValidate sx={{mt: 3}}>
                                    <Grid container spacing={1}>
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
                                            <div key={index} className="rowContainer" >
                                            {row?.map((seat: any) => (
                                                <Button
                                                    variant="outlined"
                                                    onClick={() => handleOpenSeatTypeDialog(seat.line, seat.place)}
                                                    startIcon={<PersonIcon sx={{ color: convertType(seat.type)[500] }} />}
                                                ></Button>
                                            ))}
                                            </div>
                                        ))}
                                        {openSeatTypeDialog ? <SeatTypeDialog
                                            open={handleOpenSeatTypeDialog}
                                            cancel={handleCloseSeatTypeDialog}
                                            seatData={seatsToRender}
                                            setSeatData={setSeatsToRender}
                                            row={row}
                                            nr={nr}
                                            nrOfRows={rowToAdd-1}
                                        /> : null}
                                        {openRowTypeDialog ? <RowTypeDialog
                                            open={handleOpenRowTypeDialog}
                                            cancel={handleCloseRowTypeDialog}
                                            changeRowType={setRowType}
                                            addRow={addRow}
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
            <Button onClick={handleOpenRowTypeDialog}>Reihe hinzufügen</Button>
            <Button onClick={save}>Speichern</Button>
          </DialogActions>
        </Dialog>
      </ThemeProvider>
    );
}

function SeatTypeDialog(props: any) {
    
    const [type, setType ] = useState(0);
    const {
      open,
      cancel,
      seatData,
      setSeatData,
      row,
      nr,
      nrOfRows,
    } = props;

    function saveType() {
        let data : any = convertRenderToPlainList(seatData);
        let list : any = [];
        if(data === undefined)
            data = [];
        for (const e of data) {
            list.push({
                line: e.line,
                place: e.place,
                type: ((row == e.line) && (nr == e.place) ? type : e.type),
                cinemaRoomID: e.cinemaRoomID
            });
        }
        setSeatData(preparedSeatsForRender(list, nrOfRows));
        cancel();
    }
  
    const theme = createTheme(palette);

    const preparedSeatsForRender: any = (seats: any, numberOfRows: any) => {
        let list : any = [];
        for(let i : number = 1; i <= numberOfRows; i++) {
            let row : any = [];
            seats?.map((seat: any) => {
                if(seat.line === i) {
                    row.push({
                        line: seat.line,
                        place: seat.place,
                        type: seat.type,
                        cinemaRoomID: seat.cinemaRoomID
                    });
                }
            });
            list.push(row);
        }
        return list;
    };

    const convertRenderToPlainList: any = (data: any) => {
        let list: any = [];
        data?.map((row: any) => {
            row?.map((seat: any) => {
                list.push({
                    line: seat.line,
                    place: seat.place,
                    type: seat.type,
                    cinemaRoomID: seat.cinemaRoomID
                });
            })
        })
        return list;
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
          <DialogTitle id="scroll-dialog-title">Seat Type</DialogTitle>
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
                                Choose Seat Type
                            </Typography>
                            <form noValidate>
                                <Box component="form" noValidate sx={{mt: 3}}>
                                    <RadioGroup
                                        aria-label="seat"
                                        defaultValue="parkett"
                                        name="radio-buttons-seat"
                                    >
                                        <FormControlLabel value="parkett" control={<Radio onChange={() => setType(0)}/>} label="Parkett" />
                                        <FormControlLabel value="loge" control={<Radio onChange={() => setType(1)}/>} label="Loge" />
                                        <FormControlLabel value="premium" control={<Radio onChange={() => setType(2)}/>} label="Premium" />
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

function RowTypeDialog(props: any) {
    const {
      open,
      cancel,
      changeRowType,
      addRow,
    } = props;

    function saveType() {
        addRow();
        cancel();
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
                                Choose Row Type
                            </Typography>
                            <form noValidate>
                                <Box component="form" noValidate sx={{mt: 3}}>
                                    <RadioGroup
                                        aria-label="seat"
                                        defaultValue="parkett"
                                        name="radio-buttons-seat"
                                    >
                                        <FormControlLabel value="parkett" control={<Radio onChange={() => changeRowType(0)}/>} label="Parkett" />
                                        <FormControlLabel value="loge" control={<Radio onChange={() => changeRowType(1)}/>} label="Loge" />
                                        <FormControlLabel value="premium" control={<Radio onChange={() => changeRowType(2)}/>} label="Premium" />
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