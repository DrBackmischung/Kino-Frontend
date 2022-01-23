import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { AddNewsDialog, DeleteNewsDialog } from "./dialogs/News";

const theme = createTheme();
function ManageAdminNews(props: any) {
  const { userData, isOpenAdd, openAdd, closeAdd, isOpenDelete, openDelete, closeDelete } = props;
  
  return (
    <ThemeProvider theme={theme}>
      {isOpenAdd ? <AddNewsDialog
        userID={userData.id}
        open={openAdd}
        cancel={closeAdd}
      /> : null}
      {isOpenDelete ? <DeleteNewsDialog
        open={openDelete}
        cancel={closeDelete}
      /> : null}
    </ThemeProvider>
  );
}

export default ManageAdminNews;
