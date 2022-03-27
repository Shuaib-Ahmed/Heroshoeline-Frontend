import React from "react";
import styles from "./css/navbar.module.css";

import LogoIcon from "../Static/Images/logo_icon.png";

import { useNavigate, Link } from "react-router-dom";

const Navbar = () => {
  const authData = JSON.parse(localStorage.getItem("authData"));
  const navigate = useNavigate();

  const logHandler = () => {
    localStorage.removeItem("authData");
    navigate("/login");
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.nav_logo_container} onClick={() => navigate("/")}>
        <h3>Heroshoeline</h3>
        <img src={LogoIcon} alt="Logo Icon" />
      </div>
      {authData !== null && (
        <>
          <h3 className={styles.nav_message}>Welcome, {authData.name}</h3>
          <div className={styles.nav_icons_container}>
            <Link to="/active_orders">
              <i className="fas fa-user-circle" />
            </Link>
            <Link to="/cart">
              <i className="fas fa-shopping-cart" />
            </Link>
          </div>
        </>
      )}
      <button className="btn white_btn" onClick={logHandler}>
        {authData === null ? "Log In" : "Log Out"}
      </button>
    </nav>
  );
};

export default Navbar;
