import React from "react";
import { Grid, Typography } from "@mui/material";

function CreditCardDetails(props: any) {
  const { selectedUser } = props;
  return (
    <Grid container xs={12} borderTop={"3px solid grey"}>
      <Grid item xs={12} spacing={3} paddingTop={5}>
        <Typography align="center" component="h1" variant="h5">Kreditkarte</Typography>
      </Grid>
      <Grid item xs={12}>
        <p><b>Karteninhaber:in:</b> {selectedUser?.creditCard === null ? "/" : selectedUser?.creditCard?.name+", "+selectedUser?.creditCard?.firstName}</p>
      </Grid>
      <Grid item xs={12}>
        <p><b>Kartennummer:</b> {selectedUser?.creditCard === null ? "/" : selectedUser?.creditCard?.cardNumber}</p>
      </Grid>
      <Grid item xs={12}>
        <p><b>Gültig bis:</b> {selectedUser?.creditCard === null ? "/" : selectedUser?.creditCard?.expiryMonth+"/"+selectedUser?.creditCard?.expiryYear}</p>
      </Grid>
    </Grid>
  );
}

export default CreditCardDetails;
