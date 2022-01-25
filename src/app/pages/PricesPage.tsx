import React from 'react';
import {Container} from "@mui/material";
import APIUrl from "../config/APIUrl";
import LoadingAnimation from "../components/layouts/LoadingAnimation"
import { useQuery } from 'react-query';
import PriceCard from '../components/PriceCard';
import "./PricePage.css";

function PricesPage(){

    const apiUrlPrices = `${APIUrl.apiUrl}/price/getAll`;

    const priceData = useQuery("Prices", () => 
        fetch(apiUrlPrices).then((res) => res.json())  
    );

    while(priceData.isLoading)
       return(
            <Container
                className='PricePage-Container'
                sx={{
                    bgcolor: "background.paper",
                    pt: 8,
                    pb: 6,
                }}
                maxWidth="md"
            >
                <LoadingAnimation />

            </Container>
    );

    return(
        <div
            className='PricePage-div'>
            <PriceCard
                pricesData={priceData.data}
            />
        </div>
    );
}

export default PricesPage;

