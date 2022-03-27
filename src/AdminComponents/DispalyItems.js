import React, { useContext, useEffect } from "react";
import styles from "./css/displayItems.module.css";

import Pagination from "./Pagination";
import PageLimit from "./PageLimit";
import SearchProduct from "./SearchProduct";
import LoadingSpinner from "../Components/LoadingSpinner";

import { errorMessage, successMessage } from "../Static/Function/tostify";
import { BaseUrl } from "../Static/Data/data";

import { ManageItemContext } from "../context/ManageItemContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const DispalyItems = () => {
  const navigate = useNavigate();
  const {
    data,
    page,
    limit,
    articleNumber,
    totalPages,
    isLoading,
    reRender,
    setNextPage,
    setPrevPage,
    setPageLimit,
    setNumber,
  } = useContext(ManageItemContext);

  const nextPage = () => {
    setNextPage();
  };

  const prevPage = () => {
    setPrevPage();
  };

  const pageLimit = (limit) => {
    setPageLimit(limit);
  };

  const searchProduct = (article_number) => {
    setNumber(article_number);
  };

  const editHandler = (productId) => {
    navigate(`/update_items/${productId}`);
  };

  const updateGroupItems = async (productId, article_number) => {
    try {
      const url = `${BaseUrl}/groupItems`;

      const { data } = await axios.patch(url, {
        product_id: productId,
        article_number: article_number,
      });

      const { error, message } = data;

      error ? errorMessage(message) : successMessage(message);
    } catch (error) {
      errorMessage("Somthing Went Wrong Try Again");
    }
  };

  const deleteHandler = async (productId, article_number) => {
    try {
      if (window.confirm("Are You Sure You Want To Delete This")) {
        await axios.delete(`${BaseUrl}/items/${productId}`);
        updateGroupItems(productId, article_number);
        reRender();
        successMessage("Successfully Deleted");
      }
    } catch (error) {
      errorMessage("Somthing Went Wrong Try Again");
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    reRender();
  }, []);

  return (
    <>
      <SearchProduct
        searchProduct={searchProduct}
        defaultValue={articleNumber}
      />

      {isLoading && <LoadingSpinner />}

      {!isLoading && data.length > 0 && (
        <>
          <section className={styles.mainContainer}>
            {data !== undefined &&
              data.map((itemData) => {
                const { image_url_1, sku, article_number, stock, _id } =
                  itemData;
                return (
                  <div key={sku} className={styles.itemContainer}>
                    <img src={image_url_1} alt="Product image" />
                    <div className={styles.itemContent}>
                      <p>SKU : {sku}</p>
                      <p>Article Number : {article_number}</p>
                      <p>Stocks: {stock}</p>
                    </div>
                    <div className={styles.buttonContainer}>
                      <button
                        className={`btn ${styles.edit_btn}`}
                        onClick={() => editHandler(_id)}
                      >
                        <i className="fas fa-pencil-alt">Edit</i>
                      </button>
                      <button
                        className={`btn ${styles.delete_btn}`}
                        onClick={() => deleteHandler(_id, article_number)}
                      >
                        <i className="fas fa-trash-alt">Delete</i>
                      </button>
                    </div>
                  </div>
                );
              })}
          </section>

          <Pagination
            page={page}
            totalPage={totalPages}
            nextPage={nextPage}
            prevPage={prevPage}
          />

          <PageLimit pageLimit={pageLimit} />
        </>
      )}

      {!isLoading && data.length === 0 && (
        <h1 style={{ textAlign: "center" }}>No Product Found</h1>
      )}
    </>
  );
};

export default DispalyItems;
