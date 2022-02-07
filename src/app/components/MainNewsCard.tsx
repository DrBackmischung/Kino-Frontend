import * as React from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';



export default function MainNewsCard(props: any) {
    const { data } = props;
    const mainNews = data[0];

    return (
        <Paper
            sx={{
                position: 'relative',
                backgroundColor: 'grey.800',
                color: '#fff',
                p: 4,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundImage: `url("https://fink.hamburg/wp/wp-content/uploads/2017/10/Kino1_4-e1508491309800.jpg")`,
            }}
        >
            {/* Increase the priority of the hero background image */}
            {<img style={{ display: 'none' }} src="https://fink.hamburg/wp/wp-content/uploads/2017/10/Kino1_4-e1508491309800.jpg" alt={mainNews.imageText} />}
            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    right: 0,
                    left: 0,
                    backgroundColor: 'rgba(0,0,0,.3)',
                }}
            />
            <Grid container>
                <Grid item md={6}>
                    <Box
                        sx={{
                            position: 'relative',
                            p: { xs: 3, md: 6 },
                            pr: { md: 0 },
                        }}
                    >
                        <Typography component="h1" variant="h3" color="inherit" gutterBottom>
                            {mainNews.header}
                        </Typography>
                        <Typography variant="h5" color="inherit" align="justify">
                            {mainNews.content}
                        </Typography>
                    </Box>
                </Grid>
            </Grid>
        </Paper>
    );
}