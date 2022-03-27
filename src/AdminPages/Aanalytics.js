import React, { useState } from "react";
import styles from "./analytics.module.css";

import { Navbar } from "../AdminComponents";

import { BaseUrl } from "../Static/Data/data";
import { errorMessage } from "../Static/Function/tostify";
import { useNavigate } from "react-router-dom";

import { LoadingSpinner } from "../Components";

import axios from "axios";

const Aanalytics = () => {
  const navigate = useNavigate();
  const [filterData, setFilterData] = useState({});
  const [totalOrder, setTotalOrder] = useState(0);
  const [cancelOrder, setCancelOrder] = useState(0);
  const [revenue, setRevenue] = useState(0);
  const [showData, setShowData] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const changeHandler = (event) => {
    setFilterData((prevState) => {
      return { ...prevState, [event.target.id]: event.target.value };
    });
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      setIsLoading(true);
      const { date1, date2 } = filterData;
      const url = `${BaseUrl}/analytics/query/?date1=${date1}&date2=${date2}`;

      const { data } = await axios.get(url);

      const { error } = data;

      if (!error) {
        setTotalOrder(data.responseData.length);

        let totalCancelOrder = 0;
        let totalRevenue = 0;
        data.responseData.forEach(({ status, product_data }) => {
          if (status === "cancelled") {
            totalCancelOrder += 1;
          } else {
            totalRevenue += product_data.list_price;
          }
        });

        setCancelOrder(totalCancelOrder);
        setRevenue(totalRevenue);

        setShowData(true);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      errorMessage("Something Went Wrong");
      navigate("/login");
    }
  };

  return (
    <>
      <Navbar />

      <form onSubmit={submitHandler} className={styles.analyticsForm}>
        <h3>Filter Options</h3>
        <div>
          <h3>From</h3>
          <input
            type="date"
            name="date1"
            id="date1"
            required
            onChange={changeHandler}
          />
        </div>
        <div>
          <h3>To</h3>
          <input
            type="date"
            name="date2"
            id="date2"
            required
            onChange={changeHandler}
          />
        </div>
        <button type="submit">Fetch</button>
      </form>

      {isLoading && <LoadingSpinner />}

      {showData && !isLoading && (
        <section className={styles.analyticsInfo}>
            <div style={{ background: "#2b2d42" }}>
                <h3>Total Order</h3>
                <h3>{totalOrder}</h3>
            </div>
            <div style={{ background: "#df4b5c" }}>
                <h3>Cancel Order</h3>
                <h3>{cancelOrder}</h3>
            </div>
            <div style={{ background: "rgb(37, 155, 37)" }}>
                <h3>revenue</h3>
                <h3>{revenue} RS</h3>
            </div>
        </section>
      )}
    </>
  );
};

export default Aanalytics;
