import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Container from "@mui/material/Container";
import {
    Button,
    Box,
} from "@mui/material";
import { useState } from "react";
import palette from "../config/Colours";
import ManageAdminMovie from "../components/ManageAdminMovie";
import ManageAdminShow from "../components/ManageAdminShow";
import ManageAdminRoom from "../components/ManageAdminRoom";
import ManageAdminNews from "../components/ManageAdminNews";
import ManageAdminEvent from "../components/ManageAdminEvent";
import APIUrl from "../config/APIUrl";
import { useQuery } from "react-query";
import ErrorPage from "./ErrorPage";
import LoadingAnimation from "../components/layouts/LoadingAnimation";
import { getCookie } from "../components/CookieHandler";

const theme = createTheme(palette);

function AdminPage(props: any) {

  const {
    userData
  } = props;

  const userID = getCookie("userId");
  const role = getCookie("role");
  
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
  const [openDeleteShow, setDeleteShow] = useState(false);

  const handleAddShowClickOpen = () => {
    setOpenAddShow(true);
  };
  const handleAddShowClose = () => {
    setOpenAddShow(false);
  };

  const handleDeleteShowClickOpen = () => {
    setDeleteShow(true);
  };
  const handleDeleteShowClose = () => {
    setDeleteShow(false);
  };

  const [openRoom, setOpenRoom] = useState(false);

  const handleRoomClickOpen = () => {
    setOpenRoom(true);
  };
  const handleRoomClose = () => {
    setOpenRoom(false);
  };
  
  const [openAddNews, setOpenAddNews] = useState(false);
  const [openDeleteNews, setDeleteNews] = useState(false);

  const handleAddNewsClickOpen = () => {
    setOpenAddNews(true);
  };
  const handleAddNewsClose = () => {
    setOpenAddNews(false);
  };

  const handleDeleteNewsClickOpen = () => {
    setDeleteNews(true);
  };
  const handleDeleteNewsClose = () => {
    setDeleteNews(false);
  };
  
  const [openAddEvent, setOpenAddEvent] = useState(false);
  const [openDeleteEvent, setDeleteEvent] = useState(false);

  const handleAddEventClickOpen = () => {
    setOpenAddEvent(true);
  };
  const handleAddEventClose = () => {
    setOpenAddEvent(false);
  };

  const handleDeleteEventClickOpen = () => {
    setDeleteEvent(true);
  };
  const handleDeleteEventClose = () => {
    setDeleteEvent(false);
  };

  // only render site when user with userID cookie has admin role
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <main>
        {role === "ADMIN" ? (
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
                  key={"deleteMovie"}
                  onClick={() => {
                    handleDeleteShowClickOpen();
                  }}
                  variant="contained"
                >
                  Delete Show
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
                  key={"createRoom"}
                  onClick={() => {
                    handleRoomClickOpen();
                  }}
                  variant="contained"
                >
                  Add Seatplan
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
                  key={"addNews"}
                  onClick={() => {
                    handleAddNewsClickOpen();
                  }}
                  variant="contained"
                >
                  Add News
                </Button>
                <Button
                  key={"deleteNews"}
                  onClick={() => {
                    handleDeleteNewsClickOpen();
                  }}
                  variant="contained"
                >
                  Delete News
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
                  key={"addEvent"}
                  onClick={() => {
                    handleAddEventClickOpen();
                  }}
                  variant="contained"
                >
                  Add Event
                </Button>
                <Button
                  key={"deleteEvent"}
                  onClick={() => {
                    handleDeleteEventClickOpen();
                  }}
                  variant="contained"
                >
                  Delete Event
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
              isOpenDelete={openDeleteShow}
              openDelete={handleDeleteShowClickOpen}
              closeDelete={handleDeleteShowClose}
            />
            <ManageAdminRoom
              isOpen={openRoom}
              open={handleRoomClickOpen}
              close={handleRoomClose}
            />
            <ManageAdminNews
              userData={userData}
              isOpenAdd={openAddNews}
              openAdd={handleAddNewsClickOpen}
              closeAdd={handleAddNewsClose}
              isOpenDelete={openDeleteNews}
              openDelete={handleDeleteNewsClickOpen}
              closeDelete={handleDeleteNewsClose}
            />
            <ManageAdminEvent
              isOpenAdd={openAddEvent}
              openAdd={handleAddEventClickOpen}
              closeAdd={handleAddEventClose}
              isOpenDelete={openDeleteEvent}
              openDelete={handleDeleteEventClickOpen}
              closeDelete={handleDeleteEventClose}
            />
          </Container>
        ) : (
          <ErrorPage />
        )}
      </main>
    </ThemeProvider>
  );
}

export default AdminPage;
