import React from "react";
import styles from "./css/similarProductSection.module.css";

import ProductCard from "./ProductCard";

import useFetchCardData from "../hooks/useFetchCardData";

import { BaseUrl } from "../Static/Data/data";

const SimilarProductSection = ({ style_code }) => {
  const url = `${BaseUrl}/groupItems/query/?limit=10&skip=0&style_code=${style_code}`;

  const data = useFetchCardData(url);

  return (
    <>
      {data.length > 0 && (
        <section className={styles.mainContainer}>
          <h1>Simillar Products</h1>
          <section className={styles.productContainer}>
            {data.map((itemData, index) => {
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

export default SimilarProductSection;
