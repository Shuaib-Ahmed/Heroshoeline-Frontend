import React from "react";
import { Footer, Navbar, UserOrderNavbar, UserOrderSection } from "../Components";

const UserShippedOrders = () => {
  return (
    <>
      <Navbar />
      <section style={{ minHeight: "100vh", background: "#edf2f4" }}>
        <UserOrderNavbar />
        <h1 style={{ textAlign: "center", fontFamily: "Dancing Script" }}>
          Shipped Orders
        </h1>
        <UserOrderSection status="shipped" />
      </section>

      <Footer />
    </>
  );
};

export default UserShippedOrders;
