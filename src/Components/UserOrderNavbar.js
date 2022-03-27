import React from "react";
import styles from "./css/userOrderNavbar.module.css";

import { NavLink } from "react-router-dom";

const UserOrderNavbar = () => {
  return (
    <nav className={styles.navContainer}>
      <NavLink
        to="/active_orders"
        className={({ isActive }) =>
          isActive ? styles.active : styles.inactive
        }
      >
        Active Order
      </NavLink>
      <NavLink
        to="/shipped_orders"
        className={({ isActive }) =>
          isActive ? styles.active : styles.inactive
        }
      >
        Shipped Order
      </NavLink>
      <NavLink
        to="/deliverd_orders"
        className={({ isActive }) =>
          isActive ? styles.active : styles.inactive
        }
      >
        Delivered Order
      </NavLink>
      <NavLink
        to="/cancelled_orders"
        className={({ isActive }) =>
          isActive ? styles.active : styles.inactive
        }
      >
        Cancelled Order
      </NavLink>
    </nav>
  );
};

export default UserOrderNavbar;
