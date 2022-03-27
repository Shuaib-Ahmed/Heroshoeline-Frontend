import React from "react";

import {
  Navbar,
  AdminOrderNavbar,
  AdminOrderSection,
} from "../AdminComponents";

const AdminCancelledOrders = () => {
  return (
    <>
      <Navbar />
      <section style={{ minHeight: "100vh" }}>
        <AdminOrderNavbar />
        <h1 style={{ textAlign: "center", textDecorationLine: "underline" }}>
          Cancelled Order
        </h1>
        <AdminOrderSection status="cancelled" />
      </section>
    </>
  );
};

export default AdminCancelledOrders;
