import React from "react";
import styles from "./css/adminOrderNavbar.module.css";

import { NavLink } from "react-router-dom";

const AdminOrderNavbar = () => {
  return (
    <nav className={styles.navContainer}>
      <NavLink
        to="/admin_active_orders"
        className={({ isActive }) =>
          isActive ? styles.active : styles.inactive
        }
      >
        Active Order
      </NavLink>
      <NavLink
        to="/admin_shipped_orders"
        className={({ isActive }) =>
          isActive ? styles.active : styles.inactive
        }
      >
        Shipped Order
      </NavLink>
      <NavLink
        to="/admin_completed_orders"
        className={({ isActive }) =>
          isActive ? styles.active : styles.inactive
        }
      >
        Delivered Order
      </NavLink>
      <NavLink
        to="/admin_cancelled_orders"
        className={({ isActive }) =>
          isActive ? styles.active : styles.inactive
        }
      >
        Cancelled Order
      </NavLink>
    </nav>
  );
};

export default AdminOrderNavbar;
