import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Toolbar from "../components/Toolbar";
import MovieCard from "../components/MovieCard";

const theme = createTheme();

function ProgrammPage() {
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

export default ProgrammPage;
