import * as React from "react";
import Toolbar from "../components/Toolbar";
import MovieCard from "../components/MovieCard";
import { useState } from "react";
import { useQuery } from "react-query";
import Container from "@mui/material/Container";
import ErrorPage from "./ErrorPage";
import LoadingAnimation from "../components/layouts/LoadingAnimation";
import APIUrl from "../config/APIUrl";
import { createTheme } from "@mui/material/styles";
import palette from "../config/Colours";
import { ThemeProvider } from "@mui/styles";
import "./ProgramPage.css";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import {IconButton} from "@mui/material";
import {useNavigate} from "react-router-dom";


function ProgramPage() {
    let navigate = useNavigate();

    const [filter, setFilter] = useState("");
    const [selectedSort, setSelectedSort] = useState("");

    const handleSearchChange = (e: any) => {
        setFilter(e.target.value.toLowerCase());
    };
    const [location, setLocation] = React.useState("");

    const handleSelectChange = (event: SelectChangeEvent) => {
        setLocation(event.target.value as string);
    };

    const apiUrlCity = `${APIUrl.apiUrl}/city/getAll`;

  const cityData = useQuery("Cities", () =>
    fetch(apiUrlCity).then((res) => res.json())
  );

  const apiUrlMovies = `${APIUrl.apiUrl}/movie/getAll`;

  const moviesData = useQuery("Movies", () =>
    fetch(apiUrlMovies).then((res) => res.json())
  );

  const theme = createTheme(palette)
  
    function goBack() {
        navigate(-1);
    }


    if (moviesData.error) {
        return (
            <Container
                sx={{
                    bgcolor: "background.paper",
                    pt: 8,
                    pb: 6,
                    position: "relative",
                    marginTop: "15rem",
                }}
                maxWidth="md"
            >
                <ErrorPage />
            </Container>
        );
    }
    if (moviesData.isLoading)
        return (
            <Container
                sx={{
                    bgcolor: "background.paper",
                    pt: 8,
                    pb: 6,
                    position: "relative",
                    marginTop: "15rem",
                }}
                maxWidth="md"
            >
                <LoadingAnimation />
            </Container>
        );

  if (cityData.error || moviesData.error) {
    return (
        <div>
            <IconButton sx={{marginTop: 12, marginBottom: -12, marginLeft: 48}} onClick={goBack}>
                <ArrowBackIosIcon />
            </IconButton>
            <Toolbar
                handleSearchChange={handleSearchChange}
                setSelectedSort={setSelectedSort}
                selectedSort={selectedSort}
            />
            <MovieCard
                filter={filter}
                moviesData={moviesData.data}
                selectedSort={selectedSort}
            />
        </div>
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