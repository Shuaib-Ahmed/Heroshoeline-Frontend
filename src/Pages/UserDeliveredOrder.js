import React from "react";

import { Footer, Navbar, UserOrderNavbar, UserOrderSection } from "../Components";

const UserDeliveredOrder = () => {
  return (
    <>
      <Navbar />
      <section style={{ minHeight: "100vh", background: "#edf2f4" }}>
        <UserOrderNavbar />
        <h1 style={{ textAlign: "center", fontFamily: "Dancing Script" }}>
          delevered Order
        </h1>
        <UserOrderSection status="deleverd" />
      </section>

      <Footer/>
    </>
  );
};

export default UserDeliveredOrder;
