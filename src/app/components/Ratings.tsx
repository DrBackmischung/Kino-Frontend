import React from "react";
import {Rating} from "@mui/material";

function Ratings(props: any){
    const { ratingValue } = props;

    return(
        <div>
            <h3>Rating:</h3>
            <Rating value={ratingValue} readOnly={true} precision={0.5}/>
        </div>
    )
}

export default Ratings;