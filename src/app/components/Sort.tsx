import React from "react";
import IconButton from "@mui/material/IconButton";
import SortIcon from "@mui/icons-material/Sort";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import palette from "../config/Colours";

const theme = createTheme(palette)

function Sort() {
  return (
    <ThemeProvider theme={theme}>
      <IconButton size="large" color="secondary">
        <SortIcon />
      </IconButton>
    </ThemeProvider>
  );
}

export default Sort;
