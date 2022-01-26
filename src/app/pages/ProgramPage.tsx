import * as React from "react";
import Toolbar from "../components/Toolbar";
import MovieCard from "../components/MovieCard";
import { useState } from "react";
import { useQuery } from "react-query";
import Container from "@mui/material/Container";
import ErrorPage from "./ErrorPage";
import LoadingAnimation from "../components/layouts/LoadingAnimation";
import APIUrl from "../config/APIUrl";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import {IconButton} from "@mui/material";
import {useNavigate} from "react-router-dom";
import ProgramCard from "../components/ProgramCard";


function ProgramPage() {
    let navigate = useNavigate();

    const [filter, setFilter] = useState("");
    const [selectedSort, setSelectedSort] = useState("");

    const handleSearchChange = (e: any) => {
        setFilter(e.target.value.toLowerCase());
    };

    const apiUrlMovies = `${APIUrl.apiUrl}/movie/getAll`;

    const moviesData = useQuery("Movies", () =>
        fetch(apiUrlMovies).then((res) => res.json())
    );

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
            <ProgramCard
                filter={filter}
                moviesData={moviesData.data}
                selectedSort={selectedSort}
            />
        </div>
    );
}

export default ProgramPage;