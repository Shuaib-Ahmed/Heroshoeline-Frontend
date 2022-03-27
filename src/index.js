import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

import ManageItemContextProvider from "./context/ManageItemContext";
import ProductContextProvider from "./context/ProductContext";

ReactDOM.render(
  <React.StrictMode>
    <ManageItemContextProvider>
      <ProductContextProvider>
        <App />
      </ProductContextProvider>
    </ManageItemContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
