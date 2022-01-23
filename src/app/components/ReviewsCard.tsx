import * as React from 'react';
import { Box, Container, CssBaseline, Grid, Typography } from "@mui/material";
import APIUrl from '../config/APIUrl';
import { useQuery } from 'react-query';
import ErrorPage from '../pages/ErrorPage';
import LoadingAnimation from "./layouts/LoadingAnimation";

function ReviewsCard(props: any){
    const{movieId} = props;

    const apiUrlReviews = `${APIUrl.apiUrl}/movie/${movieId}/reviews`

    const {isLoading, error, data} = useQuery(
        ["reviews", movieId],
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

    if(isLoading){
        return <LoadingAnimation/>
    }

    if(error){
        return <ErrorPage/>
    }
    

    return(

        <Container sx={{
            bgcolor: "background.paper",
            pt: 8,
            pb: 6,
            position: "relative"
        }}
        maxWidth="md"
        >
            <h1>Reviews</h1>

            {prepareReviews(data)?.map((review : any) => (
                <Box key={review.id} sx={{m: 1.5}}>
                    <Grid container>
                        <Grid item xs={2}>
                            <Box sx={{fontWeight: "bold"}}>
                                {review.user.userName} :
                            </Box>
                        </Grid>
                        <Grid item xs={6}>
                            <Box sx={{fontWeight: "bold"}}>{review.header}</Box>
                        </Grid>
                        
                        <Grid item xs={12}>
                            <Box>{review.content}</Box>
                        </Grid>
                        <Grid item xs={12}>
                            <Box sx={{fontWeight: "italic"}}>{review.date}</Box>
                        </Grid>
                    </Grid>
                </Box>
            ))}
        </Container>

    );
}

export default ReviewsCard;