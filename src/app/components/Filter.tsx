import React from "react";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import IconButton from "@mui/material/IconButton";
import { createTheme } from "@mui/material/styles";
import palette from "../config/Colours";
import { ThemeProvider } from "@mui/styles";

const theme = createTheme(palette)
  
function Filter() {
    return (
        <ThemeProvider theme={theme}>
            <IconButton size="large" color="secondary">
                <FilterAltIcon />
            </IconButton>
        </ThemeProvider>
    );
}

export default Filter;