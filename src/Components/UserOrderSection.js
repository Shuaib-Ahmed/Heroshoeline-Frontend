import React, { useState, useEffect } from "react";
import styles from "./css/userOrderSection.module.css";

import Pagination from "../AdminComponents/Pagination";
import RatingModal from "./RatingModal";
import LoadingSpinner from "./LoadingSpinner";

import { errorMessage } from "../Static/Function/tostify";
import { BaseUrl } from "../Static/Data/data";
import axios from "axios";

import { useNavigate } from "react-router-dom";

const UserOrderSection = ({ status }) => {
  const authData = JSON.parse(localStorage.getItem("authData"));
  const config = { headers: { authorization: `Bearer ${authData.token}` } };
  const navigate = useNavigate();

  const [limit, setLimit] = useState(20);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [data, setData] = useState([]);
  const [render, setRender] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewData, setReviewData] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const showNextPage = () => {
    setPage((prevState) => prevState + 1);
  };

  const showPrevPage = () => {
    setPage((prevState) => prevState - 1);
  };

  const showProductDetails = (article_number, event) => {
    const id = event.target.id;

    if (id !== "cancel" && id !== "issue" && id !== "rating") {
      navigate(`/item/${article_number}`);
    }
  };

  const openReviewModal = (data) => {
    setShowReviewModal(true);
    setReviewData(data);
  };

  const hideReviewModal = () => {
    setShowReviewModal(false);
  };

  const cancelOrder = async (orderId, status) => {
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
      navigate("/login");
    }
  };

  useEffect(async () => {
    window.scrollTo(0,0);
    try {
      const skip = (page - 1) * limit;
      const url = `${BaseUrl}/order/query/?limit=${limit}&skip=${skip}&status=${status}`;

      const {
        data: { error, responseData, total },
      } = await axios.get(url, { ...config });

      if (!error) {
        setData(responseData);
        const totalPage = Math.ceil(total / limit);
        setTotal(totalPage);
        setIsLoading(false);
      } else {
        errorMessage("Please Log In To Access This Route");
        navigate("/login");
      }
    } catch (error) {
      navigate("/login");
    }
  }, [page, render]);

  return (
    <section>
      {isLoading && <LoadingSpinner />}

      {!isLoading && (
        <>
          {reviewData && (
            <RatingModal
              value={showReviewModal}
              hideReviewModal={hideReviewModal}
              reviewData={reviewData}
            />
          )}
          {data.length > 0 && (
            <>
              <section className={styles.mainContainer}>
                {data.map(({ product_data, quantity, status, _id }, index) => {
                  const {
                    image_url_1,
                    title,
                    list_price,
                    size,
                    color,
                    article_number,
                  } = product_data;

                  return (
                    <div
                      key={index}
                      className={styles.orderContainer}
                      onClick={showProductDetails.bind(this, article_number)}
                    >
                      <div className={styles.mainDetail}>
                        <img src={image_url_1} alt="Product Data" />
                        <h3>{title}</h3>
                      </div>
                      <div className={styles.moreDetail}>
                        <h3>Price : {list_price}</h3>
                        <h3>Size : {size}</h3>
                        <h3>Color: {color}</h3>
                        <h3>Quantity: {quantity}</h3>
                        <h3 className={styles.status}>Status: {status}</h3>
                      </div>
                      <div className={styles.buttonContainer}>
                        {status === "processing" && (
                          <button
                            className="btn red_btn"
                            id="cancel"
                            onClick={() => cancelOrder(_id, "cancelled")}
                          >
                            Cancel Order
                          </button>
                        )}

                        {status === "deleverd" && (
                          <button
                            className="btn dark_btn"
                            id="rating"
                            onClick={() => {
                              openReviewModal({
                                article_number: article_number,
                                order_id: _id,
                              });
                            }}
                          >
                            Give Rating
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </section>

              <Pagination
                page={page}
                totalPage={total}
                nextPage={showNextPage}
                prevPage={showPrevPage}
              />
            </>
          )}
        </>
      )}

      {data.length === 0 && !isLoading && (
        <h1 style={{ textAlign: "center", margin: "2rem 0" }}>
          No Order Found
        </h1>
      )}
    </section>
  );
};

export default UserOrderSection;
