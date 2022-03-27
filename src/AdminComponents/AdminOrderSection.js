import React, { useState, useEffect } from "react";
import styles from "./css/adminOrderSection.module.css";

import Pagination from "./Pagination";
import LoadingSpinner from "../Components/LoadingSpinner";

import { useNavigate } from "react-router-dom";

import { errorMessage } from "../Static/Function/tostify";
import { BaseUrl } from "../Static/Data/data";
import axios from "axios";

const AdminOrderSection = ({ status }) => {
  const authData = JSON.parse(localStorage.getItem("authData"));
  const config = { headers: { authorization: `Bearer ${authData.token}` } };
  const navigate = useNavigate();

  const [limit, setLimit] = useState(20);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [data, setData] = useState([]);
  const [render, setRender] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const showNextPage = () => {
    setPage((prevState) => prevState + 1);
  };

  const showPrevPage = () => {
    setPage((prevState) => prevState - 1);
  };

  const updateOrder = async (orderId, status) => {
    try {
      if (window.confirm("Are U Sure U Want To Do This ?")) {
        const url = `${BaseUrl}/order`;
        const {
          data: { error, message },
        } = await axios.patch(
          url,
          { order_id: orderId, status: status },
          { ...config }
        );

        if (!error) {
          setRender((prevState) => !prevState);
        } else {
          errorMessage(message);
          navigate("/login");
        }
      }
    } catch (error) {
      console.log(error);
      navigate("/login");
    }
  };

  useEffect(async () => {
    try {
      setIsLoading(true);

      const skip = (page - 1) * limit;
      const url = `${BaseUrl}/order/query/?limit=${limit}&skip=${skip}&status=${status}&admin=${true}`;

      const {
        data: { error, responseData, total, message },
      } = await axios.get(url, { ...config });

      if (!error) {
        setData(responseData);
        const totalPage = Math.ceil(total / limit);
        setTotal(totalPage);
      } else {
        errorMessage(message);
        navigate("/login");
      }

      setIsLoading(false);
    } catch (error) {
      errorMessage("Somthing Went Wrong");
      navigate("/login");
    }
  }, [page, render]);

  return (
    <section>
      {isLoading && <LoadingSpinner />}
      {!isLoading && data.length > 0 && (
        <>
          <section className={styles.mainContainer}>
            {data.map(
              ({ product_data, quantity, shipping_data, _id }, index) => {
                const {
                  name,
                  email,
                  state,
                  city,
                  address,
                  pin_code,
                  phone_number,
                } = shipping_data;
                const { image_url_1, sku, list_price, size, color } =
                  product_data;
                return (
                  <div key={index} className={styles.orderContainer}>
                    <div className={styles.mainDetail}>
                      <img src={image_url_1} alt="Product Data" />
                      <h3>SKU : {sku}</h3>
                    </div>
                    <div className={styles.moreDetail}>
                      <p>Price : {list_price}</p>
                      <p>Size : {size}</p>
                      <p>Color: {color}</p>
                      <p>Quantity: {quantity}</p>
                    </div>
                    <details className={styles.shippingDetails}>
                      <summary>Shipping Details</summary>
                      <p>Name: {name}</p>
                      <p>Email: {email}</p>
                      <p>State: {state}</p>
                      <p>City: {city}</p>
                      <p>Address: {address}</p>
                      <p>Pin Code: {pin_code}</p>
                      <p>Phone Number: {phone_number}</p>
                    </details>
                    <div className={styles.btnContainer}>
                      {status === "processing" && (
                        <button
                          className="btn green_btn"
                          onClick={() => updateOrder(_id, "shipped")}
                        >
                          Conform Shipment
                        </button>
                      )}
                      {status === "processing" && (
                        <button
                          className="btn red_btn"
                          onClick={() => updateOrder(_id, "cancelled")}
                        >
                          Cancel Order
                        </button>
                      )}
                      {status === "shipped" && (
                        <button
                          className="btn green_btn"
                          onClick={() => updateOrder(_id, "deleverd")}
                        >
                          Conform Delivery
                        </button>
                      )}
                    </div>
                  </div>
                );
              }
            )}
          </section>

          <Pagination
            page={page}
            totalPage={total}
            nextPage={showNextPage}
            prevPage={showPrevPage}
          />
        </>
      )}
      {!isLoading && data.length === 0 && (
        <h1 style={{ textAlign: "center" }}>No Order Found</h1>
      )}
    </section>
  );
};

export default AdminOrderSection;
