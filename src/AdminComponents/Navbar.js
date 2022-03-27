import React from "react";
import styles from "./css/navbar.module.css";

import LogoIcon from "../Static/Images/logo_icon.png";

import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const authData = JSON.parse(localStorage.getItem("authData"));
  const navigate = useNavigate();

  const logHandler = () => {
    localStorage.removeItem("authData");
    navigate("/login");
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.nav_logo_container}>
        <h3>Heroshoeline</h3>
        <img src={LogoIcon} alt="Logo Icon" />
      </div>
      <div className={styles.nav_Links}>
        <Link to="/list_items">List Items</Link>
        <Link to="/manage_items">Manage Items</Link>
        <Link to="/admin_active_orders">Orders</Link>
        <Link to="/analytics">Analytics</Link>
        <button className="btn dark_btn" onClick={logHandler}>
          {authData === null ? "Log In" : "Log Out"}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
