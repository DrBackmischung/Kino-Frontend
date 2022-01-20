import React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import BasicSelect from "./BasicSelect";
import SearchField from "./SearchField";
import Filter from "./Filter";
import Sort from "./Sort";
import { createTheme } from "@mui/material/styles";

function Toolbar(props: any) {
    const theme: any = createTheme();
    const { handleSearchChange, setSelectedLocation, showsData, setSelectedLanguage, setSelectedFSK, setSelectedGenre, moviesData, selectedGenre} = props;

    return (
        <Container
            sx={{
                bgcolor: "background.paper",
                pt: 8,
                pb: 6,
                position: "relative",
                marginTop: theme.spacing(12),
            }}
            maxWidth="md"
        >
            <Grid container spacing={4} sx={{ justifyContent: "space-evenly" }}>
                <BasicSelect
                    setSelectedLocation={setSelectedLocation} showsData={showsData} selectedGenre={selectedGenre}
                />
                <SearchField handleSearchChange={handleSearchChange} />
                <Filter setSelectedLanguage={setSelectedLanguage} setSelectedFSK={setSelectedFSK} setSelectedGenre={setSelectedGenre} moviesData={moviesData} />
                <Sort />
            </Grid>
        </Container>
    );
}

export default Toolbar;