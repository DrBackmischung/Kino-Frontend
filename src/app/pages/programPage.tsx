import React from 'react';
import Container from "@mui/material/Container";
import {createTheme} from "@mui/material/styles";
const theme = createTheme();

function programPage(){
    return(
        <Container  sx={{bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
            position: "relative",
            marginTop: theme.spacing(12)
        }}
                    maxWidth="md">
        <div>program</div>
        </Container>
    )
}
export default programPage;