import React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import SearchField from "./SearchField";
import Filter from "./Filter";
import Sort from "./Sort";
import "./Toolbar.css";

function Toolbar(props: any) {
    const { handleSearchChange, setSelectedSort, setApplyFilters, setSelectedLanguage, setSelectedFSK, setSelectedGenre, moviesData, setRatingValue } = props;

    return (
        <Container
            id="toolbar-container"
            sx={{
                marginTop: -5,
                p:7,
                pb:1,
                bgcolor: "background.paper",
                position: "fixed",
                zIndex: '90',
            }}
            maxWidth="xl"
        >
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
    );
}

export default Toolbar;