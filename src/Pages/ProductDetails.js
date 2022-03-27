import React, { useState, useEffect } from "react";
import styles from "./css/productDetails.module.css";

import {
  Navbar,
  ImageCarosul,
  ProductDetail,
  SimilarProductSection,
  ProductReview,
  LoadingSpinner,
  Footer
} from "../Components";

import { BaseUrl } from "../Static/Data/data";
import axios from "axios";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const { articleNumber } = useParams();

  const [data, setData] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [styleCode, setStyleCode] = useState("");
  const [groupData, setGroupData] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);

  const [isLoading, setIsLoading] = useState(true);

  const fetchProductData = async () => {
    try {
      const url = `${BaseUrl}/items/query/?limit=30&skip=0&article_number=${articleNumber}`;
      const {
        data: { responseData },
      } = await axios.get(url);

      const sizeArray = responseData.map((data) => data.size);

      setData(responseData);
      setSizes(sizeArray);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchGroupData = async () => {
    try {
      const url = `${BaseUrl}/groupItems/query/?limit=1&skip=0&article=${articleNumber}`;
      const {
        data: { responseData },
      } = await axios.get(url);
      
      setGroupData(responseData[0]);
      setStyleCode(responseData[0].style_code);
    } catch (error) {
      console.log(error);
    }
  };

  const changeCurrentIndex = (index) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    fetchProductData();
    fetchGroupData();
    window.scrollTo(0, 0);

    if (data.length > 0) {
      setIsLoading(false);
    }
  }, [articleNumber, data.length]);

  return (
    <section>
      <Navbar />

      {isLoading && <LoadingSpinner />}

      {!isLoading && (
        <>
          {data.length > 0 && (
            <section className={styles.detailSection}>
              <ImageCarosul productData={data[currentIndex]} />
              <ProductDetail
                productData={data[currentIndex]}
                groupData={groupData}
                sizes={sizes}
                changeCurrentIndex={changeCurrentIndex}
              />
            </section>
          )}
          {groupData.total_rating > 0 && (
            <ProductReview article_number={articleNumber} />
          )}
          {styleCode.length > 0 && (
            <section>
              <SimilarProductSection style_code={styleCode} />
            </section>
          )}
        </>
      )}

      <Footer />
    </section>
  );
};

export default ProductDetails;
