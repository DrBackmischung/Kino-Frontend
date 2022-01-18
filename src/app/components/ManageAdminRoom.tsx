/* eslint-disable */
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { AddCinemaRoomDialog } from "./dialogs/CinemaRoom";

const theme = createTheme();
function ManageAdminRoom(props: any) {
  const { isOpen, open, close } = props;
  
  return (
    <ThemeProvider theme={theme}>
      {isOpen ? <AddCinemaRoomDialog
        open={open}
        cancel={close}
      /> : null}
    </ThemeProvider>
  );
}

export default ManageAdminRoom;
