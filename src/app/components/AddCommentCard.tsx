import { Container, CssBaseline, TextField, Button, Grid } from "@mui/material";
import React, { useState } from "react"
import APIUrl from "../config/APIUrl";

function AddCommentCard(props : any){
    const{movieId, userId} = props;

    

    const [reviewTitle, setReviewTitle] = useState("");
    const [reviewBody, setReviewBody] = useState("");

    const apiUrl = `${APIUrl.apiUrl}/review/add`;

    const addReview = async() => {
        const requestOptions = {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                date: new Date(),
                time: "12:00:00",
                header: reviewTitle,
                content: reviewBody,
                movieID : movieId,
                userID: userId.id
            }),
        };
        const response = await fetch(apiUrl, requestOptions).then(() => {
            setReviewTitle("");
            setReviewBody("");
        });
    }

    if(movieId === undefined || userId.id === undefined){
        return (
            <Container>
                <h2>Reviews</h2>
                <p>Bitte loggen sie sich ein um ein Review schreiben zu können!</p>
            </Container>
        );
    }

    return(
        <Container 
            sx={{
                bgcolor: "background.paper",
                pt: 8,
                pb: 6,
                position: "relative"
            }}
            maxWidth="md"
            >

            <CssBaseline/>
            <h2>Reviews</h2>
            <Grid container  sx={{m: 1.5}}>
                <Grid item xs={12} sx={{mb: 2}}>
                    <h3>Schreiben sie ein Review:</h3>
                </Grid>
                <Grid item xs={8} sx={{mb: 2}}>  
                    <TextField
                        required
                        fullWidth 
                        id="review-title"
                        label="Titel"
                        variant="outlined"
                        onChange={(e : any) => {
                            setReviewTitle(e.target.value);
                        }}
                        value={reviewTitle}/>
                </Grid>
                <Grid item xs={12} sx={{mb: 2}}>
                    <TextField
                        required
                        fullWidth
                        label="content"
                        id="review-content"
                        multiline
                        maxRows={5}
                        onChange={(e : any) => {
                            setReviewBody(e.target.value);
                        }}
                        value={reviewBody}
                    />
                </Grid>
                <Grid item xs={3}>
                    <Button
                        color="success"
                        variant="contained"
                        onClick={() => {
                            addReview();
                        }}
                    >Submit</Button>
                </Grid>

            </Grid> 

        </Container>
    )
}

export default AddCommentCard;
