import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import APIUrl from "../config/APIUrl";
import {useQuery} from "react-query";
import {useState} from "react";
import ErrorPage from "./ErrorPage";
import LoadingAnimation from "../components/layouts/LoadingAnimation";
import SearchField from "../components/SearchField";
import MainNewsCard from "../components/MainNewsCard";
import NewsCard from "../components/NewsCard";

const theme = createTheme();

function NewsAndEventsPage() {

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
                return (
                    new Date(itemB.date).getTime() -
                    new Date(itemA.date).getTime()
                );
            } else {
                return (
                    new Date(itemB.date).getTime() -
                    new Date(itemA.date).getTime()
                );
            }
        });
        return sortedData;
    };

    
    if (newsData.error) {
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

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Container maxWidth="lg"
                       sx={{marginTop: "7rem"}} >
                <main>
                    <MainNewsCard data={prepareData(newsData.data)}/>
                    <SearchField handleSearchChange={handleSearchChange}/>
                    <NewsCard  filter={filter}
                               data={prepareData(newsData.data)}/>
                </main>
            </Container>
        </ThemeProvider>
    );
}

export default NewsAndEventsPage;
