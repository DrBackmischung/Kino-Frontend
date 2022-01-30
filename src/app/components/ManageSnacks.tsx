import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Snacks } from "./dialogs/Snacks";

const theme = createTheme();
function ManageSnacks(props: any) {
  const { isOpen, open, close, setSnacks, snacks } = props;
  
  return (
    <ThemeProvider theme={theme}>
    {isOpen ? <Snacks
      open={open}
      close={close}
      setSnacks={setSnacks}
      snacks={snacks}
    /> : null}
    </ThemeProvider>
  );
}

export default ManageSnacks;
