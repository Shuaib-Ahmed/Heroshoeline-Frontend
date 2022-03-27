import React, { useEffect, useState } from "react";
import styles from "./css/cartSummary.module.css";

import { useNavigate } from "react-router-dom";

const CartSummary = ({ data }) => {
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  const clickHandler = () => {
    navigate(`/checkout/${total}`);
  };

  useEffect(() => {
    let total = 0;
    data.forEach(({ quantity, list_price, stock }) => {
      if (stock) {
        if (quantity > stock) {
          total += stock * list_price;
        } else {
          total += quantity * list_price;
        }
      }
    });
    setTotal(total);
  }, [data]);

  return (
    <section className={styles.mainContainer}>
      <h1>Cart Summar</h1>

      {data.map((itemData, index) => {
        const { image_url_1, size, list_price, quantity, stock } = itemData;

        if (stock === 0) {
          return <div key={index}></div>;
        }

        return (
          <div className={styles.cardContainer} key={index}>
            <img src={image_url_1} alt="Product Image" />

            <div className={styles.mainDetail}>
              <h3>Size : {size}</h3>
            </div>

            <div className={styles.mainCalculation}>
              {stock >= quantity && (
                <h3>{`${quantity} * ${list_price} = ${
                  quantity * list_price
                }`}</h3>
              )}
              {stock < quantity && (
                <h3>{`${stock} * ${list_price} = ${stock * list_price}`}</h3>
              )}
            </div>
          </div>
        );
      })}

      <h1>TOTAL : {total} RS</h1>

      <button className="btn dark_btn" onClick={clickHandler}>
        Check Out
      </button>
    </section>
  );
};

export default CartSummary;
