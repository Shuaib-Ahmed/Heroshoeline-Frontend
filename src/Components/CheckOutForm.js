import React, { useState, useEffect } from "react";
import styles from "./css/checkOutForm.module.css";

import axios from "axios";

import { ShippingFormData } from "../Static/Data/data";
import { BaseUrl } from "../Static/Data/data";
import { errorMessage, successMessage } from "../Static/Function/tostify";

import { useNavigate } from "react-router-dom";

const CheckOutForm = ({ total }) => {
  const authData = JSON.parse(localStorage.getItem("authData"));
  const config = { headers: { authorization: `Bearer ${authData.token}` } };
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  const changeHandler = (event) => {
    setFormData((prevState) => ({
      ...prevState,
      [event.target.id]: event.target.value,
    }));
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    const url = `${BaseUrl}/order`;
    try {
      const { data } = await axios.post(
        url,
        { shipping_data: { ...formData } },
        { ...config }
      );

      if (data.error) {
        errorMessage(data.message);
        navigate("/login");
      } else {
        successMessage(data.message);
        navigate("/active_orders");
      }
    } catch (error) {
      console.log(error);
      errorMessage("Somthing Went Wrong");
      navigate("/login");
    }
  };

  useEffect(() => {
    window.scrollTo(0,0);
    if (total == 0) {
      errorMessage("Item Not Available For Purchase");
      navigate("/cart");
    }
  }, []);

  return (
    <form className={styles.mainContainer} onSubmit={submitHandler}>
      <h1>Shipping Details</h1>

      {ShippingFormData.map((formData, index) => {
        const { htmlFor, type, name, id, placeholder } = formData;

        return (
          <div className={styles.formChild} key={index}>
            <label htmlFor={htmlFor}>
              {name.replace("_", " ").toUpperCase()}
            </label>
            <input
              type={type}
              id={id}
              name={name}
              placeholder={placeholder}
              required
              onChange={changeHandler}
            />
          </div>
        );
      })}

      <h1>Total : {total} RS</h1>

      <button type="submit" className="btn green_btn">
        Conform Order
      </button>
    </form>
  );
};

export default CheckOutForm;
