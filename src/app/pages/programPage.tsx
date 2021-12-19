import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Toolbar from "../components/Toolbar";
import MovieCard from "../components/MovieCard";
import {useState} from "react";
import {SelectChangeEvent} from "@mui/material/Select";

const theme = createTheme();

function ProgrammPage() {
    const [filter, setFilter] = useState("");

    const handleSearchChange = (e: any) => {
        setFilter(e.target.value.toLowerCase());
    }

    const [location, setLocation] = React.useState("");

    const handleSelectChange = (event: SelectChangeEvent) => {
        setLocation(event.target.value as string);
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <main>
                <Toolbar handleSearchChange={handleSearchChange} handleSelectChange={handleSelectChange} location={location}/>
                <MovieCard filter={filter} location={location} />
            </main>
        </ThemeProvider>
    );
}

export default ProgrammPage;