import React from "react";
import { Grid, Typography } from "@mui/material";

function ProfileDetails(props: any) {
  const { selectedUser } = props;
  return (
    <Grid container xs={12} borderTop={"3px solid grey"}>
      <Grid item xs={12} spacing={3} paddingTop={5}>
        <Typography align="center" component="h1" variant="h5">Informationen</Typography>
      </Grid>
      <Grid item xs={12}>
        <p><b>Name:</b> {selectedUser?.name}, {selectedUser?.firstName}</p>
      </Grid>
      <Grid item xs={12}>
        <p><b>Mail:</b> {selectedUser?.email}</p>
      </Grid>
      <Grid item xs={12}>
        <p><b>Adresse:</b> {selectedUser?.street} {selectedUser?.number}, {selectedUser?.city?.plz} {selectedUser?.city?.city}</p>
      </Grid>
      <Grid item xs={12}>
        <p><b>Paypal:</b> {selectedUser?.payPalMail === null ? "Nein" : "Ja"}</p>
      </Grid>
      <Grid item xs={12}>
        <p><b>Kreditkarte:</b> {selectedUser?.creditCard === null ? "Nein" : "Ja"}</p>
      </Grid>
    </Grid>
  );
}

export default ProfileDetails;
