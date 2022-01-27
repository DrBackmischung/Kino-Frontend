import React from "react";

import { Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

function FormatType(ident : any){
    let converted: string = ident;
    converted = converted.toLowerCase();
    converted = converted.charAt(0).toUpperCase() + converted.slice(1);
    return converted;
}

function CalculateNewPrice(price : any, multiplier : any){
    return (price * multiplier).toFixed(2);
}

function PriceCard(pricesData: any){

    return(
        <Container
            sx={{
                bgcolor: "background.paper",
                pt: 8,
                pb: 6,
               position: "relative",
            }}
          maxWidth="md"
        >
            <h1>Eintrittspreise Kinovation</h1>
            <TableContainer component={Paper}>
                <Table aria-label="pricesTable">
                    <TableHead>
                        <TableRow>
                            <TableCell>Bezeichnung</TableCell>
                            <TableCell>Normalpreis</TableCell>
                            <TableCell>Kinder u. 14 Jahren</TableCell>
                            <TableCell>Ermäßigt</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {pricesData.pricesData?.map((price : any) => (
                            <TableRow key={price.id}>
                                <TableCell align="left">{FormatType(price.type)} €</TableCell>
                                <TableCell align="left">{price.price} €</TableCell>
                                <TableCell align="left">{CalculateNewPrice(price.price, 0.85)} €</TableCell>
                                <TableCell align="left">{CalculateNewPrice(price.price, 0.9)} €</TableCell>
                            </TableRow>

                        ))}
                    </TableBody>

                </Table>
            </TableContainer>
            <p><strong>Ermäßigung</strong> gewähren wir Studierenden, Azubis und Scherbehinderten.</p>
            <p><strong>SchülerInnen</strong> gewähren wir Montags - Donnerstags den Kinderpreis und am Wochenende den ermäßigten Eintrittspreis</p>
            <p>Tickets mit diesen Vergünstigungen sind nur beim Kaufen vor Ort erwerbbar.</p>
            <br/>
            <h2>Zuschläge</h2>
            <p>Bei Filmen in 3D erheben wir einen Zuschlag von 3,00€</p>

        </Container>
    );
}

export default PriceCard;
