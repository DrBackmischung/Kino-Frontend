import * as React from "react";
import Toolbar from "../components/Toolbar";
import { useState } from "react";
import { useQuery } from "react-query";
import ErrorPage from "./ErrorPage";
import LoadingAnimation from "../components/layouts/LoadingAnimation";
import APIUrl from "../config/APIUrl";
import { createTheme } from "@mui/material/styles";
import palette from "../config/Colours";
import { ThemeProvider } from "@mui/styles";
import "./ProgramPage.css";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import {Container, IconButton, SelectChangeEvent} from "@mui/material";
import {useNavigate} from "react-router-dom";
import ProgramCard from "../components/ProgramCard";
import MovieCard from "../components/MovieCard";


function ProgramPage() {
    let navigate = useNavigate();

    const [filter, setFilter] = useState("");
    const [selectedSort, setSelectedSort] = useState("");

    const [selectedLanguage, setSelectedLanguage] = useState([]);
    const [selectedFSK, setSelectedFSK] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState([]);
    const [applyFilters, setApplyFilters] = useState([]);

    const [ratingValue, setRatingValue] = React.useState<number | null>(0);


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
            <ErrorPage />
        );
    }
    if (moviesData.isLoading)
        return (
            <LoadingAnimation />
        );

  if (cityData.error || moviesData.error) {
    return (
        <div>
            <IconButton sx={{marginTop: -1, marginBottom: -12, marginLeft: 5, position: 'fixed', zIndex: '100'}} onClick={goBack}>
                <ArrowBackIosIcon />
            </IconButton>
            <Toolbar
                handleSearchChange={handleSearchChange}
                setSelectedSort={setSelectedSort}
                setSelectedLanguage={setSelectedLanguage}
                setSelectedFSK={setSelectedFSK}
                setSelectedGenre={setSelectedGenre}
                moviesData={moviesData.data}
                selectedGenre={selectedGenre}
                setApplyFilters={setApplyFilters}
                setRatingValue={setRatingValue}
                ratingValue={ratingValue}
            />
            <ProgramCard
                filter={filter}
                moviesData={moviesData.data}
                selectedSort={selectedSort}
                selectedLanguage={selectedLanguage}
                selectedFSK={selectedFSK}
                selectedGenre={selectedGenre}
                applyFilters={applyFilters}
                ratingValue={ratingValue}
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