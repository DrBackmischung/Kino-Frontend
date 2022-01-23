import { ClassNames } from "@emotion/react";
import { Container, CssBaseline, TextField, Button } from "@mui/material";
import React, { useState } from "react"
import APIUrl from "../config/APIUrl";

function AddCommentCard(){

    const reviewTitle = useState("");
    const reviewBody = useState("");

    const apiUrl = `${APIUrl.apiUrl}/review/add`;

    const addReview = async() => {
        const requestOptions = {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                date: Date.now,
                time: "12:00:00",
                header: reviewTitle,
                content: reviewBody,
                movieID : "",
                userID: ""
            }),
        };
        const response = await fetch(apiUrl, requestOptions);
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

            <form noValidate>
                <TextField 
                    id="review-title"
                    label="Title"
                    variant="outlined"
                    value={reviewTitle}/>
                <TextField
                    label="content"
                    id="review-content"
                    multiline
                    maxRows={5}
                    value={reviewBody}
                />
                <Button
                    onClick={() => {
                        addReview();
                    }}>
                    Submit
                </Button>


            </form>  

        </Container>
    )
}

export default AddCommentCard;