import React, { useContext, useEffect } from "react";
import styles from "./css/allProduct.module.css";

import { Navbar, ProductFilters, LoadingSpinner, Footer } from "../Components";
import ProductCard from "../Components/ProductCard";
import Pagination from "../AdminComponents/Pagination";

import { ProductContext } from "../context/ProductContext";

const AllProduct = () => {
  const { productData, page, totalPages, setNextPage, setPrevPage, isLoading } =
    useContext(ProductContext);

  const showNextPage = () => setNextPage();
  const showPrevPage = () => setPrevPage();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  return (
    <section className={styles.container}>
      <Navbar />
      <ProductFilters />

      {isLoading && <LoadingSpinner />}

      {!isLoading && productData.length > 0 && (
        <>
          <section className={styles.productContainer}>
            {productData.map((itemData, index) => {
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

          <Pagination
            page={page}
            totalPage={totalPages}
            nextPage={showNextPage}
            prevPage={showPrevPage}
          />
        </>
      )}

      {!isLoading && productData.length === 0 && (
        <h1 style={{ textAlign: "center" }}>No Product Found</h1>
      )}

      <Footer />
    </section>
  );
};

export default AllProduct;
