import React from 'react';
import {createTheme} from "@mui/material/styles";
import Container from "@mui/material/Container";
const theme = createTheme();

function eventsPage(){
    return(
        <Container  sx={{bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
            position: "relative",
            marginTop: theme.spacing(12)
        }}
                    maxWidth="md">
            <div>events</div>
        </Container>
    )
}
export default eventsPage;