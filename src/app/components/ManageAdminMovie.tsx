/* eslint-disable */
import React, { useState, useEffect } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { AddMovieDialog } from "./dialogs/Movie";

const theme = createTheme();
function ManageAdminMovie(props: any) {
  const navigate = useNavigate();
  const { openAdd, openUpdate, openDelete } = props;
  const [openAddMovie, setOpenAddMovie] = useState(false);
  useEffect(() => {
    if (openAdd > 0) {
      setOpenAddMovie(true);
    }
  }, [open]);

  const cancelAddMovie = () => {
    setOpenAddMovie(false);
  };
  
  return (
    <ThemeProvider theme={theme}>
      <AddMovieDialog
        open={openAddMovie}
        cancel={cancelAddMovie}
      />
    </ThemeProvider>
  );
}

export default ManageAdminMovie;
