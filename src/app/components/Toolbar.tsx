import React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import SearchField from "./SearchField";
import Filter from "./Filter";
import Sort from "./Sort";
import { createTheme } from "@mui/material/styles";

function Toolbar(props: any) {
    const theme: any = createTheme();
    const { handleSearchChange, setSelectedSort, selectedSort} = props;

    return (
        <Container
            sx={{
                bgcolor: "background.paper",
                pb: 4,
                position: "relative",
                marginTop: theme.spacing(12),
            }}
            maxWidth="md"
        >
            <Grid container spacing={4} sx={{ justifyContent: "space-evenly" }}>
                <Sort setSelectedSort={setSelectedSort} selectedSort={selectedSort}/>
                <SearchField handleSearchChange={handleSearchChange} />
                <Filter />
            </Grid>
        </Container>
    );
}

export default Toolbar;