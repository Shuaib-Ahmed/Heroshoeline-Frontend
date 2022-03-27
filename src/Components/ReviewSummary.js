import React, { useEffect, useState } from "react";
import styles from "./css/reviewSummary.module.css";

const ReviewSummary = ({ totalReview, reviewData }) => {
  const [reviewCounts, setReviewCounts] = useState([]);

  useEffect(() => {
    const reviewCountArray = [0, 0, 0, 0, 0];

    reviewData.map(({ rating }) => {
      if (reviewCountArray[rating - 1] === 0) {
        reviewCountArray[rating - 1] = 1;
      } else {
        reviewCountArray[rating - 1] += 1;
      }
    });

    setReviewCounts(reviewCountArray.reverse());
  }, [reviewData]);

  return (
    <section>
      {reviewCounts.map((total, index) => {
        const filledWith = (120 / totalReview) * total;
        const unFilledWidth = 120 - filledWith;

        let color;
        if(index < 3){
          color = 'green';
        }else{
          if(index == 3){
            color = 'yellow';
          }
          else{
            color = 'red';
          }
        }

        return (
          <div key={index} className={styles.summaryDetails}>
            <h3>
              {5 - index} <i className="fas fa-star"></i>
            </h3>
            <div className={styles.progressBar}>
              <div
                style={{
                  width: filledWith,
                  background: color,
                  height: "10px",
                }}
              ></div>
              <div
                style={{
                  width: unFilledWidth,
                  background: "white",
                  height: "10px",
                }}
              ></div>
            </div>
            <h3>{total}</h3>
          </div>
        );
      })}
    </section>
  );
};

export default ReviewSummary;
