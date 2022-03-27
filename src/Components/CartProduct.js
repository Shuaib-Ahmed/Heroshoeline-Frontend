import React, { useEffect, useState, useCallback } from "react";
import styles from "./css/cartProduct.module.css";

import CartSummary from "./CartSummary";
import LoadingSpinner from "./LoadingSpinner";

import { BaseUrl } from "../Static/Data/data";
import { errorMessage, successMessage } from "../Static/Function/tostify";
import axios from "axios";

import { useNavigate } from "react-router-dom";

const CartProduct = () => {
  const authData = JSON.parse(localStorage.getItem("authData"));

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  const showProductDetails = (article_number, event) => {
    const id = event.target.id;
    if (id !== "remove") {
      navigate(`/item/${article_number}`);
    }
  };

  const removeHandler = useCallback(async (product_id) => {
    try {
      const url = `${BaseUrl}/cart/${product_id}`;
      const { data } = await axios.delete(url, {
        headers: { authorization: `Bearer ${authData.token}` },
      });

      if (!data.error) {
        successMessage(data.message);
        setData((prevData) => {
          const newData = prevData.filter(({ _id }) => _id !== product_id);
          return [...newData];
        });
      } else {
        errorMessage(data.message);
        navigate("/login");
      }
    } catch (error) {
      errorMessage("Somthing Went Wrong");
      navigate("/login");
    }
  }, []);

  useEffect(async () => {
    window.scrollTo(0,0);
    try {
      const url = `${BaseUrl}/cart`;
      const { data } = await axios.get(url, {
        headers: { authorization: `Bearer ${authData.token}` },
      });

      if (data.error) {
        errorMessage(data.message);
        navigate("/login");
      } else {
        const totalItem = data.responseData.length;
        let count = 0;
        const productData = [];

        data.responseData.forEach(async ({ product_id, quantity }) => {
          const url = `${BaseUrl}/items/${product_id}`;
          const { data } = await axios.get(url);

          productData.push({ ...data.responseData, quantity: quantity });
          if (count === totalItem - 1) {
            setData([...productData]);
          }

          count++;
        });

        setIsLoading(false);
      }
    } catch (error) {
      errorMessage("Please Log In To Access This Route");
      navigate("/login");
    }
  }, []);

  return (
    <>
      {isLoading && <LoadingSpinner />}

      {!isLoading && data.length > 0 && (
        <>
          <section className={styles.mainContainer}>
            {data.map((itemData, index) => {
              const {
                title,
                image_url_1,
                list_price,
                mrp,
                size,
                color,
                quantity,
                stock,
                article_number,
                _id,
              } = itemData;

              return (
                <div className={stock === 0 ? styles.wrapper : ""} key={index}>
                  {stock === 0 && (
                    <h3 className={styles.overlayText}>Out Of Stock</h3>
                  )}

                  <div
                    className={styles.productContainer}
                    onClick={showProductDetails.bind(this, article_number)}
                  >
                    <div className={styles.mainData}>
                      <img src={image_url_1} alt="Product Image" />
                      <p>{title}</p>
                    </div>
                    <div className={styles.moreData}>
                      <p>size : {size}</p>
                      <p>color : {color}</p>
                      <h3>
                        Price :
                        <span className={styles.redColor}>{list_price}</span>
                        <span className={styles.mrp}>{mrp}</span>
                      </h3>
                    </div>
                    <div>
                      <p>
                        Qunatity :{" "}
                        <span>
                          <i className="fa-solid fa-circle-plus"></i>
                        </span>{" "}
                        {quantity}{" "}
                        <span>
                          <i className="fa-solid fa-circle-minus"></i>
                        </span>
                      </p>
                    </div>
                    <button
                      className="btn red_btn"
                      onClick={() => removeHandler(_id)}
                      id="remove"
                    >
                      Remove
                    </button>

                    {stock === 0 && <div className={styles.overlay}></div>}

                    {quantity > stock && stock !== 0 && (
                      <h3>Only {stock} Stocks Avaliable</h3>
                    )}
                  </div>
                </div>
              );
            })}
          </section>

          <CartSummary data={data} />
        </>
      )}

      {!isLoading && data.length === 0 && (
        <section
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <h1>Found No Item In Cart</h1>
        </section>
      )}
    </>
  );
};

export default CartProduct;
