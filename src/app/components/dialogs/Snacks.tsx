import {
    Grid,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
    Container,
    ThemeProvider
} from "@mui/material";
import ErrorPage from "../../pages/ErrorPage";
import LoadingAnimation from "../layouts/LoadingAnimation";
import APIUrl from "../../config/APIUrl";
import { createTheme } from "@mui/material/styles";
import palette from "../../config/Colours";
import { useQuery } from "react-query";

const theme = createTheme(palette);
  
export function Snacks(props: any) {
    const { open, close, setSnacks, snacks } = props;

    const apiUrlGetAllSnacks = `${APIUrl.apiUrl}/snack/getAll`;
      
    const {isLoading, error, data} : any = useQuery("Snacks", () =>
        fetch(apiUrlGetAllSnacks).then((res) => res.json())
    );

    function removeSnack(s: any) {
        let arr = snacks;
        const index = arr.indexOf(s)
        arr.splice(index, 1);
        setSnacks(arr);
    }

    if (isLoading) {
      return <LoadingAnimation />;
    }
    
    if (error) {
      return <ErrorPage />;
    }
    return (
        <ThemeProvider theme={theme}>
            <Dialog
            open={open}
            onClose={close}
            scroll="paper"
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
            fullWidth={true}
            maxWidth="sm"
            >
                <DialogTitle id="scroll-dialog-title">Verpflegung</DialogTitle>
                <DialogContent dividers={true}>
                    <DialogContentText id="scroll-dialog-description">
                        <Container component="main" sx={{
                            bgcolor: "background.paper",
                            position: "relative",
                        }}>
                            <Grid container xs={12}>
                                <Grid item xs={8}>
                                    {data.map(
                                        (s: any) => (
                                        <Grid item xs={12} padding={1}>
                                                <Grid container xs={12}>
                                                    <Grid item xs={12}>
                                                        <p style={{textAlign: 'center'}}><b>{s.product}</b> ({s.size}) für {s.price}€</p>
                                                    </Grid>
                                                    <Grid item xs={6}>
                                                        <Button fullWidth variant="contained" onClick={() => {setSnacks([...snacks, s])}}>Hinzufügen</Button>
                                                    </Grid>
                                                    <Grid item xs={6}>
                                                        <Button fullWidth variant="contained" onClick={() => {removeSnack(s)}}>Entfernen</Button>
                                                    </Grid>
                                                </Grid>
                                        </Grid> 
                                        )
                                    )}
                                </Grid>
                                <Grid item xs={4}>
                                    <p style={{textAlign: 'center'}}><b>Warenkorb</b></p>
                                    {snacks.map(
                                        (s: any) => (
                                            <p style={{textAlign: 'center'}}>{s.product} ({s.size})</p> 
                                        )
                                    )}
                                </Grid>
                            </Grid>
                        </Container>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={close}>Ok</Button>
                </DialogActions>
            </Dialog>
        </ThemeProvider>
    );
  }