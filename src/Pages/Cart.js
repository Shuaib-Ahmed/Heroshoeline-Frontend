import React from "react";

import { Navbar, CartProduct, Footer } from "../Components";

const Cart = () => {
  return (
    <>
      <Navbar />
      <section style={{ minHeight: "100vh", background: "#edf2f4" }}>
        <CartProduct />
      </section>
      <Footer />
    </>
  );
};

export default Cart;
