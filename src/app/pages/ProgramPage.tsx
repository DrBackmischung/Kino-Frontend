import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Toolbar from "../components/Toolbar";
import MovieCard from "../components/MovieCard";
import { useState } from "react";
import { SelectChangeEvent } from "@mui/material/Select";
import { useQuery } from "react-query";
import Container from "@mui/material/Container";
import ErrorPage from "./ErrorPage";
import LoadingAnimation from "../components/layouts/LoadingAnimation";

const theme = createTheme();

function ProgramPage() {
  const [filter, setFilter] = useState("");

  const handleSearchChange = (e: any) => {
    setFilter(e.target.value.toLowerCase());
  };

  const [location, setLocation] = React.useState("");

  const handleSelectChange = (event: SelectChangeEvent) => {
    setLocation(event.target.value as string);
  };

  const apiUrlCity =
    "https://wi2020seb-cinema-api.azurewebsites.net/city/getAll";

  const cityData = useQuery("Cities", () =>
    fetch(apiUrlCity).then((res) => res.json())
  );

  const apiUrlMovies =
    "https://wi2020seb-cinema-api.azurewebsites.net/movie/getAll";

  const moviesData = useQuery("Movies", () =>
    fetch(apiUrlMovies).then((res) => res.json())
  );

  if (cityData.error || moviesData.error) {
    return (
      <Container
        sx={{
          bgcolor: "background.paper",
          pt: 8,
          pb: 6,
          position: "relative",
          marginTop: theme.spacing(15),
        }}
        maxWidth="md"
      >
        <ErrorPage />
      </Container>
    );
  }
  if (cityData.isLoading || moviesData.isLoading)
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
        <LoadingAnimation />
      </Container>
    );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <main>
        <Toolbar
          handleSearchChange={handleSearchChange}
          handleSelectChange={handleSelectChange}
          location={location}
          cityData={cityData.data}
        />
        <MovieCard
          filter={filter}
          location={location}
          moviesData={moviesData.data}
        />
      </main>
    </ThemeProvider>
  );
}

export default ProgramPage;
