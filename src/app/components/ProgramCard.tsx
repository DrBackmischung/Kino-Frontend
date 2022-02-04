import React, {useEffect, useState} from "react";
import {Grid, Card, CardMedia, Typography, Box, Button, CardActions, Container} from "@mui/material";
import {useNavigate} from "react-router-dom";
import APIUrl from "../config/APIUrl";
import {useQuery} from "react-query";

function ProgramCard(props: any) {
    const {
        filter,
        moviesData,
        applyFilters,
        selectedSort,
        selectedLanguage,
        selectedFSK,
        selectedGenre,
        ratingValue
    } = props;
    const [moviesToRender, setMoviesToRender] = useState(moviesData);
    const [sortBy, setSortBy] = useState(true);

    let navigate = useNavigate();

    const apiUrlReviews = `${APIUrl.apiUrl}/review/getAll`;

    const reviewsData = useQuery("Reviews", () =>
        fetch(apiUrlReviews).then((res) => res.json())
    );

// eslint-disable-next-line
    let newReviewsArray: any;

    function navigateToDetails(movieId: any) {
        navigate("/DetailsPage", {state: {movieId}});
    }

    function getFlag(language: string): string {
        let code = "xx";
        if (language.toLowerCase() === "englisch") {
            code = "gb";
        } else if (language.toLowerCase() === "deutsch") {
            code = "de";
        } else if (language.toLowerCase() === "französisch") {
            code = "fr";
        } else if (language.toLowerCase() === "japanisch") {
            code = "jp";
        } else if (language.toLowerCase() === "russisch") {
            code = "ru";
        } else if (language.toLowerCase() === "koreanisch") {
            code = "kr";
        } else if (language.toLowerCase() === "spanisch") {
            code = "es";
        }
        return 'https://flagicons.lipis.dev/flags/4x3/' + code + '.svg';
    }

    useEffect(() => {
        let preparedMovieData = moviesData;

        if (selectedSort !== undefined) {
            if (selectedSort?.length !== 0) {
                // eslint-disable-next-line
                preparedMovieData = preparedMovieData.sort((a: any, b: any) => {
                    if (selectedSort === "longest") {
                        return b.duration - a.duration;
                    } else if (selectedSort === "shortest") {
                        return a.duration - b.duration;
                    }
                });
            }
            setSortBy(!sortBy);
        }

        // Selected Rating
        if (ratingValue !== undefined) {
            if (ratingValue?.length !== 0) {
                // eslint-disable-next-line
                newReviewsArray = reviewsData.data?.map(function (item: any) {
                    if (item['rating'] >= ratingValue) {
                        return item['movie']['id']
                    }
                });
                preparedMovieData = preparedMovieData?.filter((item: any) => {
                    return newReviewsArray?.includes(item['id']);
                });
            }
        }

        //Language Filter
        if (applyFilters === true) {
            if (selectedLanguage !== undefined) {
                if (selectedLanguage?.length !== 0) {
                    preparedMovieData = preparedMovieData.filter((movie: any) => {
                        return selectedLanguage.includes(movie.language)
                    });
                }
            }


            // FSK
            if (selectedFSK !== undefined) {
                if (selectedFSK?.length !== 0) {
                    preparedMovieData = preparedMovieData.filter((movie: any) => {
                        return selectedFSK >= movie.fsk;
                    });
                }
            }

            // Genre
            if (selectedGenre !== undefined) {
                if (selectedGenre?.length !== 0) {
                    preparedMovieData = preparedMovieData.filter((movie: any) => {
                        return (movie.genre.toString().toLowerCase().includes(selectedGenre));
                    });
                }
            }
            setMoviesToRender(preparedMovieData)
        } else {
            setMoviesToRender(moviesData)
        }

// eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedSort, moviesData, selectedLanguage, selectedFSK, selectedGenre, applyFilters, ratingValue]);


    return (
        <Container
            sx={{
                bgcolor: "background.paper",
                marginTop: 7,
                pb: 4,
                position: "relative",
                zIndex: '0'
            }}
            maxWidth="xl"
        >
            <Grid container spacing={4} xs={12}  sx={{  position: "relative", zIndex: '0' }}>
                {moviesToRender?.map(
                    (movie: any) =>
                        movie.title.toLowerCase().includes(filter) && (
                            <Grid item key={movie.id} xs={6}>
                                <Card sx={{
                                    height: "98%",
                                    display: "flex",
                                    flexDirection: "row",
                                }}>
                                    <CardMedia
                                        component="img"
                                        sx={{
                                            pt: "0",
                                            width: "33%",
                                            alignSelf: 'flex-start',
                                        }}
                                        image={movie.pictureLink}
                                        alt="poster"
                                    />
                                    <Grid item xs={8}>
                                        <Box sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            pt: 2,
                                            height: "73%"
                                        }}>
                                            <p style={{
                                                fontSize: "25px",
                                                alignSelf: 'center',
                                                textAlign: 'center',
                                                height: "20%"
                                            }}><b>{movie.title}</b></p>
                                            <p style={{fontSize: "18px"}}>{movie.duration} Min FSK {movie.fsk}</p>
                                            <Box sx={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                alignItems: 'center',
                                                pt: 2,
                                                pb: 2
                                            }}>
                                                <CardMedia
                                                    component="img"
                                                    sx={{width: "15%",}}
                                                    image={getFlag(movie.language)}
                                                    alt="Flagge"
                                                />
                                            </Box>
                                        </Box>
                                        <CardActions
                                            sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', pt: 2}}>
                                            <Button
                                                variant="contained"
                                                onClick={() => {
                                                    navigateToDetails(`${movie.id}`);
                                                }}
                                            >
                                                <Typography variant="h5" component="h1"><b>Tickets</b></Typography>
                                            </Button>
                                        </CardActions>
                                    </Grid>
                                </Card>
                            </Grid>
                        )
                )}
            </Grid>
        </Container>
    );
}

export default ProgramCard;
