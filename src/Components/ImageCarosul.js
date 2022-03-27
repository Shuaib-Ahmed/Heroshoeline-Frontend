import React from "react";
import styles from "./css/imageCarosul.module.css";

import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";

const ImageCarosul = ({ productData }) => {
  const { image_url_1, image_url_2, image_url_3, image_url_4 } = productData;
  return (
    <CarouselProvider
      naturalSlideWidth={10}
      naturalSlideHeight={10}
      totalSlides={4}
      infinite={true}
      className={styles.carouselContainer}
    >
      <Slider className={styles.slider}>
        <Slide index={0} className={styles.slide}>
          <img src={image_url_1} alt="Product Image" />
        </Slide>
        <Slide index={1} className={styles.slide}>
          <img src={image_url_2} alt="Product Image" />
        </Slide>
        <Slide index={2} className={styles.slide}>
          <img src={image_url_3} alt="Product Image" />
        </Slide>
        <Slide index={3} className={styles.slide}>
          <img src={image_url_4} alt="Product Image" />
        </Slide>
      </Slider>
      <ButtonBack className={styles.backBtn}>
        <i className="fas fa-chevron-circle-left"></i>
      </ButtonBack>
      <ButtonNext className={styles.nextBtn}>
        <i className="fas fa-chevron-circle-right"></i>
      </ButtonNext>
    </CarouselProvider>
  );
};

export default ImageCarosul;
