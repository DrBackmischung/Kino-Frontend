import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import Toolbar from "../components/toolbar";
import MovieCard from "../components/movieCard";


const theme = createTheme();

function Homepage() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <main>
                <Toolbar />
                <MovieCard />
            </main>
        </ThemeProvider>
    );
}

export default Homepage;