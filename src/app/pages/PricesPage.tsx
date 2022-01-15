import React from 'react';

import {Avatar, Checkbox, Container, CssBaseline, FormControlLabel, TextField} from "@mui/material";
import APIUrl from "../config/APIUrl";
import LoadingAnimation from "../components/layouts/LoadingAnimation"
import { useQuery } from 'react-query';
import PriceCard from '../components/PriceCard';

function PricesPage(){

    const apiUrlPrices = `${APIUrl.apiUrl}/price/getAll`;

    const priceData = useQuery("Prices", () => 
        fetch(apiUrlPrices).then((res) => res.json())  
    );

    while(priceData.isLoading)
       return(
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

    return(
        <div>
            <PriceCard
                pricesData={priceData.data}
            />
        </div>
    );
}

export default PricesPage;

