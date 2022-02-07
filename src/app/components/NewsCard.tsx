import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';


function NewsCard(props: any) {
    const { filter, data } = props;
    
    let formattedDate: any = (newsDate: any) => {
        const newsDateFormatted = new Date(newsDate).toLocaleDateString(undefined, {
            weekday: "long",
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });
        return newsDateFormatted;
    };

    return (
        <Grid container spacing={4} sx={{
            pt: "4%",
            pb: "4%"
        }} >
            {data?.slice(1).map((item: any) =>
                (item.header.toLowerCase().includes(filter)|| item.content.toLowerCase().includes(filter)) && (
                 <Grid item key={item.header} xs={12} md={12}>
                    <CardActionArea component="a" href="#">
                        <Card sx={{ display: 'flex', backgroundColor: "#ba8434" }}>
                            <CardMedia
                                component="img" 
                                sx={{ width: 160, display: { xs: 'none', sm: 'block' } }}
                                image={item.pictureLink}
                                alt="imageLabel"
                            />
                            <CardContent sx={{ flex: 1 }}>
                                <Typography component="h2" variant="h5">
                                    {item.header}
                                </Typography>
                                <Typography variant="subtitle1" color="text.secondary">
                                    {formattedDate(item.date)}
                                </Typography>
                                <Typography variant="subtitle1" paragraph>
                                    {item.content}
                                </Typography>
                            </CardContent>
                        </Card>
                    </CardActionArea>
                </Grid>
                ))}
        </Grid>
    );
}

export default NewsCard;