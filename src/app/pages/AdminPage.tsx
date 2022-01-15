import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Container from "@mui/material/Container";
import {
    Button,
} from "@mui/material";
import { useState } from "react";
import ManageAdminMovie from "../components/ManageAdminMovie";
import palette from "../config/Colours";

const theme = createTheme(palette);

function AdminPage() {
  // eslint-disable-next-line
  const [openAddMovie, setOpenAddMovie] = useState(false);

  const handleAddMovieClickOpen = () => {
    setOpenAddMovie(true);
  };
  const handleAddMovieClose = () => {
    setOpenAddMovie(false);
  };
  // only render site when user with userID cookie has admin role
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <main>
        <Container className="wholeContainer" sx={{
          bgcolor: "background.paper",
          pt: 8,
          pb: 6,
          position: "relative",
          marginTop: theme.spacing(12),
        }}>
          <Button
            key={"addMovie"}
            onClick={() => {
              handleAddMovieClickOpen();
            }}
            variant="contained"
          >
            Add Movie
          </Button>
          <ManageAdminMovie isOpenAdd={openAddMovie} openAdd={handleAddMovieClickOpen} closeAdd={handleAddMovieClose}/>
        </Container>
      </main>
    </ThemeProvider>
  );
}

export default AdminPage;
