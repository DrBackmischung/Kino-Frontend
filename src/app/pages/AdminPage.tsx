import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Container from "@mui/material/Container";
import {
    Button,
    Box,
} from "@mui/material";
import { useState } from "react";
import ManageAdminMovie from "../components/ManageAdminMovie";
import ManageAdminShow from "../components/ManageAdminShow";
import palette from "../config/Colours";

const theme = createTheme(palette);

function AdminPage() {
  
  const [openAddMovie, setOpenAddMovie] = useState(false);
  const [openUpdateMovie, setUpdateMovie] = useState(false);
  const [openDeleteMovie, setDeleteMovie] = useState(false);

  const handleAddMovieClickOpen = () => {
    setOpenAddMovie(true);
  };
  const handleAddMovieClose = () => {
    setOpenAddMovie(false);
  };

  const handleUpdateMovieClickOpen = () => {
    setUpdateMovie(true);
  };
  const handleUpdateMovieClose = () => {
    setUpdateMovie(false);
  };

  const handleDeleteMovieClickOpen = () => {
    setDeleteMovie(true);
  };
  const handleDeleteMovieClose = () => {
    setDeleteMovie(false);
  };
  
  const [openAddShow, setOpenAddShow] = useState(false);
  const [openUpdateShow, setUpdateShow] = useState(false);
  const [openDeleteShow, setDeleteShow] = useState(false);

  const handleAddShowClickOpen = () => {
    setOpenAddShow(true);
  };
  const handleAddShowClose = () => {
    setOpenAddShow(false);
  };

  const handleUpdateShowClickOpen = () => {
    setUpdateShow(true);
  };
  const handleUpdateShowClose = () => {
    setUpdateShow(false);
  };

  const handleDeleteShowClickOpen = () => {
    setDeleteShow(true);
  };
  const handleDeleteShowClose = () => {
    setDeleteShow(false);
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
          <Box
            sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
          >
            <Box
              sx={{
                  marginTop: 8,
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
              }}
            >
              <Button
                key={"addMovie"}
                onClick={() => {
                  handleAddMovieClickOpen();
                }}
                variant="contained"
              >
                Add Movie
              </Button>
              <Button
                key={"updateMovie"}
                onClick={() => {
                  handleUpdateMovieClickOpen();
                }}
                variant="contained"
              >
                Update Movie
              </Button>
              <Button
                key={"deleteMovie"}
                onClick={() => {
                  handleDeleteMovieClickOpen();
                }}
                variant="contained"
              >
                Delete Movie
              </Button>
            </Box>
            <Box
              sx={{
                  marginTop: 8,
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
              }}
            >
              <Button
                key={"addShow"}
                onClick={() => {
                  handleAddShowClickOpen();
                }}
                variant="contained"
              >
                Add Show
              </Button>
              <Button
                key={"updateShow"}
                onClick={() => {
                  handleUpdateShowClickOpen();
                }}
                variant="contained"
              >
                Update Show
              </Button>
              <Button
                key={"deleteMovie"}
                onClick={() => {
                  handleDeleteShowClickOpen();
                }}
                variant="contained"
              >
                Delete Show
              </Button>
            </Box>
          </Box>
          <ManageAdminMovie
            isOpenAdd={openAddMovie}
            openAdd={handleAddMovieClickOpen}
            closeAdd={handleAddMovieClose}
            isOpenUpdate={openUpdateMovie}
            openUpdate={handleUpdateMovieClickOpen}
            closeUpdate={handleUpdateMovieClose}
            isOpenDelete={openDeleteMovie}
            openDelete={handleDeleteMovieClickOpen}
            closeDelete={handleDeleteMovieClose}
          />
          <ManageAdminShow 
            isOpenAdd={openAddShow}
            openAdd={handleAddShowClickOpen}
            closeAdd={handleAddShowClose}
            isOpenUpdate={openUpdateShow}
            openUpdate={handleUpdateShowClickOpen}
            closeUpdate={handleUpdateShowClose}
            isOpenDelete={openDeleteShow}
            openDelete={handleDeleteShowClickOpen}
            closeDelete={handleDeleteShowClose}
          />
        </Container>
      </main>
    </ThemeProvider>
  );
}

export default AdminPage;
