import React, { useEffect, useState } from "react";
import styles from "./css/ratingModal.module.css";

import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { useNavigate } from "react-router-dom";

import { BaseUrl } from "../Static/Data/data";
import axios from "axios";
import { errorMessage, successMessage } from "../Static/Function/tostify";

const RatingModal = ({ value, hideReviewModal, reviewData }) => {
  const authData = JSON.parse(localStorage.getItem("authData"));
  const config = { headers: { authorization: `Bearer ${authData.token}` } };

  const navigate = useNavigate();
  const [reviewExist, setReviewExist] = useState(false);
  const [existData, setExistData] = useState({});
  const [formData, setFormData] = useState({});

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      const review_url = `${BaseUrl}/review`;

      const { data } = await axios.post(
        review_url,
        {
          reviewData: { ...reviewData, ...formData },
        },
        { ...config }
      );

      if (data.error) {
        errorMessage(data.message);
        navigate("/login");
      } else {
        successMessage(data.message);
        hideReviewModal();
      }
    } catch (error) {
      errorMessage("Something Went Wrong");
      navigate("/login");
    }
  };

  const changeHandler = (event) => {
    setFormData((prevState) => {
      return { ...prevState, [event.target.id]: event.target.value };
    });
  };

  useEffect(async () => {
    try {
      const { order_id } = reviewData;
      const url = `${BaseUrl}/review/query/?order_id=${order_id}&limit=${5}`;

      const { data } = await axios.get(url, { ...config });

      if (data.error) {
        errorMessage(data.message);
        navigate("/login");
      } else {
        const { responseData } = data;

        if (responseData.length === 0) {
          setReviewExist(false);
        } else {
          setReviewExist(true);
          setExistData(responseData[0]);
        }
      }
    } catch (error) {
      errorMessage("Something Went Wrong");
      navigate("/login");
    }
  }, [value === true]);

  return (
    <>
      <Modal open={value} onClose={hideReviewModal} center>
        <section className={styles.mainContainer}>
          {!reviewExist && (
            <>
              <h1>Give Reviews</h1>
              <form className={styles.ratingForm} onSubmit={submitHandler}>
                <div>
                  <label htmlFor="average_rating">Rating (Out Of 5) :</label>
                  <input
                    type="number"
                    name="rating"
                    id="rating"
                    max={5}
                    min={1}
                    placeholder="Give Rating Out Of 5"
                    onChange={changeHandler}
                  />
                </div>
                <div>
                  <label htmlFor="comment">Comment :</label>
                  <textarea
                    name="comment"
                    id="comment"
                    placeholder="Please Enter Your Comment"
                    onChange={changeHandler}
                    style={{ height:"70px" }}
                  ></textarea>
                </div>

                <button className="btn green_btn" type="submit">
                  Submit
                </button>
              </form>
            </>
          )}

          {reviewExist && (
            <>
              <h1>Given Review</h1>
              <h3>Rating : {existData.rating} / 5</h3>
              <h3>Comment : {existData.comment}</h3>
            </>
          )}
        </section>
      </Modal>
    </>
  );
};

export default RatingModal;
