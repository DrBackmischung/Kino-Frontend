import React from "react";
import { Carousel } from 'react-responsive-carousel';
import {CardMedia} from "@mui/material";
import ReactPlayer from "react-player";
import "./Slider.css";


function Slider(props: any) {
    const { selectedMovie } = props;

    const customRenderItem = (item: any, props: any) => <item.type {...item.props} {...props} />;

    const YoutubeSlide = ({ url, isSelected }: { url: string; isSelected?: boolean }) => (
        <ReactPlayer width="100%" url={url} playing={isSelected} style={{paddingTop: "20%"}}/>
    );

    return (
        <div className="carouselContainer">
            <Carousel className="carousel"  renderItem={customRenderItem}>
                <div>
                    <CardMedia
                        component="img"
                        sx={{
                           pl: "15%",
                        }}
                        src={selectedMovie?.pictureLink}
                        alt="poster"
                    />
                </div>
                <YoutubeSlide key="1" url={selectedMovie?.trailerLink}/>
            </Carousel>
        </div>
      );
}

export default Slider;