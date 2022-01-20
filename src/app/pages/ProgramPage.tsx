import * as React from "react";
import Toolbar from "../components/Toolbar";
import MovieCard from "../components/MovieCard";
import { useState } from "react";
import { useQuery } from "react-query";
import Container from "@mui/material/Container";
import ErrorPage from "./ErrorPage";
import LoadingAnimation from "../components/layouts/LoadingAnimation";
import APIUrl from "../config/APIUrl";

function ProgramPage() {
    const [filter, setFilter] = useState("");
    const [selectedLanguage, setSelectedLanguage] = useState([]);
    const [selectedFSK, setSelectedFSK] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState([]);

    const handleSearchChange = (e: any) => {
        setFilter(e.target.value.toLowerCase());
    };

    const apiUrlShow = `${APIUrl.apiUrl}/show/getAll`;

    const showsData = useQuery("Shows", () =>
        fetch(apiUrlShow).then((res) => res.json())
    );


    const apiUrlCity = `${APIUrl.apiUrl}/city/getAll`;

    const cityData = useQuery("Cities", () =>
        fetch(apiUrlCity).then((res) => res.json())
    );

    const apiUrlMovies = `${APIUrl.apiUrl}/movie/getAll`;

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
                    marginTop: "15rem",
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
                    marginTop: "15rem",
                }}
                maxWidth="md"
            >
                <LoadingAnimation />
            </Container>
        );

    return (
        <div>
            <Toolbar
                handleSearchChange={handleSearchChange}
                setSelectedLocation={setSelectedLocation}
                setSelectedLanguage={setSelectedLanguage}
                setSelectedFSK={setSelectedFSK}
                setSelectedGenre={setSelectedGenre}
                moviesData={moviesData.data}
                showsData={showsData.data}
                selectedGenre={selectedGenre}
            />
            <MovieCard
                filter={filter}
                selectedLocation={selectedLocation}
                moviesData={moviesData.data}
                showsData={showsData.data}
                selectedLanguage={selectedLanguage}
                selectedFSK={selectedFSK}
                selectedGenre={selectedGenre}

            />
        </div>
    );
}

export default ProgramPage;