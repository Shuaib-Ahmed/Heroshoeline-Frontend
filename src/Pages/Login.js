import React, { useState } from "react";
import styles from "./css/AuthForm.module.css";
import logo from "../Static/Images/logo_transparent.png";

import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import { LogInFormData, BaseUrl } from "../Static/Data/data";
import { successMessage, errorMessage } from "../Static/Function/tostify";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});

  const changeHandler = (event) => {
    setFormData((prevState) => {
      return { ...prevState, [event.target.name]: event.target.value };
    });
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.post(`${BaseUrl}/auth/login`, formData);

      if (!data.error) {
        localStorage.setItem("authData", JSON.stringify(data.responseData));
        successMessage(data.message);
        data.responseData.isAdmin
          ? navigate("/admin_active_orders")
          : navigate("/");
      } else {
        errorMessage(data.message);
      }
    } catch (error) {
      errorMessage(`Somthing Went Wrong Please Try Again`);
    }
  };

  return (
    <div className={styles.auth_outter_container}>
      <section className={styles.auth_inner_container}>
        <img src={logo} alt="Logo Image" className={styles.auth_logo} />

        <header className={styles.auth_header}>
          <h1>Log In</h1>
        </header>

        <form className={styles.auth_form} onSubmit={submitHandler}>
          {LogInFormData.map(
            ({ htmlFor, name, type, id, placeholder }, index) => {
              return (
                <div key={index}>
                  <label htmlFor={htmlFor}>{htmlFor.toUpperCase()} : </label>
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
            }
          )}
          <button type="submit" className={styles.auth_button}>
            Log In
          </button>

          <h3>
            Don't have an account ? <Link to="/signup">Sign Up</Link>
          </h3>

          <h3><Link to="/send_email">Forgot Password ?</Link></h3>
        </form>
      </section>
    </div>
  );
};

export default Login;
