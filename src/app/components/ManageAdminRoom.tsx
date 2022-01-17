/* eslint-disable */
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { SeatPlanPainter } from "./dialogs/SeatPlanBluePrint";

const theme = createTheme();
function ManageAdminRoom(props: any) {
  const { isOpen, open, close, cinemaRoomID } = props;
  
  return (
    <ThemeProvider theme={theme}>
      {isOpen ? <SeatPlanPainter
        open={open}
        cancel={close}
        cinemaRoomID={cinemaRoomID}
      /> : null}
    </ThemeProvider>
  );
}

export default ManageAdminRoom;
