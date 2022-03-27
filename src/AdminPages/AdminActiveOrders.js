import React from "react";

import {
  Navbar,
  AdminOrderNavbar,
  AdminOrderSection,
} from "../AdminComponents";

const AdminActiveOrders = () => {
  return (
    <>
      <Navbar />
      <section style={{ minHeight: "100vh" }}>
        <AdminOrderNavbar />
        <h1 style={{ textAlign: "center", textDecorationLine: "underline" }}>
          Active Order
        </h1>
        <AdminOrderSection status="processing" />
      </section>
    </>
  );
};

export default AdminActiveOrders;
