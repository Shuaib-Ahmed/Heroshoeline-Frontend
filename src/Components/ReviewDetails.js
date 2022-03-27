import React from "react";
import styles from "./css/reviewDetail.module.css";

const ReviewDetails = ({ average_rating, total_rating }) => {
  return (
    <div className={styles.review_detail}>
      <p className={styles.average_rating}>
        {`${average_rating} / 5 `} <i className="fas fa-star"></i>
      </p>
      <p className={styles.total_rating}>{`${total_rating} reviews`}</p>
    </div>
  );
};

export default ReviewDetails;
