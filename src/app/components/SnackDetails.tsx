import React from "react";
import { Grid, Typography, Card, CardContent } from "@mui/material";

function SnackDetails(props: any) {
  const { selectedBooking } = props;
  return (
    <Grid container xs={12} borderTop={"3px solid grey"}>
      <Grid item xs={12} spacing={3} paddingTop={5}>
        <Typography align="center" component="h1" variant="h5">Snacks</Typography>
      </Grid>
      {selectedBooking.snacks.map(
          (t: any) => (
          <Grid item xs={12} padding={2}>
              <Card sx={{ display: 'flex' }}>
              <CardContent>
                  <p><b>{t.product}</b> {t.size}</p>
              </CardContent>
              </Card>
          </Grid> 
          )
      )}
    </Grid>
  );
}

export default SnackDetails;
