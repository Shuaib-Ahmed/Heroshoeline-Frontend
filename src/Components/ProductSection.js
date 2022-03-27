import React, { useState, useEffect } from "react";
import styles from "./css/productSection.module.css";

import useFetchCardData from "../hooks/useFetchCardData";
import ProductCard from "./ProductCard";
import LoadingSpinner from "./LoadingSpinner";

const ProductSection = ({ url, type, title, color }) => {
  const data = useFetchCardData(url);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    data.length === 0 ? setIsLoading(true) : setIsLoading(false);
  }, [data.length]);

  return (
    <>
      {isLoading && <LoadingSpinner />}

      {!isLoading && (
        <section
          style={{ background: color }}
          className={styles.sectionContainer}
        >
          <header className={styles.sectionHeader}>
            <h3>{title}</h3>
          </header>
          <section className={styles.productContainer}>
            {data.length &&
              data.map((itemData, index) => {
                const {
                  image_url_1,
                  title,
                  average_rating,
                  list_price,
                  article_number,
                } = itemData;
                return (
                  <ProductCard
                    key={index}
                    img={image_url_1}
                    title={title}
                    average_rating={average_rating}
                    list_price={list_price}
                    article_number={article_number}
                  />
                );
              })}
          </section>
        </section>
      )}
    </>
  );
};

export default ProductSection;
