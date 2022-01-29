import React from "react";
import { Carousel } from "react-responsive-carousel";
import { CardMedia } from "@mui/material";
import ReactPlayer from "react-player";
import "./Slider.css";

function Slider(props: any) {
  const { selectedMovie } = props;

  const customRenderItem = (item: any, props: any) => (
      <item.type {...item.props} {...props} />
  );

  const YoutubeSlide = ({
                          url,
                          isSelected,
                        }: {
    url: string;
    isSelected?: boolean;
  }) => (
      <ReactPlayer
          width="100%"
          url={url}
          playing={isSelected}
          controls={true}
          style={{ marginTop: "30%" }}
      />
  );

  return (
      <div className="carouselContainer">
        <Carousel className="carousel" renderItem={customRenderItem} showArrows={true} showThumbs={false}>
          <div>
            <CardMedia
                component="img"
                src={selectedMovie?.pictureLink}
                alt="poster"
            />
          </div>
          <YoutubeSlide key="1" url={selectedMovie?.trailerLink} />
        </Carousel>
      </div>
  );
}

export default Slider;