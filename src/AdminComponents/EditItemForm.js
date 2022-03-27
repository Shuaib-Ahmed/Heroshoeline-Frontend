import React, { useEffect, useState } from "react";

import styles from "./css/createItemForm.module.css";

import { ItemFormData, BaseUrl } from "../Static/Data/data";
import { errorMessage, successMessage } from "../Static/Function/tostify";

import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const EditItemForm = ({ productId }) => {
  const [formData, setFormData] = useState(undefined);
  const [changeData, setChangeData] = useState({});
  const navigate = useNavigate();

  const changeHandler = (event) => {
    setChangeData((prevState) => {
      return { ...prevState, [event.target.id]: event.target.value };
    });
    setFormData((prevState) => {
      return { ...prevState, [event.target.id]: event.target.value };
    });
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      if (Object.keys(changeData).length === 0) {
        errorMessage("You Din't Change Any Fields");
        return;
      }
      const url = `${BaseUrl}/items/${productId}`;
      const { data } = await axios.patch(url, { ...changeData });

      const { error, message } = data;

      if (!error) {
        successMessage(message);
        navigate("/manage_items");
      } else {
        errorMessage(message);
      }
    } catch (error) {
      errorMessage("Somthing Went Wrong Try Again");
    }
  };

  useEffect(async () => {
    try {
      const url = `${BaseUrl}/items/${productId}`;

      const { data } = await axios.get(url);

      if (!data.error) {
        setFormData({ ...data.responseData });
      }
    } catch (error) {
      errorMessage("Somthing Went Wrong");
    }
  }, []);

  return (
    <section>
      {formData !== undefined && (
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
                    value={formData[id]}
                  />
                </div>
              );
            } else {
              return (
                <div key={id}>
                  <label htmlFor={htmlFor}>
                    {name.replace("_", " ").toUpperCase()}
                  </label>
                  <select
                    name={name}
                    id={id}
                    required
                    onChange={changeHandler}
                    value={formData[id]}
                  >
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
              value={formData["description"]}
            />
          </div>

          <div className={styles.button_container}>
            <button type="submit" className="btn green_btn">
              update
            </button>
            <Link to="/manage_items" className="btn red_btn">
              Cancel
            </Link>
          </div>
        </form>
      )}
    </section>
  );
};

export default EditItemForm;
