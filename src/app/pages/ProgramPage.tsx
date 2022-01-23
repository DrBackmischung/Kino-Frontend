import * as React from "react";
import Toolbar from "../components/Toolbar";
import MovieCard from "../components/MovieCard";
import { useState } from "react";
import { SelectChangeEvent } from "@mui/material/Select";
import { useQuery } from "react-query";
import Container from "@mui/material/Container";
import ErrorPage from "./ErrorPage";
import LoadingAnimation from "../components/layouts/LoadingAnimation";
import APIUrl from "../config/APIUrl";
import { createTheme } from "@mui/material/styles";
import palette from "../config/Colours";
import { ThemeProvider } from "@mui/styles";
import "./ProgramPage.css";

function ProgramPage() {
  const [filter, setFilter] = useState("");

  const handleSearchChange = (e: any) => {
    setFilter(e.target.value.toLowerCase());
  };
  const [location, setLocation] = React.useState("");

  const handleSelectChange = (event: SelectChangeEvent) => {
    setLocation(event.target.value as string);
  };

  const apiUrlCity = `${APIUrl.apiUrl}/city/getAll`;

  console.log(apiUrlCity);

  const cityData = useQuery("Cities", () =>
    fetch(apiUrlCity).then((res) => res.json())
  );

  const apiUrlMovies = `${APIUrl.apiUrl}/movie/getAll`;

  const moviesData = useQuery("Movies", () =>
    fetch(apiUrlMovies).then((res) => res.json())
  );

  const theme = createTheme(palette)

  if (cityData.error || moviesData.error) {
    return (
        <Container
          className="programPage-container"
        >
          <ErrorPage />
        </Container>
    );
  }
  if (cityData.isLoading || moviesData.isLoading)
    return (
        <Container 
          className="programPage-container"
        >
          <LoadingAnimation />
        </Container>
    );

  return (
    <ThemeProvider theme={theme}>
      <div>
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
      </div>
    </ThemeProvider>
  );
}

export default ProgramPage;
