import React from "react";

import { Footer, Navbar, UserOrderNavbar, UserOrderSection } from "../Components";

const UserActiveOrders = () => {
  return (
    <>
      <Navbar />
      <section style={{ minHeight: "100vh", background: "#edf2f4" }}>
        <UserOrderNavbar />
        <h1 style={{ textAlign: "center", fontFamily: "Dancing Script" }}>
          Active Orders
        </h1>
        <UserOrderSection status="processing" />
      </section>

      <Footer />
    </>
  );
};

export default UserActiveOrders;
