import React, { useState, useContext } from "react";
import Styles from "./css/productFilter.module.css";

import { ProductContext } from "../context/ProductContext";

import { colorArray } from "../Static/Data/data";

const ProductFilters = () => {
  const types = ["All", "Flat", "Heel", "Bellie"];

  const { changeFilters, filters } = useContext(ProductContext);

  const [filterData, setFilterData] = useState(filters);

  const changeHandler = (event) => {
    setFilterData((prevState) => {
      return { ...prevState, [event.target.id]: event.target.value };
    });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    changeFilters(filterData);
  };

  return (
    <form onSubmit={submitHandler} className={Styles.formContainer}>
      <h3>Filter Options</h3>
      <div>
        <label htmlFor="color">Color</label>
        <select
          name="color"
          id="color"
          onChange={changeHandler}
          defaultValue={filters.color}
        >
          <option>All</option>
          {colorArray.map((color, index) => (
            <option key={index}>{color}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="type">Type</label>
        <select
          name="type"
          id="type"
          onChange={changeHandler}
          defaultValue={filters.type}
        >
          {types.map((type, index) => (
            <option key={index}>{type}</option>
          ))}
        </select>
      </div>

      <button type="submit">Apply</button>
    </form>
  );
};

export default ProductFilters;
