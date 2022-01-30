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
    const { handleSearchChange, setSelectedSort, setApplyFilters, setSelectedLanguage, setSelectedFSK, setSelectedGenre, moviesData, setRatingValue } = props;

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
            <Grid container spacing={4} xs={12} sx={{ justifyContent: "space-evenly" }}>
                <Sort setSelectedSort={setSelectedSort}
                      xs={4}
                      sx={{
                          display: "flex",
                          flexDirection: "row",
                          padding: 5
                      }}/>
                <SearchField handleSearchChange={handleSearchChange}  sx={{
                    height: "98%",
                    display: "flex",
                    flexDirection: "row",
                }}/>
                <Filter sx={{
                    height: "98%",
                    display: "flex",
                    flexDirection: "row",
                }}
                        setApplyFilters={setApplyFilters}  setRatingValue={setRatingValue} setSelectedFSK={setSelectedFSK} setSelectedGenre={setSelectedGenre} setSelectedLanguage={setSelectedLanguage} moviesData={moviesData} />
            </Grid>
        </Container>
      </ThemeProvider>
    );
}

export default Toolbar;