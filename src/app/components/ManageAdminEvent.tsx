/* eslint-disable */
import React, { useState, useEffect } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { AddEventDialog, DeleteEventDialog } from "./dialogs/Event";

const theme = createTheme();
function ManageAdminEvent(props: any) {
  const { isOpenAdd, openAdd, closeAdd, isOpenDelete, openDelete, closeDelete } = props;
  
  return (
    <ThemeProvider theme={theme}>
      {isOpenAdd ? <AddEventDialog
        open={openAdd}
        cancel={closeAdd}
      /> : null}
      {isOpenDelete ? <DeleteEventDialog
        open={openDelete}
        cancel={closeDelete}
      /> : null}
    </ThemeProvider>
  );
}

export default ManageAdminEvent;
