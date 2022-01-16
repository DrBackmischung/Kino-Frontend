/* eslint-disable */
import React, { useState, useEffect } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { AddShowDialog, UpdateShowDialog, DeleteShowDialog } from "./dialogs/Show";

const theme = createTheme();
function ManageAdminShow(props: any) {
  const navigate = useNavigate();
  const { isOpenAdd, openAdd, closeAdd, isOpenUpdate, openUpdate, closeUpdate, isOpenDelete, openDelete, closeDelete } = props;
  
  return (
    <ThemeProvider theme={theme}>
      {isOpenAdd ? <AddShowDialog
        open={openAdd}
        cancel={closeAdd}
      /> : null}
      {isOpenUpdate ? <UpdateShowDialog
        open={openUpdate}
        cancel={closeUpdate}
      /> : null}
      {isOpenDelete ? <DeleteShowDialog
        open={openDelete}
        cancel={closeDelete}
      /> : null}
    </ThemeProvider>
  );
}

export default ManageAdminShow;
