import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import APIUrl from "../config/APIUrl";
import { useQuery } from "react-query";
import { useState } from "react";
import ErrorPage from "./ErrorPage";
import LoadingAnimation from "../components/layouts/LoadingAnimation";
import SearchField from "../components/SearchField";
import MainNewsCard from "../components/MainNewsCard";
import NewsCard from "../components/NewsCard";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";

const theme = createTheme();

function NewsAndEventsPage() {
  let navigate = useNavigate();

  const apiUrlNews = `${APIUrl.apiUrl}/news/getAll`;

  const newsData = useQuery("News", () =>
    fetch(apiUrlNews).then((res) => res.json())
  );

  const [filter, setFilter] = useState("");

  const handleSearchChange = (e: any) => {
    setFilter(e.target.value.toLowerCase());
  };

  let prepareData: any = (dataItem: any) => {
    if (newsData.data === undefined) return;
    const sortedData = newsData.data?.sort((itemA: any, itemB: any) => {
      if (itemA.date !== itemB.date) {
        return new Date(itemB.date).getTime() - new Date(itemA.date).getTime();
      } else {
        return new Date(itemB.date).getTime() - new Date(itemA.date).getTime();
      }
    });
    return sortedData;
  };

  if (newsData.isError || newsData?.data?.error) {
    return (
      <Container
        sx={{
          bgcolor: "background.paper",
          pt: 8,
          pb: 6,
          position: "relative",
        }}
        maxWidth="md"
      >
        <ErrorPage errorCode={newsData?.data?.status} />
      </Container>
    );
  }

  if (newsData.isLoading)
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

  function goBack() {
    navigate(-1);
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <IconButton
        sx={{
          marginTop: 2,
          marginBottom: -12,
          marginLeft: 5,
          position: "fixed",
          zIndex: "100",
        }}
        onClick={goBack}
      >
        <ArrowBackIosIcon />
      </IconButton>
      <Container maxWidth="lg" sx={{ marginTop: 2 }}>
        <main>
          <SearchField handleSearchChange={handleSearchChange} />
          <MainNewsCard data={prepareData(newsData.data)} />
          <NewsCard filter={filter} data={prepareData(newsData.data)} />
        </main>
      </Container>
    </ThemeProvider>
  );
}

export default NewsAndEventsPage;
