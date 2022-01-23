import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { AddShowDialog, DeleteShowDialog } from "./dialogs/Show";

const theme = createTheme();
function ManageAdminShow(props: any) {
  const { isOpenAdd, openAdd, closeAdd, isOpenDelete, openDelete, closeDelete } = props;
  
  return (
    <ThemeProvider theme={theme}>
      {isOpenAdd ? <AddShowDialog
        open={openAdd}
        cancel={closeAdd}
      /> : null}
      {isOpenDelete ? <DeleteShowDialog
        open={openDelete}
        cancel={closeDelete}
      /> : null}
    </ThemeProvider>
  );
}

export default ManageAdminShow;
