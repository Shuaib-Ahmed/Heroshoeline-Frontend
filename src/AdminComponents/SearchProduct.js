import React, { useState } from "react";
import styles from "./css/searchProduct.module.css";

const SearchProduct = ({searchProduct, defaultValue}) => {
  const [data, setData] = useState(defaultValue);

  const changeHandler = (event) => {
    setData(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    searchProduct(data);
  };
  return (
    <form onSubmit={submitHandler} className={styles.mainContainer}>
      <input
        type="text"
        name="article_number"
        placeholder="Enter Article Number Of Product"
        onChange={changeHandler}
        value={data}
      />
      <button type="submit" className="btn dark_btn">Search</button>
    </form>
  );
};

export default SearchProduct;
