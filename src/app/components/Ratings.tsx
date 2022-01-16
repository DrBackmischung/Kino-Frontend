import React from "react";
import {Grid, Rating} from "@mui/material";

function Ratings(props: any){
    const { ratingValue } = props;

    return(
        <div>
            <Grid container columns={5}>
                <Grid item xs={1}>
                    <h3>Rating:</h3>
                </Grid>
                <Grid item xs={4} mt={2.5}>
                    <Rating value={ratingValue} readOnly={true} precision={0.5}/>
                </Grid>
            </Grid>
        </div>
    )
}

export default Ratings;