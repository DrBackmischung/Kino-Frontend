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

function ProgramPage() {
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
                handleSelectChange={handleSelectChange}
                setSelectedSort={setSelectedSort}
                selectedSort={selectedSort}
                location={location}
                cityData={cityData.data}
            />
            <MovieCard
                filter={filter}
                location={location}
                moviesData={moviesData.data}
                selectedSort={selectedSort}
            />
        </div>
    );
}

export default ProgramPage;