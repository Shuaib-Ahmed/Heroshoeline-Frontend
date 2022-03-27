import React, { useState, useEffect } from "react";
import styles from "./css/showcase.module.css";

import ReviewDetails from "./ReviewDetails";
import useFetchCardData from "../hooks/useFetchCardData";
import LoadingSpinner from "./LoadingSpinner";

import { BaseUrl } from "../Static/Data/data";
import { Link } from "react-router-dom";
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";

const ShowCase = () => {
  const url = `${BaseUrl}/groupItems/query/?limit=3&skip=0`;
  const data = useFetchCardData(url);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    data.length === 0 ? setIsLoading(true) : setIsLoading(false);
  }, [data.length])

  return (
    <>
      {isLoading && <LoadingSpinner />}

      {!isLoading && (
        <CarouselProvider
          naturalSlideWidth={100}
          naturalSlideHeight={10}
          totalSlides={3}
          infinite={true}
          className={styles.carouselContainer}
        >
          <h1>Popular Products</h1>
          <Slider className={styles.slider}>
            {data.length > 0 &&
              data.map((itemData, index) => {
                const {
                  title,
                  description,
                  sku,
                  image_url_1,
                  total_rating,
                  average_rating,
                  article_number,
                } = itemData;
                return (
                  <Slide index={index} key={sku} className={styles.slide}>
                    <section className={styles.slider_content_container}>
                      <img src={image_url_1} alt="Product Image" />
                      <section className={styles.slide_content}>
                        <h3>{title}</h3>
                        <p>{description}</p>
                        <div className={styles.button_container}>
                          <ReviewDetails
                            total_rating={total_rating}
                            average_rating={average_rating}
                          />
                          <Link
                            to={`/item/${article_number}`}
                            className="btn red_btn"
                          >
                            Details
                          </Link>
                        </div>
                      </section>
                    </section>
                  </Slide>
                );
              })}
          </Slider>
          <ButtonBack className={styles.backBtn}>
            <i className="fas fa-chevron-circle-left"></i>
          </ButtonBack>
          <ButtonNext className={styles.nextBtn}>
            <i className="fas fa-chevron-circle-right"></i>
          </ButtonNext>
        </CarouselProvider>
      )}
    </>
  );
};

export default ShowCase;
