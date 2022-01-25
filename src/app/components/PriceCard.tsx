import React from "react";

import { Container, Paper, Table, TableBody, TableContainer, TableHead, TableRow } from "@mui/material";
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import palette from "../config/Colours";
import "./PriceCard.css";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.common.black,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.primary.light,
    },
    '&:nth-of-type(even)':{
        backgroundColor: theme.palette.secondary.light,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

function FormatType(ident : any){
    let converted: string = ident;
    converted = converted.toLowerCase();
    converted = converted.charAt(0).toUpperCase() + converted.slice(1);
    return converted;
}

function CalculateNewPrice(price : any, multiplier : any){
    return (price * multiplier).toFixed(2);
}

const theme = createTheme(palette)

function PriceCard(pricesData: any){

    return(
        <ThemeProvider theme={theme}>
            <Container
                className="PriceCard-Container"
                sx={{
                    pt: 8,
                    pb: 6,
                    position: "relative",
                }}
                maxWidth="md"
            >
                <h1>Eintrittspreise Kinovation</h1>
                <TableContainer component={Paper}>
                    <Table 
                        aria-label="pricesTable"
                        id="PriceCard-Table"
                    >
                        <TableHead>
                            <StyledTableRow>
                                <StyledTableCell>Bezeichnung</StyledTableCell>
                                <StyledTableCell>Normalpreis</StyledTableCell>
                                <StyledTableCell>Kinder u. 14 Jahren</StyledTableCell>
                                <StyledTableCell>Ermäßigt</StyledTableCell>
                            </StyledTableRow>
                        </TableHead>
                        <TableBody>
                            {pricesData.pricesData?.map((price : any) => (
                                <StyledTableRow key={price.id}>
                                    <StyledTableCell align="left">{FormatType(price.type)} €</StyledTableCell>
                                    <StyledTableCell align="left">{price.price} €</StyledTableCell>
                                    <StyledTableCell align="left">{CalculateNewPrice(price.price, 0.85)} €</StyledTableCell>
                                    <StyledTableCell align="left">{CalculateNewPrice(price.price, 0.9)} €</StyledTableCell>
                                </StyledTableRow>

                            ))}
                        </TableBody>

                    </Table>
                </TableContainer>
                <p><strong>Ermäßigung</strong> gewähren wir Studierenden, Azubis und Scherbehinderten.</p>
                <p><strong>SchülerInnen</strong> gewähren wir Montags - Donnerstags den Kinderpreis und am Wochenende den ermäßigten Eintrittspreis</p>
                <br/>
                <h2>Zuschläge</h2>
                <p>Bei Filmen in 3D erheben wir einen Zuschlag von 3,00€</p>

            </Container>
        </ThemeProvider>
    );
}

export default PriceCard;
