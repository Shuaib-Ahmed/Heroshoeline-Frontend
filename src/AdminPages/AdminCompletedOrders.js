import React from "react";

import {
  Navbar,
  AdminOrderNavbar,
  AdminOrderSection,
} from "../AdminComponents";

const AdminCompletedOrders = () => {
  return (
    <>
      <Navbar />
      <section style={{ minHeight: "100vh" }}>
        <AdminOrderNavbar />
        <h1 style={{ textAlign: "center", textDecorationLine: "underline" }}>
          Completed Order
        </h1>
        <AdminOrderSection status="deleverd" />
      </section>
    </>
  );
};

export default AdminCompletedOrders;
