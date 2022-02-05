import React from 'react';
import {Container, IconButton} from "@mui/material";
import APIUrl from "../config/APIUrl";
import LoadingAnimation from "../components/layouts/LoadingAnimation"
import { useQuery } from 'react-query';
import PriceCard from '../components/PriceCard';
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import {useNavigate} from "react-router-dom";

function PricesPage(){
    let navigate = useNavigate();

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
                <IconButton onClick={goBack}>
                    <ArrowBackIosIcon />
                </IconButton>
            </Container>
    );

    function goBack() {
        navigate(-1);
    }

    return(
        <div>
            <IconButton sx={{marginTop: -0.6, marginBottom: -12, marginLeft: 5, position: 'fixed', zIndex: '100'}}
                        onClick={goBack}>
                <ArrowBackIosIcon/>
            </IconButton>
            <PriceCard
                pricesData={priceData.data}
            />
        </div>
    );
}

export default PricesPage;

