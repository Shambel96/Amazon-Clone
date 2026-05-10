import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { img } from "./Img/data";
import classes from "./Carousel.module.css";

function CarouselEffect() {
  return (
    <div className={classes.carousel}>
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        showThumbs={false}
        showIndicators={false}
        showStatus={false}
      >
        {img.map((imgLink, index) => (
          <img key={index} src={imgLink} alt={`Slide ${index + 1} image`} />
        ))}
      </Carousel>
      <div className={classes.hero_img}></div>
    </div>
  );
}

export default CarouselEffect;
