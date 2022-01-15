import React from 'react';

import Grid from "@mui/material/Grid";
import {Avatar, Checkbox, Container, CssBaseline, FormControlLabel, TextField} from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Link from '@mui/material/Link';
import { makeStyles } from '@mui/styles';
import {createTheme} from "@mui/material/styles";
import LockIcon from '@mui/icons-material/Lock';
import colours from '../config/Colours';
import APIUrl from "../config/APIUrl";
import LoadingAnimation from "../components/layouts/LoadingAnimation"
import { useQuery } from 'react-query';
import PriceCard from '../components/PriceCard';

function PricesPage(){

    const theme = createTheme();

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

