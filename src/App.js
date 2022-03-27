import React from "react";
import "./App.css";

import SignUp from "./Pages/SignUp";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import ProductDetails from "./Pages/ProductDetails";
import Cart from "./Pages/Cart";
import CheckOut from "./Pages/CheckOut";
import UserActiveOrders from "./Pages/UserActiveOrders";
import UserShippedOrders from "./Pages/UserShippedOrders";
import UserDeliveredOrder from "./Pages/UserDeliveredOrder";
import UserCancelledOrders from "./Pages/UserCancelledOrders";
import AllProduct from "./Pages/AllProduct";

import AdminPrivateRoute from "./AdminPages/AdminPrivateRoute";
import AdminActiveOrders from "./AdminPages/AdminActiveOrders";
import AdminShippedOrders from "./AdminPages/AdminShippedOrders";
import AdminCompletedOrders from "./AdminPages/AdminCompletedOrders";
import AdminCancelledOrders from "./AdminPages/AdminCancelledOrders";
import ListItems from "./AdminPages/ListItems";
import ManageItems from "./AdminPages/ManageItems";
import UpdateItems from "./AdminPages/UpdateItems";
import Aanalytics from "./AdminPages/Aanalytics";

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<Home />} />
        <Route path="/item/:articleNumber" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout/:total" element={<CheckOut />} />
        <Route path="/active_orders" element={<UserActiveOrders />} />
        <Route path="/shipped_orders" element={<UserShippedOrders />} />
        <Route path="/deliverd_orders" element={<UserDeliveredOrder />} />
        <Route path="/cancelled_orders" element={<UserCancelledOrders />} />
        <Route path="/all_product" element={<AllProduct />} />

        {/* for admin only */}
        <Route
          path="/admin_active_orders"
          element={
            <AdminPrivateRoute>
              <AdminActiveOrders />
            </AdminPrivateRoute>
          }
        />
        <Route
          path="/admin_shipped_orders"
          element={
            <AdminPrivateRoute>
              <AdminShippedOrders />
            </AdminPrivateRoute>
          }
        />
        <Route
          path="/admin_completed_orders"
          element={
            <AdminPrivateRoute>
              <AdminCompletedOrders />
            </AdminPrivateRoute>
          }
        />
        <Route
          path="/admin_cancelled_orders"
          element={
            <AdminPrivateRoute>
              <AdminCancelledOrders />
            </AdminPrivateRoute>
          }
        />
        <Route
          path="/list_items"
          element={
            <AdminPrivateRoute>
              <ListItems />
            </AdminPrivateRoute>
          }
        />
        <Route
          path="/manage_items"
          element={
            <AdminPrivateRoute>
              <ManageItems />
            </AdminPrivateRoute>
          }
        />

        <Route
          path="/update_items/:productId"
          element={
            <AdminPrivateRoute>
              <UpdateItems />
            </AdminPrivateRoute>
          }
        />

        <Route
          path="/analytics"
          element={
            <AdminPrivateRoute>
              <Aanalytics />
            </AdminPrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
