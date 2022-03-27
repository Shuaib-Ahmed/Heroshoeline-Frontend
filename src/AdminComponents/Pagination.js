import React from "react";
import styles from "./css/pagenation.module.css";

const Pagination = ({ page, totalPage, nextPage, prevPage }) => {
  const nextPageHandler = () => {
    nextPage();
  };
  const prevPageHandler = () => {
    prevPage();
  };
  return (
    <div className={styles.mainContainer}>
      {page !== 1 && (
        <button className="btn" onClick={prevPageHandler}>
          <i className="fas fa-chevron-circle-left"></i>
        </button>
      )}
      <p className={styles.pageContainer}>Page : {page}</p>
      {page !== totalPage && (
        <button className="btn" onClick={nextPageHandler}>
          <i className="fas fa-chevron-circle-right"></i>
        </button>
      )}
    </div>
  );
};

export default Pagination;
