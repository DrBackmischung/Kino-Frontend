import React from "react";
import {Grid, Rating, Typography} from "@mui/material";

function Ratings(props: any){
    const { ratingValue } = props;

    return(
        <div>
            <Grid container xs={12}>
                <Grid item xs={12} mt={2.5}>
                    {ratingValue === "NaN" ? (
                            <div>
                                <Typography sx={{ fontStyle: "italic" }}>Sorry, für diesen Film gibt es noch keine Bewertungen!</Typography>
                            </div>
                        ) : (
                        <Rating value={ratingValue} readOnly={true} precision={0.01}/>
                        )}
                </Grid>
            </Grid>
        </div>
    )
}

export default Ratings;