import * as React from 'react';
import { Container, CssBaseline, Grid } from "@mui/material";
import APIUrl from '../config/APIUrl';
import { useQuery } from 'react-query';
import ErrorPage from '../pages/ErrorPage';
import LoadingAnimation from "./layouts/LoadingAnimation";

function ReviewsCard(movieId: any){

    const apiUrlReviews = `${APIUrl.apiUrl}/movie/${movieId}/reviews}`

    

    const {isLoading, error, data} = useQuery(
        ["review", movieId],
        () => {
            return fetch(apiUrlReviews).then((res) => {
                return res.json();
            });
        },
        {enabled: Boolean(movieId)}
    );

    let prepareReviews : any = (reviews : any) => {
        if(data === undefined){
            return;
        }else{
            return reviews;
        }

    }

    return(
        <Container
            sx={{
                bgcolor: "Background.paper",
                pt: 8,
                pb: 6,
                position: "relative"
            }}
            maxWidth="md"
        >
            {error ? (
                <ErrorPage/>
            ) : isLoading ? (
                <LoadingAnimation/>
            ): (
                prepareReviews(data)?.map((review : any) => {
                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            <p>{review.user.userName}</p>
                        </Grid>
                        <Grid item xs={8}>
                            <p>Datum: {review.date}</p>
                        </Grid>
                        <Grid item xs={12}>
                            <h3>{review.header}</h3>
                        </Grid>
                        <Grid item xs={12}>
                            <p>{review.content}</p>
                        </Grid>
                    </Grid>
                })
            )
            }

        </Container>

    )
}

export default ReviewsCard;