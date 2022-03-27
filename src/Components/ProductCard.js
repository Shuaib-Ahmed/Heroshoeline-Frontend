import React from "react";
import styles from "./css/productCard.module.css";

import { useNavigate } from "react-router-dom";

const ProductCard = ({
  img,
  title,
  average_rating,
  list_price,
  article_number
}) => {
  const navigate = useNavigate();
  const clickHandler = () => {
    navigate(`/item/${article_number}`)
  }
  return (
    <div className={styles.cardContainer} onClick={() => clickHandler()}>
      <img src={img} alt="Product Image" />
      <h3>{title}</h3>
      <div className={styles.infoContainer}>
        <div className={styles.averageReview}>
          {`${average_rating} / 5 `} <i className="fas fa-star"></i>
        </div>
        <div className={styles.price}>{`Price : ${list_price} RS`}</div>
      </div>
    </div>
  );
};

export default ProductCard;
