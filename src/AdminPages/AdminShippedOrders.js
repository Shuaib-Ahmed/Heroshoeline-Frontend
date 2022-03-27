import React from "react";

import {
  Navbar,
  AdminOrderNavbar,
  AdminOrderSection,
} from "../AdminComponents";

const AdminShippedOrders = () => {
  return (
    <>
      <Navbar />
      <section style={{ minHeight: "100vh" }}>
        <AdminOrderNavbar />
        <h1 style={{ textAlign: "center", textDecorationLine: "underline" }}>
          Shipped Order
        </h1>
        <AdminOrderSection status="shipped" />
      </section>
    </>
  );
};

export default AdminShippedOrders;
