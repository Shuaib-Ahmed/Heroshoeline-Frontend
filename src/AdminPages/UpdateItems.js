import React from "react";
import { Navbar, EditItemForm } from "../AdminComponents";

import { useParams } from "react-router-dom";

const UpdateItems = () => {
  const { productId } = useParams();
  return (
    <>
      <Navbar />
      <h1 className="page_title">Edit Product</h1>
      <EditItemForm productId={productId}/>
    </>
  );
};

export default UpdateItems;
