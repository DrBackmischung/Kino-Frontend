import * as React from "react";
import Toolbar from "../components/Toolbar";
import { useState } from "react";
import { useQuery } from "react-query";
import ErrorPage from "./ErrorPage";
import LoadingAnimation from "../components/layouts/LoadingAnimation";
import APIUrl from "../config/APIUrl";
import "./ProgramPage.css";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { IconButton } from "@mui/material";
import {useNavigate} from "react-router-dom";
import ProgramCard from "../components/ProgramCard";

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

  const apiUrlMovies = `${APIUrl.apiUrl}/movie/getAll`;

  const moviesData = useQuery("Movies", () =>
    fetch(apiUrlMovies).then((res) => res.json())
  );

  function goBack() {
    navigate(-1);
  }

  if (moviesData.isError || moviesData?.data?.error) {
    return <ErrorPage errorCode={moviesData?.data?.status} />;
  }
  if (moviesData.isLoading) return <LoadingAnimation />;

  return (
    <div id="programmPage-div">
      <IconButton
        id="programPage-iconButton"
        sx={{
          marginTop: -1.06,
          marginBottom: -12,
          marginLeft: 5,
          position: "fixed",
          zIndex: "100",
        }}
        onClick={goBack}
      >
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

export default ProgramPage;
