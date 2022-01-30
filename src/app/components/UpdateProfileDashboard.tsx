import React from "react";
import { Grid, Typography, Button } from "@mui/material";

function UpdateProfileDashboard() {
  return (
    <Grid container xs={12} borderTop={"3px solid grey"}>
      <Grid item xs={12} spacing={3} paddingTop={5}>
        <Typography align="center" component="h1" variant="h5">Dashboard</Typography>
      </Grid>
      <Grid item xs={12} paddingTop={2}>
        <Button
          fullWidth
          key={"addCC"}
          onClick={() => {}}
          variant="contained"
        >
          Kreditkarte hinzufügen
        </Button>
      </Grid>
      <Grid item xs={12} paddingTop={2}> 
        <Button
          fullWidth
          key={"addCC"}
          onClick={() => {}}
          variant="contained"
        >
          Kreditkarte ändern
        </Button>
      </Grid>
      <Grid item xs={12} paddingTop={2}>
        <Button
          fullWidth
          key={"addCC"}
          onClick={() => {}}
          variant="contained"
        >
          Accountinformationen bearbeiten
        </Button>
      <Grid item xs={12} paddingTop={2}>
        <Button
          fullWidth
          key={"addCC"}
          onClick={() => {}}
          variant="contained"
        >
          Passwort ändern
        </Button>
      </Grid>
      </Grid>
    </Grid>
  );
}

export default UpdateProfileDashboard;
