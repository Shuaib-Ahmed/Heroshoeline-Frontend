import React from "react";
import styles from "./css/loadingSpinner.module.css";

const LoadingSpinner = () => {
  return (
    <section className={styles.container}>
      <div className={styles.lds_ring}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </section>
  );
};

export default LoadingSpinner;
