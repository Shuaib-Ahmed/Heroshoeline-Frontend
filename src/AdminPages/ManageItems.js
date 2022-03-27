import React from "react";

import { Navbar, DispalyItems } from "../AdminComponents";

const ManageItems = () => {
  return (
    <>
      <Navbar />
      <h1 className="page_title">Manage Items</h1>
      <DispalyItems />
    </>
  );
};

export default ManageItems;
