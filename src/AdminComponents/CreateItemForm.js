import React, { useState } from "react";
import styles from "./css/createItemForm.module.css";

import { ItemFormData, BaseUrl } from "../Static/Data/data";
import { errorMessage, successMessage } from "../Static/Function/tostify";

import { Link } from "react-router-dom";
import axios from "axios";

const CreateItemForm = () => {
  const [formData, setFormData] = useState({
    size: "2",
    color: "Beige",
    type: "Flat",
  });

  const changeHandler = (event) => {
    setFormData((prevState) => {
      return { ...prevState, [event.target.id]: event.target.value };
    });
  };

  const groupItems = async (groupData) => {
    try {
      const url = `${BaseUrl}/groupItems`;
      const { data } = await axios.post(url, { ...groupData });

      const { error, message } = data;

      error ? errorMessage(message) : successMessage(message);
    } catch (error) {
      errorMessage("Somthing Went Wrong Please Try Again");
    }
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      const url = `${BaseUrl}/items`;

      const { data } = await axios.post(url, { ...formData });

      const { error, message, responseData } = data;

      if (error) {
        errorMessage(message);
      } else {
        successMessage(message);
        const { article_number, style_code, _id } = responseData;

        const groupData = {
          article_number,
          style_code,
          product_ids: [_id],
        };

        groupItems(groupData);
      }
    } catch (error) {
      errorMessage("Somthing Went Wrong Please Try Again");
    }
  };

  return (
    <section>
      <form className={styles.create_item_form} onSubmit={submitHandler}>
        {ItemFormData.map((data) => {
          const { htmlFor, name, id, type, placeholder, options } = data;
          if (options === undefined) {
            return (
              <div key={id}>
                <label htmlFor={htmlFor}>
                  {name.replace("_", " ").toUpperCase()}
                </label>
                <input
                  type={type}
                  name={name}
                  id={id}
                  placeholder={placeholder}
                  required
                  onChange={changeHandler}
                />
              </div>
            );
          } else {
            return (
              <div key={id}>
                <label htmlFor={htmlFor}>
                  {name.replace("_", " ").toUpperCase()}
                </label>
                <select name={name} id={id} required onChange={changeHandler}>
                  {options.map((value) => {
                    return (
                      <option value={value.replace("-", " ")} key={value}>
                        {value}
                      </option>
                    );
                  })}
                </select>
              </div>
            );
          }
        })}

        <div className={styles.textarea_container}>
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            id="description"
            placeholder="Enter Product Description"
            onChange={changeHandler}
          />
        </div>

        <div className={styles.button_container}>
          <button type="submit" className="btn dark_btn">
            Craete
          </button>
          <Link
            to="/admin_active_orders"
            className="btn red_btn"
          >
            Cancel
          </Link>
        </div>
      </form>
    </section>
  );
};

export default CreateItemForm;
