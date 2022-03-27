import React from "react";
import styles from "./css/pageLimit.module.css";

const PageLimit = ({ pageLimit }) => {
  const pageChoice = [10, 20, 30];

  const changeHandler = (event) => {
    pageLimit(event.target.value);
  };

  return (
    <div className={styles.mainContainer}>
      <p>Per Page : </p>
      <select onChange={changeHandler}>
        {pageChoice.map((choice) => (
          <option key={choice} value={choice}>
            {choice}
          </option>
        ))}
      </select>
    </div>
  );
};

export default PageLimit;
