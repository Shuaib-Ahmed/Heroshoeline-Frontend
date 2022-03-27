import React, { useEffect, useState } from "react";
import styles from "./css/productReview.module.css";

import ReviewSummary from "./ReviewSummary";

import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { BaseUrl } from "../Static/Data/data";
import axios from "axios";

const ProductReview = ({ article_number }) => {
  const [totalReview, setTotalReview] = useState(0);
  const [reviewData, setReviewData] = useState([]);
  const showReviewLimit = 5;

  const [open, setOpen] = useState(false);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  useEffect(async () => {
    try {
      const url = `${BaseUrl}/review/query/?article_number=${article_number}`;

      const { data } = await axios.get(url);
      const { responseData, totalReview } = data;

      setTotalReview(totalReview);
      setReviewData(responseData);
    } catch (error) {
      console.log(error);
    }
  }, [article_number]);

  return (
    <section className={styles.container}>
      <h1 className={styles.mainHeader}>Product Reviews</h1>

      <section className={styles.contentContainer}>
        {totalReview > 0 && reviewData.length > 0 && (
          <ReviewSummary totalReview={totalReview} reviewData={reviewData} />
        )}

        {reviewData.length > 0 && (
          <section className={styles.reviewContainer}>
            {reviewData.map(({ rating, comment }, index) => {
              let color;
              if (rating > 2) {
                color = "green";
              } else {
                if (rating === 2) {
                  color = "yellow";
                } else {
                  color = "red";
                }
              }

              if (index + 1 > showReviewLimit) return;

              return (
                <div key={index} className={styles.reviewInfo}>
                  <h3 style={{ background: color }}>
                    {rating} <i className="fas fa-star"></i>
                  </h3>
                  <p>{comment}</p>
                </div>
              );
            })}

            {totalReview > showReviewLimit && (
              <button className="btn dark_btn" onClick={onOpenModal}>
                Show All Reviews
              </button>
            )}
          </section>
        )}
      </section>

      <Modal open={open} onClose={onCloseModal} center>
        <section className={styles.modalContainer}>
          <section className={styles.reviewContainer}>
            {reviewData.map(({ rating, comment }, index) => {
              let color;
              if (rating > 2) {
                color = "green";
              } else {
                if (rating === 2) {
                  color = "yellow";
                } else {
                  color = "red";
                }
              }

              return (
                <div key={index} className={styles.reviewInfo}>
                  <h3 style={{ background: color }}>
                    {rating} <i className="fas fa-star"></i>
                  </h3>
                  <p>{comment}</p>
                </div>
              );
            })}
          </section>
        </section>
      </Modal>
    </section>
  );
};

export default ProductReview;
