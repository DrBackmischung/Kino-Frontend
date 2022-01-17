/* eslint-disable */
import React, { useState, useEffect } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { AddMovieDialog, UpdateMovieDialog, DeleteMovieDialog } from "./dialogs/Movie";

const theme = createTheme();
function ManageAdminMovie(props: any) {
  const { isOpenAdd, openAdd, closeAdd, isOpenUpdate, openUpdate, closeUpdate, isOpenDelete, openDelete, closeDelete } = props;
  
  return (
    <ThemeProvider theme={theme}>
      {isOpenAdd ? <AddMovieDialog
        open={openAdd}
        cancel={closeAdd}
      /> : null}
      {isOpenUpdate ? <UpdateMovieDialog
        open={openUpdate}
        cancel={closeUpdate}
      /> : null}
      {isOpenDelete ? <DeleteMovieDialog
        open={openDelete}
        cancel={closeDelete}
      /> : null}
    </ThemeProvider>
  );
}

export default ManageAdminMovie;
