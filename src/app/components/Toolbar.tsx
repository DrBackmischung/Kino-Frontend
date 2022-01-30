import React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import SearchField from "./SearchField";
import Filter from "./Filter";
import Sort from "./Sort";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import palette from "../config/Colours";
import "./Toolbar.css";

function Toolbar(props: any) {
    const theme: any = createTheme();
    const { handleSearchChange, setSelectedSort, selectedSort} = props;

  const theme2: any = createTheme();
  
  return (
    <ThemeProvider theme={theme}>
      <Container
        className="toolbar-container"
      >
        <Grid 
          container spacing={4} 
          className="toolbar-grid"
        />
            <Grid container spacing={4} sx={{ justifyContent: "space-evenly" }}>
                <Sort setSelectedSort={setSelectedSort} selectedSort={selectedSort}/>
                <SearchField handleSearchChange={handleSearchChange} />
                <Filter />
            </Grid>
        </Container>
      </ThemeProvider>
    );
}

export default Toolbar;