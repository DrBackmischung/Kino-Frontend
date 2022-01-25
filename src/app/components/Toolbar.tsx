import React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import BasicSelect from "./BasicSelect";
import SearchField from "./SearchField";
import Filter from "./Filter";
import Sort from "./Sort";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import palette from "../config/Colours";
import "./Toolbar.css";

function Toolbar(props: any) {
  const { handleSearchChange, handleSelectChange, cityData } = props;

  const theme = createTheme(palette)
  const theme2: any = createTheme();
  
  return (
    <ThemeProvider theme={theme}>
      <Container
        className="toolbar-container"
      >
        <Grid 
          container spacing={4} 
          className="toolbar-grid"
        >
          <BasicSelect
            handleSelectChange={handleSelectChange}
            cityData={cityData}
          />
          <SearchField handleSearchChange={handleSearchChange} />
          <Filter />
          <Sort />
        </Grid>
      </Container>
    </ThemeProvider>
  );
}

export default Toolbar;