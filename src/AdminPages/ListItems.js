import React from "react";

import { Navbar, CreateItemForm } from "../AdminComponents";

const ListItems = () => {
  return (
    <>
      <Navbar />
      <h1 className="page_title">List New Items</h1>
      <CreateItemForm />
    </>
  );
};

export default ListItems;
