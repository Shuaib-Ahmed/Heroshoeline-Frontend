import React from "react";

import { Footer, Navbar, UserOrderNavbar, UserOrderSection } from "../Components";

const UserCancelledOrders = () => {
  return (
    <>
      <Navbar />
      <section style={{ minHeight: "100vh", background: "#edf2f4" }}>
        <UserOrderNavbar />
        <h1 style={{ textAlign: "center", fontFamily: "Dancing Script" }}>
          Cancelled Order
        </h1>
        <UserOrderSection status="cancelled" />
      </section>

      <Footer />
    </>
  );
};

export default UserCancelledOrders;
