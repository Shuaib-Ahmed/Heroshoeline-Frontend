import React, { useEffect, useState } from "react";
import styles from "./css/productDetail.module.css";

import ReviewDetails from "./ReviewDetails";

import { useNavigate } from "react-router-dom";

import { BaseUrl } from "../Static/Data/data";
import { successMessage, errorMessage } from "../Static/Function/tostify";
import axios from "axios";

const ProductDetail = ({
  productData,
  groupData,
  sizes,
  changeCurrentIndex,
}) => {
  const { title, description, list_price, mrp, type, color, stock, _id } =
    productData;
  const { average_rating, total_rating } = groupData;
  const authData = JSON.parse(localStorage.getItem("authData"));

  const [cartQuantity, setCartQuantity] = useState(0);
  const [render, setRender] = useState(false);
  const navigate = useNavigate();

  const changeHandler = (event) => {
    const index = sizes.findIndex((size) => size === event.target.value);
    changeCurrentIndex(index);
  };

  const clickHandler = async () => {
    try {
      const url = `${BaseUrl}/cart`;

      const { data } = await axios.post(
        url,
        { product_id: _id },
        { headers: { authorization: `Bearer ${authData.token}` } }
      );

      const { error, message } = data;

      if (error) {
        errorMessage("Please Log In To Add Item In Cart");
        navigate("/login");
      } else {
        successMessage(message);
        setRender((prevState) => !prevState);
      }
    } catch (error) {
      errorMessage("Please Log In To Add Item In Cart");
      navigate("/login");
    }
  };

  useEffect(async () => {
    try {
      const url = `${BaseUrl}/cart/${_id}`;
      if (authData !== null) {
        const config = {
          headers: { authorization: `Bearer ${authData.token}` },
        };
        const { data } = await axios.get(url, { ...config });

        if (!data.error) {
          setCartQuantity(data.responseData.quantity);
        }
      }
    } catch (error) {}
  }, [render]);

  return (
    <section className={styles.mainConatiner}>
      {/* title */}
      <h3>{title}</h3>

      {/* price */}
      <div className={styles.priceContainer}>
        <h3 className={styles.mainPrice}>Price : {list_price}</h3>
        <h3 className={styles.cutPrice}>{mrp}</h3>
      </div>

      {/* More Details */}
      <div className={styles.moreDetail}>
        <p>Type : {type}</p>
        <p>Color : {color}</p>
        <div
          style={{ background: color.toLowerCase() }}
          className={styles.colorBox}
        ></div>
      </div>

      {/* sizes options */}
      <div className={styles.sizeContainer}>
        <label htmlFor="size">Size : </label>
        <select name="size" id="size" onChange={changeHandler}>
          {sizes.map((size, index) => (
            <option key={index} value={size}>
              {size}
            </option>
          ))}
        </select>
        {stock - cartQuantity > 0 && (
          <h3 className={styles.greenHeading}>Size Available</h3>
        )}
        {stock - cartQuantity <= 0 && (
          <h3 className={styles.redHeading}>Size Not Available</h3>
        )}
      </div>

      {/* buttons */}
      {stock - cartQuantity > 0 && (
        <div className={styles.buttonContainer}>
          <button className="btn red_btn" onClick={clickHandler}>
            Add To Cart <i className="fas fa-shopping-cart" />
          </button>
        </div>
      )}

      {/* reviews */}
      <ReviewDetails
        total_rating={total_rating}
        average_rating={average_rating}
      />

      {/* description */}
      <p>Description : {description}</p>
    </section>
  );
};

export default ProductDetail;
