import React from "react";

import { Navbar, CheckOutForm, Footer } from "../Components";

import { useParams } from "react-router-dom";

const CheckOut = () => {
  const { total } = useParams();
  return (
    <>
      <Navbar />
      <section
        style={{
          minHeight: "100vh",
          background: "#edf2f4",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "2rem 1rem",
        }}
      >
        <CheckOutForm total={total} />
      </section>
      <Footer />
    </>
  );
};

export default CheckOut;
